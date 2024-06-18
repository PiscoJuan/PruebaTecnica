import { URL } from "./config";
import {ListaResponse} from "../interfaces/interface.tsx";


export async function getLista(pagina: number): Promise<ListaResponse> {
    try {
        const response = await fetch(`${URL}products?limit=10&skip=${pagina}`);
        if (!response.ok) {
            throw new Error('Error al obtener la lista de productos');
        }
        return await response.json();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error en getLista: ${error.message}`);
        } else {
            throw new Error('Error en getLista: Error desconocido');
        }
    }
}
