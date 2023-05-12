const stringToValidJsonConvertor = <Entity extends { [key: string]: any }>(
    data: string,
    itemKeys: { [key in keyof Entity]: string }
): Array<Entity> | false => {
    if (typeof data !== 'string' || data === '') return false;
    let minimizedData: string = data.replaceAll('\n', '');
    if (minimizedData === '') return false;
    try {
        let parsedData = JSON.parse(minimizedData);
        if (!Array.isArray(parsedData)) return false;
        for (let i = 0; i < parsedData.length; i++) {
            if (typeof parsedData[i] !== 'object') {
                return false;
            } else {
                if (Object.keys(parsedData[i]).length !== Object.keys(itemKeys).length) return false;
                for (let j = 0; j < Object.keys(itemKeys).length; j++) {
                    if (!(Object.keys(itemKeys)[j] in parsedData[i])) return false;
                    if (typeof parsedData[i][Object.keys(itemKeys)[j]] !== itemKeys[Object.keys(itemKeys)[j]]) return false;
                }
            }
        }
        return parsedData as Array<Entity>;
    } catch (error) {
        return false;
    }
}

export default stringToValidJsonConvertor;