const fs = require('fs');
const path = require('path');
// JSON data
const data = require('./datacopy.json');
const pathHtml = path.resolve('./build.html')

const header = '<table><tr>'+ Object.keys(data[0]).map(el =>'<th>' + el +'</th>' ).join('')  + '</tr>'
const createRow = (row) => '<tr>'+ Object.values(row).map(el => '<td>'+el + '</td>').join('')+'</tr>'

/**
 * @description Generates an  table with all the table rows
 * @param {String} rows
 * @returns {String}
 */
const createTable = (rows) => `${header}${rows}`;

/**
 * @description Generate an `html` page with generated table
 * @param {String} table
 * @returns {String}
 */
const createHtml = (table) => `
  <html>
    <head>
      <style>
        table {
          width: 100%;
        }
        tr {
          text-align: left;
          border: 1px solid black;
        }
        th, td {
          padding: 15px;
        }
        tr:nth-child(odd) {

          background: #CCC
        }
        tr:nth-child(even) {
          background: #FFF
        }
        .no-content {
          background-color: red;
        }
      </style>
    </head>
    <body>
      ${table}
    </table>
    </body>
  </html>
`;
/**
 * @description this method takes in a path as a string & returns true/false
 * as to if the specified file path exists in the system or not.
 * @param {String} filePath 
 * @returns {Boolean}
 */
const doesFileExist = (filePath) => {
	try {
		fs.statSync(filePath); // get information of the specified file path.
		return true;
	} catch (error) {

		return false;
	}
};

try {
	/* Check if the file for `html` build exists in system or not */
	if (doesFileExist(pathHtml)) {
		console.log('Deleting old build file');
		/* If the file exists delete the file from system */
		fs.unlinkSync(pathHtml);
	}
	/* generate rows */
	const rows = data.map(createRow);
	/* generate table */
	const table = createTable(rows.join(''))
	console.log(table)
  /* generate html */
	const html = createHtml(table);
  // console.log(table)
	/* write the generated html to file */
	fs.writeFileSync(pathHtml, html);
	console.log('Succesfully created an HTML table');
} catch (error) {
	console.log('Error generating table', error);
}