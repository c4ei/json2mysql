const fs = require("fs");
const connection = require("./database");

connection.connect();
let TABLE_NAME = "accounts1";
let FILENAME = "accounts_1.json";

process.argv.forEach((element) => {
  let line = element.split("=");
  if (line[0] && line[0].trim() == "--table") {
    TABLE_NAME = line[1] ? line[1].trim() : "invalid";
  }
  if (line[0] && line[0].trim() == "--filename") {
    FILENAME = line[1] ? line[1].trim() : "invalid";
  }
});
// console.log(TABLE_NAME + ":TABLE_NAME");
// console.log(FILENAME + ":FILENAME");
let table_exists = false;
let sql_tblchk = `SELECT count(*) as cnt FROM information_schema.TABLES WHERE TABLE_NAME = '${TABLE_NAME}' AND TABLE_SCHEMA in (SELECT DATABASE());`;
console.log(sql_tblchk + ":sql_tblchk");
connection.query(sql_tblchk, (err, data) => {
  if (data && data[0].cnt == 1) {
    table_exists = true;
    // connection.query(`DELETE FROM ${TABLE_NAME}`);
  }
});
fs.readFile(`./source/${FILENAME}`, "utf8", function (err, data) {
  if (err) throw err;
  const records = JSON.parse(data);
  // const records = data;
  // if(records[0] !== "__collections__" && records[0] !== null && records[0] !== undefined)
  // {
  // console.log(records.accounts);
  const columns = "`idx` INT(11) NOT NULL AUTO_INCREMENT,";
  try {
    console.log(records + " : columns [37 line]");
    columns = Object.keys(records.accounts["c4ei.net@gmail.com"]);   //.()
    console.log(columns + " : columns [39 line]");
    const schema = columns.join("` varchar(200), `");

    if (!table_exists) {
      connection.query(
        // "CREATE TABLE " + TABLE_NAME + "(`" + schema + "` TEXT);"
        "CREATE TABLE " +
          TABLE_NAME +
          "(`" +
          schema +
          "` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);"
      );
    }

    const col_insert = "`" + columns.join("`, `") + "`";
    let data_length = records.accounts.length;
    records.accounts.forEach((record) => {
      const values = Object.values(record);
      let val_insert = "`" + values.join("`, `") + "`";

      val_insert = val_insert.replace(/"/g, "'");
      val_insert = val_insert.replace(/`/g, '"');

      const query = `INSERT INTO ${TABLE_NAME} (${col_insert}) VALUES (${val_insert})`;
      connection.query(query, (err, data) => {
        if (err) {
          console.log(query, record);
          process.exit();
        }

        data_length = data_length - 1;
        console.log(`Importing... (${data_length}) Record(s)`);
        console.clear();
        if (!data_length) {
          console.log(`Done importing (${records.accounts.length}) Records`);
          process.exit();
        }
      });
    });
  } catch (e) {
    console.log(e + " : err 42");
  }

  // }else{
  //   console.log(records[0]+" : records[0] error");
  // }
});
