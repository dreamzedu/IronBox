import { View } from 'react-native';
import OrderDetail from "../Order/OrderDetail"

const MyOrderDetail = (props) => {

    return (
        <View>
            <OrderDetail {...props}/>
        </View>
        )
}

export default MyOrderDetail