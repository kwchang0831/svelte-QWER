import { readdirSync, statSync, existsSync, unlink, rm } from 'node:fs';
import path from 'node:path';
import { log } from './logger.js';
import { firstLine } from './readFirstLine.js';

/**
 *
 * @param {*} str input string
 * @param {*} map {
 *                  match: regex rules,
 *                  replace: string to replace with,
 *                }
 * @returns replaced string
 */
export const strReplaceMatchWith = (str, map) => {
  map.forEach(function (_err, regexItem) {
    str = str.replace(map[regexItem].match, map[regexItem].replace);
  });
  return str;
};

export const getAllFilesInDir = (src, arrayFiles = []) => {
  if (!existsSync(src)) return [];

  const files = readdirSync(src, { withFileTypes: true });

  arrayFiles = arrayFiles || [];

  files.forEach((file) => {
    if (file.isDirectory()) {
      arrayFiles = getAllFilesInDir(path.join(src, file.name), arrayFiles);
    } else {
      arrayFiles.push(path.join(src, file.name));
    }
  });

  return arrayFiles;
};

export const rmFile = (path) => {
  if (existsSync(path)) {
    unlink(path, () => {
      log('red', 'File Removed', path);
    });
  }
};

export const rmDir = (dir) => {
  if (existsSync(dir)) {
    getAllFilesInDir(dir).forEach((f) => rmFile(f));
    rm(dir, { recursive: true, force: true }, () => {
      log('red', 'Dir Removed', dir);
    });
  } else {
    log('green', 'Dir Not Exists. All Done.', dir);
  }
};

export const rmGeneratedFiles = (file, matchString) => {
  firstLine(file).then((s) => {
    if (s.match(matchString)) {
      rmFile(file);
    }
  });
};

export const rmEmptyFolders = (dir) => {
  var isDir = existsSync(dir) && statSync(dir).isDirectory();

  if (!isDir) {
    return;
  }

  var files = readdirSync(dir);

  if (files.length > 0) {
    files.forEach(function (file) {
      var fullPath = path.resolve(dir, file);
      rmEmptyFolders(fullPath);
    });

    files = readdirSync(dir);
  }

  if (files.length == 0) {
    rm(dir, { recursive: true, force: true }, () => {
      log('red', 'Empty Dir Removed', dir);
    });
    return;
  }
};
