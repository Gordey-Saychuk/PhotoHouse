import {defineStore} from "pinia";
export const useCartStore = defineStore('cart', () => {
    ///переменные(variables)
    const cart = ref<string | null>(null);
    const cartId = ref<number | null>(null);
    const cartBottom = ref<string | null>(null);
    const tokenValue = ref<string | null>(null);
    const chatId = ref<number | null>(null);
    const loadPhoto = ref<boolean>(false);
    ///методы(actions)
    const initCart = (file: string, id:number | null): void => {cart.value = file; id ? cartId.value = id : cartId.value = null}
    const initCartBottom = (file: string): string => cartBottom.value = file
    const initId = (id: number): number => chatId.value = id
    const initToken = (token: string): string => tokenValue.value = token
    const initLoadPhoto = (bool:boolean):boolean => loadPhoto.value = bool


    ///экспорт переменных/функций
    return {cart, cartBottom, chatId, tokenValue, cartId, loadPhoto, initCart, initCartBottom, initId, initToken, initLoadPhoto}
})