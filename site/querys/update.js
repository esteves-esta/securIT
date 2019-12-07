import Database from '../Database';

async function atualizar(table, change, filter) {

    try {
        const query = `update ${table} set ${change} where ${filter};`;
        const resultInsert = await Database(query);

        return resultInsert.rowsAffected > 0;
    } catch (error) {
        return error;
    }
}

export default atualizar;