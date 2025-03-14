export const dataUrlToFile = (dataUrl, filename) => {
    // Разделяем строку на части
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1]; // Получаем MIME-тип
    const bStr = atob(arr[1]); // Декодируем Base64
    let n = bStr.length;
    const u8arr = new Uint8Array(n);

    // Заполняем Uint8Array
    while (n--) {
        u8arr[n] = bStr.charCodeAt(n);
    }

    // Создаем файл
    return new File([u8arr], filename, { type: mime });
}