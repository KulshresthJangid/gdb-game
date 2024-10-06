const { getSqlInstance } = require("../utils/dbs");

class BaseModel {
    constructor(table) {
        this.table = table;
        this.db = getSqlInstance();
    }

    async convertToBooleans(entry) {
        Object.keys(entry).forEach(key => {
            if(typeof entry[key] === 'number' && (entry[key] === 0 || entry[key] === 1)) {
                entry[key] = !!entry[key];
            }
        })
    }

    async findById(id) {
        return await this.db.where({id, is_enabled: true}).first();
    }
}

module.exports = BaseModel;