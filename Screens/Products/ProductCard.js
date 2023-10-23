import React from 'react';
import { View, Image, Dimensions, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from '@gluestack-ui/themed';


var { width } = Dimensions.get('window');

const ProductCard = (props) => {
    const { name, image } = props.product;
    return (

        <View style={styles.container}>
            
                <Image resizeMode='contain' style={styles.image} source={{
                    uri: image != '' ? image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                }} />
            
            <Text style={styles.title}>{name.length > 45 ? name.substring(0, 42) + '...' : name}</Text>
        </View>

    );
}


const styles = StyleSheet.create({
    container:
    {
        width: width -20,
        height: width / 2.7,
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 10,
        elevation: 8,
        backgroundColor: 'white',
        display: "flex",
        flexDirection: 'row',
        alignContent: 'flex-start'

    },
    title:
    {
        fontWeight: 'bold',
        fontSize: 18,
        flex: 0.7,
        
       
    },
    card:
    {
        marginBottom: 10,
        backgroundColor: 'transparent',
       

    },
    image:
    {
        flex: 0.3,
        marginRight: 20,
        alignContent: 'flex-start',
        borderRadius: 10,
        borderColor: 'red',
        borderWidth: 1,
        backgroundColor: 'transparent'
    },
    
})

export default ProductCard;