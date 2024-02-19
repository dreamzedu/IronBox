
import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, StyleSheet, Dimensions,  ScrollView, SectionList } from 'react-native';
import ServiceItem from './ServiceItem'
import { Text, Spinner, Button, ButtonText } from '@gluestack-ui/themed';
import AuthGlobal from "../../Context/store/AuthGlobal"
import ItemsFilter from '../Products/ItemsFilter';
import { getServiceItemCategories, getServiceItems } from '../../Services/data-service'
import axios from "axios";
import baseUrl from "../../assets/common/baseUrl";
import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";

var { width, height } = Dimensions.get("window");


const ListHeader = () => {
    return (
        <View
            elevation={1}
            style={styles.listHeader}
        >
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: '600' }}>Name</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: '600' }}>Price</Text>
            </View>
        </View>
    )
}


const AddItems = (props) => {

    let order = props.route.params.order;
    const [serviceItems, setServiceItems] = useState([]);
    const [sectionListFormatData, setSectionListFormatData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    //const [addedItems, setAddedItems] = useState([...order.items]);
    const [confirmBtnDisabled, setConfirmBtnDisable] = useState(true);
    const context = useContext(AuthGlobal)
    var [loading, setLoading] = useState(true);

    useEffect(() => {
        let p = 0;
        if (order?.items?.length > 0) {
            order.items.map((item) => {
                p += item.price * item.count;
            });
            setTotalPrice(p);
        }

        //getServiceItems().then((data) => {
        //        var items = data;
        //        if (items && addedItems?.length > 0) {
        //            for (var i = 0; i < addedItems.length; i++) {
        //                var serviceItem = items.find(x => { if (x.id === addedItems[i].id) { x.count = addedItems[i].count; return; } });

        //            }
        //        }
        //    setServiceItems(items);
        //    setLoading(false);
        //})
        //    .error((err) => { console.log(err); setLoading(false) })

        if (serviceItems === null || serviceItems.length===0) {
            axios.get(`${baseUrl}service-items/available`)
                .then((result) => {
                    var serviceItems = result.data;
                    if (serviceItems && props.cartItems?.length > 0) {
                        for (var i = 0; i < props.cartItems.length; i++) {
                            var serviceItem = serviceItems.find(x => { if (x.id === props.cartItems[i].id) { x.count = props.cartItems[i].count; return; } });

                        }
                    }
                    //console.log(serviceItems);
                    //console.log(this.groupBy(serviceItems, "serviceitemcategory.name"))
                    setServiceItems(serviceItems);
                    setSectionListFormatData(getSectionListFormatData(serviceItems));
                    setLoading(false);
                })
                .catch((error) => { console.log(error); setLoading(false) })
        }
    }, [props]);


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
        if (props.cartItems === null || props.cartItems.length === 1) {
            setConfirmBtnDisable(true);
        }
        //setAddedItems(addedItems.filter(x => x.id !== item.id));
        props.removeFromCart(item);
        setTotalPrice(totalPrice - item.price);
        //console.log(addedItems);
        
    }

    const addItem = (item) => {
        //let list = [...props.cartItems];
        //list.push({ id: item.id, name: item.name, price: item.price, count: 1 });
        //setAddedItems(list);
        props.addToCart({ id: item.id, name: item.name, price: item.price, count: 1 });
        setTotalPrice(totalPrice + item.price);
        //console.log(addedItems);
        //if (list && list.length > 0) {
            setConfirmBtnDisable(false);
        //}
    }

    const increase = (item) => {
        props.addToCart({ id: item.id, name: item.name, price: item.price, count: 1 });
        //let addedItem = addedItems.find(x => x.id === item.id);
        //addedItem.count = addedItem.count + 1;
        setTotalPrice(totalPrice + item.price);
        //console.log(addedItems);
    }

    const decrease = (item) => {
        props.removeFromCart({ id: item.id, name: item.name, price: item.price, count: 1 });
        //let addedItem = addedItems.find(x => x.id === item.id);
        //addedItem.count = addedItem.count - 1;
        //setTotalPrice(totalPrice - item.price);
        //console.log(addedItems);
    }

    const confirmItemSelection = () => {
        order.items = props.cartItems;
        order.totalPrice = totalPrice;

        if (context.stateUser.user.isAdmin && props.flow === "admin") {
            props.updateOrderItems(order) // updateOrderItems is coming from AdminUpdateOrderItems
        }
        else {
            props.navigation.navigate("Review Order", { order: order });
        }
    }

    const skipItemSelection = () => {
        if (context.stateUser.user.isAdmin && props.flow === "admin") {
            props.navigation.navigate("OrderDetail", { order: order });
        }
        else {
            props.navigation.navigate("Review Order", { order: order });
        }
    }

    return (
        !loading ?
            <>
                {props.flow === "admin" ?                    
                    <View>
                        <Text style={{ margin: 10, fontSize: 18, fontWeight: 'bold' }}>Add or remove items for</Text>
                        <Text style={{ margin: 10, fontSize: 18, fontWeight: 'bold' }}>Order# {order.UUID}</Text>
                    </View>: null
                }
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
                
                {
            //<FlatList style={styles.container}
            //    data={serviceItems}
            //    ListHeaderComponent={ListHeader}
            //    renderItem={({ item, index }) => (
            //        <ServiceItem
            //            item={item}
            //            index={index}
            //            increase={increase}
            //            decrease={decrease}
            //            addItem={addItem}
            //            count={item.count}
            //            removeItem={removeItem}
            //            key={item.id}
            //        />
            //    )}
            //    keyExtractor={(item) => item.id}
                    ///>
                }
                <View style={styles.info}>

                    < Text >You can add the items or skip it for now and our pickup agent will add this for you at the time of pickup.</Text>
                </View>
                <View style={[styles.row, { paddingLeft: 10, paddingRight: 10, marginBottom:10 }]} >
                    <Button style={[styles.alignLeft, styles.buttonMargin]} onPress={() => skipItemSelection()}>
                        <ButtonText fontWeight="$medium" fontSize="$md">{props.flow === "admin" ? "Cancel" : "Skip Selection"}</ButtonText>
                    </Button>
                    <Button style={[styles.alignLeft, styles.buttonMargin]} onPress={() => confirmItemSelection()} isDisabled={confirmBtnDisabled}>
                        <ButtonText fontWeight="$medium" fontSize="$md">Confirm Selection</ButtonText>
                    </Button>

                    </View>
               
            </>
                :<Spinner size='small'></Spinner>
    )
}

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: () => dispatch(actions.clearCart()),
        removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
        addToCart: (item) => dispatch(actions.addToCart(item))
    }
}

const styles = StyleSheet.create({
    container: {
        width: width - 20,
        margin: 10,
        backgroundColor:'white',
    },
    list:
    {
        padding:5
    },

    listHeader: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: 'white'
    },
    headerItem: {
        margin: 3,
        width: (width - 20) / 3
    },
    header: {
        fontSize: 20,
        fontWeight:"bold",
        backgroundColor: '#fff',
        padding:5,
    },
    info:
    {
        backgroundColor: '#fafad2',
        margin: 10,
        marginTop:0,
        elevation: 1,
        padding: 10
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
        margin:2,
    }
})

//export default AddItems;
export default connect(mapStateToProps, mapDispatchToProps)(AddItems);

