import chokidar from 'chokidar';
import { cpSync } from 'node:fs';
import { join, basename, sep } from 'node:path';
import { Config } from '../config/QWER.confitg.js';
import { log } from './utli/logger.js';
import {
  addDataFolderFile,
  rmDataFolderFile,
  processRmDir,
  buildAll,
  cleanAll,
  cleanEmptyFoldersInRoute,
  convertPathForInternalUse,
} from './lib/processFile.js';
import { rmFile, rmDir } from './utli/fsHelper.js';
import { genMetaFiles, genAssetFile, genAssetTypeDefinition } from './lib/metaGenerate.js';

switch (process.argv[2]) {
  case 'watch':
    {
      let dataFolderwatcher = chokidar.watch(Config.DataFolder, {
        ignored: (file) => basename(file).startsWith('.'),
        awaitWriteFinish: {
          stabilityThreshold: 1000,
          pollInterval: 100,
        },
      });

      let inited = false;

      dataFolderwatcher
        .on('add', (file) => {
          log('cyan', '[DATA] File Created', file);
          addDataFolderFile(file, inited);
        })
        .on('change', (file) => {
          log('cyan', '[DATA] File Updated', file);
          rmDataFolderFile(file, false);
          addDataFolderFile(file, inited);
        })
        .on('unlink', (file) => {
          log('cyan', '[DATA] File Unlinked', file);
          rmFile(convertPathForInternalUse(file));
          rmDataFolderFile(file, true);
        })
        .on('addDir', (dir) => {
          log('cyan', '[DATA] Dir Created', dir);
        })
        .on('unlinkDir', (dir) => {
          log('cyan', '[DATA] Dir Unlinked', dir);
          processRmDir(dir);
        })
        .on('error', (error) => log('red', '[DATA] error', error))
        .on('ready', () => {
          inited = true;
          log('cyan', '[DATA] Folder - Init. Scan Completed.');

          genMetaFiles();
          genAssetTypeDefinition();
          genAssetFile();
        });

      const publicFolderwatcher = chokidar.watch(Config.PublicFolder, {
        ignored: (file) => basename(file).startsWith('.'),
        awaitWriteFinish: {
          stabilityThreshold: 1000,
          pollInterval: 100,
        },
      });
      publicFolderwatcher
        .on('add', (file) => {
          log('cyan', '[Public] File Created', file);
          const [, ...destPath] = file.split(sep);
          const _targetPath = join(Config.StaticFolder, destPath.join(sep));
          cpSync(file, _targetPath);
          log('green', 'File Copied', _targetPath);
        })
        .on('change', (file) => {
          log('cyan', '[Public] File Updated', file);
          const [, ...destPath] = file.split(sep);
          const _targetPath = join(Config.StaticFolder, destPath.join(sep));
          cpSync(file, _targetPath);
          log('green', 'File Updated', _targetPath);
        })
        .on('unlink', (file) => {
          log('cyan', '[Public] File Unlinked', file);
          const [, ...destPath] = file.split(sep);
          const _targetPath = join(Config.StaticFolder, destPath.join(sep));
          rmFile(_targetPath);
        })
        .on('addDir', (dir) => {
          log('cyan', '[Public] Dir Created', dir);
        })
        .on('unlinkDir', (dir) => {
          log('cyan', '[Public] Dir Unlinked', dir);
          const [, ...destPath] = dir.split(sep);
          const _targetPath = join(Config.StaticFolder, destPath.join(sep));
          rmDir(_targetPath);
        })
        .on('error', (error) => log('red', '[DATA] error', error))
        .on('ready', () => {
          log('cyan', '[Public] Folder - Init Scan Completed.');
        });

      process
        .on('SIGINT', () => {
          log('red', 'SIGINT');
          dataFolderwatcher?.close();
          publicFolderwatcher?.close();
        })
        .on('SIGTERM', () => {
          log('red', 'SIGTERM');
          dataFolderwatcher?.close();
          publicFolderwatcher?.close();
        })
        .on('exit', () => {
          log('red', 'watch exit');
        });
    }
    break;

  case 'clean':
    {
      cleanAll();
    }
    break;

  case 'cleanEmptyFolders':
    {
      cleanEmptyFoldersInRoute();
    }
    break;

  case 'build':
    {
      buildAll();
    }
    break;
}
