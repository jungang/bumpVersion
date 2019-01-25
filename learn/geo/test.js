"use strict";
/**
 * Created by jg on 2019.1.25.0025.
 */


//进行经纬度转换为距离的计算

function Rad(d){
	return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
}
//计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
function GetDistance(lat1,lng1,lat2,lng2){
	let radLat1 = Rad(lat1);
		console.log(radLat1);
	let radLat2 = Rad(lat2);
		console.log(radLat2);
	let a = radLat1 - radLat2;
	let  b = Rad(lng1) - Rad(lng2);
	let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
			Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
	s = s *6378.137 ;// EARTH_RADIUS;
	s = Math.round(s * 10000) / 10000; //输出为公里
	//s=s.toFixed(4);
	return s;
}


//随机生成

	Math.random()*100;

let n=100;
let arr = []
for(let i=1;i<=n;i++){
	arr.push([Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100])
}

console.log(arr);


/*




console.log(GetDistance(39.9047253699,116.4072154982,39.9058180036,116.4197524695));
console.log(GetDistance(39.9047253699,116.4072154982,39.8818156775,116.4464950562));
*/

