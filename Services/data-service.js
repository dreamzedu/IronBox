
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


export const getUserOrders = async (userId) => {
    try {
        let token = await AsyncStorage.getItem("jwt");

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        let result = await axios
            .get(`${baseURL}orders/user/${userId}`, config);
        return result.data;
       
    }
    catch (error) { console.log(error); return null; }
}

export const updateOrderStatus = async (orderId, newStatus) => {
    try {
        let token = await AsyncStorage.getItem("jwt");

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        let result = await axios
            .put(`${baseURL}orders/status/${orderId}`, { status: newStatus }, config);
        return result.data;

    }
    catch (error) { console.log(error); return null; }
   
};

export const getOrderDetail = async (orderId) => {
    try {
        let token = await AsyncStorage.getItem("jwt");

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        let result = await axios
            .get(`${baseURL}orders/${orderId}`, config);
        return result.data;

    }
    catch (error) { console.log(error); return null; }
}

export const cancelUserOrder = async (orderId, message) => {
    try {
        let token = await AsyncStorage.getItem("jwt");

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };
        let url = `${baseURL}orders/cancel/${orderId}`;
        console.log(url);
        let result = await axios
            .put(url, { cancelReason: message }, config);
        return result.data;

    }
    catch (error) { console.log(error); throw error; }

};


export const getOrderStatuses = async () => {
    try {
        let orderStatuses = await AsyncStorage.getItem("orderstatuses");
        if (orderStatuses) return JSON.parse(orderStatuses);

        let token = await AsyncStorage.getItem("jwt");

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        let result = await axios
            .get(`${baseURL}orderstatuses`, config);
        await AsyncStorage.setItem("orderstatuses", JSON.stringify(result.data));
        return result.data;

    }
    catch (error) { console.log(error); return null; }
}

export const saveUserOrder = async (order) => {
    try {
        let token = await AsyncStorage.getItem("jwt");

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };
        let result = await axios
            .post(`${baseURL}orders`, order, config);
        return result;
        //.then((address) => { return address; }).catch((error) => { console.log(error); return null; })
    }
    catch (error) { console.log(error); return null; }
}

export const updateUserProfile = async (userId, userProfile) => {
    try {
        let token = await AsyncStorage.getItem("jwt");

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        let result = await axios
            .put(`${baseURL}users/${userId}`, userProfile, config);
        return result.data;

    }
    catch (error) { console.log(error); return null; }

};
