import React from 'react';
import {
    SafeAreaView,
    Text,
    View,
    ActivityIndicator,
    Image,
    FlatList,
    StyleSheet,
} from 'react-native';
import { useProduct } from '../hooks/useProduct';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/routes';

type ProductoScreenRouteProp = RouteProp<RootStackParamList, 'Producto'>;

interface ProductoProps {
    route: ProductoScreenRouteProp;
}

const Producto: React.FC<ProductoProps> = ({ route }) => {
    const { id } = route.params;
    const { product, loading } = useProduct({ id });

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
            </View>
        );
    }

    if (!product) {
        return (
            <View style={styles.container}>
                <Text>Error: Producto no encontrado</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.container}>
                <Image style={styles.image} source={{ uri: product.thumbnail }} />
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.detail}>Marca: {product.brand}</Text>
                <Text style={styles.detail}>Precio: ${product.price}</Text>
                <Text style={styles.detail}>SKU: {product.sku}</Text>
                <Text style={styles.sectionTitle}>Comentarios:</Text>
                <FlatList
                    data={product.reviews}
                    renderItem={({ item }) => (
                        <View style={styles.review}>
                            <Text style={styles.reviewText}>{item.comment}</Text>
                            <Text style={styles.reviewRating}>Rating: {item.rating}</Text>
                            <Text style={styles.reviewDate}>Date: {new Date(item.date).toLocaleDateString()}</Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        color: 'black',
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    image: {
        color: 'black',
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginBottom: 16,
    },
    title: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    detail: {
        color: 'black',
        fontSize: 18,
        marginVertical: 4,
    },
    sectionTitle: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    review: {
        color: 'black',
        backgroundColor: '#f9f9f9',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    reviewText: {
        color: 'black',
        fontSize: 16,
        marginBottom: 8,
    },
    reviewRating: {
        fontSize: 14,
        color: '#333',
    },
    reviewDate: {
        fontSize: 12,
        color: '#666',
    },
    wrapper: {
        flex: 1,
    },
});

export default Producto;
