// JavaScript Document
var xmlhttp;
var sign=0;
function qianDao()
{
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  var userid=document.getElementById("userid").value;
  var url="qd.do?userid="+userid;
  xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
		if(sign==1)
		{
    		document.getElementById("username").innerHTML=xmlhttp.responseText;
		}
		else
		{
			alert("工号输入错误！");
		}
    }
  }
xmlhttp.open("GET",url,true);
xmlhttp.send();
}
function confirm()
{
	if(sign==1)
	{
		alert("签到成功！");
		document.getElementById("username").innerHTML="";
	}
	else
	{
		alert("请输入您的工号！");
	}
}