import { useState, useEffect } from 'react';
import { getLista } from '../services/listaService.tsx';
import {ListaResponse, Product} from "../interfaces/interface.tsx";


export const useProducts = (pagina: number) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const data: ListaResponse = await getLista(pagina);
                setProducts(data.products);
            } catch (error) {
                console.error('Error consiguiendo productos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [pagina]);

    return { products, loading };
};
