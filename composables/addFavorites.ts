export const useAddFavorites = () => {
    const runtimeConfig = useRuntimeConfig();

    const addFavorites = (id:number) => $fetch(`https://bot.fotobudka.online/api/v1/fitting/favourite`, {
        params: {
            chatId: '313226091',
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