const authHeader = require('./auth-header');
const delay = require('./delay');
const makeRequest = require('./make-request');

const getDirs = async projectId => {
  let headers = { ...authHeader };
  let done = false;
  let offset = 0;
  let files = [];
  while (!done) {
    const endPoint = `projects/${projectId}/directories?limit=500&offset=${offset}`;
    await delay(1000);
    const response = await makeRequest({
      method: 'get',
      endPoint,
      headers
    });
    if (response.data) {
      if (response.data.length) {
        files = [...files, ...response.data];
        offset += 500;
      } else {
        done = true;
        return files;
      }
    } else {
      const { error } = response;
      console.log(error.errorcode);
      console.log(error.messsage);
    }
  }
  return null;
};

const addDir = async (projectId, dirName, parentDirId) => {
  let headers = { ...authHeader };
  const endPoint = `projects/${projectId}/directories`;
  let body = {
    name: dirName
  };
  if (parentDirId) {
    body = { ...body, directoryId: parentDirId };
  }

  const response = await makeRequest({
    method: 'post',
    endPoint,
    headers,
    body
  });
  return response;
};

const createDirs = async (crowdinDirs, dirPath) => {
  // superParent is the top level directory on crowdin
  const superParent = crowdinDirs.find(dir => !dir.data.directoryId);
  let lastParentId = superParent.data.id;

  const splitDirPath = dirPath.split('/');
  splitDirPath.shift();

  // we are assuming that the first directory in 'newFile' is the same as the superParent
  // maybe throw a check in here to verify that's true
  const findCurrDir = (directory, crowdinDirs) => {
    return crowdinDirs.find(({ data: { name, directoryId } }) => {
      return name === directory && directoryId === lastParentId;
    });
  };

  for (let directory of splitDirPath) {
    const currentDirectory = findCurrDir(directory, crowdinDirs);
    if (!currentDirectory) {
      const response = await addDir(10, directory, lastParentId);
      lastParentId = response.data.id;
    } else {
      lastParentId = currentDirectory.data.id;
    }
  }
  return lastParentId;
};

module.exports = {
  addDir,
  getDirs,
  createDirs
};
