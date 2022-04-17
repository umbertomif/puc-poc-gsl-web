import { OrderItemModel } from '../models/order-item.model';

export class OrderModel {
    id: string;
    customerId: string;
    orderDate: string;
    orderItem: OrderItemModel[];
}
