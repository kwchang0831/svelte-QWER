import readline from 'node:readline';
import fs from 'fs';

export const firstLine = (file) => {
  return new Promise((resolve) => {
    let reader = readline.createInterface({ input: fs.createReadStream(file) });
    let firstLine;

    reader.on('line', (line) => {
      firstLine = line;
      reader.close();
      reader.removeAllListeners();
      resolve(firstLine);
    });
  });
};
