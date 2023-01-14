import {api} from "./index";

export interface todo {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export const todoInitialValue = {
  title: '',
  content: '',
  id: '',
  createdAt: '',
  updatedAt: '',
};


async function getTodos() {
  const {data} = await api.get('/todos');
  return data;
}

async function getTodoById(id: string) {
  const { data } = await api.get(`/todos/${id}`);
  return data;
}

export interface CreateTodo {
  title: string;
  content: string;
}

async function createTodo({ title, content }: CreateTodo) {
  const {data} = await api.post('/todos', { title, content });
  return data;
}

interface UpdateTodo {
  id: string;
  title: string;
  content: string;
}

async function updateTodo({ id, title, content }: UpdateTodo) {
  const {data} = await api.put(`/todos/${id}`, { title, content });
  return data
}

async function deleteTodo(id: string) {
  const {data} = await api.delete(`/todos/${id}`);
  return data
}

export default {
  getTodos,
  createTodo,
  getTodoById,
  deleteTodo,
  updateTodo,
};
