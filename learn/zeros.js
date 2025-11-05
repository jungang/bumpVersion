"use strict";
/**
 * Created by jg on 2/28/2019.
 */


function zeros (n) {

    console.log(n)
    var zs = 0;
    while(n>0){
        n=Math.floor(n/5);
        zs+=n
    }
    return zs;
}






