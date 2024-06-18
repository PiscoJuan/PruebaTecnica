import { URL } from './config';
import {LoginResponse} from "../interfaces/interface.tsx";


export async function login(username: string, password: string): Promise<LoginResponse> {
    try {
        const response = await fetch(URL + 'auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        return response;
    } catch (error) {
        throw new Error('Error en login');
    }
}
