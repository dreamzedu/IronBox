// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import AuthGlobal from "../Context/store/AuthGlobal";

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
    const context = useContext(AuthGlobal);

    useEffect(() => {
        setTimeout(() => {
            setAnimating(true);
            //Check if user_id is set or not
            //If not then send for Authentication
            //else send to Home Screen
           
                //let value = AsyncStorage.getItem('user_id');
            //navigation.replace('DrawerNavigator');
            navigation.replace('BottomTabNavigator');
            
            }, 12000);
        }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/ironbox-blue.gif')}
        style={{width: '80%', resizeMode: 'contain', margin: 30}}
          />
          <ActivityIndicator
              animating={animating}
              color="#FFFFFF"
              size="large"
              style={styles.activityIndicator}
          />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
