import Database from '../Database';

async function consulta(columns, table, filter) {

    try {
        const querystring = `Select ${columns} from ${table} ${filter};`;
        const results = await Database(querystring);
        const existe = results.recordset.length > 0;

        return existe ? results.recordset : false;
    }
    catch (error) {
        return error;
    }
};

export default consulta;