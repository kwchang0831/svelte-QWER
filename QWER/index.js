import chokidar from 'chokidar';
import { cp } from 'node:fs';
import { join, basename, sep } from 'node:path';
import { CoreConfig } from '../user/config/QWER.config.js';
import { log } from './utli/logger.js';
import {
  addDataFolderFile,
  rmDataFolderFile,
  processRmDir,
  buildAll,
  cleanAll,
  cleanEmptyFoldersInRoute,
  convertPathForInternalUse,
  readMetaIntoMemory,
} from './lib/processFile.js';
import { rmFile, rmDir } from './utli/fsHelper.js';

switch (process.argv[2]) {
  case 'watch':
    {
      let dataFolderwatcher = chokidar.watch(CoreConfig.UserBlogsFolder, {
        ignored: (file) => basename(file).startsWith('.'),
        awaitWriteFinish: {
          stabilityThreshold: 1000,
          pollInterval: 100,
        },
      });

      let dateFolderInited = false;
      dataFolderwatcher
        .on('add', (file) => {
          if (!dateFolderInited) return;
          log('cyan', '[DATA] File Created', file);
          addDataFolderFile(file, dateFolderInited);
        })
        .on('change', (file) => {
          if (!dateFolderInited) return;
          log('cyan', '[DATA] File Updated', file);
          rmDataFolderFile(file, false);
          addDataFolderFile(file, dateFolderInited);
        })
        .on('unlink', (file) => {
          if (!dateFolderInited) return;
          log('cyan', '[DATA] File Unlinked', file);
          rmFile(convertPathForInternalUse(file));
          rmDataFolderFile(file, true);
        })
        .on('addDir', (dir) => {
          if (!dateFolderInited) return;
          log('cyan', '[DATA] Dir Created', dir);
        })
        .on('unlinkDir', (dir) => {
          if (!dateFolderInited) return;
          log('cyan', '[DATA] Dir Unlinked', dir);
          processRmDir(dir);
        })
        .on('error', (error) => log('red', '[DATA] error', error))
        .on('ready', () => {
          dateFolderInited = true;
          log('cyan', '[DATA] Folder - Init. Scan Completed.');
          readMetaIntoMemory();
          // // Assuming build was initialized, before calling watch
          // genMetaFiles();
          // genAssetTypeDefinition();
          // genAssetFile();
        });

      const publicFolderwatcher = chokidar.watch(CoreConfig.UserPublicFolder, {
        ignored: (file) => basename(file).startsWith('.'),
        awaitWriteFinish: {
          stabilityThreshold: 1000,
          pollInterval: 100,
        },
      });
      let publicFolderInited = false;

      publicFolderwatcher
        .on('add', (file) => {
          if (!publicFolderInited) return;
          log('cyan', '[Public] File Created', file);
          const [, ...destPath] = file.split(sep);
          const _targetPath = join(CoreConfig.StaticFolder, destPath.join(sep));
          cp(file, _targetPath, {}, () => {
            log('green', 'File Copied', _targetPath);
          });
        })
        .on('change', (file) => {
          if (!publicFolderInited) return;
          log('cyan', '[Public] File Updated', file);
          const [, ...destPath] = file.split(sep);
          const _targetPath = join(CoreConfig.StaticFolder, destPath.join(sep));
          cp(file, _targetPath, {}, () => {
            log('green', 'File Copied', _targetPath);
          });
        })
        .on('unlink', (file) => {
          if (!publicFolderInited) return;
          log('cyan', '[Public] File Unlinked', file);
          const [, ...destPath] = file.split(sep);
          const _targetPath = join(CoreConfig.StaticFolder, destPath.join(sep));
          rmFile(_targetPath);
        })
        .on('addDir', (dir) => {
          if (!publicFolderInited) return;
          log('cyan', '[Public] Dir Created', dir);
        })
        .on('unlinkDir', (dir) => {
          if (!publicFolderInited) return;
          log('cyan', '[Public] Dir Unlinked', dir);
          const [, ...destPath] = dir.split(sep);
          const _targetPath = join(CoreConfig.StaticFolder, destPath.join(sep));
          rmDir(_targetPath);
        })
        .on('error', (error) => log('red', '[DATA] error', error))
        .on('ready', () => {
          publicFolderInited = true;
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

  case 'buildWithoutMeta':
    {
      buildAll(false);
    }
    break;
}
