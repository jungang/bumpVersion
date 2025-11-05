"use strict";
/**
 * Created by jg on 2018/11/6.
 */

let obj = {
  abc:"1"
};

module.exports = obj;
exports = obj;


console.log(module);
console.log(exports);
console.log(module.exports === exports);


