// 引用預設匯出
// import 變數 from 檔案或套件
// 檔案必須寫相對路徑 ./ 或 ../
import name from './exportdefault.js';

// 引用具名匯出
// 可以用 as 將變數重新命名
// import { aaa, bbb as b, ccc, edit } from './export.js';

import exp, * as all from './export.js';

console.log(name.firstName);
console.log(name.lastName);
console.log(name.fullName());

console.log(all.aaa);
console.log(all.bbb);

console.log('原值: ' + all.ccc);
all.edit('123');
console.log('新值: ' + all.ccc);

console.log(exp);
