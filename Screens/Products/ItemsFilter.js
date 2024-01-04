import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Badge, BadgeText } from '@gluestack-ui/themed';

const ItemsFilter = (props) => {

    return(
        <ScrollView
            bounces={true}
            horizontal={true}
            style={{ backgroundColor: "#f2f2f2" }}
        >
            <View style={{ margin: 0, padding: 0, borderRadius: 0 }}>
                <TouchableOpacity
                    key={1}
                    onPress={() => {
                        props.categoryFilter('all'), props.setActive(-1)
                    }}
                >
                    <Badge size="md" variant="solid" borderRadius="$md" action="success" style={[styles.center, { margin: 5 },
                    props.active == -1 ? styles.active : styles.inactive
                    ]}>
                        <BadgeText style={{ color: 'white' }}>All</BadgeText>
                    </Badge>
                   
                </TouchableOpacity>
                {props.categories.map((item) => (
                      <TouchableOpacity
                      key={item._id}
                      onPress={() => {
                          props.categoryFilter(item._id), 
                          props.setActive(props.categories.indexOf(item))
                      }}
                    >
                        <Badge size="md" variant="solid" borderRadius="$md" action="success" style={[styles.center, { margin: 5 },
                            props.active == props.categories.indexOf(item) ? styles.active : styles.inactive
                        ]}>
                            <BadgeText style={{ color: 'white' }}>Most common</BadgeText>
                        </Badge>
                     
                          
                  </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    active: {
        backgroundColor: '#03bafc'
    },
    inactive: {
        backgroundColor: '#a0e1eb'
    }
})

export default ItemsFilter;