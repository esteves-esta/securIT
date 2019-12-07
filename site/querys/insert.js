import Database from '../Database';

async function inserir(table, columns, values) {

    try {
        const query = `insert into ${table} (${columns}) values (${values})`;
        const resultInsert = await Database(query);

        return resultInsert.rowsAffected > 0;
    } catch (error) {

        return error;
    }
}

export default inserir;