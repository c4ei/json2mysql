const fs = require("fs");
const connection = require("./database");
connection.connect();
const jsonFile = fs.readFileSync("./source/splitJson/backup.json", "utf8");
const jsonData1 = JSON.parse(jsonFile);
// const jsonData1 = fs.readFile("./source/splitJson/backup.json", "utf8", function (err, data) {
//   if (err) throw err;
//   jsonData1 = JSON.parse(data);
// });
const txtFilder = "./source/txt/";
console.log(jsonData1 + ":jsonData1 \n" + Object.keys(jsonData1).length + "\n" + Object.keys(jsonData1));
let L1 = Object.keys(jsonData1);
// console.log(jsonData1[L1]);
let L2 = Object.keys(jsonData1[L1]);
let L2_Cnt = Object.keys(jsonData1[L1]).length;
// console.log(L2 + " : L2 / L2.length : " + L2.length);
// accounts,category,error,exchangeRate,forNumberedId,notice,optionSet,orders,products,reStockRequests,rooms,shipping,shippingFee : L2
// 0:accounts,1:category,2:error,3:exchangeRate,4:forNumberedId,5:notice,
// 6:optionSet,7:orders,8:products,9:reStockRequests,10:rooms,11:shipping,12:shippingFee
for (i = 0; i < L2_Cnt-12 ; i ++)  //L2_Cnt-12 
{ 
    let TABLE_NAME = L2[i]; // ##### sql table name !!!! #####
    // console.log(TABLE_NAME + ":TABLE_NAME");
    // let table_exists = false;
    // let sql_tblchk = `SELECT count(*) as cnt FROM information_schema.TABLES WHERE TABLE_NAME = '${TABLE_NAME}' AND TABLE_SCHEMA in (SELECT DATABASE());`;
    // console.log(sql_tblchk + ":sql_tblchk");
    // if(i==0)
    // { //0:accounts
    // 1987420s@gmail.com,95mama@mail2000.com.tw,99kshop.order@gmail.com,anandaqory.16@gmail.com,asdasd@gmail.com,bandina.vn@gmail.com,boapril@foxmail.com,

    let L3 = Object.keys(jsonData1[L1][TABLE_NAME]); // key L3
    let L3_Cnt = Object.keys(jsonData1[L1][TABLE_NAME]).length;
    // let L3_val  = Object.values(jsonData1[L1][TABLE_NAME]);
    for (j = 0; j < L3_Cnt; j ++) { // let L4 = Object.keys(jsonData1[L1][TABLE_NAME]);  // key L3
        let ROW_NAME = L3[j];
        // ##### sql table name !!!! #####
        // console.log(TABLE_NAME +":TABLE_NAME / "+ROW_NAME +" : ROW_NAME / L3_Cnt :" + L3_Cnt +"/ j:"+j);
        let L4 = Object.keys(jsonData1[L1][TABLE_NAME][ROW_NAME]); // key L3
        let L4_Cnt = Object.keys(jsonData1[L1][TABLE_NAME][ROW_NAME]).length;
        let L4_val = Object.values(jsonData1[L1][TABLE_NAME][ROW_NAME]);

        let sqlCreat = "";
        if (j == 0) { // create table
            sqlCreat = " CREATE TABLE " + TABLE_NAME + " ( ";
            sqlCreat = sqlCreat + "`idx` INT(11) NOT NULL AUTO_INCREMENT,";
        }

        let sqlIns1 = "insert into " + TABLE_NAME + " ( ";
        let sqlIns2 = " values ( ";
        for (k = 0; k < L4_Cnt; k ++) {
            let FIELD_NAME = L4[k]; // ##### sql FIELD_NAME name !!!! #####
            let FIELD_VAL = L4_val[k]; // ##### sql FIELD_VALUE !!!! #####
            let FIELD_TYPE = typeof L4_val[k]; // ##### sql FIELD_NAME name !!!! #####
            // console.log(TABLE_NAME + ":TABLE_NAME / " + ROW_NAME + " : ROW_NAME / " + FIELD_NAME + " : FIELD_NAME /" + FIELD_TYPE + " :FIELD_TYPE / L4_Cnt :" + L4_Cnt+"/ j :" + j+"/ k :" + k);
            // string number
            // console.log(k +":k /"+(L4_Cnt-1)+":L4_Cnt-1");
            switch (FIELD_TYPE) {
                case "number":
                    if (j == 0) { // create table
                        sqlCreat = sqlCreat + "`" + FIELD_NAME + "` DECIMAL(10,2) NULL DEFAULT NULL, ";
                    }
                    if (k == 0) {
                        sqlIns1 = sqlIns1 + "`" + FIELD_NAME + "` "; // not ,
                        sqlIns2 = sqlIns2 + " " + FIELD_VAL + " "; // not ,
                    } else {
                        sqlIns1 = sqlIns1 + ",`" + FIELD_NAME + "`";
                        sqlIns2 = sqlIns2 + ", " + FIELD_VAL + " ";
                    }
                    break;
                case "string":
                    if (FIELD_NAME !== "__collections__") {
                        if (j == 0) { // create table
                            sqlCreat = sqlCreat + "`" + FIELD_NAME + "` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', ";
                        }
                        if (k == 0) {
                            sqlIns1 = sqlIns1 + "`" + FIELD_NAME + "` "; // not ,
                            sqlIns2 = sqlIns2 + "'" + FIELD_VAL + "' "; // not ,
                        } else {
                            sqlIns1 = sqlIns1 + ",`" + FIELD_NAME + "` ";
                            sqlIns2 = sqlIns2 + ",'" + FIELD_VAL + "' ";
                        }
                    }
                    break;
                case "object":
                    if (FIELD_NAME !== "__collections__") {
                        if (j == 0) { // create table
                            sqlCreat = sqlCreat + "`" + FIELD_NAME + "` JSON NULL DEFAULT NULL, ";
                        }
                        if (k == 0) {
                            sqlIns1 = sqlIns1 + "`" + FIELD_NAME + "` "; // not ,
                            sqlIns2 = sqlIns2 + "'" + JSON.stringify(FIELD_VAL) + "' "; // not ,
                        } else {
                            sqlIns1 = sqlIns1 + ",`" + FIELD_NAME + "` ";
                            sqlIns2 = sqlIns2 + ",'" + JSON.stringify(FIELD_VAL) + "' ";
                        }
                    }
                    break;
            }
        }

        if (j == 0) { // create table
            sqlCreat = sqlCreat + " `regdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,PRIMARY KEY (`idx`) USING BTREE ) COLLATE='utf8_general_ci' ENGINE=InnoDB;";
            // console.log(sqlCreat +" ");
            var fileTBL = txtFilder + "tab_create.txt";
            fs.open(fileTBL, "a+", function (err, fd) {
                if (err) 
                    throw err;
                
                // console.log(fileTBL + " : file open complete");
            });
            fs.appendFileSync(fileTBL, sqlCreat + "\n", "utf-8", function (error) {
                console.log(fileTBL + " : error - write");
            });
        }
        // console.log(L4 +" : L4 / L4_Cnt : " + L4_Cnt);
        sqlIns1 = sqlIns1 + ")" + sqlIns2 + ");";
        // //////////////////////////////////////////////////////////////
        // console.log(      " \n////////////////////////////////////////////////////////////////\n" );
        // console.log(sqlIns1 + " ");
        // //////////////////////////////////////////////////////////////
        // r  : 읽기 전용. 파일이 없다면 에러 발생.
        // r+ : 읽기/쓰기 전용. 파일이 없다면 에러 발생.
        // w  : 쓰기 전용. 파일이 없다면 생성. 파일이 있다면 지우고 새로 작성.
        // w+ : 읽기/쓰기 전용. 파일이 없다면 생성. 파일이 있다면 새로 작성.
        // a  : 추가 쓰기 전용. 파일이 없다면 생성.
        // a+ : 읽기/추가 쓰기 전용. 파일이 없다면 생성.
        var file_ins = txtFilder + "tab_ins_" + TABLE_NAME + ".txt";
        fs.open(file_ins, "a+", function (err, fd) {
            if (err) 
                throw err;
            
            // console.log(TABLE_NAME + " : file open complete");
        });
        fs.appendFileSync(file_ins, sqlIns1 + "\n", "utf-8", function (error) {
            console.log("error - write");
        });
        // //////////////////////////////////////////////////////////////
    }
    // console.log(L3 +" : L3 \n");
    // }
}

console.log("############  program end  ##############");
