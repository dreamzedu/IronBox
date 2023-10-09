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
           
            <Text style={styles.item}>{props.item.name}</Text>
            <Text style={styles.item}>{props.item.price}</Text>

            {counter === 0 ?
                (<View style={{ flexDirection: 'row', alignSelf: "flex-end" }}><EasyButton secondary medium onPress={() => { setCounter(counter + 1), props.addItem(props.item) }}><Text>Add</Text></EasyButton></View>) : (
                    <View style={styles.counter}>
                
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
        padding:5,
        width: width -20
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
        width: (width-20) / 3 
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
    counter: {
        flexDirection: 'row'
    },
  
})

export default ServiceItem;
