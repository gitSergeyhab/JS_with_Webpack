class TransformService {
    static fbObjToArray(fbData) {
        const transformData = Object.keys(fbData).map(key =>{
            const item = fbData[key];
            item.id = key;
            return item;
        })
        return transformData;
    }
}

export {TransformService};