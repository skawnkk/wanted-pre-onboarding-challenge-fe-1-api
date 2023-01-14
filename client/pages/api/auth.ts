// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios, {AxiosResponse, isAxiosError} from 'axios';
import { config } from '../../config';

interface AuthInput {
  email: string;
  password: string;
}

async function login({ email, password }: AuthInput, onSuccess: (res: AxiosResponse) => void, onError: (errorInfo: string) => void): Promise<any> {
  try {
    const result = await axios.post(config.server + '/users/login', { email, password });
    onSuccess(result);
  } catch (e) {
    if (isAxiosError(e)) {
      onError(e.response?.data.details || 'server_error');
    }
  }
}

async function signup({ email, password }: AuthInput, onSuccess: (res: AxiosResponse) => void, onError: (errorInfo: string) => void): Promise<any> {
  try {
    const result = await axios.post(config.server + '/users/create', { email, password });
    onSuccess(result);
  } catch (e) {
    if (isAxiosError(e)) {
      onError(e.response?.data.details || 'server_error');
    }
  }
}

export default { login, signup };
