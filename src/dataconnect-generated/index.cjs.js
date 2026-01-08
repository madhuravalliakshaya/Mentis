const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'myapp',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createStudyGroupRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateStudyGroup', inputVars);
}
createStudyGroupRef.operationName = 'CreateStudyGroup';
exports.createStudyGroupRef = createStudyGroupRef;

exports.createStudyGroup = function createStudyGroup(dcOrVars, vars) {
  return executeMutation(createStudyGroupRef(dcOrVars, vars));
};

const getStudyGroupsByOwnerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStudyGroupsByOwner', inputVars);
}
getStudyGroupsByOwnerRef.operationName = 'GetStudyGroupsByOwner';
exports.getStudyGroupsByOwnerRef = getStudyGroupsByOwnerRef;

exports.getStudyGroupsByOwner = function getStudyGroupsByOwner(dcOrVars, vars) {
  return executeQuery(getStudyGroupsByOwnerRef(dcOrVars, vars));
};

const createPostRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreatePost', inputVars);
}
createPostRef.operationName = 'CreatePost';
exports.createPostRef = createPostRef;

exports.createPost = function createPost(dcOrVars, vars) {
  return executeMutation(createPostRef(dcOrVars, vars));
};

const getPostsByStudentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPostsByStudent', inputVars);
}
getPostsByStudentRef.operationName = 'GetPostsByStudent';
exports.getPostsByStudentRef = getPostsByStudentRef;

exports.getPostsByStudent = function getPostsByStudent(dcOrVars, vars) {
  return executeQuery(getPostsByStudentRef(dcOrVars, vars));
};
