import {defineEventHandler} from 'h3';
import {FormData} from "node-fetch-native";
export default defineEventHandler(async (event) => {
    const formData = await readMultipartFormData(event);
    const newFormData = new FormData();
    formData.forEach(el => {
           if (el.name === 'image') {
               newFormData.append(el.name, new Blob([el.data], { type: el.type || 'application/octet-stream' }), el.filename);
           }
    });
    return await $fetch(`https://bot.fotobudka.online/api/v1/fitting/convert`, {
        method: "POST",
        body: newFormData,
        headers: {
            "Authorization": `Bearer f113066f-2ad6-43eb-b860-8683fde1042a`
        }
    })
        .then(response => response)
        .catch(error => error)
})