import React from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import { TouchableOpacity, Text } from '@gluestack-ui/themed';


var { width } = Dimensions.get('window');

const ProductCard = (props) => {
    const { name, description, image } = props.product;
    return (
        <View style={styles.container1}>
            <View style={styles.container2}>
            
                <Image resizeMode='contain' style={styles.image} source={require('../../assets/iron.png')} />

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{name.length > 45 ? name.substring(0, 42) + '...' : name}</Text>
                    <Text >{description}</Text>
                </View>
            </View>
            <View>
                <Text style={{ textAlign: 'center', fontWeight: 600, marginTop:10 }}>PLACE ORDER NOW</Text>
            </View>
        </View>


    );
}


const styles = StyleSheet.create({
    container1:
    {
        width: width -20,
        padding: 20,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 10,
        elevation: 8,
        backgroundColor: 'white',
        display: "flex",
        flexDirection: 'column',
        alignContent: 'flex-start'

    },
    container2:
    {
        display: "flex",
        flexDirection: 'row',        

    },
    title:
    {
        fontWeight: 'bold',
        fontSize: 18,
        paddingBottom:10,
       
    },
    titleContainer:
    {
        flex: 0.7,
        paddingLeft: 20,
        marginTop: -5,
    },
    image:
    {
        flex: 0.3,
        height: width / 3-20,
        backgroundColor: '#1AD1D9',
    },   
    
})

export default ProductCard;