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

    useFocusEffect(useCallback(() => {

        if (!context.stateUser || context.stateUser.isAuthenticated === null || context.stateUser.isAuthenticated === false) {
            props.navigation.navigate("Login")
        }
        else {
            const fetchOrders = async () => {
                try {
                    getUserOrders(context.stateUser.user.userId)
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
            fetchOrders();
        }

        return () => {
            setUserProfile();
            setOrders();
            setLoading(true);
            setError(false);
        }

    }, [context.stateUser.isAuthenticated]));

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
               <View style={{ marginTop: 80 }}>
                    <Button title={"Sign Out"} onPress={() => [
                        AsyncStorage.removeItem("jwt"),
                        logoutUser(context.dispatch)
                    ]}/>
                </View>
                <View>
                    <Heading>
                        Adress
                    </Heading>
                    <AddressCard address={userProfile.address}/>
                </View>
               <View style={styles.order}>
                   <Text style={{ fontSize: 20 }}>My Orders</Text>
                    <View>
                        {orders ? (
                            orders.map((x) => {
                                return <View key={x.id}>
                                    <OrderCard order={x} navigation={props.navigation} />
                                    {x.status.name !== "Cancelled" ?
                                        <Button title="Cancel Order" onPress={() => props.navigation.navigate("Cancel Order", { orderData: x })} ></Button>
                                        : null}
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