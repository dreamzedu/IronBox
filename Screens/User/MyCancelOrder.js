import { View } from 'react-native';
import CancelOrder from "../Order/CancelOrder"

const MyCancelOrder = (props) => {

    const orderCancelledCallback = (result, order) => {
        if (result === 'success') {
            props.navigation.navigate("My Order Detail", { orderId: order.id });
        }
    }

    return (
        <View>
            <CancelOrder {...props} orderCancelled={orderCancelledCallback} />
        </View>
        )
}

export default MyCancelOrder