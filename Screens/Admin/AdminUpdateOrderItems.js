import { updateUserOrderItems } from '../../Services/data-service';
import Toast from "react-native-toast-message";
import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, StyleSheet, Dimensions, ScrollView, SectionList, ActivityIndicator } from 'react-native';
import ServiceItem from '../Checkout/ServiceItem'
import { Text, Spinner, Button, ButtonText } from '@gluestack-ui/themed';
import AuthGlobal from "../../Context/store/AuthGlobal"
import axios from "axios";
import { baseURL, apiPrefix } from "../../assets/common/baseUrl";
import * as commonstyles from "../../common-styles";
var { height, width } = Dimensions.get("window")

const AdminUpdateOrderItems = (props) => {

    let order = props.route.params.order;
    
    const [serviceItems, setServiceItems] = useState([]);
    const [sectionListFormatData, setSectionListFormatData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [addedItems, setAddedItems] = useState([...order.items]);
    const [confirmBtnDisabled, setConfirmBtnDisable] = useState(true);
    const context = useContext(AuthGlobal)
    var [loading, setLoading] = useState(true);
   

    useEffect(() => {
        console.log('order items' + order.items);
        let p = 0;
        if (order?.items?.length > 0) {
            order.items.map((item) => {
                p += item.price * item.count;
            });
            setTotalPrice(p);
            setConfirmBtnDisable(false);
        }
                
        if (serviceItems === null || serviceItems.length === 0) {
            axios.get(`${baseURL}${apiPrefix}service-items/available`)
                .then((result) => {
                    var serviceItems = result.data;
                    let orderItems = [...order.items];
                    itemsToRemove = [];// list of items which are there in the order but removed from the server in the available items. This is a rare scenario but may happen so handling it.
                    if (serviceItems && orderItems?.length > 0) {
                        for (var i = 0; i < orderItems.length; i++) {
                            var serviceItem = serviceItems.find(x => {
                                if (x.id === orderItems[i].id) {
                                    x.count = orderItems[i].count;
                                    orderItems[i].price = x.price;
                                    return x;
                                }
                            });
                            if (serviceItem === null) {
                                itemsToRemove.push(id)
                            }
                        }

                        if (orderItems && orderItems.length > 0) {
                            if (itemsToRemove && itemsToRemove.lenght > 0) {
                                setAddedItems(orderItems.filter(x => !itemsToRemove.any(x.id)));
                            }

                            let price=0;
                            orderItems.map((item) => {
                                price += item.price * item.count;
                            });
                            setTotalPrice(price);
                        }
                    }
                    setServiceItems(serviceItems);
                    setSectionListFormatData(getSectionListFormatData(serviceItems));
                    setLoading(false);
                })
                .catch((error) => { console.log(error); setLoading(false) })
        }
    }, []);


    var groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key].name] = rv[x[key].name] || []).push(x);
            //console.log(rv)
            return rv;
        }, {});
    };

    const getSectionListFormatData = (serviceItems) => {
        // Log to console
        var res = groupBy(serviceItems, "serviceitemcategory");

        let keys = Object.keys(res);
        let values = Object.values(res);
        var listData = [];
        for (i = 0; i < keys.length; i++) {
            listData.push({ "title": keys[i], "data": values[i] })
            //console.log(values[keys[i]])
        }
        return listData;
    }

    const removeItem = (item) => {
        if (addedItems === null || addedItems.length === 1) {
            setConfirmBtnDisable(true);
        }
        setAddedItems(addedItems.filter(x => x.id !== item.id));
        setTotalPrice(totalPrice - item.price);
    }

    const addItem = (item) => {
        let list = [...addedItems];
        list.push({ id: item.id, name: item.name, price: item.price, count: 1 });
        setAddedItems(list);
        //props.addToCart({ id: item.id, name: item.name, price: item.price, count: 1 });
        setTotalPrice(totalPrice + item.price);
        ////console.log(addedItems);
        //props.addItem({ id: item.id, name: item.name, price: item.price, count: 1 });
        ////if (list && list.length > 0) {
        setConfirmBtnDisable(false);
        //}
    }

    const increase = (item) => {
        //props.addToCart({ id: item.id, name: item.name, price: item.price, count: 1 });
        let addedItem = addedItems.find(x => x.id === item.id);
        addedItem.count = addedItem.count + 1;
        setTotalPrice(totalPrice + item.price);
        ////console.log(addedItems);
        //props.increaseItemCount({ id: item.id, name: item.name, price: item.price, count: 1 });
    }

    const decrease = (item) => {
        //props.removeFromCart({ id: item.id, name: item.name, price: item.price, count: 1 });
        let addedItem = addedItems.find(x => x.id === item.id);
        addedItem.count = addedItem.count - 1;
        setTotalPrice(totalPrice - item.price);
        ////console.log(addedItems);
        //props.decreaseItemCount({ id: item.id, name: item.name, price: item.price, count: 1 });
    }

    const confirmItemSelection = () => {
        
        updateOrderItems(order);
        //props.updateOrder(order);
                
    }

    const updateOrderItems = (order) => {
        //console.log(order );
        try {
            setLoading(true);
            updateUserOrderItems(order.id, order.items).then((res) => {
                order.items = addedItems;
                order.totalPrice = totalPrice;
                setLoading(false);
                Toast.show({
                    type: "success",
                    text1: "Order updated successfully.",
                    text2: "",
                });
                //props.navigation.pop();
                props.navigation.navigate("Order Detail", { orderId: order.id });
            })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                    Toast.show({
                        type: "success",
                        text1: "Something went wrong.",
                        text2: "",
                    });

                })
        }
        catch (error) {
            setLoading(false);
            console.log(error);
        }
    }


    return (
        !loading ?
            <>
                <View>
                    <Text style={{ margin: 10, fontSize: 18, fontWeight: 'bold' }}>Add or remove items for</Text>
                    <Text style={{ margin: 10, fontSize: 18, fontWeight: 'bold' }}>Order# {order.UUID}</Text>
                </View> 
                <SectionList style={[styles.list, styles.container]}
                    sections={sectionListFormatData}

                    renderItem={({ item, index }) => (
                        <ServiceItem
                            item={item}
                            index={index}
                            increase={increase}
                            decrease={decrease}
                            addItem={addItem}
                            count={item.count}
                            removeItem={removeItem}
                            key={item.id}
                        />
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <View style={{ paddingTop: 10, borderBottomWidth: 1, borderBottomColor: "silver" }}><Text style={styles.header}>{title}</Text></View>
                    )}
                    keyExtractor={(item) => item.id}
                />
                                
                <View style={[styles.row, styles.listHeader]}>
                    <Text style={[styles.headerItem, { flexShrink: 0.1 }]}></Text>
                    <Text style={[styles.headerItem, { flexGrow: 0.5 }]}>Total Price:  <Text style={{ fontWeight: 800 }}>₹{totalPrice}</Text></Text>
                    <Text style={[styles.headerItem, { flexGrow: 0.4 }]}>Item Count: <Text style={{ fontWeight: 800 }}>{addedItems?.reduce((n, { count }) => n + count, 0)}</Text></Text>
                </View>                
                <View style={[styles.row, commonstyles.footer]} >
                    <Button variant='link' style={[styles.alignLeft, styles.buttonMargin]} onPress={() => confirmItemSelection()} isDisabled={confirmBtnDisabled}>
                        <ButtonText color='$white' fontWeight="$medium" fontSize="$md">Confirm Selection</ButtonText>
                    </Button>

                </View>

            </>
            : <Spinner size='small'></Spinner>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width - 20,
        margin: 10,
        backgroundColor: 'white',
    },
    list:
    {
        padding: 5
    },

    listHeader: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: 'white',
        elevation: 1,
    },
    headerItem: {
        margin: 3,
        //width: (width - 20) / 3,
        flex: 0.3,
        //fontWeight: '600',
        fontWeight: '400',

    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        backgroundColor: '#fff',
        padding: 5,
    },
    info:
    {
        backgroundColor: '#fafad2',
        //margin: 10,
        marginTop: 0,
        //elevation: 1,
        padding: 10,
    },
    row: {
        display: 'flex',
        flexDirection: "row",
        alignSelf: 'stretch',
        width: '100%',
    },
    alignLeft:
    {
        alignSelf: 'stretch',
        flex: 1
    },
    buttonMargin:
    {
        margin: 2,
    }
})

export default AdminUpdateOrderItems