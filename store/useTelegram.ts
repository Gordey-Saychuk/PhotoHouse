import {
    useWebApp,
    useWebAppViewport
} from "vue-tg";
import {defineStore} from "pinia";
export const useTelegramStore = defineStore('telegram', () => {
    ///переменные(variables)
    const webApp = ref<object | null>(null);
    const init = () => {
        console.log(useWebApp())
    };
    const disableVerticalSwipesForClient = () => {
        useWebAppViewport().disableVerticalSwipes()
    }

    return {init, disableVerticalSwipesForClient};

})