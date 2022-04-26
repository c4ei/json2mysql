const data = {
  "accounts": {
      "aaa@gmail.com": {
          "zipcode": "",
          "inCharge": ""
     },
      "bbb@gmail.com": {
          "zipcode": "",
          "inCharge": ""
     },
     "c4ei.net@gmail.com": {
      "type": "admin",
      "recipientPhoneNumber": "",
      "recipient": "",
      "createdAt": {
          "__datatype__": "timestamp",
          "value": {
              "_seconds": 1650861874,
              "_nanoseconds": 30000000
          }
      },
      "country": "Albania (AL)",
      "credit": 0,
      "street": "",
      "memo": "",
      "photoURL": "https://lh3.googleusercontent.com/a/AATXAJxtnsJKxTyJP_-Ae4IFhmzMOCxMPEF8vDtRkcDO=s96-c",
      "inCharge": "rudghksldl@gmail.com",
      "states": "",
      "nickName": "개발자님",
      "shippingRate": {
          "dhl": 10000
      },
      "companyName": "",
      "taxId": "",
      "shippingMessage": "",
      "city": "",
      "uid": "Kef0HYcjqSaVqu2j6cuQLYLW21F2",
      "phoneNumber": null,
      "creditDetails": [
          {
              "totalAmount": 0,
              "date": {
                  "__datatype__": "timestamp",
                  "value": {
                      "_seconds": 1650861874,
                      "_nanoseconds": 31000000
                  }
              },
              "amount": 0,
              "type": "createAccount"
          }
      ],
      "zipcode": "",
      "recipientEmail": "",
      "email": "c4ei.net@gmail.com",
      "dcRates": {
          "goods": 0,
          "TEST": 0,
          "dvdBlueRay": 0,
          "specialOrder": 0,
          "BT21": 0,
          "officialStore": 0,
          "cd": 0,
          "photoBook": 0,
          "beauty": 0
      },
      "displayName": "ei c4",
      "alias": "c4e",
      "currency": "KRW",
      "dcAmount": {
          "cdA": 0,
          "goodsA": 0,
          "photoBookA": 0,
          "TESTA": 0,
          "specialOrderA": 0,
          "officialStoreA": 0,
          "BT21A": 0,
          "beautyA": 0,
          "dvdBlueRayA": 0
      },
      "__collections__": {
          "addresses": {
              "#1": {
                  "zipcode": "",
                  "street": "",
                  "shippingType": "",
                  "city": "",
                  "paymentMethod": "",
                  "states": "",
                  "name": "# 1",
                  "country": "",
                  "recipient": "",
                  "recipientEmail": "",
                  "recipientPhoneNumber": "",
                  "__collections__": {}
              },
              "#2": {
                  "recipientPhoneNumber": "",
                  "paymentMethod": "",
                  "shippingType": "",
                  "zipcode": "",
                  "name": "# 2",
                  "country": "",
                  "street": "",
                  "recipientEmail": "",
                  "states": "",
                  "recipient": "",
                  "city": "",
                  "__collections__": {}
              },
              "#3": {
                  "recipientEmail": "",
                  "paymentMethod": "",
                  "name": "# 3",
                  "states": "",
                  "zipcode": "",
                  "recipientPhoneNumber": "",
                  "shippingType": "",
                  "city": "",
                  "street": "",
                  "recipient": "",
                  "country": "",
                  "__collections__": {}
              },
              "defaultAddress": {
                  "recipient": "",
                  "shippingType": "",
                  "name": "Default Address",
                  "city": "",
                  "paymentMethod": "",
                  "zipcode": "",
                  "country": "",
                  "recipientPhoneNumber": "",
                  "states": "",
                  "street": "",
                  "recipientEmail": "",
                  "__collections__": {}
              },
              "shipToKorea": {
                  "zipcode": "",
                  "address": "",
                  "name": "Ship To Korea",
                  "detailAddress": "",
                  "recipientEmail": "",
                  "recipientPhoneNumber": "",
                  "paymentMethod": "",
                  "shippingType": "",
                  "recipient": "",
                  "__collections__": {}
              }
          }
      }
    }
  }
}

// console.log(data.accounts["c4ei.net@gmail.com"])
// console.log(columns);
//__collections__

// const columns = "`idx` INT(11) NOT NULL AUTO_INCREMENT,";
const TABLE_NAME = "account";
const apppen_columns = "`idx` INT(11) NOT NULL AUTO_INCREMENT,";
const columns = Object.keys(data.accounts["c4ei.net@gmail.com"]);   //.()
// console.log(columns + " : columns [39 line]");
const schema = columns.join("` varchar(200), `");
// schema.replace('`__collections__`','regdate');
// let str_app = "`regdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,PRIMARY KEY (`idx`) USING BTREE ) COLLATE='utf8_general_ci' ENGINE=InnoDB";

console.log( "CREATE TABLE " + TABLE_NAME + " (" + apppen_columns +"`"+ schema + "` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);" );


/*
CREATE TABLE account (`idx` INT(11) NOT NULL AUTO_INCREMENT,`type` varchar(200), `recipientPhoneNumber` varchar(200), 
`recipient` varchar(200), `createdAt` varchar(200), `country` varchar(200), `credit` varchar(200), `street` varchar(200), 
`memo` varchar(200), `photoURL` varchar(200), `inCharge` varchar(200), `states` varchar(200), `nickName` varchar(200), 
`shippingRate` varchar(200), `companyName` varchar(200), `taxId` varchar(200), `shippingMessage` varchar(200), `city` varchar(200), 
`uid` varchar(200), `phoneNumber` varchar(200), `creditDetails` varchar(200), `zipcode` varchar(200), `recipientEmail` varchar(200), 
`email` varchar(200), `dcRates` varchar(200), `displayName` varchar(200), `alias` varchar(200), `currency` varchar(200), `dcAmount` varchar(200), 
`regdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
,PRIMARY KEY (`idx`) USING BTREE
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;
*/

