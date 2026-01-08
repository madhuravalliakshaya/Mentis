import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Connection_Key {
  senderId: UUIDString;
  receiverId: UUIDString;
  __typename?: 'Connection_Key';
}

export interface CreatePostData {
  post_insert: Post_Key;
}

export interface CreatePostVariables {
  studentId: UUIDString;
  content: string;
  title: string;
}

export interface CreateStudyGroupData {
  studyGroup_insert: StudyGroup_Key;
}

export interface CreateStudyGroupVariables {
  name: string;
  ownerId: UUIDString;
  description: string;
}

export interface GetPostsByStudentData {
  posts: ({
    id: UUIDString;
    title?: string | null;
    content: string;
    createdAt: TimestampString;
  } & Post_Key)[];
}

export interface GetPostsByStudentVariables {
  studentId: UUIDString;
}

export interface GetStudyGroupsByOwnerData {
  studyGroups: ({
    id: UUIDString;
    name: string;
    description?: string | null;
  } & StudyGroup_Key)[];
}

export interface GetStudyGroupsByOwnerVariables {
  ownerId: UUIDString;
}

export interface GroupMember_Key {
  groupId: UUIDString;
  studentId: UUIDString;
  __typename?: 'GroupMember_Key';
}

export interface Post_Key {
  id: UUIDString;
  __typename?: 'Post_Key';
}

export interface Student_Key {
  id: UUIDString;
  __typename?: 'Student_Key';
}

export interface StudyGroup_Key {
  id: UUIDString;
  __typename?: 'StudyGroup_Key';
}

interface CreateStudyGroupRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateStudyGroupVariables): MutationRef<CreateStudyGroupData, CreateStudyGroupVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateStudyGroupVariables): MutationRef<CreateStudyGroupData, CreateStudyGroupVariables>;
  operationName: string;
}
export const createStudyGroupRef: CreateStudyGroupRef;

export function createStudyGroup(vars: CreateStudyGroupVariables): MutationPromise<CreateStudyGroupData, CreateStudyGroupVariables>;
export function createStudyGroup(dc: DataConnect, vars: CreateStudyGroupVariables): MutationPromise<CreateStudyGroupData, CreateStudyGroupVariables>;

interface GetStudyGroupsByOwnerRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStudyGroupsByOwnerVariables): QueryRef<GetStudyGroupsByOwnerData, GetStudyGroupsByOwnerVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetStudyGroupsByOwnerVariables): QueryRef<GetStudyGroupsByOwnerData, GetStudyGroupsByOwnerVariables>;
  operationName: string;
}
export const getStudyGroupsByOwnerRef: GetStudyGroupsByOwnerRef;

export function getStudyGroupsByOwner(vars: GetStudyGroupsByOwnerVariables): QueryPromise<GetStudyGroupsByOwnerData, GetStudyGroupsByOwnerVariables>;
export function getStudyGroupsByOwner(dc: DataConnect, vars: GetStudyGroupsByOwnerVariables): QueryPromise<GetStudyGroupsByOwnerData, GetStudyGroupsByOwnerVariables>;

interface CreatePostRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePostVariables): MutationRef<CreatePostData, CreatePostVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreatePostVariables): MutationRef<CreatePostData, CreatePostVariables>;
  operationName: string;
}
export const createPostRef: CreatePostRef;

export function createPost(vars: CreatePostVariables): MutationPromise<CreatePostData, CreatePostVariables>;
export function createPost(dc: DataConnect, vars: CreatePostVariables): MutationPromise<CreatePostData, CreatePostVariables>;

interface GetPostsByStudentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPostsByStudentVariables): QueryRef<GetPostsByStudentData, GetPostsByStudentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetPostsByStudentVariables): QueryRef<GetPostsByStudentData, GetPostsByStudentVariables>;
  operationName: string;
}
export const getPostsByStudentRef: GetPostsByStudentRef;

export function getPostsByStudent(vars: GetPostsByStudentVariables): QueryPromise<GetPostsByStudentData, GetPostsByStudentVariables>;
export function getPostsByStudent(dc: DataConnect, vars: GetPostsByStudentVariables): QueryPromise<GetPostsByStudentData, GetPostsByStudentVariables>;

