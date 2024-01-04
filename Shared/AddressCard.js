
import { View } from 'react-native'
import { Text } from "@gluestack-ui/themed";

const AddressCard = (props) => {    

    return (
        
        <View >
            <Text>
                {props.address.addressLine1} 
            </Text>
            <Text>
                {props.address.addressLine2}
            </Text>
            <Text>{props.address.city}</Text>
            <Text>{props.address.zip}</Text>
        </View>
    )
}

export default AddressCard