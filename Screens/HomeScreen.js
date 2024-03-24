import React, { useState, useCallback, useEffect, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
    View,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    Dimensions,
    
    TouchableOpacity,
    Image
} from "react-native";
import { Text, Heading, Spinner, Button, ButtonText } from "@gluestack-ui/themed";
import ProductList from "./Products/ProductList";
import Banner from "../Shared/Banner";
import OrderCard from "../Shared/OrderCard";
import { getHomePageOrderData, getProducts, getOrderDetail } from '../Services/data-service';
import AuthGlobal from "../Context/store/AuthGlobal";
import { connect } from "react-redux";
import * as orderActions from "../Redux/Actions/orderActions";
import * as actions from "../Redux/Actions/cartActions";
import { baseURL, apiPrefix } from "../assets/common/baseUrl";
import PaymentCard from "./Payment/PaymentCard";

var { height, width } = Dimensions.get('window')

const HomeScreen = (props) => {
    console.log('base url: ' + baseURL)
    console.log('api prefix: ' + apiPrefix)

    const [products, setProducts] = useState([]);
    const [productsCtg, setProductsCtg] = useState([]);
    const [focus, setFocus] = useState(false);
    const [lastOrder, setLastOrder] = useState();
    const [ordersPendingPayment, setOrdersPendingPayment] = useState([]);
    const [loading, setLoading] = useState(true)
    const [processing, setProcessing] = useState(false)
    const [error, setError] = useState(true);

    const context = useContext(AuthGlobal)
    const pageSize = 1;
    let pageIndex = 1;

    //let order = {
    //    productId: null, productName:null, productCode:null, userId: null, items: [], pickupAddress: null, pickupSlot: null, totalPrice: 0
    //};

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
                    //getUserOrders(context?.stateUser?.user.userId, pageIndex, pageSize).then((result) => {                      
                    //    if (result?.length > 0)
                    //        setLastOrder(result[0]);
                    //})
                    //    .catch((err) => { console.log(err) })

                    getHomePageOrderData(context?.stateUser?.user.userId, pageIndex, pageSize).then((result) => {
                        if (result) {
                            if(result.latestOrders.length >0)
                                setLastOrder(result.latestOrders[0]);
                            if (result.pendingPayment.length > 0)
                                setOrdersPendingPayment(result.pendingPayment);
                        }
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

                props.clearOrder(); // When landing on home page, any newly created order data should be cleared.
                props.clearCart(); // any added items should also be cleared.
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
            setProcessing(true);
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
                        props.createOrder(order);
                        //props.setCartItems(order.items);
                        setProcessing(false);
                        props.navigation.navigate("CartNavigator", { screen: "Schedule Pickup" });
                    }
                })
                    .catch((err) => { console.log(err); setProcessing(false); })
            }
        }
        catch (e) {
            console.log(e);
            setProcessing(false);
        }
    }

   
    const checkout = (productId, productName, productCode) => {
        if (!context.stateUser.isAuthenticated) {
            // props.navigation.navigate("User", { screen: "Login", params: {source: "checkout"} });
            props.navigation.navigate("LoginNavigator", { screen: "Login", params: { returnPage: 'HomeScreen', msg: "you must login to proceed" } });
        }
        else {
            
            let orderDetail = {
                userId : context.stateUser.user.userId,
                pickupAddress: context.stateUser.userProfile.address,
                productId: productId,
                productName: productName,
                productCode: productCode,
                items:[],
            }
            props.createOrder(orderDetail)
            if (orderDetail.pickupAddress) {
                SelectPickupAddress();
            }
            else {
                AddPickupAddress();
            }
        }

    }

    //const AddPickupAddress = (order) => {
    //    props.navigation.navigate("CartNavigator", { screen: "Add Pickup Address", params: { order: order } });
    //}

    //const SelectPickupAddress = (order) => {
    //    props.navigation.navigate("CartNavigator", { screen: "Select Pickup Address", params: { order: order } });
    //}

    const AddPickupAddress = () => {
        props.navigation.navigate("CartNavigator", { screen: "Add Pickup Address" });
    }

    const SelectPickupAddress = () => {
        props.navigation.navigate("CartNavigator", { screen: "Select Pickup Address" });
    }

    return (

        <ScrollView>
            <View>
                <View>
                    <Banner />
                </View>
                {loading ?
                    <Spinner size='large' ></Spinner>
                    :
                <>
                        {context?.stateUser?.isAuthenticated && ordersPendingPayment ?
                            
                                ordersPendingPayment.map((order) => {
                                    return (
                                        <View style={styles.cardContainer}><PaymentCard order={order} navigation={props.navigation}></PaymentCard></View>)
                                }) : null}
                    <Heading style={styles.heading}>
                        Our services
                    </Heading>               
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
                            <Image resizeMode='contain' style={styles.pricingImage} source={require('../assets/savemoney1.png')} />

                            <View style={styles.pricingTextContainer}>
                                <Text style={styles.title}>Save more money</Text>
                                <Text style={styles.pricingText}>Our most reasonable pricing lets you save more money and that too with no compromise on the quality.</Text>
                                <Button onPress={() => { props.navigation.navigate("Rate Card") }} >
                                    <ButtonText fontWeight="$medium" fontSize="$md">Ckeck our peice list</ButtonText>
                                </Button>
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
                                                <Button onPress={() => props.navigation.navigate("Order Detail", { orderId: lastOrder.id })}  >
                                                    <ButtonText fontWeight="$medium" fontSize="$md">View Detail
                                                    </ButtonText>
                                                </Button>
                                            </View>
                                            <View style={{ flex: 1, alignSelf: 'stretch', padding: 1 }}>
                                                <Button onPress={() => repeatOrder(lastOrder)} isDisabled={ processing } >
                                                    <ButtonText fontWeight="$medium" fontSize="$md">Repeat Order</ButtonText>
                                                </Button>
                                                {processing ?
                                                    <Spinner size='large' style={{top: -20}}></Spinner> : null}
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View> :
                            null
                        }
                       
                            </View>
                </>
                }
                <View style={{ height:40 }}></View>
            </View>
        </ScrollView>



    );
};

const mapStateToProps = (state) => {
    const { order } = state;
    return {
        order: order,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createOrder: (orderDetail) => dispatch(orderActions.createOrder(orderDetail)),
        clearOrder: () => dispatch(orderActions.clearOrder()),
        clearCart: () => dispatch(actions.clearCart()),
        setCartItems: (cartItems) => dispatch(actions.setCartItems(cartItems)),
    }
}

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

//export default HomeScreen;
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
