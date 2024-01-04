


export const offlinegetUserAddress = (userId) =>
    {
    const address = {
            id:'1234567890',
            addressLine1: "addressLine1",
            addressLine2: "addressLine2",
            zip: '12345',
            city: 'hyderabad',
            isPrimary: true,
            user: userId
        }
        return address;
    }

export const offlinesaveUserAddress = (address) => {
    address.id = '1234567890'
    return address;
}

export const offlineupdateUserAddress = (addressId, address) => {
    address.id = addressId;
    return address;
}

export const offlineGetUserOrders = async (userId, pageIndex, pageSize) => {
    return [{
        product: {
            name: 'Iron and Fold'
        },
        status: {
            code: 1, name: 'placed'
        },
        totalPrice: 200,
        user: {
            name: 'manoj'
        },
        dateOrdered: new Date(),
        cancelReason: 'no reason',
        cancelDate: '',
        cancelCharges: 0,
        id: 'orderid1'
    },
        {
            product: {
                name: 'Iron and Fold'
            },
            status: {
                code: 1, name: 'placed'
            },
            totalPrice: 200,
            user: {
                name: 'manoj'
            },
            dateOrdered: new Date(),
            cancelReason: 'no reason',
            cancelDate: '',
            cancelCharges: 0,
            id: 'orderid2'
        }
        ]
}

export const offlinegetOrders = (pageIndex, pageSize, statusFilter) => {
    return [{
        product: {
            name: 'Iron and Fold'
        },
        status: {
            code: 1, name: 'placed'
        },
        totalPrice: 200,
        user: {
            name: 'manoj'
        },
        dateOrdered: new Date(),
        cancelReason: 'no reason',
        cancelDate: '',
        cancelCharges: 0,
        id: 'orderid1'
    },
    {
        product: {
            name: 'Iron and Fold'
        },
        status: {
            code: 1, name: 'placed'
        },
        totalPrice: 200,
        user: {
            name: 'manoj'
        },
        dateOrdered: new Date(),
        cancelReason: 'no reason',
        cancelDate: '',
        cancelCharges: 0,
        id: 'orderid2'
        }
    ]
}

export const offlineupdateOrderStatus = (orderId, newStatus) => {
    return orderId;
   
};

export const offlineupdateUserOrderItems = (orderId, items) => {
    return orderId;
};

export const offlinegetOrderDetail = (orderId) => {
    return {
        product: {
            name: 'Iron and Fold'
        },
        status: {
            code: 1, name: 'placed'
        },
        totalPrice: 115,
        user: {
            name: 'manoj'
        },
        dateOrdered: new Date(),
        cancelReason: 'no reason',
        cancelDate: '',
        cancelCharges: 0,
        id: orderId,
        pickupSlot:
        {
            date: new Date(),
            startTime: 16,
            endTime: 18
        },
        items: [{
            id: 'id1',
            name: 'T-Shirt',
            count: 4,
            price: 40
        },
            {
                id: 'id2',
                name: 'Pant',
                count: 5,
                price: 75
            }        ],
        pickupAddress: {
            id : '1234567890',
            addressLine1: "addressLine1",
            addressLine2: "addressLine2",
            zip: '12345',
            city: 'hyderabad',
            isPrimary: true,
            user: userId
        }
    }
}

export const offlinecancelUserOrder = (orderId, message) => {
   
};

export const offlinegetOrderStatuses = () => {
    return [{ code: 1, name: 'Placed' }, { code: 2, name: 'Picup Complete' }, { code: 3, name: 'In Progress' }, { code: 5, name: 'Cancelled' }]
}

export const offlinesaveUserOrder = (order) => {
    order.id = 'order11';
    return order;
}

export const offlineupdateUserProfile = async (userId, userProfile) => {
    return userProfile;
};

export const offlinegetProducts = async () => {
    return [{ name: 'Iron and Fold', id: 'poduct1', description: 'Makes your cloths wrinkel free, smoothe and folded with a mild fresh fregrence.', category: {available: true, name:'iron'}}];
}