import React, { useState, useCallback, useEffect, useContext } from "react";
import {
    View,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    Dimensions,
    Button,
    TouchableOpacity
} from "react-native";
import { Text, Heading, Spinner } from "@gluestack-ui/themed";
import ProductList from "./ProductList";
import axios from 'axios';
import baseUrl from '../../assets/common/baseUrl';
import Banner from "../../Shared/Banner";
import OrderCard from "../../Shared/OrderCard";
import { getUserOrders } from '../../Services/data-service';
import AuthGlobal from "../../Context/store/AuthGlobal"

var { height } = Dimensions.get('window')

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

    useEffect(() => {
        if (context?.stateUser?.isAuthenticated) {
            getUserOrders(context?.stateUser?.user.userId, pageIndex, pageSize).then((result) => {
                if (result?.length >0)
                setLastOrder(result[0]);
            })
                .catch((err) => { console.log(err) })
        }

        setLoading(true);
        axios.get(`${baseUrl}products/available`)
            .then((result) => {
                setProducts(result.data);
                setProductsCtg(result.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log("Api error: " + error);
                setLoading(false);
            })


    }, [])

    /*
    useFocusEffect((
        useCallback(
            () => {
                setFocus(false);
                setActive(-1);

                // Products
                axios
                    .get(`${baseURL}products`)
                    .then((res) => {
                        setProducts(res.data);
                        setProductsFiltered(res.data);
                        setProductsCtg(res.data);
                        setInitialState(res.data);
                        setLoading(false)
                    })
                    .catch((error) => {
                        console.log('Api call error')
                    })

                // Categories
                axios
                    .get(`${baseURL}categories`)
                    .then((res) => {
                        setCategories(res.data)
                    })
                    .catch((error) => {
                        console.log('Api call error')
                    })

                return () => {
                    setProducts([]);
                    setProductsFiltered([]);
                    setFocus();
                    setCategories([]);
                    setActive();
                    setInitialState();
                };
                
            },
            [],
        )
    ))
*/

    const searchProduct = (text) => {

    }

    const onBlur = () => {
    }

    const placeOrder = (templateOrder) => {

    }


    return (

        <ScrollView>
            <View>
                <View>
                    <Banner />
                </View>
                <Heading>
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
                                                navigation={props.navigation}
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
                        <Heading>
                            Our pricing
                        </Heading>
                        <View>
                            <Text>Our prices are most reasonable</Text>
                            <Button title='Ckeck our peice list' onPress={() => { props.navigation.navigate("Rate Card") }} />
                        </View>
                        {context?.stateUser?.isAuthenticated && lastOrder ?
                            <View>
                                <Heading>
                                    Your last order
                                </Heading>
                                <TouchableOpacity onPress={() => props.navigation.navigate("Order Detail", { orderId: lastOrder.id })}>
                                    <OrderCard order={lastOrder} navigation={props.navigation} />
                                </TouchableOpacity>
                                <Button title='Repeat' onPress={() => placeOrder(lastOrder)} />
                            </View> :
                            null
                        }
                       
                    </View>
                }
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
        backgroundColor: "gainsboro",
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ProductContainer;
