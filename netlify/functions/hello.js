const sheets = require('@googleapis/sheets');

function nullify(str) {
    return str === '' ? null : str;
}

function tupleToDict(row) {
    const [id, rawDate, endTime, player1Grade, player1Champion, player2Grade, player2Champion, player3Grade, player3Champion] = row;
    return {
        id,
        rawDate,
        endTime,
        player1: {
            grade: nullify(player1Grade),
            champion: nullify(player1Champion),
        },
        player2: {
            grade: nullify(player2Grade),
            champion: nullify(player2Champion),
        },
        player3: {
            grade: nullify(player3Grade),
            champion: nullify(player3Champion),
        },
    }
}

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
            range: 'Sheet1!A2:I500',
        });

        const rows = response.data.values;
        if (rows.length) {
          result = rows
            .map(tupleToDict)
            .reverse();
        } else {
          result = 'No data found.';
        }
    } catch (error) {
        result = `The API returned an error: ${error}`;
    }

    return {
        statusCode: 200,
        body: JSON.stringify(result)
    };
}
