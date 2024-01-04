import React from 'react';
import { TouchableOpacity, View, Dimensions } from 'react-native';
import { Text } from '@gluestack-ui/themed';
import ProductCard from './ProductCard';

const ProductList = (props) => {

    const { width } = Dimensions.get('window');
    return (
        <TouchableOpacity onPress={() => props.checkout(props.product.id)}>
            <View >
                <ProductCard product={props.product} navigation={props.navigation} />
            </View>
        </TouchableOpacity>
        )

}

export default ProductList;
