import React from 'react';
import {
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Button,
    ActivityIndicator
} from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { nextpag, prevpag } from '../context/actions/paginacionAction';
import { useProducts } from '../hooks/useProducts.tsx';

const mapState = (state: any) => ({
    pagina: state.paginacion.pagina,
});

const mapDispatch = {
    nextpag,
    prevpag,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
    navigation: {
        navigate: (screen: string, params?: any) => void;
    };
};

const ListaProductos: React.FC<Props> = ({ navigation, pagina, nextpag, prevpag }) => {
    const { products, loading } = useProducts(pagina);

    const handleNextPage = () => {
        nextpag();
    };

    const handlePrevPage = () => {
        prevpag();
    };

    const renderLista = ({ item }: { item: any }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Producto', { id: item.id })}>
            <View style={styles.card}>
                <Text style={styles.cardtitle}>{item.title}</Text>
                <Text style={styles.cardtext}>ID: {item.id}</Text>
                <Text style={styles.cardtext}>Marca: {item.brand}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.container}>
                {loading ? (
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#0000ff" />
                        <Text style={styles.loadingText}>Cargando...</Text>
                    </View>
                ) : (
                    <FlatList
                        data={products}
                        renderItem={renderLista}
                        keyExtractor={(item) => item.id.toString()}
                    />
                )}
                <View style={styles.buttonContainer}>
                    {pagina > 0 && (
                        <Button
                            title="Anterior"
                            onPress={handlePrevPage}
                            disabled={loading}
                        />
                    )}
                    <View style={styles.flexSpacer} />
                    <Button
                        title="Siguiente"
                        onPress={handleNextPage}
                        disabled={loading}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    container: {
        color: 'black',
        flex: 1,
        padding: 16,
    },
    card: {
        color: 'black',
        backgroundColor: '#fff',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    cardtitle: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    cardtext: {
        fontSize: 14,
        color: '#666',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingHorizontal: 16,
    },
    loading: {
        color: 'black',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    loadingText: {
        color: 'black',
        marginLeft: 10,
        fontSize: 16,
    },
    flexSpacer: {
        flex: 1,
    },
});

export default connector(ListaProductos);
