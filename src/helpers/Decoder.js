export default class Decoder {
    static sports = {
        "1": "football",
        "4": "hockey",
        "2": "tennis",
        "3": "basketball",
        "12": "volleyball",
        "36": "esports"
    }
    static getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] == value);
    }
    static sportid_by_name (name) {
        const id = Decoder.getKeyByValue(Decoder.sports, name);
        if (id) return id;
        return undefined;
    }
    static sportname_by_id(id) {
        const name = Decoder.sports[id];
        if (name) return name; 
        return undefined;
    }
};