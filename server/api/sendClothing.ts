import {defineEventHandler} from 'h3';
import {FormData} from "node-fetch-native";

export default defineEventHandler(async (event) => {
    const formData = await readMultipartFormData(event);
    const newFormData = new FormData();
    // formData.forEach(el => {
    //     if (el.name === 'photo') {
    //         newFormData.append(el.name, new Blob([el.data], { type: el.type || 'application/octet-stream' }), el.filename);
    //     }
    // });
    // console.log(newFormData);
    await $fetch('https://bot.fotobudka.online/api/fittingProcess/313226091/f113066f-2ad6-43eb-b860-8683fde1042a/7', {
        method: "POST",
        params: newFormData
    })
        .then(response => {
            console.log(response);
            console.log('da')
            return response;
        })
        .catch(error => {
            console.log(error)
        })
})