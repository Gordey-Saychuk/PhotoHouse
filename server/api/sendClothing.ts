import {defineEventHandler} from 'h3';
import {FormData} from "node-fetch-native";
export default defineEventHandler(async (event) => {
    const formData = await readMultipartFormData(event);
    const newFormData = new FormData();
    const chatObject = formData.find((field) => field.name === 'chat');
    const tokenObject = formData.find((field) => field.name === 'token');
    const clothingObject = formData.find((field) => field.name === 'clothingId');
    const chatId = chatObject.data.toString();
    const token = tokenObject.data.toString();
    const clothingId = clothingObject ? clothingObject.data.toString() : ''
    formData.forEach(el => {
           if (el.name === 'mask' || el.name === 'photo' || el.name === 'clothingImage') {
               newFormData.append(el.name, new Blob([el.data], { type: el.type || 'application/octet-stream' }), el.filename);
           }
    });
    return await $fetch(`https://bot.fotobudka.online/api/fittingProcess/${chatId}/${token}/${clothingId}`, {
        method: "POST",
        body: newFormData
    })
        .then(response => response)
        .catch(error => error)
})