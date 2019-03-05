"use strict";
/**
 * Created by jg on 3/5/2019.
 */


function nbYear(p0, percent, aug, p) {

    let year = 0;

    //1000 + 1000 * 0.02 + 50 => 1070 inhabitants

    while (p0<p)
    {

        p0 += p0 + (p0 *percent / 100) + aug;
        console.log(p0);

    }



}


console.log(nbYear(1500, 5, 100, 5000));
