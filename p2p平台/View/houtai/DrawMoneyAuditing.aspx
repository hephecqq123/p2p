<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Top.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
	提现审核
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
    $(function () { Getincome(1); Getdata("",1); })
    function Getincome(indexpage) {
        
        var pagerow = 15;
        if (indexpage == undefined)
            indexpage = 1;
        $.post('GetDrawMoney', { rows: pagerow, index: indexpage }, function (data) {

            var html = "<tr><td>序号</td><td>提现客户</td><td>客户身份证号</td><td>提现方式</td><td>提现金额</td><td>打款金额</td><td>账号余额</td><td>申请时间</td><td>提现银行</td><td>所属支行</td><td>银行卡号</td><td colspan='2'>操作</td></tr>";
            if (data.length > 0) {

                setPages(data[0].total, pagerow, indexpage, "record_fenye");
                for (var i = 0; i < data.length; i++) {
                    data[i].bank_num = data[i].bank_address == "" ? data[i].com_name : data[i].bank_num
                    html += '<tr><td>' + data[i].num + '</td><td>' + data[i].username + '</td><td>' + data[i].custominfo_card_num + '</td><td>' + data[i].type_name + '</td><td>' + data[i].Funds_money + '</td><td>' + data[i].real_pay_money + '</td><td>' + data[i].Funds_yue + '</td><td>' + data[i].Funds_time + '</td><td>' + data[i].bank_address + '</td><td>' + data[i].bank_name + '</td><td>' + data[i].bank_num + '</td><td><a class="bg" onclick="updata(\'' + data[i].Id + '\')">确定</a></td><td><a class="bg" onclick="Getdata(\'' + data[i].custominfo_card_num + '\')">明细</a></td></tr>';
                }
                $('#tab').html('');
                $('#tab').html(html);
                //$('#tab').find('tr:even').css("backgroundColor", "#f3f9fc");
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
        $.post('upincome', { Gid: id }, function (data) {
            Getincome(1);
        });

    }
    function PageJump(indexpage) {
        Getincome(indexpage);
    }
     function PageJump2(indexpage) {
        var id = $('#custominfo_card_num').val();
        Getdata(id,indexpage);
    }
    function Getdata(id, indexpage) {
   
    $('#custominfo_card_num').val(id);
        var pagerow = 15;
        if (indexpage == undefined)
            indexpage = 1;
        $.post('GetAccountlist', { id: id, rows: pagerow, index: indexpage }, function (data) {
            var html = "<tr><td>序号</td><td>客户姓名</td><td>时间</td><td>事项</td><td>金额</td><td>当时余额</td></tr>";
            if (data.length > 0) {
                setPages2(data[0].total, pagerow, indexpage, "record_fenye2");
                for (var i = 0; i < data.length; i++) {
                    html += '<tr><td>' + data[i].num + '</td><td>' + data[i].username + '</td><td>' + data[i].Funds_time + '</td><td>' + data[i].type_name + '</td><td>' + data[i].Funds_money + '</td><td>' + data[i].Funds_yue + '</td></tr>';
                }
                $('#taba').html('');
                $('#taba').html(html);
                $('#taba').find('tr:first').css("backgroundColor", "#f5f5f5");
                $("#taba").find("tr").mouseover(function () {
                    if ($(this).hasClass("bg-click")) {

                    } else {

                        $(this).addClass("bg-hover");
                    }
                });

                $("#taba").find("tr").mouseleave(function () {

                    $(this).removeClass("bg-hover");
                });
                $("#taba").find("tr").click(function () {
                    $("#taba").find("tr").removeClass("bg-click");
                    $(this).addClass("bg-click");

                });
            }
            else {
                html = "<td>没有数据！</td>";
                $('#taba').html('');
                $('#taba').html(html);
            }
        });
    }
    
</script>
 <div width="100%">
        <div style="text-align: center;margin-top: 20px;">
        <h1 style="color:#009dd7;font-size:24px;">提现审核</h1>
        </div>
    <div style="width:100%"> 
    <input type="hidden" value="" id="custominfo_card_num" />
    <div style="float:left;height:820px; width:69%;">
    <div style="height:580px;margin:20px 10px 0 20px; border: 1px solid #95b8e7;position:relative;">
    <table id="tab" width="100%" style="margin:auto;text-align:center;">
    <tr><td>序号</td><td>提现客户</td><td>客户身份证号</td><td>提现金额</td><td>打款金额</td><td>账号余额</td><td>申请时间</td><td>提现银行</td><td>银行卡号</td><td colspan="2"><a>操作</a></td></tr>
    <tr><td>1</td><td>张三</td><td>420683198606126532</td><td>10000.00</td><td>10000.00</td><td>20000.00</td><td>2015-12-6</td><td>中国银行</td><td>************2631</td><td ><a class="bg">确定</a></td><td ><a class="bg">明细</a></td></tr>
    <tr><td>1</td><td>张三</td><td>420683198606126532</td><td>10000.00</td><td>10000.00</td><td>20000.00</td><td>2015-12-6</td><td>中国银行</td><td>************2631</td><td ><a class="bg">确定</a></td><td ><a class="bg">明细</a></td></tr>
    </table>
     <div class="person_fenye" id="record_fenye" style="position:absolute;bottom:10px;right:20px;">
    </div>
    </div>
   
    </div>
    <div style="float:left;height:820px; width:30%">
    <div style="height:580px;margin:20px 10px 0 10px; border: 1px solid #95b8e7;position:relative;">
    <table id="taba" width="100%" style="margin:auto;text-align:center;">
    <tr><td>序号</td><td>客户姓名</td><td>时间</td><td>事项</td><td>金额</td><td>当时余额</td></tr>
     <tr><td>1</td><td>张三</td><td>2015-12-6</td><td>提现</td><td>10000.00</td><td>20000.00</td></tr>
     <tr><td>1</td><td>张三</td><td>2015-12-6</td><td>提现</td><td>10000.00</td><td>20000.00</td></tr>
    </table>
     <div class="person_fenye" id="record_fenye2" style="position:absolute;bottom:10px;right:20px;">
    </div>
    </div>
   
    </div>
    </div>

</asp:Content>
