
import axios from "axios";
import baseURL from "../assets/common/baseUrl";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const getUserAddress = (userId) =>
    {
        AsyncStorage.getItem("jwt")
            .then((res) => {
                axios
                    .get(`${baseURL}primary/user/${userId}`, {
                        headers: { Authorization: `Bearer ${res}` },
                    })
                    .then((address) => { return address; }).catch((error) => { console.log(error); return null; })
            })
            .catch((error) => { console.log(error); return null;})
    }


export const saveUserAddress = async (address) => {
    try {
        let token = await AsyncStorage.getItem("jwt");
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };
        let result = await axios
            .post(`${baseURL}addresses`, address, config);
        return result.data;
                //.then((address) => { return address; }).catch((error) => { console.log(error); return null; })
    }
    catch (error) { console.log(error); return null; }
}
