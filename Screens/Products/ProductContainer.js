import React, { useState, useCallback, useEffect, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
    View,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    Dimensions,
    Button,
    TouchableOpacity,
    Image
} from "react-native";
import { Text, Heading, Spinner } from "@gluestack-ui/themed";
import ProductList from "./ProductList";
import axios from 'axios';
import baseUrl from '../../assets/common/baseUrl';
import Banner from "../../Shared/Banner";
import OrderCard from "../../Shared/OrderCard";
import { getUserOrders, getProducts, getOrderDetail } from '../../Services/data-service';
import AuthGlobal from "../../Context/store/AuthGlobal"

var { height, width } = Dimensions.get('window')

const ProductContainer = (props) => {
    const [products, setProducts] = useState([]);
    const [productsCtg, setProductsCtg] = useState([]);
    const [focus, setFocus] = useState(false);
    const [lastOrder, setLastOrder] = useState();   
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(true);

    const context = useContext(AuthGlobal)
    const pageSize = 1;
    let pageIndex = 1;

    let order = {
        productId: null, productName:null, productCode:null, userId: null, items: [], pickupAddress: null, pickupSlot: null, totalPrice: 0
    };

    //useEffect(() => {
    //    setLoading(true);
    //    //if (context?.stateUser?.isAuthenticated) {
    //    //    getUserOrders(context?.stateUser?.user.userId, pageIndex, pageSize).then((result) => {
    //    //        console.log("user order: " + result[0]);
    //    //        if (result?.length >0)
    //    //        setLastOrder(result[0]);
    //    //    })
    //    //        .catch((err) => { console.log(err) })
    //    //}

    //    console.log("getting products ");

    //    try {
    //        getProducts().then((products) => {
    //            console.log("products " + products);
    //            setProducts(products);
    //            setProductsCtg(products);
    //            setLoading(false);
    //        });
    //    }
    //    catch
    //    {
    //        setLoading(false);
    //        console.log('loading products failed');
    //    }


    //}, []);

    
    useFocusEffect((
        useCallback(
            () => {
                setLoading(true);
                if (context?.stateUser?.isAuthenticated) {
                    getUserOrders(context?.stateUser?.user.userId, pageIndex, pageSize).then((result) => {
                        console.log("user order: " + result[0]);
                        if (result?.length > 0)
                            setLastOrder(result[0]);
                    })
                        .catch((err) => { console.log(err) })
                }

                try {
                    getProducts().then((products) => {
                        console.log("products " + products);
                        setProducts(products);
                        setProductsCtg(products);
                        setLoading(false);
                    });
                }
                catch
                {
                    setLoading(false);
                    console.log('loading products failed');
                }

                return () => {
                    setLoading(false)
                };
                
            },
            [],
        )
    ))


    const searchProduct = (text) => {

    }

    const onBlur = () => {
    }

    const repeatOrder = (templateOrder) => {
        try {
            setLoading(true);
            if (context?.stateUser?.isAuthenticated) {
                getOrderDetail(templateOrder.id).then((result) => {
                    if (result !== null) {
                        order = {
                            productId: result.product.id,
                            productName: result.product.name,
                            productCode: result.product.code,
                            userId: context?.stateUser?.user.userId,
                            items: result.items,
                            pickupAddress: result.pickupAddress,
                            //pickupSlot: result.pickupSlot, // Pickup slot should be recent
                            
                        };
                        props.navigation.navigate("Schedule Pickup", { order: order });
                    }
                })
                    .catch((err) => { console.log(err); setLoading(false); })
            }
            setLoading(false);
        }
        catch (e) {
            console.log(e);
            setLoading(false);
        }
    }

   
    const checkout = (productId, productName, productCode) => {
        if (!context.stateUser.isAuthenticated) {
            // props.navigation.navigate("User", { screen: "Login", params: {source: "checkout"} });
            props.navigation.navigate("LoginNavigator", { screen: "Login", params: { returnPage: 'Products', msg: "you must login to proceed" } });
        }
        else {
            order.userId = context.stateUser.user.userId;
            order.pickupAddress = context.stateUser.userProfile.address;
            order.productId = productId;
            order.productName = productName;
            order.productCode = productCode;
            if (order.pickupAddress) {
                SelectPickupAddress(order);
            }
            else {
                AddPickupAddress(order);
            }
        }

    }

    const AddPickupAddress = (order) => {
        props.navigation.navigate("Add Pickup Address", { order: order });
    }

    const SelectPickupAddress = (order) => {
        props.navigation.navigate("Select Pickup Address", { order: order });
    }

    return (

        <ScrollView>
            <View>
                <View>
                    <Banner />
                </View>
                <Heading style={styles.heading}>
                    Our services
                </Heading>
                {loading ?
                    <Spinner size='small' ></Spinner>
                    :
                    <View>
                        <View>
                            {productsCtg.length > 0 ? (
                                <View style={styles.listContainer}>
                                    {productsCtg.map((item) => {
                                        return (
                                            <ProductList
                                                product={item}
                                                key={item.name}
                                                checkout={checkout}
                                            />
                                        )
                                    })}
                                </View>
                            ) : (
                                <View style={[styles.center, { height: height / 2 }]}>
                                    <Text>No services found</Text>
                                </View>
                            )}

                        </View>
                        <Heading style={styles.heading}>
                            Our pricing
                        </Heading>
                        <View style={styles.cardContainer}>
                            <Image resizeMode='contain' style={styles.pricingImage} source={require('../../assets/savemoney1.png')} />

                            <View style={styles.pricingTextContainer}>
                                <Text style={styles.title}>Save more money</Text>
                                <Text style={styles.pricingText}>Our most reasonable pricing lets you save more money and that too with no compromise on the quality.</Text>
                                <Button title='Ckeck our peice list' onPress={() => { props.navigation.navigate("Rate Card") }} />
                            </View>
                        </View>
                        {context?.stateUser?.isAuthenticated && lastOrder ?
                            <View>
                                <Heading style={styles.heading}>
                                    Your last order
                                </Heading>
                                <View style={styles.cardContainer}>
                                    <View style={{flex:1}}>                                        
                                            <OrderCard order={lastOrder} navigation={props.navigation} />
                                        <View style={styles.buttonContainer}>
                                            <View style={{ flex: 1, alignSelf: 'stretch', padding:1 }}>
                                                <Button title='View Detail'  onPress={() => props.navigation.navigate("Order Detail", { orderId: lastOrder.id })} />
                                            </View>
                                            <View style={{ flex: 1, alignSelf: 'stretch', padding: 1 }}>
                                                <Button title='Repeat Order'  onPress={() => repeatOrder(lastOrder)} />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View> :
                            null
                        }
                       
                    </View>
                }
                <View style={{ height:40 }}></View>
            </View>
        </ScrollView>



    );
};

const styles = StyleSheet.create({
    
    listContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        //backgroundColor: "gainsboro",
    },
    cardContainer: 
    {
       
        padding: 20,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 10,
        marginRight:10,
        backgroundColor: 'white',
        display: "flex",
        flexDirection: "row",

    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    heading:
    {
        marginLeft: 10,
        marginTop: 10
    },
    pricingImage:
    {
        height: "100%",
        flex: 0.3,
        backgroundColor: '#91C9BF',
    },
    pricingTextContainer:
    {
        flex: 0.7,
        paddingLeft: 20,
        marginTop:-5,
    },
    pricingText:
    {        
        paddingBottom: 10,
    },
    title:
    {
        fontWeight: 'bold',
        fontSize: 18,
        paddingBottom: 10,
    },
    buttonContainer:
    {
        display: "flex",
        flexDirection: "row",
        paddingTop: 15,
        width: '100%',
        alignItems: 'stretch',
        alignContent: 'stretch'
    },
});

export default ProductContainer;
