import React, { useState } from 'react';
import {
    SafeAreaView,
    Text,
    TextInput,
    Button,
    View,
    Alert,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { useLoginAttempts } from '../hooks/useLoginAttempts.tsx';
import { login } from '../services/loginService.tsx';

interface LoginProps {
    navigation: {
        navigate: (screen: string) => void;
    };
}

const Login: React.FC<LoginProps> = ({ navigation }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { esperar, incrementAttempt } = useLoginAttempts();

    const handleLogin = async () => {
        try {
            const response = await login(username, password);
            const data = await response.json();
            if (response.ok) {
                navigation.navigate('Home');
            } else {
                Alert.alert('Error', data.message);
                incrementAttempt();
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
            incrementAttempt();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Button
                    title="Login"
                    onPress={handleLogin}
                    disabled={!username || !password || esperar}
                />
                {esperar && (
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#0000ff" />
                        <Text style={styles.loadingText}>Esperando...</Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        color: 'black',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    innerContainer: {
        color: 'black',
        width: '80%',
        maxWidth: 400,
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        elevation: 4,
    },
    title: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        color: 'black',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
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
});

export default Login;
