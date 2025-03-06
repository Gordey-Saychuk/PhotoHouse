import {defineStore} from "pinia";
export const useCartStore = defineStore('cart', () => {
    ///переменные(variables)
    const cart = ref<string | null>(null);
    const cartBottom = ref<string | null>(null);
    ///методы(actions)
    const initCart = (file: string): string => cart.value = file
    const initCartBottom = (file: string): string => cartBottom.value = file
    ///экспорт переменных/функций
    return {cart, cartBottom, initCart, initCartBottom}
})