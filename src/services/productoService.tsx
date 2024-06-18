import { URL } from './config';
import {Product} from "../interfaces/interface.tsx";


export async function getProducto(id: number): Promise<Product> {
    try {
        const response = await fetch(URL + 'products/' + id);
        if (!response.ok) {
            throw new Error('Error al obtener el producto');
        }
        const data = await response.json();
        return data as Product;
    } catch (error) {
        throw new Error('Error en getProducto: ' + (error as Error).message);
    }
}
