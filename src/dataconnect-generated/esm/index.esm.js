import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'myapp',
  location: 'us-east4'
};

export const createStudyGroupRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateStudyGroup', inputVars);
}
createStudyGroupRef.operationName = 'CreateStudyGroup';

export function createStudyGroup(dcOrVars, vars) {
  return executeMutation(createStudyGroupRef(dcOrVars, vars));
}

export const getStudyGroupsByOwnerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStudyGroupsByOwner', inputVars);
}
getStudyGroupsByOwnerRef.operationName = 'GetStudyGroupsByOwner';

export function getStudyGroupsByOwner(dcOrVars, vars) {
  return executeQuery(getStudyGroupsByOwnerRef(dcOrVars, vars));
}

export const createPostRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreatePost', inputVars);
}
createPostRef.operationName = 'CreatePost';

export function createPost(dcOrVars, vars) {
  return executeMutation(createPostRef(dcOrVars, vars));
}

export const getPostsByStudentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPostsByStudent', inputVars);
}
getPostsByStudentRef.operationName = 'GetPostsByStudent';

export function getPostsByStudent(dcOrVars, vars) {
  return executeQuery(getPostsByStudentRef(dcOrVars, vars));
}

