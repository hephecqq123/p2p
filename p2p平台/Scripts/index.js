// JavaScript Document
$(document).ready(function() {
$("#weibo").mouseover(function() {
    $( this).css("background","url(../../images/Icon.png) -29px -321px no-repeat");
});
$("#weibo").mouseout(function() {
    $( this).css("background","url(../../images/Icon.png) 0px -321px no-repeat");
});
$("#weixin").mouseover(function() {
    $( this).css("background","url(../../images/Icon.png) -87px -321px no-repeat");
});
$("#weixin").mouseout(function() {
    $( this).css("background","url(../../images/Icon.png) -58px -321px no-repeat");
});

    $("#personNav-box0").toggle(
        function(){$("#SecondNav0").slideUp("fast");},
        function(){$("#SecondNav0").slideDown("fast");});
	$("#personNav-box1").toggle(
	function(){$("#SecondNav1").slideUp("fast");},
	function(){$("#SecondNav1").slideDown("fast");});
	$("#personNav-box2").toggle(
	function(){$("#SecondNav2").slideUp("fast");},
	function(){$("#SecondNav2").slideDown("fast");});
	$("#personNav-box3").toggle(
	function(){$("#SecondNav3").slideUp("fast");},
	function(){$("#SecondNav3").slideDown("fast");});
	$("#personNav-box4").toggle(
	function(){$("#SecondNav4").slideUp("fast");},
	function(){$("#SecondNav4").slideDown("fast");});

 //$("#trade-table,#recharge-table,#withdraw-table,#income-table,#record-table").find("tr:even").css("background-color","#f2f2f2");
});

// setPages(parseInt(data.COUNT, 10) *5, pageindex,fenyecontainer);

function setPages(recordCount, pageIndex,list_id) {

    pageIndex = parseInt(pageIndex, 10);
    recordCount = parseInt(recordCount, 10);

    var pageCount = recordCount % 5 == 0 ? parseInt(recordCount / 5, 10) : parseInt(recordCount / 5, 10) + 1;

    var startPage = pageIndex - 2;

    if (startPage < 1) { startPage = 1; }

    var endPage = startPage + 4;

    if (endPage >= pageCount) { endPage = pageCount; }

    if (endPage > 5) {
        startPage = endPage - 4;
    }
    else {
        startPage = 1;
    }

    var pageHtml = '';

    if (pageIndex > 1) {

        pageHtml += '<li class="fenye-hover" onclick="PageJump(' + (pageIndex - 1) + ')"><</li>';

        if (startPage > 2) {

            pageHtml += '<li class="fenye-gong" onclick="PageJump(1)">1</li>';
            pageHtml += '<li style="width:20px;"><span style="font-size:16px;">...</span></li>';
        }

    } else {

        pageHtml += ' <li class="fenye-hover"> < </li>';
    }


    for (var i = startPage; i <= endPage; i++) {

        if (pageIndex == i) {

            pageHtml += '<li class="fenye-hover" onclick="PageJump(' + i + ')">' + i + '</li>';

        } else {
            pageHtml += '<li class="fenye-gong" onclick="PageJump(' + i + ')">' + i + '</li>';
        }
    }


    if (pageIndex >= pageCount) {

        pageHtml += '<li class="fenye-hover" onclick="PageJump(' + pageCount + ')" > > </li>';

    } else {

        if ((pageCount - endPage) > 1) {
            pageHtml += '<li style="width:20px;"><span style="font-size:16px;">...</span></li>';
            pageHtml += '<li class="fenye-gong" onclick="PageJump(' + pageCount + ')">' + pageCount + '</li>';
        }

        pageHtml += '<li class="fenye-hover" onclick="PageJump(' + (parseInt(pageIndex, 10) + 1) + ')"> > </li>';
    }

    $('#' + list_id).html('<ul style="">' + pageHtml + '</ul>');
}



	
