import React, { useContext, useState, useCallback } from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';
import { useFocusEffect } from "@react-navigation/native"
import OrderCard from "../../Shared/OrderCard";
import { getUserOrders } from '../../Services/data-service';
import AuthGlobal from "../../Context/store/AuthGlobal"
import { Heading, Spinner } from "@gluestack-ui/themed";

const MyOrders = (props) => {
    const context = useContext(AuthGlobal)
    const [orders, setOrders] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(true)

    useFocusEffect(
        useCallback(() => {
            if (
                context?.stateUser?.isAuthenticated === false ||
                context?.stateUser?.isAuthenticated === null
            ) {
                props.navigation.navigate("Login")
            }

            const fetchOrders = async () => {
                try {
                    getUserOrders(context?.stateUser?.user?.userId)
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
            fetchOrders();
            
            return () => {
                setOrders();
            }

        }, [context.stateUser.isAuthenticated]))


    return (loading ? <Spinner size='small'></Spinner>
        :
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.subContainer}>                
                <View style={styles.order}>
                    <Text style={{ fontSize: 20 }}>My Orders</Text>
                    <View>
                        {orders ? (
                            orders.map((x) => {
                                return <View key={x.id}>
                                    <OrderCard order={x} navigation={props.navigation} />                                   
                                </View>
                            })
                        ) : (
                                error ? <Text style={styles.error }>Something went wrong.</Text>
                                    :
                            <View style={styles.order}>
                                <Text>You have no orders</Text>

                                    <Button title="Place your first order" onPress={ ()=>props.navigation.navigate("Products")} />
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
    },
    error:
    {
        color: "red"
    }
})

export default MyOrders;