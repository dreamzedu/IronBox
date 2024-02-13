
import axios from "axios";
import baseURL from "../assets/common/baseUrl";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as offlineData from './offline-data-service';

const offline = false;

export const getUserAddress = (userId) =>
{
    if (offline) offlineData.offlinegetUserAddress(userId);

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
    if (offline) offlineData.offlinesaveUserAddress(address);
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

export const updateUserAddress = async (addressId, address) => {
    if (offline) offlineData.offlineupdateUserAddress(addressId, address)
    try {
        let token = await AsyncStorage.getItem("jwt");

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };
        let result = await axios
            .put(`${baseURL}addresses/${addressId}`, address, config);
        return result.data;
    }
    catch (error) { console.log(error); return null; }
}

export const getUserOrders = async (userId, pageIndex, pageSize) => {
    if (offline) { return await offlineData.offlineGetUserOrders(userId, pageIndex, pageSize); }
    try {
        let token = await AsyncStorage.getItem("jwt");

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        let result = await axios
            .get(`${baseURL}orders/user/${userId}/${pageIndex}/${pageSize}`, config);
        return result.data;
       
    }
    catch (error) { console.log(error); return null; }
}

export const getOrders = async (pageIndex, pageSize, statusFilter) => {
    if (offline) offlineData.offlinegetOrders(pageIndex, pageSize, statusFilter);
    try {
        let token = await AsyncStorage.getItem("jwt");

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        let result = await axios
            .get(`${baseURL}orders/all/${pageIndex}/${pageSize}/${statusFilter}`, config);
        return result.data;

    }
    catch (error) { console.log(error); return null; }
}

export const updateOrderStatus = async (orderId, newStatus) => {
    if (offline) offlineData.offlineupdateOrderStatus(orderId, newStatus);
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

export const updateUserOrderItems = async (orderId, items) => {
    if (offline) offlineData.offlineupdateUserOrderItems(orderId, items);
    try {
        let token = await AsyncStorage.getItem("jwt");

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        let result = await axios
            .put(`${baseURL}orders/items/${orderId}`, { items: items }, config);
        return result.data;

    }
    catch (error) { console.log(error); return null; }

};

export const updateOrderPickupSchedule = async (orderId, newSlot) => {
    if (offline) offlineData.offlineUpdatePickupSchedule(orderId, newSlot);
    try {
        let token = await AsyncStorage.getItem("jwt");

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        let result = await axios
            .put(`${baseURL}orders/pickupschedule/${orderId}`, { pickupSlot: newSlot }, config);
        return result.data;

    }
    catch (error) { console.log(error); return null; }

};

export const getOrderDetail = async (orderId) => {
    if (offline) offlineData.offlinegetOrderDetail(orderId);
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
    if (offline) offlineData.offlinecancelUserOrder(orderId, message);
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
    if (offline) offlineData.offlinegetOrderStatuses();
    try {
        var statusList = await AsyncStorage.getItem("orderstatuses");
        if (statusList) return JSON.parse(statusList);

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
    if (offline) offlineData.offlinesaveUserOrder(order);
    try {
        let token = await AsyncStorage.getItem("jwt");

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };
        let result = await axios
            .post(`${baseURL}orders`, order, config);
        return result.data;
        //.then((address) => { return address; }).catch((error) => { console.log(error); return null; })
    }
    catch (error) { console.log(error); return null; }
}

export const updateUserProfile = async (userId, userProfile) => {
    if (offline) offlineData.offlineupdateUserProfile(userId, userProfile);
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

export const getProducts = async () => {
    if (offline) { return offlineData.offlinegetProducts(); }
    try {
        var result = await axios.get(`${baseURL}products/available`)

        return result.data;

    }
    catch(error) {
        console.log("Api error: " + error);
    }
}

export const getServiceItems = async () => {
    try {
            let result = await axios.get(`${baseURL}service-items/available`)
            return result.data;
    }
    catch (error) {
        console.log("Api error: " + error);
    }
}

export const getServiceItemCategories = async () => {
    try {
        var result = await axios.get(`${baseURL}service-item-categories/available`)

        return result.data;

    }
    catch (error) {
        console.log("Api error: " + error);
    }
}

