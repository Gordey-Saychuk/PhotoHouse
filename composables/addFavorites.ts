import {useLocalStorage} from "@vueuse/core";
export const useAddFavorites = () => {
    const tokenForStorage = useLocalStorage('tokenForStorage', '');

    const addFavorites = (id:number, chatId:number) => $fetch(`https://bot.fotobudka.online/api/v1/fitting/favourite`, {
        params: {
            chatId: chatId,
            id: id
        },
        method: 'POST',
        headers: {
            "Authorization": `Bearer f113066f-2ad6-43eb-b860-8683fde1042a`
        }
    }).then((response: any) => response.data)

    return {
        addFavorites,
    }

}