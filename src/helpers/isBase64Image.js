export function isBase64Image(data) {
    let knownTypes = [
        'data:image/jpeg;base64,',
        'data:image/png;base64,'
    ];

    let givenImage = data.split(',')[0];
    return knownTypes.indexOf(givenImage) <= -1;
}