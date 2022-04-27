const fs = require('fs');
const connection = require("./database");
connection.connect();
const jsonFile = fs.readFileSync('./source/splitJson/backup.json', 'utf8');
const jsonData1 = JSON.parse(jsonFile);
console.log(jsonData1+":jsonData1 \n"+Object.keys(jsonData1).length+"\n"+Object.keys(jsonData1));
let L1 = Object.keys(jsonData1);
// console.log(jsonData1[L1]);
let L2 = Object.keys(jsonData1[L1]);
let L2_Cnt = Object.keys(jsonData1[L1]).length;
console.log(L2 +" : L2 / L2.length : " + L2.length);
//accounts,category,error,exchangeRate,forNumberedId,notice,optionSet,orders,products,reStockRequests,rooms,shipping,shippingFee : L2
//0:accounts,1:category,2:error,3:exchangeRate,4:forNumberedId,5:notice,
//6:optionSet,7:orders,8:products,9:reStockRequests,10:rooms,11:shipping,12:shippingFee
for(i=0;i<L2_Cnt;i++){
  let TABLE_NAME = L2[i];    // ##### sql table name !!!! #####
  console.log(TABLE_NAME + ":TABLE_NAME");
  // let table_exists = false;
  // let sql_tblchk = `SELECT count(*) as cnt FROM information_schema.TABLES WHERE TABLE_NAME = '${TABLE_NAME}' AND TABLE_SCHEMA in (SELECT DATABASE());`;
  // console.log(sql_tblchk + ":sql_tblchk");
  // if(i==0)
  // { //0:accounts
  // 1987420s@gmail.com,95mama@mail2000.com.tw,99kshop.order@gmail.com,anandaqory.16@gmail.com,asdasd@gmail.com,bandina.vn@gmail.com,boapril@foxmail.com,
  // boutiquemusica@gmail.com,c4ei.net@gmail.com,chiimaagust14@gmail.com,cocoplus2022@gmail.com,devioctarina25@gmail.com,dx1991@naver.com,habibahbilqis@gmail.com,
  // hachi960129@gmail.com,hillytwo@nate.com,houseofkpopco@gmail.com,hyeongaby@gmail.com,hyeonjinhan1219@gmail.com,info@interasia.co.kr,info@interkpop.com,info@kpop-town.de,
  // interasia@gmail.com,interasiadev@gmail.com,jaaem4fun@gmail.com,janellelamiel@gmail.com,janine.allayzapre@gmail.com,japanpsj@naver.com,karinaputri17@gmail.com,kimta@n-cat.co.kr,kimys1@n-cat.co.kr,kurare72@gmail.com,lesnahyoj28@naver.com,leynmagbagay@gmail.com,lhainmagbagay@gmail.com,lhynlaerishoppe@gmail.com,lhynlmgbgy@gmail.com,mivta18@gmail.com,mr.kong.jp@gmail.com,ncathawaii@gmail.com,nikenwidiya96@gmail.com,nninn88@gmail.com,nukew.kr@gmail.com,official.evepink@gmail.com,pacarmarklee127@gmail.com,pandlaustin2022@gmail.com,pinkboxaustin@gmail.com,pinkboxhi@gmail.com,pinkboxtexas@gmail.com,poppeshop.ph@gmail.com,ppura_help@naver.com,qingyun1226@gmail.com,rudghksldl89@gmail.com,rudghksldl@gmail.com,rudghksldl@naver.com,rumendradev@gmail.com,sales@interasia.co.kr,senzang@hotmail.com,seok051700@gmail.com,shaishainagai@live.com,sungoh0501@gmail.com,sxuanmin7@gmail.com,toughsong00@naver.com,viannn.1995@hotmail.com,violetgift01@gmail.com,violetgift20@gmail.com,violetkpop7@gmail.com,violetsupply@gmail.com,wennyhermawati09@gmail.com,wj.chris.kang@gmail.com,
  // xianguohua66@gmail.com,ygflofficial@gmail.com,yjbea1031@gmail.com,zhanglei202100@gmail.com,zhangwanfu970908@gmail.com : L3 

    let L3      = Object.keys(jsonData1[L1][TABLE_NAME]);  // key L3
    let L3_Cnt  = Object.keys(jsonData1[L1][TABLE_NAME]).length;
    // let L3_val  = Object.values(jsonData1[L1][TABLE_NAME]);
    for(j=0;j<L3_Cnt;j++){
      // let L4 = Object.keys(jsonData1[L1][TABLE_NAME]);  // key L3
      let ROW_NAME = L3[j];    // ##### sql table name !!!! #####
      // console.log(ROW_NAME +" : ROW_NAME / L3_Cnt :" + L3_Cnt);
      if(j==0){  // create table
        let L4      = Object.keys(jsonData1[L1][TABLE_NAME][ROW_NAME]);  // key L3
        let L4_Cnt  = Object.keys(jsonData1[L1][TABLE_NAME][ROW_NAME]).length;
        let L4_val  = Object.values(jsonData1[L1][TABLE_NAME][ROW_NAME]);

        let sqlCreat = " CREATE TABLE "+ TABLE_NAME +" ( ";
        sqlCreat = sqlCreat + "`idx` INT(11) NOT NULL AUTO_INCREMENT,";

        let sqlIns1 = " insert into "+ TABLE_NAME +" ( ";
        let sqlIns2 = " values ( ";
        for(k=0;k<L4_Cnt;k++)
        {
          let FIELD_NAME = L4[k];       // ##### sql FIELD_NAME name !!!! #####
          let FIELD_VAL = L4_val[k];    // ##### sql FIELD_VALUE !!!! #####
          let FIELD_TYPE = typeof L4_val[k];    // ##### sql FIELD_NAME name !!!! #####
          // console.log(FIELD_NAME +" : FIELD_NAME /"+FIELD_TYPE+" :FIELD_TYPE / L4_Cnt :" + L4_Cnt);
          // string number 
// console.log(k +":k /"+(L4_Cnt-1)+":L4_Cnt-1");
          if (FIELD_TYPE =="number"){
            sqlCreat = sqlCreat +"`"+ FIELD_NAME+"` DECIMAL(10,0) NULL DEFAULT NULL, ";
            if(k == 0){
              sqlIns1 = sqlIns1 + "`"+ FIELD_NAME+"` "; // not ,
              sqlIns2 = sqlIns2 + " "+ FIELD_VAL+" ";  // not ,
            }else{
              sqlIns1 = sqlIns1 + ",`"+ FIELD_NAME+"`";
              sqlIns2 = sqlIns2 + ", "+ FIELD_VAL+" ";
            }
          } else {
            //if(FIELD_TYPE =="string"){
            if(FIELD_NAME !=="__collections__"){
              sqlCreat = sqlCreat +"`"+ FIELD_NAME+"` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', ";
              if(k == 0)
              {
                sqlIns1 = sqlIns1 + "`"+ FIELD_NAME+"` "; // not ,
                sqlIns2 = sqlIns2 + "'"+ FIELD_VAL+"' "; // not ,
              } else {
                sqlIns1 = sqlIns1 + ",`"+ FIELD_NAME+"` ";
                sqlIns2 = sqlIns2 + ",'"+ FIELD_VAL+"' ";
              }
            }
          }
        }
        sqlCreat = sqlCreat + " `regdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,PRIMARY KEY (`idx`) USING BTREE ) COLLATE='utf8_general_ci' ENGINE=InnoDB;"
        // console.log(L4 +" : L4 / L4_Cnt : " + L4_Cnt);
        sqlIns1 = sqlIns1 +')'+ sqlIns2+');';
////////////////////////////////////////////////////////////////
// console.log(sqlCreat +" ");
// console.log(sqlIns1 +" ");
////////////////////////////////////////////////////////////////
        var file = 'temp_text.txt';
        // r  : 읽기 전용. 파일이 없다면 에러 발생.
        // r+ : 읽기/쓰기 전용. 파일이 없다면 에러 발생.
        // w  : 쓰기 전용. 파일이 없다면 생성. 파일이 있다면 지우고 새로 작성.
        // w+ : 읽기/쓰기 전용. 파일이 없다면 생성. 파일이 있다면 새로 작성.
        // a  : 추가 쓰기 전용. 파일이 없다면 생성.
        // a+ : 읽기/추가 쓰기 전용. 파일이 없다면 생성.
        fs.open(file, 'a+', function(err, fd){
          if(err) throw err;
          console.log(TABLE_NAME +' : file open complete');
        });

        fs.appendFileSync('temp_text.txt', sqlIns1 + '\n', 'utf-8', function(error){
          console.log('error - write');
        });
        ////////////////////////////////////////////////////////////////
      }
    }
    // console.log(L3 +" : L3 \n");
  // }
}

