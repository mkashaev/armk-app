import { API } from 'api/base';
import { IUser, ILoginDto } from './types';

export type { IUser, ILoginDto };

export const login = (body: ILoginDto): Promise<IUser> => API.post('/api/user/login', body);
