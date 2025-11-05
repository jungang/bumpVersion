"use strict";
/**
 * Created by jg on 2018/11/6.
 */




exports.name = 'rainbow';

exports.setName = function (str) {
  exports.name = str;
  return exports.name;
};

exports.sayName = function () {
  return exports.name
};


console.log(module);

