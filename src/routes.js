import shopList from './components/shopList.vue'
import shopCart from './components/shopCart.vue'
import productCart from './components/productCart.vue'
import payment from './components/payment.vue'
import pageNotFound from './components/pageNotFound.vue'

export default [{
        path: "/",
        component: shopList
    },
    {
        path: "/cart",
        component: shopCart,
        props: true
    },
    {
        path: "/product/:id",
        component: productCart,
        name: "productCart",
        props: true
    },
    {
        path: "/payment",
        component: payment,
    },
    {
        path: "*",
        component: pageNotFound,
    },
]