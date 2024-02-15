import React, { useEffect, useState, useContext } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { getProducts } from '../../Services/data-service';
import AuthGlobal from '../../Context/store/AuthGlobal'
import ProductList from "../Products/ProductList";
import {Text, Heading, Spinner, CheckboxIndicator, CheckboxIcon, CheckboxLabel, CheckIcon } from '@gluestack-ui/themed';


const CheckoutHome = (props) => {    

    const [products, setProducts] = useState([]);
    const [productsCtg, setProductsCtg] = useState([]);
    const [focus, setFocus] = useState(false);
    const [loading, setLoading] = useState(true)

    const context = useContext(AuthGlobal)
   
    let order = {
        productId: null, productName: null, productCode: null, userId: null, items: [], pickupAddress: null, pickupSlot: null, totalPrice: 0
    };
   
    useEffect(() => {
        if (context.stateUser.isAuthenticated !== true) {            
           
            props.navigation.navigate("Login", {msg: "You must login to perform this action."});
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
    }, []);

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
            <View >
                <View style={styles.cardContainer}>
                    <Text style={ styles.title}>Your basket is empty!</Text>
                    <Text>Choose from our services to place an order.</Text>
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
                    </View>
                }
                <View style={{ height: 40 }}></View>
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
        marginRight: 10,
        backgroundColor: 'white',
        display: "flex",
        flexDirection: "column",

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
   
    title:
    {
        fontWeight: 'bold',
        fontSize: 18,
        paddingBottom: 10,
    },
});

export default CheckoutHome