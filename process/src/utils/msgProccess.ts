function processXRayData(message: any) {
    const { deviceId, data, time } = message;
    const dataLength = data.length;

    const dataVolume = data.reduce((acc, record) => acc + (Array.isArray(record[1]) ? record[1].length : 0), 0);

    const processedData = {
        deviceId,
        time,
        dataLength,
        dataVolume,
        data: data.map(([time, coordinates]) => ({
            x: coordinates[0],
            y: coordinates[1],
            speed: coordinates[2]
        }))
    };
    return processedData;

}

export { processXRayData }