// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios, { AxiosError, AxiosResponse } from 'axios';
import { config } from '../../config';

interface AuthInput {
  email: string;
  password: string;
}
export type ErrorMessage = { details: string };

async function login({ email, password }: AuthInput, onSuccess: (res: AxiosResponse) => void): Promise<any> {
  try {
    const result = await axios.post(config.server + '/users/login', { email, password });
    onSuccess(result);
  } catch (e) {
    const { response } = e as unknown as AxiosError;
    const { details = 'error' } = response?.data as ErrorMessage;
    throw details;
  }
}

async function signup({ email, password }: AuthInput, onSuccess: (res: AxiosResponse) => void): Promise<any> {
  try {
    const result = await axios.post(config.server + '/users/create', { email, password });
    onSuccess(result);
  } catch (e) {
    const { response } = e as unknown as AxiosError;
    const { details = 'error' } = response?.data as ErrorMessage;
    throw details;
  }
}

export default { login, signup };
