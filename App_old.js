
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider, Box } from "native-base";
import ProductContainer from './Screens/Products/ProductContainer';
import { NavigationContainer } from "@react-navigation/native";
import HomeNavigator from './Navigator/HomeNavigator';

// Redux
import { Provider } from "react-redux";
import store from "./Redux/store";

// Context API
import Auth from "./Context/store/Auth";

export default function App_old() {
    return (
        <Auth>
            <Provider store={store}>
                <NativeBaseProvider>
                    <NavigationContainer>
               
                            <HomeNavigator />
               
                    </ NavigationContainer>
                </NativeBaseProvider>
            </Provider>
        </Auth>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
