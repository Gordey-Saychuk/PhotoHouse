import {useLocalStorage} from "@vueuse/core";
export const useCategories = () => {
    const tokenForStorage = useLocalStorage('tokenForStorage', '');
    const chatIdForStorage = useLocalStorage('chatIdForStorage', '');
    const fetchCategories = () => $fetch(`https://bot.fotobudka.online/api/v1/fitting/templates`, {
        params: {
            chatId: chatIdForStorage.value,
            token: tokenForStorage.value,
        },
        headers: {
            "Authorization": `Bearer f113066f-2ad6-43eb-b860-8683fde1042a`
        }
    }).then((response: any) => response.data)

    return {
        fetchCategories,
    }

}