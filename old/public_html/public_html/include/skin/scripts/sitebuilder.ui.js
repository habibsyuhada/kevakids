var MENU_ITEMS = new Array();

function adjustSizes(){
	var windowHeight = $(window).height();
	
	newSidebarHeight = windowHeight - 130;
	newEditorHeight = newSidebarHeight - 143;
	newSchortcutsHeight = newSidebarHeight - 153;
	newEditorDesignHeight = newSidebarHeight - 63;

	$("#sidebar").css("height", newSidebarHeight + "px")
	/*$("#wizardSidebar").css("height", (newSidebarHeight-86) + "px")*/
	$("#editor textarea").css("height", newEditorHeight + "px")
	$("#editorDesign textarea").css("height", newEditorDesignHeight + "px")
	$("#cmsShortcuts").css("height", newSchortcutsHeight + "px")
};

function prepareScroller (scrollerId)
{
	function scrollNext () {
		var currentScroll = parseInt($(scrollerContainer).css("marginLeft"));
		var scrollTo = (currentScroll - scrollLength) + "px";
		
		$(scrollerContainer).animate({marginLeft: scrollTo});
		$(nextButton).fadeOut();
		$(prevButton).fadeIn();
		
	}
	
	function scrollPrev () {
		var currentScroll = parseInt($(scrollerContainer).css("marginLeft"));
		var scrollTo = (currentScroll + scrollLength) + "px";
		$(scrollerContainer).animate({marginLeft: scrollTo});
		$(nextButton).fadeIn();
		$(prevButton).fadeOut();
		
	}
	
	if ($("#" + scrollerId))
	{
		var scroller = $("#" + scrollerId);
		var scrollerWidth = $(scroller).width();
		var scrollerContainer = $(scroller).children(".thumbnailList");
		var scrollerItems = $(scrollerContainer).children("li");
		var scrollerItem = $(scroller).find(".thumbnailList li").get(0);
		var scrollerItemMarginLeftRight = 60;
		var scrollerItemWidth = $(scrollerItem).width();
		var scrollerItemTotalWidth = scrollerItemWidth + scrollerItemMarginLeftRight;
		var numItemsPerScroll = Math.floor(scrollerWidth / scrollerItemTotalWidth);
		var scrollLength = scrollerItemTotalWidth * (numItemsPerScroll - 0.5);
	
		var nextButton = $("<div class=\"nextButton none\"></div>");
		var prevButton = $("<div class=\"prevButton none\"></div>");
		var nextButtonContainer = $(scrollerItems).get(numItemsPerScroll);
		var prevButtonContainer = $(scrollerItems).get(numItemsPerScroll - 1);
		
		$(nextButtonContainer).prepend(nextButton);
		$(prevButtonContainer).prepend(prevButton);

		$(nextButton).bind("click", function(){
			scrollNext ();
		});
		
		$(prevButton).bind("click", function(){
			scrollPrev ();
		});
		
		$(nextButton).fadeIn(600);
		
		//console.log($(nextButtonContainer).html());
	}
}

function showPopup (popupWrapperID)
{
	var popupWrapper = $("#" + popupWrapperID);
	
	if($(popupWrapper).css("display") != "none")
	{
		$(popupWrapper).fadeOut(300);
	}
	else
	{
		$(popupWrapper).fadeIn(200);
		$(popupWrapper).find(".closeButton").click(function(){
			$(popupWrapper).fadeOut(300);
		});
	};			
}

function showSection ()
{
	var section = $("#" + arguments[0]);
	var altSection;
	
	if(arguments[1]) {
		 altSection = $("#" + arguments[1]);
	}
	
	if($(section).css("display") != "none")
	{
		$(section).slideUp(200);
		if(altSection) {
			$(altSection).animate({"opacity": 1}, 300);
		}
	}
	else
	{
		$(section).slideDown(300);
		if(altSection) {
			$(altSection).animate({"opacity": 0.3}, 400);
		}
	};	
}

function selectMediaGroup (mediaGroup) {

}

function showUploaderPanel () {
	if($("#uploaderPanel").css("width") == "0px")
	{
		$("#uploaderPanel").animate({"width": "453px"});
	}
	else
	{
		$("#uploaderPanel").animate({"width": "0px"});
	}
}


