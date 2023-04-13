const { google } = require('googleapis');

const OAuth2Client = new google.auth.OAuth2(
    "710831994709-uop2mejfmldo7dekibh4egba5nibr3i6.apps.googleusercontent.com",
    "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",
    "http://localhost");

OAuth2Client.setCredentials({
    type: "authorized_user",
    client_id: "710831994709-uop2mejfmldo7dekibh4egba5nibr3i6.apps.googleusercontent.com",
    client_secret: "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",
    refresh_token: "1//05gDLqi4uoX5UCgYIARAAGAUSNwF-L9Ir0GZ_b1-BsNDaPIUFE4rbe6s-Xw0UT5beQveASM4EoPg3VeBesz0zq1FlzTXcqxI9vnQ"
});

const sheets = google.sheets({ version: 'v4', auth: OAuth2Client });

async function read() {

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: '1xhmpm__FlArpkLaHA4KbzKdBrfHlYVH4iY79rKPgtN0',
        range: 'Products!A2:E',
    });

    const rows = response.data.values;

    const products = rows.map((row) => ({
        id: +row[0],
        name: row[1],
        price: +row[2],
        image: row[3],
        stock: +row[4],
    }));

    return products;
}

async function write(products) {
    let values = products.map(p => [p.id, p.name, p.price, p.image, p.stock])

    const resource = {
        values,
    };
    const result = await sheets.spreadsheets.values.update({
        spreadsheetId: '1xhmpm__FlArpkLaHA4KbzKdBrfHlYVH4iY79rKPgtN0',
        range: 'Products!A2:E',
        valueInputOption: "RAW",
        resource,
    });

    console.log(result.updatedCells);
}

//async function readAndWrite(){
//const products = await read();
// products[0].stock = 10;
//await write(products);
//}

//readAndWrite();

//test de comits en github

module.exports = {
    read,
    write,
};