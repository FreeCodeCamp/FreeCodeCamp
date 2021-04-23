const authHeader = require('./auth-header');
const makeRequest = require('./make-request');

const addFile = async (projectId, filename, fileContent, directoryId) => {
  let headers = { ...authHeader };
  headers['Crowdin-API-FileName'] = filename;
  const endPoint = `storages`;
  const contentType = 'application/text';
  const body = fileContent;
  const storageResponse = await makeRequest({
    method: 'post',
    contentType,
    endPoint,
    headers,
    body
  });
  if (storageResponse.data) {
    const fileBody = {
      storageId: storageResponse.data.id,
      name: filename,
      directoryId
    };
    const fileResponse = await makeRequest({
      method: 'post',
      endPoint: `projects/${projectId}/files`,
      headers,
      body: fileBody
    });
    if (fileResponse.data) {
      return fileResponse.data;
    } else {
      console.log('error');
      console.dir(fileResponse, { depth: null, colors: true });
    }
  }
  return null;
};

const updateFile = async (projectId, fileId, fileContent) => {
  let headers = { ...authHeader };
  const endPoint = `storages`;
  const contentType = 'application/text';
  const body = fileContent;
  const storageResponse = await makeRequest({
    method: 'post',
    contentType,
    endPoint,
    headers,
    body
  });
  if (storageResponse.data) {
    const fileBody = {
      storageId: storageResponse.data.id
    };
    const fileResponse = await makeRequest({
      method: 'put',
      endPoint: `projects/${projectId}/files${fileId}`,
      headers,
      body: fileBody
    });
    if (fileResponse.data) {
      return fileResponse.data;
    } else {
      console.log('error');
      console.dir(fileResponse, { depth: null, colors: true });
    }
  }
  return null;
};

const deleteFile = async (projectId, fileId, filePath) => {
  let headers = { ...authHeader };
  const endPoint = `projects/${projectId}/files/${fileId}`;
  await makeRequest({
    method: 'delete',
    endPoint,
    headers
  });
  console.log(`Deleted ${filePath} from Crowdin project`);
  return null;
};

const getFiles = async projectId => {
  let headers = { ...authHeader };
  let done = false;
  let offset = 0;
  let files = [];
  while (!done) {
    const endPoint = `projects/${projectId}/files?limit=500&offset=${offset}`;
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
        files = files.map(({ data: { directoryId, id: fileId, path } }) => {
          // remove leading forwardslash
          path = path.slice(1);
          return { directoryId, fileId, path };
        });
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

module.exports = {
  addFile,
  updateFile,
  deleteFile,
  getFiles
};
