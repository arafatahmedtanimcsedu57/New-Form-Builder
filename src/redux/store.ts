import { configureStore } from '@reduxjs/toolkit';
import formBuilderReducer from './reducers/formBuilder.reducer';

export const store = configureStore({
	reducer: {
		entities: formBuilderReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
