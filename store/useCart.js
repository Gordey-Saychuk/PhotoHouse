import {defineStore} from "pinia";
export const useCartStore = defineStore('cart',  () => {

    const cart = ref(null);
    const cartBottom = ref(null);

    const initCart = (file) => {
        cart.value = file;
    }
    const initCartBottom = (file) => {
        cartBottom.value = file;
    }

    return {
        cart, cartBottom, initCart, initCartBottom
    }
})