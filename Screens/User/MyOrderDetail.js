import { View } from 'react-native';
import OrderDetail from "../Order/OrderDetail"

const MyOrderDetail = (props) => {

    const cancelOrder = (order) => {       
            props.navigation.navigate("My Cancel Order", { orderData: order });
    }

    return (
        <View>
            <OrderDetail {...props} cancelOrder={cancelOrder} />
        </View>
        )
}

export default MyOrderDetail