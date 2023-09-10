import React from 'react';
import { TouchableOpacity, View, Dimensions } from 'react-native';
import { Text } from 'native-base';
import ProductCard from './ProductCard';

const ProductList = (props) => {

    const { width } = Dimensions.get('window');
    return (
        <TouchableOpacity style={{ width: '50%' }} onPress={() => props.navigation.navigate("Product Details", { item: props.item })}>
            <View style={{ width: width / 2, backgroundColor: 'gainsboro' }}>
                <ProductCard item={props.item} navigation={props.navigation} />
            </View>
        </TouchableOpacity>
        )

}

export default ProductList;
