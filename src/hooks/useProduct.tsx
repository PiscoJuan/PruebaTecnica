import { useEffect, useState } from 'react';
import { getProducto } from '../services/productoService';
import {Product, UseProductResponse} from "../interfaces/interface.tsx";


interface UseProductProps {
    id: number;
}

export const useProduct = ({ id }: UseProductProps): UseProductResponse => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | undefined>(undefined);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProducto(id);
                setProduct(data);
            } catch (error) {
                console.error('Error obteniendo producto:', error);
                if (error instanceof Error) {
                    setError(error);
                } else {
                    setError(new Error('Error desconocido'));
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    return { product, loading, error };
};