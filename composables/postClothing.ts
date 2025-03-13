import {useLocalStorage} from "@vueuse/core";
export const usePostClothing = () => {
    const tokenForStorage = useLocalStorage('tokenForStorage', '');
    const chatIdForStorage = useLocalStorage('chatIdForStorage', '');
    const postClothing = (body:object) => $fetch(`http://bot.fotobudka.online/api/fitting/${chatIdForStorage.value}/${tokenForStorage.value}`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${tokenForStorage.value}`
        },
        body: body
    }).then((response: any) => response.data)

    return {
        postClothing,
    }

}