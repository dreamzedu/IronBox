import React from 'react';
import { TouchableOpacity, View, Dimensions } from 'react-native';
import { Text } from '@gluestack-ui/themed';
import ProductCard from './ProductCard';

const ProductList = (props) => {

    const { width } = Dimensions.get('window');
    return (
        <TouchableOpacity style={{ width: '50%' }} onPress={() => props.navigation.navigate("Product Details", { product: props.product })}>
            <View style={{ width: width / 2, backgroundColor: 'gainsboro' }}>
                <ProductCard product={props.product} navigation={props.navigation} />
            </View>
        </TouchableOpacity>
        )

}

export default ProductList;
