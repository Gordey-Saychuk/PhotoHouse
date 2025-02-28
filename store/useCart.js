import {defineStore} from "pinia";
export const useCartStore = defineStore('cart',  () => {

    const cart = ref(null);

    const initCart = (file) => {
        cart.value = file;
    }

    return {
        cart, initCart
    }
})