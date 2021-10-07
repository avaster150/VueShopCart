import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        products: [],
        product: null,
        cart: [],
        payment: false,
        deliveryPrice: 0,
        paymentPrice: 0,
        checkCardValidation: {},
        checkInputValidation: {},
    },

    getters: {
        cartItemCount: (state) => {
            return state.cart.reduce(function (previousValue, currentValue) {
                return previousValue + currentValue.quantity
            }, 0);
        },

        cartItemPrice: (state) => {
            let totalPrice = 0;
            let itemPrice
            let totalPriceFloor
            state.cart.forEach(item => {
                itemPrice = item.product.price.slice(1, item.product.price.length)
                totalPrice += Number(itemPrice) * item.quantity
                totalPriceFloor = totalPrice.toFixed(2)
            })
            if (state.cart.length == 0) {
                return "0"
            } else {
                return totalPriceFloor
            }
        }
    },

    mutations: {
        SET_PRODUCTS: (state, products) => {
            state.products = products;
        },

        SET_PRODUCT: (state, product) => {
            state.product = product;
        },

        ADD_TO_CART: (state, {
            product,
            quantity
        }) => {
            let doubleProduct = state.cart.find(item => {
                return item.product.id === product.id
            })
            if (doubleProduct) {
                doubleProduct.quantity += quantity
                return;
            }
            state.cart.push({
                product,
                quantity
            })
        },
        REMOVE_PRODUCT: (state, id) => {
            return state.cart.splice(id, 1)
        },
        ADD_QUAN: (state, id) => {
            return state.cart[id].quantity++
        },
        SUB_QUAN: (state, id) => {
            if (state.cart[id].quantity < 2) return
            return state.cart[id].quantity--
        },
        DELIVERY_PRICE: (state, price) => {
            state.deliveryPrice = price
        },
        PAYMENT_PRICE: (state, price) => {
            state.paymentPrice = price
        },
        PAY_END: (state) => {
            state.payment = true
        },
        CLEAR_PAGE: (state => {
            state.payment = false,
                state.cart = []
        }),
        CARD_VALIDATION: (state, {
            cartNumber,
            cartDate,
            cartControlNumber,
        }) => {
            state.checkCardValidation = {
                cartNumber,
                cartDate,
                cartControlNumber,
            }
        },
        INPUT_VALIDATION: (state, {
            zipCode,
            email,
            phone,
        }) => {
            state.checkInputValidation = {
                zipCode,
                email,
                phone,
            }
        },
    },

    actions: {
        getProducts: ({
            commit
        }) => {
            axios.get('https://www.mocky.io/v2/5ab0d1882e0000e60ae8b7a6')
                .then(response => {
                    commit('SET_PRODUCTS', response.data)
                })
        },

        getProduct: ({
            commit
        }, ) => {
            axios.get(`https://www.mocky.io/v2/5ab0d1882e0000e60ae8b7a6`)
                .then(response => {
                    commit('SET_PRODUCT', response.data)
                })
        },

        addProductToCart: ({
            commit
        }, {
            product,
            quantity
        }) => {
            commit("ADD_TO_CART", {
                product,
                quantity
            });
        },
        removeItem: ({
            commit
        }, id) => {
            commit("REMOVE_PRODUCT", id);
        },

        add: ({
            commit
        }, id) => {
            commit("ADD_QUAN", id);
        },

        sub: ({
            commit
        }, id) => {
            commit("SUB_QUAN", id);
        },
        deliveryChoosePrice: ({
            commit
        }, price) => {
            commit("DELIVERY_PRICE", price);
        },
        paymentChoosePrice: ({
            commit
        }, price) => {
            commit("PAYMENT_PRICE", price);
        },

        pay: ({
            commit
        }, id) => {
            commit("PAY_END", id);
        },
        clear: ({
            commit
        }, id) => {
            commit("CLEAR_PAGE", id);
        },
        cardPaymentValidation: ({
            commit
        }, {
            cartNumber,
            cartDate,
            cartControlNumber,
        }) => {
            commit("CARD_VALIDATION", {
                cartNumber,
                cartDate,
                cartControlNumber,
            })
        },
        inputValidation: ({
            commit
        }, {
            zipCode,
            email,
            phone,
        }) => {
            commit("INPUT_VALIDATION", {
                zipCode,
                email,
                phone,
            })
        },
    },


});