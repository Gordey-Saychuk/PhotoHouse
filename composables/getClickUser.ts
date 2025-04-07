import {useLocalStorage} from "@vueuse/core";
export const useUser = () => {
    const tokenForStorage = useLocalStorage('tokenForStorage', '');
    const chatIdForStorage = useLocalStorage('chatIdForStorage', '');
    const fetchUser = () => $fetch(`https://bot.fotobudka.online/api/fitting/${chatIdForStorage.value}/${tokenForStorage.value}/click`, {
        headers: {
            "Authorization": `Bearer f113066f-2ad6-43eb-b860-8683fde1042a`
        }
    }).then((response: any) => response.data)

    return {
        fetchUser,
    }

}