import React, { useContext, useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect } from "@react-navigation/native"
import OrderCard from "../../Shared/OrderCard";
import { getUserOrders } from '../../Services/data-service';
import AuthGlobal from "../../Context/store/AuthGlobal"
import { Text, Button, ButtonText, Heading, Spinner } from "@gluestack-ui/themed";

const MyOrders = (props) => {
    const context = useContext(AuthGlobal)
    const [orders, setOrders] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(true)
    const pageSize = 50;
    let pageIndex = 1;

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
                    getUserOrders(context?.stateUser?.user?.userId, pageIndex, pageSize)
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
                setLoading(true);
            }

        }, [context.stateUser.isAuthenticated]))


    return (loading ? <Spinner size='large'></Spinner>
        :
        <ScrollView >
            <View style={styles.container}>
                {/*<Text style={[styles.title,{ textAlign: 'center' }]}>My Orders</Text>*/}
                    <View>
                        {orders ? (
                        orders.map((x) => {
                            return <View key={x.id} style={styles.box}>
                                    <TouchableOpacity onPress={() => props.navigation.navigate("Order Detail", { orderId: x.id })}>
                                        <OrderCard order={x} navigation={props.navigation} />
                                    </TouchableOpacity>
                                </View>
                            })
                        ) : (
                                error ? <Text style={styles.error }>Something went wrong.</Text>
                                    :
                            <View style={styles.order}>
                                <Text>You have no orders</Text>

                                        <Button onPress={() => props.navigation.navigate("HomeScreen")} >
                                            <ButtonText>Place your first order</ButtonText>
                                        </Button>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    box: {
        display: 'flex',
        flexDirection: "column",
        backgroundColor: "white",
        marginBottom: 10,
        padding: 10,
        elevation: 2,
        borderRadius: 8,
    },
    order: {
        marginTop: 20,
        alignItems: "center",
        marginBottom: 60
    },
    error:
    {
        color: "red"
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingBottom: 10,
    },
})

export default MyOrders;