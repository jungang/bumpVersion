$(function(){
    // 选择
    $('.choice > div').on('click',function(evt){
        if($.trim($(this).find("h1").attr("class"))=="radio"){
        	$(this).find("h1").removeClass('radio').addClass('radio_over');
        	$(this).siblings('div').find("h1").removeClass('radio_over').addClass('radio');
        }
        if($(this).find("h1").attr("class")=="checkbox"){
        	$(this).find("h1").removeClass('checkbox').addClass('checkbox_over');
        }else if($(this).find("h1").attr("class")=="checkbox_over"){
        	$(this).find("h1").removeClass('checkbox_over').addClass('checkbox');
        }
    });

});

/**
 * 检查该值是否有值
 * @param {Object} obj
 */
function isValid(obj)
{
	if(obj == null || obj == 'null' || obj == '' || 
			obj == undefined || obj == 'undefined' || obj.length == 0){
		return false;
	} else {
		return true;
	}
}