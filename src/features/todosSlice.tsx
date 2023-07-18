import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

import { getLocalStorage } from "../utils/localStorage";
import { Todo } from "../types/types";

export const counterSlice = createSlice({
  name: "todos",
  initialState: getLocalStorage<Todo[]>("todos", []),
  reducers: {
    todoAdded: {
      reducer: (todos, action: PayloadAction<Todo>) => {
        return [...todos, action.payload];
      },
      prepare: (name: string) => {
        return {
          payload: {
            id: nanoid(),
            name,
            editingState: false,
            isDone: false,
          },
        };
      },
    },
    todoDeleted: (todos, action: PayloadAction<Todo["id"]>) => {
      return todos.filter((todo) => todo.id !== action.payload);
    },
    todoRenamed: (
      todos,
      action: PayloadAction<{ id: Todo["id"]; name: Todo["name"] }>
    ) => {
      const { id, name } = action.payload;

      return todos.map((todo) => (todo.id === id ? { ...todo, name } : todo));
    },
    todoDone: (todos, action: PayloadAction<Todo["id"]>) => {
      const id = action.payload;

      return todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo?.isDone } : todo
      );
    },
    todoOrderUpdated: (todos, action: PayloadAction<Todo[]>) => {
      return action.payload;
    },
  },
});

export const { todoAdded, todoDeleted, todoRenamed, todoDone, todoOrderUpdated } =
  counterSlice.actions;

export default counterSlice.reducer;