$("document").ready(function(){

	adjustSizes();
	
	/* Prepare Scroller */
	prepareScroller("thumbScrollerEditorPicked");
	prepareScroller("thumbScrollerNewThemes");
	
	$("#evokePopupFromWidgetSetting").click(function(){
		showPopup("popupWidgetSetting");
	});
	
	$("#evokePopupFromModuleSetting").click(function(){
		showPopup("popupModuleSetting");
	});
	
	$("#evokePopupFromSiteConfiguration").click(function(){
		showPopup("popupSiteConfiguration");
	});
	
	$("#evokePopupFromAssetManager").click(function(){
		 $.get("/asset/index",function(data){
                       $("#bodyAssetManager").html(data);
		 });
		 showPopup("popupAssetManager");
	});
	
       $("#evokePopupFromMenuAssetManager").click(function(){
               $.get("/asset/index/Menu",function(data){
                       $("#bodyMenuAssetManager").html(data);
               });
               showPopup("popupMenuAssetManager");
       });

	
	$("#wizardDesignList li a.evokePopupDesign").click(function(){
               var str = $(this).attr("id");
               var template = str.replace('template','');
               $.get("/admin/layout/popup/"+template,function(data){
// 		       alert(data);
                       $("#contentPickDesign").html(data);
               });
		showPopup("popupPickDesign");
	});

       $("#evokePopupMenuAdd").click(function(){
               showPopup("popupMenuAdd");
       });
 
       $("#evokePopupMenuEdit").click(function(){
               showPopup("popupMenuEdit");
       });
 
	$("#showAddCustomWidgetSection").click(function(){
// 		showSection("sectionAddCustomWidget", "sectionWidgets");
	});
	
	$("#showMediaUploaderSection").click(function(){
		showSection("popupSectionUploadMedia", "popupSectionBrowseMedia");
	});
	
	$("#cancelUploader").click(function(){
		showSection("popupSectionUploadMedia", "popupSectionBrowseMedia");
	});
	
	$("#completeUploader").click(function(){
		showSection("popupSectionUploadMedia", "popupSectionBrowseMedia");
	});
	
	$("#dashboardTodoList li a").click(function(){
		var todoList = $(this).parents("ul");
		var pCurrentlyVisible = $(todoList).find("li p.visible");
		var pToBeVisible = $(this).siblings("p");
		
		$(pCurrentlyVisible).slideUp();
		$(pToBeVisible).slideDown();
		
		$(pToBeVisible).addClass("visible");
		
		//alert($(pCurrentlyVisible).html());
	});
	
	$(".buttonEvokeMenu").each(function(){
		var menuId = $(this).attr("id").replace("evoke_", "");
		var menuItem = $("#" + menuId);
		
		MENU_ITEMS.push(menuItem);
		
		$(this).click(function(e){
			for (i=0; i < MENU_ITEMS.length; i++)
			{
				MENU_ITEMS[i].fadeOut(300);
			}
			
			if($(menuItem).css("display") != "none")
			{
				$(menuItem).fadeOut(300);
			}
			else
			{
				$(menuItem).fadeIn(200);
			};
			
			e.stopPropagation();
		  	$("body").click(function(){
		  		$(menuItem).fadeOut(300);
		  	});

		});
	});
	
	$("#evokeEditMedia").click(function(){
		var evoker = this;
		var panelToScroll = $("#mediaBrowserMultiExplorer .panelGroup");
		var scrollWidth = 447;//$(panelToScroll).width();

		if($(panelToScroll).css("marginLeft") == "0px") {
			$(panelToScroll).animate({marginLeft: "-" + scrollWidth + "px"}, 300);
			$(evoker).html("Kembali");
		}
		else
		{
			$(panelToScroll).animate({marginLeft: 0}, 300, function(){
				$(evoker).html("Edit");
			});
		}
	});
	
	$("#mediaBrowserEditor .editingGroup .evoker").click(function(){
		var evoker = this;
		var operation = $(evoker).siblings(".operation");
		
		if($(operation).is(":visible"))
		{
			$(operation).slideUp(100);
			$(operation).parent().css({backgroundColor: "#eeeeee"});
		}
		else
		{
			$(operation).slideDown(100);
			$(operation).parent().css({backgroundColor: "#ffffff"});
		}
	});
	
	$(window).bind("resize", function(){
		adjustSizes();
	});
	
	$("#mediaGroup .groupItem .groupName").click(function(){
		var tobeVisibleGroup = $(this).parent();
		var currentlyVisibleGroup = $(tobeVisibleGroup).siblings(".groupItemSelected");
		
		$(tobeVisibleGroup).addClass("groupItemSelected");
		$(currentlyVisibleGroup).removeClass("groupItemSelected");
		
		$(tobeVisibleGroup).find(".groupContent").slideDown(300);
		$(currentlyVisibleGroup).find(".groupContent").slideUp(300);
	});
	
	$("#mediaGroup button.extraButtonUpload").click(function(){
		showUploaderPanel();
	});
});
