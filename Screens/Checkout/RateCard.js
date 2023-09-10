import { Container } from 'native-base';
import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios'
import baseUrl from '../../assets/common/baseUrl'
import ServiceItem from './ServiceItem'

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


const RateCard = (props) => {


    const [serviceItems, setServiceItems] = useState([]);

    useEffect(() => {
        axios.get(`${baseUrl}service-items/available`)
            .then((result) => { setServiceItems(result.data) })
            .catch((error) => { console.log(error); })
    }, []);

    return (
        <Container style={styles.container}>
            <FlatList
                data={serviceItems}
                ListHeaderComponent={ListHeader}
                renderItem={({ item, index }) => (
                    <ServiceItem
                        item={item}
                        index={index}
                    />
                )}
                keyExtractor={(item) => item.id}
            />
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width,
        margin: 10
    },

    listHeader: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: 'gainsboro'
    },
    headerItem: {
        margin: 3,
        width: width / 2
    }
})

export default RateCard;

