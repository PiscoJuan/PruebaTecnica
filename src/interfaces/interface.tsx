export interface Review {
    comment: string;
    rating: number;
    date: string;
}

export interface Product {
    id: number;
    title: string;
    brand: string;
    price: number;
    sku: string;
    thumbnail: string;
    reviews: Review[];
}

export interface LoginResponse {
    ok: boolean;
    status: number;
    json: () => Promise<any>;
}

export interface UseProductResponse {
    product: Product | null;
    loading: boolean;
    error?: Error;
}

export interface ListaResponse {
    products: Product[],
}