const fs = require('fs');
const jsonFile = fs.readFileSync('./source/accounts_1.json', 'utf8');
const jsonData1 = JSON.parse(jsonFile);
console.log(jsonData1+":jsonData1 \n"+Object.keys(jsonData1).length+"\n"+Object.keys(jsonData1));
let L1 = Object.keys(jsonData1);
// console.log(jsonData1[L1]);
let L2 = Object.keys(jsonData1[L1]);
let L2_Cnt = Object.keys(jsonData1[L1]).length;
console.log(L2 +" : L2 / L2.length : " + L2.length);
// for(i=0;i<L2_Cnt;i++){
//   console.log("i:"+i + " / "+Object.values(jsonData1[L1][L2]));
// }

// 실제 사용자 data
Object.keys(jsonData1[L1]).forEach((record) => {
  const _key = Object.keys(record);
  const _values = Object.values(record);
  const _len = Object.keys(record).length;
  console.log(_key +":_key\n" + _values +":_values\n" + _len +":_len\n");
});
// 실제 사용자 data
Object.values(jsonData1[L1]).forEach((record) => {
  const _key = Object.keys(record);
  const _values = Object.values(record);
  const _len = Object.keys(record).length;
  console.log(_key +":_key\n" + _values +":_values\n" + _len +":_len\n");
});