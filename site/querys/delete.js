import Database from '../Database';

async function deletar(table, filter) {

    try {
        const query = `delete from ${table} where ${filter}`;
        const result = await Database(query);

        return result.rowsAffected > 0;
    } catch (error) {
        return error;
    }
}

export default deletar;