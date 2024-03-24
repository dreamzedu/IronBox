import React, { useEffect, useState, useContext } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { getProducts } from '../../Services/data-service';
import AuthGlobal from '../../Context/store/AuthGlobal'
import ProductList from "../Products/ProductList";
import { Text, Heading, Spinner, CheckboxIndicator, CheckboxIcon, CheckboxLabel, CheckIcon } from '@gluestack-ui/themed';
import { connect } from "react-redux";
import * as orderActions from "../../Redux/Actions/orderActions";
//import * as actions from "../../Redux/Actions/cartActions";


const CheckoutHome = (props) => {    

    const [products, setProducts] = useState([]);
    const [productsCtg, setProductsCtg] = useState([]);
    const [focus, setFocus] = useState(false);
    const [loading, setLoading] = useState(true)

    const context = useContext(AuthGlobal)
   
      
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
            props.navigation.navigate("LoginNavigator", { screen: "Login", params: { returnPage: 'HomeScreen', msg: "you must login to proceed" } });
        }
        else {
            let orderDetail = {
                userId: context.stateUser.user.userId,
                pickupAddress: context.stateUser.userProfile.address,
                productId: productId,
                productName: productName,
                productCode: productCode,
                items:[]
            }
            props.clearOrder(); // When landing on home page, any newly created order data should be cleared.
            //props.clearCart(); // any added items should also be cleared.
            props.createOrder(orderDetail)

            if (orderDetail.pickupAddress) {
                SelectPickupAddress();
            }
            else {
                AddPickupAddress();
            }
        }

    }

    const AddPickupAddress = () => {
        props.navigation.navigate("Add Pickup Address" );
    }

    const SelectPickupAddress = () => {
        props.navigation.navigate("Select Pickup Address" );
    }

    return (
        <ScrollView>
            <View >
                <View style={styles.cardContainer}>
                    <Text style={ styles.title}>Placing order with IronBox is super easy! It just needs few clicks and you are done.</Text>
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

//export default CheckoutHome
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutHome);