$(document).ready(function(){
	$(".album").click(function(){
		albumnames = $(this).attr("id");
		$.get('listpicture/'+albumnames, function(data){
			$('#listPicture').html(data);
		});
		
	});
}); 
