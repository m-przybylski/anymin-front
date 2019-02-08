const { readdir, stat } = require('fs');
const { join } = require('path');

const constants = {
  DIRECTORY: 'directory',
  FILE: 'file',
};

const readDir = (path) =>
  new Promise(
    (resolve, reject) => {
      readdir(path, (err, dirData) => {
        if (err) {
          return reject(err);
        }

        return resolve(dirData);
      });
    },
  );
const getStat = (path) =>
  new Promise(
    (resolve, reject) => {
      stat(path, (err, stats) => {
        if (err) {
          return reject(err);
        }

        return resolve(stats);
      });
    },
  );

const directoryTree = async (path) => {
  const item = { path, type: constants.FILE };
  const stats = await getStat(path);

  if (stats.isFile()) {
    item.type = constants.FILE;
  } else if (stats.isDirectory()) {
    const dirData = await readDir(path);
    const children = dirData.map(child => getChildData(join(path, child)));
    for await (const child of children) {
      item.children = (item.children ? item.children : []).concat(child);
    }
    item.children = item.children.filter(e => e !== undefined);
    item.type = constants.DIRECTORY;
  }

  return item;
}

const filesFlat = async (path) => {
  const tree = await directoryTree(path);

  return getFiles([], tree);
}

const getFiles = (fileList, item) => {
  const reducer = (acc, cur) => acc.concat(cur);
  let _fileList = [];
  if (item.type === constants.FILE) {
    _fileList = [...(fileList ? fileList : []), item.path];
  } else if (item.type === constants.DIRECTORY) {
    const children = item.children ? item.children : [];
    _fileList = children.map(child => getFiles(_fileList, child)).reduce(reducer, []);
  }

  return _fileList;
};

const getChildData = async (child) => {
  const children = await directoryTree(child);

  return children;
};

module.exports = { filesFlat };
