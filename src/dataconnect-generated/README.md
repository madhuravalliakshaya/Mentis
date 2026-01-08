# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetStudyGroupsByOwner*](#getstudygroupsbyowner)
  - [*GetPostsByStudent*](#getpostsbystudent)
- [**Mutations**](#mutations)
  - [*CreateStudyGroup*](#createstudygroup)
  - [*CreatePost*](#createpost)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetStudyGroupsByOwner
You can execute the `GetStudyGroupsByOwner` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getStudyGroupsByOwner(vars: GetStudyGroupsByOwnerVariables): QueryPromise<GetStudyGroupsByOwnerData, GetStudyGroupsByOwnerVariables>;

interface GetStudyGroupsByOwnerRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStudyGroupsByOwnerVariables): QueryRef<GetStudyGroupsByOwnerData, GetStudyGroupsByOwnerVariables>;
}
export const getStudyGroupsByOwnerRef: GetStudyGroupsByOwnerRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getStudyGroupsByOwner(dc: DataConnect, vars: GetStudyGroupsByOwnerVariables): QueryPromise<GetStudyGroupsByOwnerData, GetStudyGroupsByOwnerVariables>;

interface GetStudyGroupsByOwnerRef {
  ...
  (dc: DataConnect, vars: GetStudyGroupsByOwnerVariables): QueryRef<GetStudyGroupsByOwnerData, GetStudyGroupsByOwnerVariables>;
}
export const getStudyGroupsByOwnerRef: GetStudyGroupsByOwnerRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getStudyGroupsByOwnerRef:
```typescript
const name = getStudyGroupsByOwnerRef.operationName;
console.log(name);
```

### Variables
The `GetStudyGroupsByOwner` query requires an argument of type `GetStudyGroupsByOwnerVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetStudyGroupsByOwnerVariables {
  ownerId: UUIDString;
}
```
### Return Type
Recall that executing the `GetStudyGroupsByOwner` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetStudyGroupsByOwnerData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetStudyGroupsByOwnerData {
  studyGroups: ({
    id: UUIDString;
    name: string;
    description?: string | null;
  } & StudyGroup_Key)[];
}
```
### Using `GetStudyGroupsByOwner`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getStudyGroupsByOwner, GetStudyGroupsByOwnerVariables } from '@dataconnect/generated';

// The `GetStudyGroupsByOwner` query requires an argument of type `GetStudyGroupsByOwnerVariables`:
const getStudyGroupsByOwnerVars: GetStudyGroupsByOwnerVariables = {
  ownerId: ..., 
};

// Call the `getStudyGroupsByOwner()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getStudyGroupsByOwner(getStudyGroupsByOwnerVars);
// Variables can be defined inline as well.
const { data } = await getStudyGroupsByOwner({ ownerId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getStudyGroupsByOwner(dataConnect, getStudyGroupsByOwnerVars);

console.log(data.studyGroups);

// Or, you can use the `Promise` API.
getStudyGroupsByOwner(getStudyGroupsByOwnerVars).then((response) => {
  const data = response.data;
  console.log(data.studyGroups);
});
```

### Using `GetStudyGroupsByOwner`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getStudyGroupsByOwnerRef, GetStudyGroupsByOwnerVariables } from '@dataconnect/generated';

// The `GetStudyGroupsByOwner` query requires an argument of type `GetStudyGroupsByOwnerVariables`:
const getStudyGroupsByOwnerVars: GetStudyGroupsByOwnerVariables = {
  ownerId: ..., 
};

// Call the `getStudyGroupsByOwnerRef()` function to get a reference to the query.
const ref = getStudyGroupsByOwnerRef(getStudyGroupsByOwnerVars);
// Variables can be defined inline as well.
const ref = getStudyGroupsByOwnerRef({ ownerId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getStudyGroupsByOwnerRef(dataConnect, getStudyGroupsByOwnerVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.studyGroups);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.studyGroups);
});
```

## GetPostsByStudent
You can execute the `GetPostsByStudent` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getPostsByStudent(vars: GetPostsByStudentVariables): QueryPromise<GetPostsByStudentData, GetPostsByStudentVariables>;

interface GetPostsByStudentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPostsByStudentVariables): QueryRef<GetPostsByStudentData, GetPostsByStudentVariables>;
}
export const getPostsByStudentRef: GetPostsByStudentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPostsByStudent(dc: DataConnect, vars: GetPostsByStudentVariables): QueryPromise<GetPostsByStudentData, GetPostsByStudentVariables>;

interface GetPostsByStudentRef {
  ...
  (dc: DataConnect, vars: GetPostsByStudentVariables): QueryRef<GetPostsByStudentData, GetPostsByStudentVariables>;
}
export const getPostsByStudentRef: GetPostsByStudentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPostsByStudentRef:
```typescript
const name = getPostsByStudentRef.operationName;
console.log(name);
```

### Variables
The `GetPostsByStudent` query requires an argument of type `GetPostsByStudentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetPostsByStudentVariables {
  studentId: UUIDString;
}
```
### Return Type
Recall that executing the `GetPostsByStudent` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPostsByStudentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetPostsByStudentData {
  posts: ({
    id: UUIDString;
    title?: string | null;
    content: string;
    createdAt: TimestampString;
  } & Post_Key)[];
}
```
### Using `GetPostsByStudent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPostsByStudent, GetPostsByStudentVariables } from '@dataconnect/generated';

// The `GetPostsByStudent` query requires an argument of type `GetPostsByStudentVariables`:
const getPostsByStudentVars: GetPostsByStudentVariables = {
  studentId: ..., 
};

// Call the `getPostsByStudent()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPostsByStudent(getPostsByStudentVars);
// Variables can be defined inline as well.
const { data } = await getPostsByStudent({ studentId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPostsByStudent(dataConnect, getPostsByStudentVars);

console.log(data.posts);

// Or, you can use the `Promise` API.
getPostsByStudent(getPostsByStudentVars).then((response) => {
  const data = response.data;
  console.log(data.posts);
});
```

### Using `GetPostsByStudent`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPostsByStudentRef, GetPostsByStudentVariables } from '@dataconnect/generated';

// The `GetPostsByStudent` query requires an argument of type `GetPostsByStudentVariables`:
const getPostsByStudentVars: GetPostsByStudentVariables = {
  studentId: ..., 
};

// Call the `getPostsByStudentRef()` function to get a reference to the query.
const ref = getPostsByStudentRef(getPostsByStudentVars);
// Variables can be defined inline as well.
const ref = getPostsByStudentRef({ studentId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPostsByStudentRef(dataConnect, getPostsByStudentVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.posts);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.posts);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateStudyGroup
You can execute the `CreateStudyGroup` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createStudyGroup(vars: CreateStudyGroupVariables): MutationPromise<CreateStudyGroupData, CreateStudyGroupVariables>;

interface CreateStudyGroupRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateStudyGroupVariables): MutationRef<CreateStudyGroupData, CreateStudyGroupVariables>;
}
export const createStudyGroupRef: CreateStudyGroupRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createStudyGroup(dc: DataConnect, vars: CreateStudyGroupVariables): MutationPromise<CreateStudyGroupData, CreateStudyGroupVariables>;

interface CreateStudyGroupRef {
  ...
  (dc: DataConnect, vars: CreateStudyGroupVariables): MutationRef<CreateStudyGroupData, CreateStudyGroupVariables>;
}
export const createStudyGroupRef: CreateStudyGroupRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createStudyGroupRef:
```typescript
const name = createStudyGroupRef.operationName;
console.log(name);
```

### Variables
The `CreateStudyGroup` mutation requires an argument of type `CreateStudyGroupVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateStudyGroupVariables {
  name: string;
  ownerId: UUIDString;
  description: string;
}
```
### Return Type
Recall that executing the `CreateStudyGroup` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateStudyGroupData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateStudyGroupData {
  studyGroup_insert: StudyGroup_Key;
}
```
### Using `CreateStudyGroup`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createStudyGroup, CreateStudyGroupVariables } from '@dataconnect/generated';

// The `CreateStudyGroup` mutation requires an argument of type `CreateStudyGroupVariables`:
const createStudyGroupVars: CreateStudyGroupVariables = {
  name: ..., 
  ownerId: ..., 
  description: ..., 
};

// Call the `createStudyGroup()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createStudyGroup(createStudyGroupVars);
// Variables can be defined inline as well.
const { data } = await createStudyGroup({ name: ..., ownerId: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createStudyGroup(dataConnect, createStudyGroupVars);

console.log(data.studyGroup_insert);

// Or, you can use the `Promise` API.
createStudyGroup(createStudyGroupVars).then((response) => {
  const data = response.data;
  console.log(data.studyGroup_insert);
});
```

### Using `CreateStudyGroup`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createStudyGroupRef, CreateStudyGroupVariables } from '@dataconnect/generated';

// The `CreateStudyGroup` mutation requires an argument of type `CreateStudyGroupVariables`:
const createStudyGroupVars: CreateStudyGroupVariables = {
  name: ..., 
  ownerId: ..., 
  description: ..., 
};

// Call the `createStudyGroupRef()` function to get a reference to the mutation.
const ref = createStudyGroupRef(createStudyGroupVars);
// Variables can be defined inline as well.
const ref = createStudyGroupRef({ name: ..., ownerId: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createStudyGroupRef(dataConnect, createStudyGroupVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.studyGroup_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.studyGroup_insert);
});
```

## CreatePost
You can execute the `CreatePost` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createPost(vars: CreatePostVariables): MutationPromise<CreatePostData, CreatePostVariables>;

interface CreatePostRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePostVariables): MutationRef<CreatePostData, CreatePostVariables>;
}
export const createPostRef: CreatePostRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createPost(dc: DataConnect, vars: CreatePostVariables): MutationPromise<CreatePostData, CreatePostVariables>;

interface CreatePostRef {
  ...
  (dc: DataConnect, vars: CreatePostVariables): MutationRef<CreatePostData, CreatePostVariables>;
}
export const createPostRef: CreatePostRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createPostRef:
```typescript
const name = createPostRef.operationName;
console.log(name);
```

### Variables
The `CreatePost` mutation requires an argument of type `CreatePostVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreatePostVariables {
  studentId: UUIDString;
  content: string;
  title: string;
}
```
### Return Type
Recall that executing the `CreatePost` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreatePostData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreatePostData {
  post_insert: Post_Key;
}
```
### Using `CreatePost`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createPost, CreatePostVariables } from '@dataconnect/generated';

// The `CreatePost` mutation requires an argument of type `CreatePostVariables`:
const createPostVars: CreatePostVariables = {
  studentId: ..., 
  content: ..., 
  title: ..., 
};

// Call the `createPost()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createPost(createPostVars);
// Variables can be defined inline as well.
const { data } = await createPost({ studentId: ..., content: ..., title: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createPost(dataConnect, createPostVars);

console.log(data.post_insert);

// Or, you can use the `Promise` API.
createPost(createPostVars).then((response) => {
  const data = response.data;
  console.log(data.post_insert);
});
```

### Using `CreatePost`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createPostRef, CreatePostVariables } from '@dataconnect/generated';

// The `CreatePost` mutation requires an argument of type `CreatePostVariables`:
const createPostVars: CreatePostVariables = {
  studentId: ..., 
  content: ..., 
  title: ..., 
};

// Call the `createPostRef()` function to get a reference to the mutation.
const ref = createPostRef(createPostVars);
// Variables can be defined inline as well.
const ref = createPostRef({ studentId: ..., content: ..., title: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createPostRef(dataConnect, createPostVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.post_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.post_insert);
});
```

