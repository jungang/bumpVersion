$( function () {

	var WrW = $(document).width()-50;
	var fff = $(window).width()-100;
	
	$('.ri-wrap').css({
		'width': WrW
	});



	//关闭 pas
	$('.pas').click( function () {
		$('.ri-wrap').hide();
	});

	var sellen = $('.seleb').length;
	if( sellen > 3)$('.wra-con').css({'overflow-y':'scroll'});

	// click 试卷列表btn

	$('.star-btn').click( function () {
		$('.wra-con').fadeOut('fast');
		$('.answer').fadeIn('fast');
	});

	// click 查看和成绩

	$('.look').click( function () {
		$('#analysis').fadeOut('fast');
		$('#hand-wr').fadeIn('fast');
	});

	// 解析

	$('.solve').click( function () {
		$('.wra-con').css({'display':'none'});
		$('.answer').css({'display':'none'});
		$('#hand-wr').css({'display':'none'});
		$('#analysis').css({'display':'block'});
	});

	// 选题

	var lenS = $('#di-no span').length,lenT = $('.wr-botm span').length;
	
	$('#btn-tos').click( function () {
		
		if( $('#btn-tos').attr('class') == 'btn-to' ){
			$('#di-no').slideDown();
			$('#btn-tos h1').css({'background':'url('+cxt+'/images/quizzes/v2/pic12.png) no-repeat'});
			$('#rata').hide();
			$('#btn-tos').attr('class','btn-tos');
		}else{
			$('#di-no').slideUp();
			$('#btn-tos h1').css({'background':'url('+cxt+'/images/quizzes/v2/pic13.png) no-repeat'});
			$('#rata').show();
			$('#btn-tos').attr('class','btn-to');
		}
	});
	
	
	$('#btn-t').click( function () {
		
		if( $('#btn-t').attr('class') == 'btn-to' ){
			$('#btn-t').text('收起答题卡');
			$('#di-tw').slideDown();
			$('#btn-t').attr('class','btn-t');
		}else{
			$('#btn-t').text('展开答题卡');
			$('#di-tw').slideUp();
			$('#btn-t').attr('class','btn-to');
		}
		
	});
	
	if( lenS > 200 )$('#di-no').css({'height':'200','overflow-y':'scroll'});
	if( lenT > 200 )$('#di-no').css({'height':'200','overflow-y':'scroll'});
	

	if(navigator.userAgent.indexOf("MSIE")>0){   

      if(navigator.userAgent.indexOf("MSIE 7.0")>0){  
          $('.wra-con').css({'height':fff});
          $('.next h2').css({'display':'none'});
          $('.answer').css({'height':'710'});
          $('#hand-wr').css({'height':'710'});
          $('#analysis').css({'height':'710'});
      }   

    } 

});
	
	