// CREATE TABLE accounts (`idx` INT(11) NOT NULL AUTO_INCREMENT,`zipcode` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `inCharge` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `country` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `uid` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `alias` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `states` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `displayName` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `shippingMessage` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `dcRates` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `photoURL` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `nickName` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `phoneNumber` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `dcAmount` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `recipient` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `memo` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `taxId` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `createdAt` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `currency` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `credit` DECIMAL(10,0) NULL DEFAULT NULL, `city` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `shippingRate` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `companyName` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `creditDetails` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `street` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `recipientPhoneNumber` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `email` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `type` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `recipientEmail` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci',  `regdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,PRIMARY KEY (`idx`) USING BTREE ) COLLATE='utf8_general_ci' ENGINE=InnoDB;
// category:TABLE_NAME
// CREATE TABLE category (`idx` INT(11) NOT NULL AUTO_INCREMENT,`PHOTOBOOK` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `OFFICIAL-STORE` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `CD` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `BEAUTY` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `DVD/BLUE-RAY` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `GOODS/MAGAZINE` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `BT21` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `TEST` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci',  `regdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,PRIMARY KEY (`idx`) USING BTREE ) COLLATE='utf8_general_ci' ENGINE=InnoDB;
// error:TABLE_NAME
// CREATE TABLE error (`idx` INT(11) NOT NULL AUTO_INCREMENT,`order` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `createdAt` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `name` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci',  `regdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,PRIMARY KEY (`idx`) USING BTREE ) COLLATE='utf8_general_ci' ENGINE=InnoDB;
// exchangeRate:TABLE_NAME
// CREATE TABLE exchangeRate (`idx` INT(11) NOT NULL AUTO_INCREMENT,`JPY` DECIMAL(10,0) NULL DEFAULT NULL, `USD` DECIMAL(10,0) NULL DEFAULT NULL, `SGD` DECIMAL(10,0) NULL DEFAULT NULL, `EUR` DECIMAL(10,0) NULL DEFAULT NULL, `KRW` DECIMAL(10,0) NULL DEFAULT NULL, `CNY` DECIMAL(10,0) NULL DEFAULT NULL,  `regdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,PRIMARY KEY (`idx`) USING BTREE ) COLLATE='utf8_general_ci' ENGINE=InnoDB;
// forNumberedId:TABLE_NAME
// CREATE TABLE forNumberedId (`idx` INT(11) NOT NULL AUTO_INCREMENT,`counts` DECIMAL(10,0) NULL DEFAULT NULL,  `regdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,PRIMARY KEY (`idx`) USING BTREE ) COLLATE='utf8_general_ci' ENGINE=InnoDB;
// notice:TABLE_NAME
// CREATE TABLE notice (`idx` INT(11) NOT NULL AUTO_INCREMENT,`createdAt` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `title` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `content` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `index` DECIMAL(10,0) NULL DEFAULT NULL,  `regdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,PRIMARY KEY (`idx`) USING BTREE ) COLLATE='utf8_general_ci' ENGINE=InnoDB;
// optionSet:TABLE_NAME
// CREATE TABLE optionSet (`idx` INT(11) NOT NULL AUTO_INCREMENT,`optionSetName` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci',  `regdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,PRIMARY KEY (`idx`) USING BTREE ) COLLATE='utf8_general_ci' ENGINE=InnoDB;
// orders:TABLE_NAME
// CREATE TABLE orders (`idx` INT(11) NOT NULL AUTO_INCREMENT, `regdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,PRIMARY KEY (`idx`) USING BTREE ) COLLATE='utf8_general_ci' ENGINE=InnoDB;
// products:TABLE_NAME
// CREATE TABLE products (`idx` INT(11) NOT NULL AUTO_INCREMENT,`sku` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `artist` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `limitedStock` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `stock` DECIMAL(10,0) NULL DEFAULT NULL, `z` DECIMAL(10,0) NULL DEFAULT NULL, `stockHistory` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `preOrderDeadlineTime` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `category` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `totalStock` DECIMAL(10,0) NULL DEFAULT NULL, `weight` DECIMAL(10,0) NULL DEFAULT NULL, `bigC` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `descrip` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `totalSold` DECIMAL(10,0) NULL DEFAULT NULL, `ent` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `options` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `y` DECIMAL(10,0) NULL DEFAULT NULL, `productMemo` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `thumbNail` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `exposeToB2b` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `createdAt` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `x` DECIMAL(10,0) NULL DEFAULT NULL, `barcode` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `preOrderDeadline` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `purchasePrice` DECIMAL(10,0) NULL DEFAULT NULL, `reStockable` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `relDate` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `title` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `price` DECIMAL(10,0) NULL DEFAULT NULL,  `regdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,PRIMARY KEY (`idx`) USING BTREE ) COLLATE='utf8_general_ci' ENGINE=InnoDB;
// reStockRequests:TABLE_NAME
// CREATE TABLE reStockRequests (`idx` INT(11) NOT NULL AUTO_INCREMENT,`qty` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `requestDate` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `barcode` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `sku` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `customer` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `title` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `confirmed` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci',  `regdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,PRIMARY KEY (`idx`) USING BTREE ) COLLATE='utf8_general_ci' ENGINE=InnoDB;
// rooms:TABLE_NAME
// CREATE TABLE rooms (`idx` INT(11) NOT NULL AUTO_INCREMENT,`userName` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci',  `regdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,PRIMARY KEY (`idx`) USING BTREE ) COLLATE='utf8_general_ci' ENGINE=InnoDB;
// shipping:TABLE_NAME
// CREATE TABLE shipping (`idx` INT(11) NOT NULL AUTO_INCREMENT,`states` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `shippingRate` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `shippedDate` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `shippingNumber` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `companyName` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `customer` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `checkItemAmountPrice` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `orderCreatedAt` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `taxId` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `recipientEmail` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `city` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `recipient` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `currency` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `shippingType` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `recipientPhoneNumber` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `list` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `shippingMessage` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `zipcode` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `checkedItemPrice` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `street` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `checkedItemsFee` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `country` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `trackingNumber` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `inputWeight` DECIMAL(10,0) NULL DEFAULT NULL, `orderId` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `nickName` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci', `orderNumber` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8_unicode_ci',  `regdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,PRIMARY KEY (`idx`) USING BTREE ) COLLATE='utf8_general_ci' ENGINE=InnoDB;

console.log('############  program end  ##############');