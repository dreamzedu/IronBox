import React, { useContext, useState, useCallback, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect } from "@react-navigation/native"
import OrderCard from "../../Shared/OrderCard"
import { getUserOrders } from '../../Services/data-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthGlobal from "../../Context/store/AuthGlobal"
import { logoutUser } from "../../Context/actions/Auth.actions"
import { Heading, Spinner,Text, Button, ButtonText } from "@gluestack-ui/themed";
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
            setLoading(true);
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
                    setLoading(false);
                }
            };
                        
            setUserProfile(context.stateUser.userProfile)
            props.navigation.setOptions({ title: context.stateUser.userProfile.name })
            
            if (!orders) {
                fetchOrders();
            }
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
        
        <ScrollView>
            <View style={styles.container}>
            {/*<Text style={{ fontSize: 22, textAlign: 'center', marginBottom:10 }}>*/}
            {/*       {userProfile ? userProfile.name : "" }*/}
            {/*</Text>*/}
            {/*<View style={styles.borderTop}></View>*/}
            <View style={[styles.box]}>
                <Text style={[styles.title, { textAlign: 'center'}]}>
                Profile Details
                </Text>
                <Text style={{ margin: 10 }}>
                    Email: {userProfile ? userProfile.email : "N/A"}
                </Text>
                <Text style={{ margin: 10 }}>
                    Phone: {userProfile ? userProfile.phone : "N/A"}
                </Text>               
                <View style={{ margin: 10 }}>
                        <Button onPress={() => props.navigation.navigate("Edit Profile")}>
                            <ButtonText fontWeight="$medium" fontSize="$md">Edit Profile</ButtonText>
                        </Button>
                </View>
            </View>
            <View style={ styles.box}>
                <Text style={[styles.title, { textAlign: 'center' }]}>
                        Adress
                    </Text>
                    {userProfile.address ?
                    <View style={{margin:10}}>
                        <AddressCard address={userProfile.address} />
                        
                    <View style={{ marginTop: 10 }}>
                                <Button onPress={() => props.navigation.navigate("AddressEditor", { address: userProfile.address, mode: 'edit' })}>
                                    <ButtonText fontWeight="$medium" fontSize="$md">Edit Address</ButtonText>
                        </Button>
                    </View>
                            </View>
                        :
                        <>
                        <Text>N/A</Text>
                        <View style={{ marginTop: 10 }}>
                                <Button onPress={() => props.navigation.navigate("AddressEditor", { address: userProfile.address, mode: 'add' })}>
                                    <ButtonText fontWeight="$medium" fontSize="$md">Add Address</ButtonText>
                             </Button>
                        </View>
                        </>
                    }
                </View>
                <View style={styles.box}>
                    <View >
                    <Text style={[styles.title, { textAlign: 'center' }]}>Recent Orders</Text>
                        
                    </View>
                    <View>
                        {orders ? (
                        orders.map((x) => {
                            return <View key={x.id} style={[styles.borderTop, { padding: 10 }]}>
                                <TouchableOpacity onPress={() => props.navigation.navigate("Order Detail", { orderId: x.id })}>
                                    <OrderCard order={x} navigation={props.navigation} />
                                </TouchableOpacity>
                                </View>
                        })

                        ) : (
                            error ? <Text style={styles.error}>Something went wrong.</Text>
                            :
                            <View style={styles.order}>
                                <Text>You have no orders</Text>

                                        <Button style={{ margin: 10 }} onPress={() => props.navigation.navigate("HomeScreen")} >
                                            <ButtonText fontWeight="$medium" fontSize="$md">Place your first order</ButtonText>
                                        </Button>
                            </View>
                        )}
                        
                    </View>
                    {orders ? <View style={[styles.borderTop, { padding: 10 }]}><Button onPress={() => props.navigation.navigate("MyOrders")}><ButtonText fontWeight="$medium" fontSize="$md">View All</ButtonText></Button></View> : null
                    }
                    {/*{orders ? <View style={[styles.borderTop, { padding: 10 }]}><Button onPress={() => props.navigation.navigate("OrderNavigator", {Screen:'MyOrders'})}><ButtonText fontWeight="$medium" fontSize="$md">View All</ButtonText></Button></View> : null*/}
                    {/*}*/}
                </View>
            </View>
            </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingHorizontal: 10,
        marginBottom:10,
    },
    box: {
        display: 'flex',
        flexDirection: "column",
        backgroundColor: "white",
        marginBottom: 20,
        padding:10,
    },
    borderTop:
    {
        borderColor: 'silver',
        borderTopWidth: 1,
    },
    borderBottom:
    {
        borderColor: 'silver',
        borderBottomWidth: 1,
    },
    title:
    {
        fontWeight: 'bold',
        fontSize: 20,
        paddingBottom: 10,
    },
    alignLeft:
    {
        alignSelf: 'stretch',
        flex: 1
    },
})

export default UserProfile;