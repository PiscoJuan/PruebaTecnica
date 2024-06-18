import 'react-native-gesture-handler';
import React from 'react'
import {View, StyleSheet} from "react-native";
import Login from './src/components/Login'
import ListaProductos from './src/components/ListaProductos'
import Producto from './src/components/Producto'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator} from "@react-navigation/native-stack"
import store from "./src/context/store.tsx"
import { Provider } from 'react-redux'
import { RootStackParamList } from './src/navigation/routes';

const Stack =  createNativeStackNavigator<RootStackParamList>()


const App = () => {
  return (
      <Provider store={store}>
          <NavigationContainer>
              <Stack.Navigator initialRouteName='Login'>
                  <Stack.Screen name='Home' component={ListaProductos}/>
                  <Stack.Screen name='Login' component={Login}/>
                  <Stack.Screen name='Producto' component={Producto}  />
              </Stack.Navigator>
          </NavigationContainer>
      </Provider>
  )
}

const styles = StyleSheet.create({
});

export default App