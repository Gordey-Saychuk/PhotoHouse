export const useCategories = () => {
    const runtimeConfig = useRuntimeConfig();
    const categories = ref<null | []>(null)

    const fetchCategories = () => $fetch(`https://bot.fotobudka.online/api/v1/fitting/templates`, {
        params: {
            chatId: '313226091'
        },
        headers: {
            "Authorization": `Bearer f113066f-2ad6-43eb-b860-8683fde1042a`
        }
    }).then((response: any) => response.data)

    return {
        fetchCategories,
    }

}