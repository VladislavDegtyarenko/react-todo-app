import { configureStore } from "@reduxjs/toolkit";

// Reducers
import darkThemeReducer from "./../features/darkThemeSlice";
import todosReducer from "./../features/todosSlice";

import { setLocalStorage } from "../utils/localStorage";

export const store = configureStore({
  reducer: {
    darkTheme: darkThemeReducer,
    todos: todosReducer,
  },
});

store.subscribe(() => {
  setLocalStorage("todos", store.getState().todos);
  setLocalStorage("darkTheme", store.getState().darkTheme);
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
