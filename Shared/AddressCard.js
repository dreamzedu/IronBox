
import { Text, View } from 'react-native'

const AddressCard = (props) => {    

    return (
        
        <View >
            <Text>
                Address: {props.address.addressLine1} {props.address.addressLine2}
            </Text>
            <Text>City: {props.address.city}</Text>
            <Text>Zipcode: {props.address.zip}</Text>
            <Text>Country: {props.address.country}</Text>
        </View>
    )
}

export default AddressCard