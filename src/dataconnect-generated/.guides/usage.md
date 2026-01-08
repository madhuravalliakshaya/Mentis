# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useCreateStudyGroup, useGetStudyGroupsByOwner, useCreatePost, useGetPostsByStudent } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useCreateStudyGroup(createStudyGroupVars);

const { data, isPending, isSuccess, isError, error } = useGetStudyGroupsByOwner(getStudyGroupsByOwnerVars);

const { data, isPending, isSuccess, isError, error } = useCreatePost(createPostVars);

const { data, isPending, isSuccess, isError, error } = useGetPostsByStudent(getPostsByStudentVars);

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createStudyGroup, getStudyGroupsByOwner, createPost, getPostsByStudent } from '@dataconnect/generated';


// Operation CreateStudyGroup:  For variables, look at type CreateStudyGroupVars in ../index.d.ts
const { data } = await CreateStudyGroup(dataConnect, createStudyGroupVars);

// Operation GetStudyGroupsByOwner:  For variables, look at type GetStudyGroupsByOwnerVars in ../index.d.ts
const { data } = await GetStudyGroupsByOwner(dataConnect, getStudyGroupsByOwnerVars);

// Operation CreatePost:  For variables, look at type CreatePostVars in ../index.d.ts
const { data } = await CreatePost(dataConnect, createPostVars);

// Operation GetPostsByStudent:  For variables, look at type GetPostsByStudentVars in ../index.d.ts
const { data } = await GetPostsByStudent(dataConnect, getPostsByStudentVars);


```