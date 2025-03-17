import {useLocalStorage} from "@vueuse/core";
export const usePostClothing = () => {
    const tokenForStorage = useLocalStorage('tokenForStorage', '');
    const chatIdForStorage = useLocalStorage('chatIdForStorage', '');
    const postClothing = (body:object) => $fetch(`http://bot.fotobudka.online/api/fitting/${chatIdForStorage.value}/${tokenForStorage.value}`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer f113066f-2ad6-43eb-b860-8683fde1042a`
        },
        body: body
    }).then((response: any) => response.data)

    return {
        postClothing,
    }

}