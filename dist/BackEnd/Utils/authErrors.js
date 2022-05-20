"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniqueValidator = void 0;
const uniqueValidator = async (fields, model) => {
    const alreadyExistsUser = await model.findOne({ $or: [{ email: fields.email }, { name: fields.name }] });
    if (!alreadyExistsUser)
        return undefined;
    let result = [];
    if (alreadyExistsUser.email === fields.email) {
        result.push({ field: 'Email', message: 'الايميل مستعمل من قبل' });
    }
    if (alreadyExistsUser.name === fields.name) {
        result.push({ field: 'Name', message: 'الاسم مستعمل من قبل' });
    }
    /* if ( alreadyExistsUser.phone === fields.phone) {
      result.push({ field: 'Phone', message:'رقم الهاتف مستعمل من قبل'})
    } */
    return result;
};
exports.uniqueValidator = uniqueValidator;
