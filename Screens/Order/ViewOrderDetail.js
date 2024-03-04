import { View } from 'react-native';
import OrderDetail from "./OrderDetail"

const ViewOrderDetail = (props) => {

    return (
        <View>
            <OrderDetail {...props}/>
        </View>
        )
}

export default ViewOrderDetail