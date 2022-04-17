import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'MENUITEMS.USER.TEXT',
        icon: 'ri-user-line',
        link: '/user'
    },
    {
        id: 3,
        label: 'MENUITEMS.DEPOSIT.TEXT',
        icon: 'ri-luggage-deposit-line',
        link: '/deposit'
    },
    {
        id: 4,
        label: 'MENUITEMS.MERCHANDISE.TEXT',
        icon: 'ri-shopping-cart-line',
        link: '/merchandise'
    },
    {
        id: 5,
        label: 'MENUITEMS.IVENTORY.TEXT',
        icon: 'ri-shopping-cart-line',
        link: '/iventory'
    },
    {
        id: 6,
        label: 'MENUITEMS.ORDER.TEXT',
        icon: 'ri-shopping-cart-line',
        link: '/order'
    }
];
