const sheets = require('@googleapis/sheets');

exports.handler = async function(event, context) {
    const auth = new sheets.auth.GoogleAuth({
        keyFile: './service-account-key.json',
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    // Acquire an auth client, and bind it to all future calls
    const client = sheets.sheets({version: 'v4', auth});

    let result;
    try {
        const response = await client.spreadsheets.values.get({
            spreadsheetId: '1aMN57aN_R_vbYGr5ARsk4mPh0kjRlxER1ktmEqNHQVo',
            range: 'Sheet1!A2:E',
        });

        const rows = response.data.values;
        if (rows.length) {
          result = rows.map((row) => {
            return `${row[0]}, ${row[4]}`;
          });
        } else {
          result = 'No data found.';
        }
    } catch (error) {
        result = `The API returned an error: ${error}`;
    }

    return {
        statusCode: 200,
        body: JSON.stringify({message: result})
    };
}
