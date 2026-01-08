import { CreateStudyGroupData, CreateStudyGroupVariables, GetStudyGroupsByOwnerData, GetStudyGroupsByOwnerVariables, CreatePostData, CreatePostVariables, GetPostsByStudentData, GetPostsByStudentVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateStudyGroup(options?: useDataConnectMutationOptions<CreateStudyGroupData, FirebaseError, CreateStudyGroupVariables>): UseDataConnectMutationResult<CreateStudyGroupData, CreateStudyGroupVariables>;
export function useCreateStudyGroup(dc: DataConnect, options?: useDataConnectMutationOptions<CreateStudyGroupData, FirebaseError, CreateStudyGroupVariables>): UseDataConnectMutationResult<CreateStudyGroupData, CreateStudyGroupVariables>;

export function useGetStudyGroupsByOwner(vars: GetStudyGroupsByOwnerVariables, options?: useDataConnectQueryOptions<GetStudyGroupsByOwnerData>): UseDataConnectQueryResult<GetStudyGroupsByOwnerData, GetStudyGroupsByOwnerVariables>;
export function useGetStudyGroupsByOwner(dc: DataConnect, vars: GetStudyGroupsByOwnerVariables, options?: useDataConnectQueryOptions<GetStudyGroupsByOwnerData>): UseDataConnectQueryResult<GetStudyGroupsByOwnerData, GetStudyGroupsByOwnerVariables>;

export function useCreatePost(options?: useDataConnectMutationOptions<CreatePostData, FirebaseError, CreatePostVariables>): UseDataConnectMutationResult<CreatePostData, CreatePostVariables>;
export function useCreatePost(dc: DataConnect, options?: useDataConnectMutationOptions<CreatePostData, FirebaseError, CreatePostVariables>): UseDataConnectMutationResult<CreatePostData, CreatePostVariables>;

export function useGetPostsByStudent(vars: GetPostsByStudentVariables, options?: useDataConnectQueryOptions<GetPostsByStudentData>): UseDataConnectQueryResult<GetPostsByStudentData, GetPostsByStudentVariables>;
export function useGetPostsByStudent(dc: DataConnect, vars: GetPostsByStudentVariables, options?: useDataConnectQueryOptions<GetPostsByStudentData>): UseDataConnectQueryResult<GetPostsByStudentData, GetPostsByStudentVariables>;
