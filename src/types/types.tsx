import { FormEvent } from "react";

export interface Todo {
  id: string;
  name: string;
  editingState?: boolean;
  isDone: boolean;
}

export interface InitialDnDState {
  draggedFrom: number | null;
  draggedTo: number | null;
  isDragging: boolean;
  originalOrder: Todo[];
  updatedOrder: Todo[];
}

export type InputValue = string;
export type AddTodoFunc = (e: FormEvent<HTMLFormElement>) => void;
export type RenameTodo = (id: Todo["id"], newName: Todo["name"]) => void;
export type DeleteTodo = (id: string) => void;
export type DoneTodo = (id: Todo["id"]) => void;
export type OnDragStart = (e: any) => void;
export type OnDragOver = (e: any) => void;
export type OnDrop = () => void;
export type OnDragLeave = () => void;

export interface TodoItemProps extends Todo {
  dataPosition: number;
  isDropArea: boolean;
  onDragStart: OnDragStart;
  onDragOver: OnDragOver;
  onDrop: OnDrop;
  onDragLeave: OnDragLeave;
}

export interface CheckboxProps {
  checked: boolean;
  disabled?: boolean;
  children?: string;
  onChange: () => void;
}

export interface DarkModeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}
