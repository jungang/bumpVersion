"use strict";
/**
 * Created by jg on 2/28/2019.
 */


function points(games) {

    var score = 0;

    games.forEach(function (item) {
        var arr = item.split(':')

        let n = 0;
                if(parseInt(arr[0]) > parseInt(arr[1]))   {
            n=3;
        }
        if(parseInt(arr[0]) <parseInt(arr[1]))   {
            n=0;
        }
        if(parseInt(arr[0]) === parseInt(arr[1])) {
            n=1;
        }
                score += n
    })

    return  score
}


points(['1:0','2:0','3:0','4:0','2:1','3:1','4:1','3:2','4:2','4:3'])
