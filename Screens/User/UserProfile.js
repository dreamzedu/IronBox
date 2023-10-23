import React, { useContext, useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';
import { useFocusEffect } from "@react-navigation/native"
import OrderCard from "../../Shared/OrderCard"
import { getUserOrders } from '../../Services/data-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthGlobal from "../../Context/store/AuthGlobal"
import { logoutUser } from "../../Context/actions/Auth.actions"
import { Heading, Spinner } from "@gluestack-ui/themed";
import AddressCard from '../../Shared/AddressCard';


const UserProfile = (props) => {
    const context = useContext(AuthGlobal)
    const [userProfile, setUserProfile] = useState()
    const [loading, setLoading] = useState(true)
    const [orders, setOrders] = useState()
    const [error, setError] = useState(false)
    const pageSize = 2;
    const pageIndex = 1;

  
    useFocusEffect(useCallback(() => {

        if (!context.stateUser || context.stateUser.isAuthenticated === null || context.stateUser.isAuthenticated === false) {
            //props.navigation.navigate("LoginNavigator")
            props.navigation.navigate("LoginNavigator", { screen: "Login", params: { returnPage: 'User Profile', msg: "you must login for this" } });
        }
        else {
            const fetchOrders = async () => {
                try {
                    getUserOrders(context.stateUser.user.userId, pageIndex, pageSize)
                        .then((orders) => {
                            setOrders(orders);
                            setError(false);
                            setLoading(false);
                        })
                        .catch((error) => {
                            console.log(error);
                            setError(true);
                            setLoading(false);

                        });
                    //setOrders(res);
                } catch (e) {
                    console.log(e)
                }
            };

            setLoading(true);
            setUserProfile(context.stateUser.userProfile)
            if (!orders)
                fetchOrders();
        }

        return () => {
            setUserProfile();
            setOrders();
            setLoading(true);
            setError(false);
        }

    }, [context.stateUser.isAuthenticated, context.stateUser.userProfile]));

    return (loading ? <Spinner size='small'></Spinner>
        :
       <View style={styles.container}>
           <ScrollView contentContainerStyle={styles.subContainer}>
               <Text style={{ fontSize: 30 }}>
                   {userProfile ? userProfile.name : "" }
               </Text>
               <View style={{ marginTop: 20 }}>
                    <Text style={{ margin: 10 }}>
                        Email: {userProfile ? userProfile.email : "N/A"}
                    </Text>
                    <Text style={{ margin: 10 }}>
                        Phone: {userProfile ? userProfile.phone : "N/A"}
                    </Text>
               </View>
               <View style={{ margin: 10 }}>
                    <Button title={"Edit Profile"} onPress={() => props.navigation.navigate("Edit Profile") }/>
                </View>
                <View>
                    <Heading>
                        Adress
                    </Heading>
                    {userProfile.address ?
                        <>
                        <AddressCard address={userProfile.address} />
                        
                    <View style={{ margin: 10 }}>
                        <Button title={"Edit Address"} onPress={() => props.navigation.navigate("AddressEditor", {address : userProfile.address , mode:'edit'})} />
                    </View>
                            </>
                        :
                        <>
                        <Text>N/A</Text>
                        <View style={{ margin: 10 }}>
                                <Button title={"Add Address"} onPress={() => props.navigation.navigate("AddressEditor", {address : userProfile.address, mode: 'add' })} />
                        </View>
                        </>
                    }
                </View>
                <View style={styles.order}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignContent: 'stretch' }}>
                        <Text style={{ fontSize: 20 }}>Recent Orders</Text>
                        <Button title="View All" onPress={() => props.navigation.navigate("MyOrders")} ></Button>
                    </View>
                    <View>
                        {orders ? (
                            orders.map((x) => {
                                return <View key={x.id}>
                                    <OrderCard order={x} navigation={props.navigation} />                                  
                                </View>
                            })
                        ) : (
                            error ? <Text style={styles.error}>Something went wrong.</Text>
                                :
                                <View style={styles.order}>
                                    <Text>You have no orders</Text>

                                    <Button title="Place your first order" onPress={() => props.navigation.navigate("Products")} />
                                </View>
                        )}
                    </View>
               </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    subContainer: {
        alignItems: "center",
        marginTop: 60
    },
    order: {
        marginTop: 20,
        alignItems: "center",
        marginBottom: 60
    }
})

export default UserProfile;