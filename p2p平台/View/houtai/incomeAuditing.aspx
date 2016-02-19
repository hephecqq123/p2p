<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Top.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
	
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
  <style>
 .gradient{

            filter:alpha(opacity=100 finishopacity=50 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr=#fff,endcolorstr=#d1d1d1,gradientType=0);
            -ms-filter:alpha(opacity=100 finishopacity=50 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr=#fff,endcolorstr=#d1d1d1,gradientType=0);/*IE8*/
            background:#fff; /* 一些不支持背景渐变的浏览器 */
            background:-moz-linear-gradient(top, #fff, #d1d1d1);
            background:-webkit-gradient(linear, 0 0, 0 bottom, from(#fff), to(#d1d1d1));
            box-shadow: 0 2px 4px #9d9d9d;
            border:solid 1px #cccccc;
            color:#009dd7;
        }
        .gradient:hover{
            background: #fff;
        }
        table{
            border-collapse: collapse;
           
        }
        table th ,table td{
            border: 1px dotted #eee;
            height:24px;
            margin:5px 0;
            padding:1px 3px;
        }
table th{font-size:12px;font-weight:600;border-bottom:2px solid #FF9;background:#fff}
table td {
color:#666;
font-size:12px;
}

.person_fenye{width:100%;margin-top:20px;height:30px;float: right;}
.person_fenye li {
    float: left;
    cursor: pointer;
}
.fenye-hover {
    height: 27px;
    width: 27px;
    text-align: center;
    line-height: 27px;
    background: #3fc1f5;
    color: #fff;
    margin-right: 10px;
}
.fenye-gong {
    height: 27px;
    width: 27px;
    text-align: center;
    line-height: 27px;
    background: #d7d7d8;
    color: #fff;
    margin-right: 10px;
}
.bg
{
    display:block;
    padding:2px 5px;
    color:Red;
    background-color:#f5f5f5;
}

.bg-hover
{
    background-color:#eaf2ff;
}
.bg-click
{
    background-color:#ffe48d;
}
</style>
<script type="text/javascript">
    $(function () {  Getincome(1) })
    function Getincome(indexpage) {
        var pagerow = 15;
        if (indexpage == undefined)
            indexpage = 1;
        $.post('Getincome', { rows: pagerow, index: indexpage }, function (data) {
            var html = "<tr><td>序号</td><td>充值客户</td><td>客户身份证</td><td>客户电话</td><td>充值金额</td><td>充值时间</td><td>充值方式</td><td>订单编号</td><td>通联编号</td><td>公司</td><td colspan='2'>操作</td></tr>";
            if (data.length > 0) {
                setPages(data[0].total, pagerow, indexpage, "record_fenye");
                for (var i = 0; i < data.length; i++) {
                    html += '<tr><td>' + data[i].num + '</td><td>' + data[i].username + '</td><td>' + data[i].custominfo_card_num + '</td><td>' + data[i].account_phone + '</td><td>' + data[i].Funds_money + '</td><td>' + data[i].Funds_time + '</td><td>' + data[i].type_name + '</td><td>' + data[i].Orders_num + '</td><td>' + data[i].Tonglian_num + '</td><td>' + data[i].com_name + '</td><td><a class="bg" onclick="updata(\'' + data[i].Id + '\')">确定</a></td><td><a class="bg" onclick="deleteset(\'' + data[i].Id + '\')">取消</a></td></tr>';
                }
                $('#tab').html('');
                $('#tab').html(html);
                $('#tab').find('tr:first').css("backgroundColor", "#f5f5f5");
                $("#tab").find("tr").mouseover(function () {
                    if ($(this).hasClass("bg-click")) {

                    } else {

                        $(this).addClass("bg-hover");
                    }
                });

                $("#tab").find("tr").mouseleave(function () {

                    $(this).removeClass("bg-hover");
                });
                $("#tab").find("tr").click(function () {
                    $("#tab").find("tr").removeClass("bg-click");
                    $(this).addClass("bg-click");

                });
            }
            else {
                html = "<td>没有数据！</td>";
                $('#tab').html('');
                $('#tab').html(html);
               
            }
        });
        
    }
    function updata(id) {
        $.post('upincome', { Gid:id }, function (data) {
            Getincome(1);
        });

    }
    function deleteset(id) {
        $.post('deleteset', { Gid: id }, function (data) {
            Getincome(1);
        });
    }
    function PageJump(indexpage) {
        Getincome(indexpage);
    }
</script>
<div width="100%">
        <div style="text-align: center;margin-top: 20px;">
        <h1 style="color:#009dd7;font-size:24px;">充值审核</h1>
        </div>
    <div style="height:580px;width:75%;margin:30px auto;border: 1px solid #95b8e7;position:relative;"> 
    <table id="tab" width="100%" style="margin:auto;text-align:center;">
        <tr>
        <td>序号</td>
        <td>充值客户</td>
        <td>充值金额</td>
        <td>充值时间</td>
        <td>订单编号</td>
        <td>通联编号</td>
        <td>操作</td>
        </tr>
    </table>
  <div class="person_fenye" id="record_fenye" style="position:absolute;bottom:10px;right:20px;">

 </div>
    </div>

</asp:Content>
