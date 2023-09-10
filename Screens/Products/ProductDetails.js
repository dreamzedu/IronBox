import React, { useState } from 'react'
import { View, Text } from 'react-native';
import { Container, Button } from 'native-base';



const ProductDetails = (props) => {
    
    const [item, setItem] = useState(props.route.params.item);

    

    const AddPickupAddress = () =>
    {
        props.navigation.navigate("Add Pickup Address");
    }

    const ShowRateCard = () => {
        props.navigation.navigate("Rate Card");
    }
    return (
        <Container>
            <View>
                <Text> {item.name}</Text>
                {/*<Button onPress={onPressLearnMore}*/}
                {/*    title="Learn More"*/}
                {/*    color="#841584"*/}
                {/*    accessibilityLabel="Learn more about this purple button" />*/}
                
                <Button onPress={AddPickupAddress}>Add Pickup Address</Button>
                <Button onPress={ShowRateCard}>Rate Card</Button>
            </View>
        </Container>
    );

}

export default ProductDetails;