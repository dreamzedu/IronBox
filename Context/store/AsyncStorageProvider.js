import { AsyncStorage } from 'react-native';

const AsyncStorageProvider = () => {

    const setData = async (key, value) => {
        try {
            await AsyncStorage.setItem(
                key,
                value,
            );
        } catch (error) {
            console.log('error in storing data into async storage: ' + error);
        }
    };

    const getData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                return value;
            }
        } catch (error) {
            console.log('error in retrieving data from async storage: ' + error);
        }
    };

    const removeData = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.log('error in storing data into async storage: ' + error);
        }
    };
}

export default AsyncStorageProvider;