import React, { useContext, useState, useEffect } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { useFocusEffect } from "@react-navigation/native"
import OrderCard from "../../Shared/OrderCard";
import { Header, Item, Input, InputSlot, InputIcon, InputField, SearchIcon } from "@gluestack-ui/themed";
import { getOrders, getOrderStatuses } from '../../Services/data-service';
import AuthGlobal from "../../Context/store/AuthGlobal"
import EasyButton from "../../Shared/StyledComponents/EasyButton"

var { height, width } = Dimensions.get("window")

const Orders = (props) => {
    const context = useContext(AuthGlobal)
    const [orders, setOrders] = useState()
    const [filteredOrders, setFilteredOrders] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(true)
    let pageIndex = 1;
    let pageSize = 50;
    const [statusFilter, setStatusFilter] = useState('pending');
    const [orderStatuses, setOrderStatuses] = useState([]);

    useEffect(() => {
        if (
            context?.stateUser?.isAuthenticated === false ||
            context?.stateUser?.isAuthenticated === null
        ) {
            props.navigation.navigate("Login")
        }

        getOrderStatuses().then((statusList)=>setOrderStatuses(statusList));

        fetchOrders(statusFilter);

        //return () => {
        //    setOrders();
        //    setError(false);
        //    setLoading(false);
        //}

    }, [context.stateUser.isAuthenticated, statusFilter]);


    const fetchOrders = async () => {
        try {            
            setLoading(true);
            getOrders(pageIndex, pageSize, statusFilter)
                .then((res) => {
                    if (res) {
                        setOrders(res);
                        setFilteredOrders(res);
                    }
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

    const getNextPage = () => {
        pageIndex++;
        fetchOrders();
    }

    const filterOrders = (text) => {
        if (text == "") {
            setOrders(orders)
        }
        setFilteredOrders(
            orders.filter((i) =>
                JSON.stringify(i).toLowerCase().includes(text.toLowerCase())
            )
        )
    }

    return (
        <View >
            <View style={styles.buttonContainer}>
                <EasyButton
                    secondary
                    medium
                    onPress={() => setStatusFilter("pending")}
                >                    
                    <Text style={styles.buttonText}>Pending</Text>
                </EasyButton>
                <EasyButton
                    secondary
                    medium
                    onPress={() => setStatusFilter('inprogress')}
                >
                    <Text style={styles.buttonText}>InProgress</Text>
                </EasyButton>
                <EasyButton
                    secondary
                    medium
                    onPress={() => setStatusFilter('cancelled')}
                >
                    <Text style={styles.buttonText}>Cancelled</Text>
                </EasyButton>
                <EasyButton
                    secondary
                    medium
                    onPress={() => setStatusFilter('all')}
                >
                    <Text style={styles.buttonText}>All</Text>
                </EasyButton>
            </View>
            <View>
                
                <Input >
                    <InputSlot pl="$3">
                                <InputIcon as={SearchIcon} />
                            </InputSlot>
                    <InputField placeholder="Search..." onChangeText={(text) => filterOrders(text)}/>
                </Input>                                       
            </View>

            {
                loading ? (
                    <View style={styles.spinner}>
                        <ActivityIndicator size="large" color="red" />
                    </View>
                )
                    :
                    <ScrollView contentContainerStyle={styles.subContainer}>
                        <View style={styles.order}>
                            <View>
                                {filteredOrders && filteredOrders.length > 0 ? (
                                    filteredOrders.map((x) => {
                                        return <View key={x.id} style={ styles.box }>
                                            <OrderCard order={x} navigation={props.navigation} editMode={true} orderStatuses={ orderStatuses} />
                                            <Button title="View Detail" onPress={() => props.navigation.navigate("AdminOrderDetail", { orderId: x.id })} />
                                        </View>
                                    })

                                ) : (
                                    error ? <Text style={styles.error}>Something went wrong.</Text>
                                        :
                                        <View style={styles.order}>
                                            <Text>No orders available</Text>
                                        </View>
                                )}

                                {
                                    orders && orders.length >= pageSize ?
                                    <Button title="Load more" onPress={() => getNextPage()} />
                                    : null
                                }
                            </View>
                        </View>
                    </ScrollView>
            }
        </View>
    )

}

const styles = StyleSheet.create({
   
    subContainer: {
        margin:10,
    },
    order: {
        marginBottom: 100
    },
    error:
    {
        color: "red"
    },

    listHeader: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: 'gainsboro'
    },
    headerItem: {
        margin: 3,
        width: width / 6
    },
    spinner: {
        height: height / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        marginBottom: 160,
        backgroundColor: 'white'
    },
    buttonContainer: {
        marginTop: 10,
        alignSelf: 'center',
        flexDirection: 'row'
    },
    buttonText: {
        marginLeft: 4,
        color: 'white'
    },
    
    box: {
        display: 'flex',
        flexDirection: "column",
        backgroundColor: "white",
        marginBottom: 10,
        padding: 10,
        borderRadius: 8,
        paddingBottom:20,
    }
})

export default Orders;