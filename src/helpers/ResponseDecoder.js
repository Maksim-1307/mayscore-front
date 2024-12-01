export default class ResponseDecoder {
    static splitBlocks(dataString) {
        let blocks = [];
        let blockBuffer = [];
        dataString.split('¬').forEach(pairStr => {
            const key = pairStr.split('÷')[0];
            const val = pairStr.split('÷')[1];
            if (key[0] == '~'){
                blockBuffer["match_id"] = key;
                blocks.push(blockBuffer);
                blockBuffer = [];
            }
            blockBuffer[key] = val;
        });
        return blocks;
    }
}