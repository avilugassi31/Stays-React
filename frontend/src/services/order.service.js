import { httpService } from './http.service.js';

const ORDER_URL = 'order/';
export const orderSErvice = {
    query,
    getById,
    remove,
    save,
    getOrderByHost,
};

async function getOrderByHost(hostId) {
    const orders = await httpService.get(ORDER_URL);
    const ordersByHost = orders.filter((order) => {
        return order.stay._hostId === hostId;
    });
    return ordersByHost;
}

function query() {
    return httpService.get(ORDER_URL);
}

function getById(id) {
    return httpService.get(ORDER_URL + id);
}

function remove(id) {
    return httpService.delete(ORDER_URL + id);
}

function save(order) {
    try {
        if (order._id) {
            return httpService.put(ORDER_URL, order);
        } else {
            order.createdAt = Date.now();
            order.status = 'pending';
            if (sessionStorage.getItem('login')) {
                let { _id, fullname, imgUrl } = JSON.parse(
                    sessionStorage.getItem('login')
                );
                order.buyer = { _id, fullname, imgUrl };
            }
            return httpService.post(ORDER_URL, order);
        }
    } catch (err) {
        console.log('cant save order', err);
    }
}
