
import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, FlatList, StyleSheet, Dimensions, Button } from 'react-native';
import axios from 'axios'
import baseUrl from '../../assets/common/baseUrl'
import ServiceItem from './ServiceItem'
import { HStack } from '@gluestack-ui/themed';

var { width } = Dimensions.get("window");

const ListHeader = () => {
    return (
        <View
            elevation={1}
            style={styles.listHeader}
        >                
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: '600' }}>Name</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: '600' }}>Price</Text>
            </View>
        </View>
    )
}


const AddItems = (props) => {

    let order = props.route.params.order;
   
    const [serviceItems, setServiceItems] = useState([]);
    let addedItems = [...order.items];

    useEffect(() => {
        axios.get(`${baseUrl}service-items/available`)
            .then((result) => {
                var serviceItems = result.data;
                if (serviceItems && addedItems?.length > 0) {
                    for (var i = 0; i < addedItems.length; i++) {
                        var serviceItem = serviceItems.find(x => { if (x.id === addedItems[i].id) { x.count = addedItems[i].count; return; } });                         

                    }
                }
                setServiceItems(serviceItems);
            })
            .catch((error) => { console.log(error); })
    }, []);


    const removeItem = (itemId) => {
        addedItems = addedItems.filter(x => x.id !== itemId);
        console.log(addedItems);
    }

    const addItem = (itemId, itemName) => {
        addedItems.push({ id: itemId, name: itemName, count: 1 });
        console.log(addedItems);
    }

    const increase = (itemId) =>
    {
        let item = addedItems.find(x => x.id === itemId);
        item.count = item.count + 1;
        console.log(addedItems);
    }

    const decrease = (itemId) =>
    {
        let item = addedItems.find(x => x.id === itemId);
        item.count = item.count - 1;
        console.log(addedItems);
    }

    const confirmItemSelection=()=>
    {
        order.items = addedItems;
        props.navigation.navigate("Confirm Order", { order: order });
    }

    const skipItemSelection = () => {
        props.navigation.navigate("Confirm Order", { order: order });
    }

    return (
        <>
            <View>
                <Text>You can choose the items now or skip this for now and our pickup agent will add this for you at the time of pickup.</Text>
            </View>
            <FlatList style={styles.container}
                    data={serviceItems}
                    ListHeaderComponent={ListHeader}
                    renderItem={({ item, index }) => (
                        <ServiceItem
                            item={item}
                            index={index}
                            increase={increase}
                            decrease={decrease}
                            addItem={addItem}
                            count={item.count}
                            removeItem={removeItem}
                            key={ item.id}
                        />
                    )}
                    keyExtractor={(item) => item.id}
            />
            <HStack>
                <Button title="Skip" onPress={() => skipItemSelection()} />
                <Button title="Confirm" onPress={() => confirmItemSelection()} />

            </HStack>
            </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width-10,
        margin: 5
    },

    listHeader: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: 'gainsboro'
    },
    headerItem: {
        margin: 3,
        width: (width-20) / 3
    }
})

export default AddItems;

