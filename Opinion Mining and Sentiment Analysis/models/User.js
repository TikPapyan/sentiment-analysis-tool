import db from '../startup/db.js'
import errorTexts from '../texts/errorTexts.js'

const find = async (...data) => {
    try {
        const filterData = data[0];

        let selects = [
            'users.id',
            'users.email',
            'users.name',
            'users.password'
        ];
        let joins = [];
        let conditions = [];

        if (filterData.id) {
            conditions.push(`users.id = ${filterData.id}`);
        }

        if (filterData.IDs) {
            conditions.push(`users.id in (${filterData.IDs})`);
        }

        if (filterData.email) {
            conditions.push(`email LIKE '%${filterData.email}%'`);
        }

        const query = await generateQuery(
            'users',
            selects,
            joins,
            conditions,
        );

        const [result] = await db.execute(query);

        return filterData.findOne && filterData.findOne === 1 ? result[0] : result;
    } catch (err) {
        throw errorTexts.badRequest;
    }
};

const create = async (data) => {
    try {

        let insertKey = [
            'email',
            'password',
            'name'
        ];

        const values = `('${data.email}','${data.password}','${data.name}')`;
        return await db.execute(
            'INSERT INTO users (' + insertKey.join(',') + ') VALUES ' + values + ';'
        );
    } catch (err) {
        throw errorTexts.badRequest;
    }
};

const generateQuery = async (table, selects, joins, conditions) => {
    let uniqueSelects = [...new Set(selects)];
    let uniqueJoins = [...new Set(joins)];
    let uniqueConditions = [...new Set(conditions)];

    let query = 'SELECT ' + uniqueSelects.join(',') + ' FROM  ' + table + ' ' + uniqueJoins.join('  ');
    query += uniqueConditions.length > 0 ? ' WHERE ' + uniqueConditions.join(' AND ') : '';
    return query;
};

export default {
    find,
    create
}