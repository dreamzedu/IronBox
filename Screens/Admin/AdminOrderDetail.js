import { View } from 'react-native';
import OrderDetail from "../Order/OrderDetail"

const AdminOrderDetail = (props) => {

    return (
        <View>
            <OrderDetail {...props}/>
        </View>
        )
}

export default AdminOrderDetail