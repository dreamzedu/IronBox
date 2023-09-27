
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { GluestackUIProvider, config } from "@gluestack-ui/themed";
import ProductContainer from './Screens/Products/ProductContainer';
import { NavigationContainer } from "@react-navigation/native";
import HomeNavigator from './Navigator/HomeNavigator';

// Redux
import { Provider } from "react-redux";
import store from "./Redux/store";

// Context API
import Auth from "./Context/store/Auth";
import Main from './Navigator/Main';

export default function App() {
    return (
        <Auth>
            <Provider store={store}>
                <GluestackUIProvider config={config.theme}>
                    <NavigationContainer>

                        <Main />
               
                    </ NavigationContainer>
                </GluestackUIProvider>
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
