import React from 'react';
import { View, Image, Dimensions, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from '@gluestack-ui/themed';


var { width } = Dimensions.get('window');

const ProductCard = (props) => {
    const { name, image } = props.product;
    return (

        <View style={styles.container}>
            <Image resizeMode='contain' style={styles.image} source={{
                uri: image != '' ? image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png' }} />
            <View style={ styles.card} ></View>
            <Text style={styles.title}>{name.length > 15 ? name.substring(0, 12) + '...' : name}</Text>
        </View>

    );
}


const styles = StyleSheet.create({
    container:
    {
        width: width / 2 -60,
        height: width / 1.7,
        padding: 10,
        borderRadius: 10,
        marginTop: 55,
        marginBottom: 5,
        marginLeft: 10,
        alignItems: 'center',
        elevation: 8,
        backgroundColor: 'white'

    },
    title:
    {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center'
    },
    card:
    {
        marginBottom: 10,
        height: width / 2 - 110,
        backgroundColor: 'transparent',
        width: width/2-70
    },
    image:
    {
        width: width / 2 - 70,
        height: width / 2 - 50,
        position: 'absolute',
        top: -45,
        backgroundColor:'transparent'
    }
})

export default ProductCard;