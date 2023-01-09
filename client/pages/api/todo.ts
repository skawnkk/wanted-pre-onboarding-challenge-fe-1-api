import axios, { AxiosError } from 'axios';
import { config } from '../../config';
import { ErrorMessage } from './auth';

export interface todo {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

async function getTodos() {
  try {
    const token = localStorage.getItem('token');
    if (!token) return [];
    const { data } = await axios.get(config.server + '/todos', {
      headers: { Authorization: token },
    });
    return data.data;
  } catch (e) {
    const { response } = e as unknown as AxiosError;
    const { details = 'error' } = response?.data as ErrorMessage;
    throw details;
  }
}
export const todoInitialValue = {
  title: '',
  content: '',
  id: '',
  createdAt: '',
  updatedAt: '',
};

async function getTodoById(id: string) {
  try {
    const token = localStorage.getItem('token');
    if (!token) return todoInitialValue;
    const { data } = await axios.get(config.server + `/todos/${id}`, {
      headers: { Authorization: token },
    });
    return data.data;
  } catch (e) {
    const { response } = e as unknown as AxiosError;
    const { details = 'error' } = response?.data as ErrorMessage;
    throw details;
  }
}

export interface CreateTodo {
  title: string;
  content: string;
}
async function createTodo({ title, content }: CreateTodo) {
  try {
    const token = localStorage.getItem('token');
    if (!token) return;

    const result = await axios.post(config.server + '/todos', { title, content }, { headers: { Authorization: token } });
    return result.data;
  } catch (e) {
    const { response } = e as unknown as AxiosError;
    const { details = 'error' } = response?.data as ErrorMessage;
    throw details;
  }
}

interface UpdateTodo {
  id: string;
  title: string;
  content: string;
}

async function updateTodo({ id, title, content }: UpdateTodo) {
  try {
    const token = localStorage.getItem('token');
    if (!token) return;

    const result = await axios.put(config.server + `/todos/${id}`, { title, content }, { headers: { Authorization: token } });
    return result.data;
  } catch (e) {
    const { response } = e as unknown as AxiosError;
    const { details = 'error' } = response?.data as ErrorMessage;
    throw details;
  }
}

async function deleteTodo(id: string) {
  try {
    const token = localStorage.getItem('token');
    if (!token) return;

    const result = await axios.delete(config.server + `/todos/${id}`, { headers: { Authorization: token } });
    return result.data;
  } catch (e) {
    const { response } = e as unknown as AxiosError;
    const { details = 'error' } = response?.data as ErrorMessage;
    throw details;
  }
}
export default {
  getTodos,
  createTodo,
  getTodoById,
  deleteTodo,
  updateTodo,
};
