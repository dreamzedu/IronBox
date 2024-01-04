import React, { useState } from "react";
import { StyleSheet, Text, Dimensions,View } from "react-native";

var { width } = Dimensions.get("window");

const ServiceItemPrice = (props) => {
    
    return (
        <View style={[styles.container, {
            backgroundColor: props.index % 2 == 0 ? "white" : "#CCE6FF"
        }]}>
            <Text style={styles.item}>{props.item.name}</Text>               
            <Text style={styles.item}>$ {props.item.price}</Text>
        </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 5,
        width: width
    },
    image: {
        borderRadius: 50,
        width: width / 6,
        height: 20,
        margin: 2
    },
    item: {
        flexWrap: "wrap",
        margin: 3,
        width: width / 2
    }   
})

export default ServiceItemPrice;
