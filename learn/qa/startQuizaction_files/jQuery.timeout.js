(function($){
    // 毫秒倒计时 格式 00：00：00  分钟：秒：类毫秒
    $.fn.millisecond = function(total,callBack){
        var time,total,m,s,q,callBack;
        var time    = 1,
            speed   = 10,
            _this   = $(this);

        if (typeof(arguments[0])=='function'){
            callBack = arguments[0]; 
        }else{
            time = isNaN(total)?1:Math.abs(total),
            callBack= typeof(callBack)=='function'?callBack:function(){};
        }
        total = time *6000;
        
        var T = setInterval(function(){
            if(total >= 0){
                m = Math.floor(total/6000) > 9? Math.floor(total/6000): "0" + Math.floor(total/6000), //分钟
                s = Math.floor((total/100)%60) > 9? Math.floor((total/100)%60): "0" + Math.floor((total/100)%60), //秒数
                q = total%100> 9? total%100: "0"+total%100; //毫秒 两位  
                _this.html(m +'分'+ s +'秒'+q);
                total--;
            }else{
                _this.html('00分00秒00');
                clearInterval(T);
                callBack();
            }
        },speed);
        return _this;
    }
    // 倒计时 格式 00：00 分钟：秒
    $.fn.second = function(total,callBack){
        var time,total,m,s,q,callBack;
        var time    = 1,
            speed   = 1000,
            _this   = $(this);

        if (typeof(arguments[0])=='function'){
            callBack = arguments[0]; 
        }else{
            time = isNaN(total)?1:Math.abs(total),
            callBack= typeof(callBack)=='function'?callBack:function(){};
        }
        total = time *60;
        
        var T = setInterval(function(){
            if(total >= 0){
                m = Math.floor(total/60) > 9? Math.floor(total/60): "0" + Math.floor(total/60), //分钟
                s = Math.floor(total%60) > 9? Math.floor(total%60): "0" + Math.floor(total%60), //秒数
                _this.html(m +'分'+ s +'秒');
                total--;
            }else{
                _this.html('00分00秒');
                clearInterval(T);
                callBack();
            }
        },speed);
        return _this;
    }
    // 倒计时 格式 00：00 分钟：秒
    $.fn.hour = function(total,callBack){
        var time,total,m,s,q,callBack;
        var time    = 1,
            speed   = 1000,
            _this   = $(this);

        if (typeof(arguments[0])=='function'){
            callBack = arguments[0]; 
        }else{
            time = isNaN(total)?1:Math.abs(total),
            callBack= typeof(callBack)=='function'?callBack:function(){};
        }
        total = time *60;
        
        var T = setInterval(function(){
            if(total >= 0){
                h = Math.floor(total/3600) > 9? Math.floor(total/3600): "0" + Math.floor(total/3600), //分钟
                m = Math.floor((total-h*3600)/60) > 9? Math.floor((total-h*3600)/60): "0" + Math.floor((total-h*3600)/60), //分钟
                s = Math.floor(total%60) > 9? Math.floor(total%60): "0" + Math.floor(total%60), //秒数
                _this.html(h+'时'+m +'分'+ s +'秒');
                total--;
            }else{
                _this.html('00时00分00秒');
                clearInterval(T);
                callBack();
            }
        },speed);
        return _this;
    }

    $.fn.times = function(total,callBack){
        var satrt,T,h,m,s;
        var speed   = 1000,
            _this   = $(this);

        if (typeof(arguments[0])=='function'){
            callBack = arguments[0]; 
        }else{
            satrt = isNaN(total)?0:Math.abs(total),
            callBack= typeof(callBack)=='function'?callBack:function(){};
        }

        T = setInterval(function(){
            h = Math.floor(satrt/3600) > 9? Math.floor(satrt/3600): "0" + Math.floor(satrt/3600), //分钟
            m = Math.floor((satrt-h*3600)/60) > 9? Math.floor((satrt-h*3600)/60): "0" + Math.floor((satrt-h*3600)/60), //分钟
            s = Math.floor(satrt%60) > 9? Math.floor(satrt%60): "0" + Math.floor(satrt%60), //秒数
            _this.html('<em>'+ h +'</em> 时 <em>'+ m +'</em> 分 <em>'+ s +'</em> 秒');
            satrt++;
        },speed);
        return _this;
    }
})(jQuery);