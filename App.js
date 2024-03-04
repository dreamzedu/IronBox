
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { GluestackUIProvider, config } from "@gluestack-ui/themed";
import HomeScreen from './Screens/HomeScreen';
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import MainNavigator from "./Navigator/MainNavigator"
import Header from "./Shared/Header"

// Redux
import { Provider } from "react-redux";
import store from "./Redux/store";

// Context API
import Auth from "./Context/store/Auth";
//import BottomTabNavigator from './Navigator/BottomTabNavigator';

export default function App() {
    return (
        <Auth>
            <Provider store={store}>
                <GluestackUIProvider config={config.theme}>
                    <NavigationContainer>
                        
                        <MainNavigator />
                        <Toast ref={(ref) => Toast.setRef(ref)} />
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
