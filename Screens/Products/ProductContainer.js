import React, { useState, useCallback, useEffect } from "react";
import {
    View,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    Dimensions
} from "react-native";
import { Container, Header, Icon, Item, Input, Text } from "@gluestack-ui/themed";
import ProductList from "./ProductList";
import axios from 'axios';
import baseUrl from '../../assets/common/baseUrl';

var { height } = Dimensions.get('window')

const ProductContainer = (props) => {
    const [products, setProducts] = useState([]);
    const [productsCtg, setProductsCtg] = useState([]);
    const [focus, setFocus] = useState(false);

    useEffect(() => {

        axios.get(`${baseUrl}products/available`)
            .then((result) => {
                setProducts(result.data);
                setProductsCtg(result.data);
            })
            .catch((error) => { console.log("Api error: " + error) })


      

        
    },[])

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


    return (
        
                
                   
                        <ScrollView>
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
                                        <Text>No products found</Text>
                                    </View>
                                )}

                            </View>
                        </ScrollView>
                    
                     
        
    );
};

const styles = StyleSheet.create({
    
    listContainer: {
        height: height,
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
