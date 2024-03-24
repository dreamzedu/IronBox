import { HStack } from "@gluestack-ui/themed";
import React, { useState } from "react";
import { StyleSheet, Dimensions, View, Button, Text, TouchableOpacity} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import EasyButton from "../../Shared/StyledComponents/EasyButton"

var { width } = Dimensions.get("window");

const ServiceItem = (props) => {

    const [counter, setCounter] = useState(props.count ? props.count : 0);

    return (
        <View style={styles.container} key={ props.item.id}>
           
            <Text style={[styles.col1, styles.itemPadding]}>{props.item.name}</Text>
            <Text style={[styles.col2, styles.itemPadding]}>₹ {props.item.price}</Text>

            {counter === 0 ?
                (<View style={[styles.col3, styles.itemPadding]}><EasyButton secondary medium onPress={() => { setCounter(counter + 1), props.addItem(props.item) }}><Text>Add</Text></EasyButton></View>) : (
                    <View style={[styles.col3, styles.itemPadding]}>
                        
                        <TouchableOpacity
                            style={styles.touchable}
                            onPress={() => { setCounter(counter - 1); counter === 1 ? props.removeItem(props.item):props.decrease(props.item); }}
                        >
                            <Icon style={styles.buttonText} color={"#007aff"} name="minus" />

                        </TouchableOpacity>

                        <View style={styles.count}>
                            <Text style={styles.countText}>
                                {counter}
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={styles.touchable}
                            onPress={() => { if (counter < 100) { setCounter(counter + 1), props.increase(props.item) } }}
                        >
                            <Icon style={styles.buttonText} color={"#007aff"} name="plus" />
                            </TouchableOpacity>
                        </View>
                    
                )}
            </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding:10,
        width: width - 20,
        
    },
    image: {
        borderRadius: 50,
        width: width / 6,
        height: 20,
        margin: 2
    },
    itemPadding:
    {
        paddingHorizontal:5
    },
    col1: {
        flexWrap: "wrap",
        width: (width - 20) / 3,
        flexShrink: 1,
        flex:1
    },
    col2: {
        flexWrap: "wrap",        
        width: 70,
        flexShrink: 1,
    },

    col3: {
        flexWrap: "nowrap",
        width: (width-20) / 3,
        flexShrink: 1,
        justifyContent: 'flex-end',
        marginRight: 10,
        flexDirection: 'row',
    },
    countText: {
        fontSize: 16,
        paddingLeft: 15,
        paddingRight: 15,
        color: '#27AAE1',
    },

    count: {
        minWidth: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    touchable: {
        minWidth: 35,
        minHeight: 35,
        borderWidth: 1,
        borderColor: '#27AAE1',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        fontSize: 12,
        color: '#27AAE1',
    },
  
})

export default ServiceItem;
