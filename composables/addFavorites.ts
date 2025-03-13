import {useLocalStorage} from "@vueuse/core";
export const useAddFavorites = () => {
    const tokenForStorage = useLocalStorage('tokenForStorage', '');
    const chatIdForStorage = useLocalStorage('chatIdForStorage', '');
    const addFavorites = (id:number) => $fetch(`https://bot.fotobudka.online/api/v1/fitting/favourite`, {
        params: {
            chatId: chatIdForStorage.value,
            id: id
        },
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${tokenForStorage.value}`
        }
    }).then((response: any) => response.data)

    return {
        addFavorites,
    }

}