/*******************************************************************
 * ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
 * ★                                                              ★
 * ★ 日期控件 Version 1.0                                         ★
 * ★ 可显示当前时间，兼容IE、FF、Chrome                           ★
 * ★ Code by goldpony(董世绸)                                     ★
 * ★                                                              ★
 海姹网（网址:http://www.seacha.com），标签：JS完美的日期控件（可显示当前时间，兼容IE、FF、Chrome）， 日期控件,显示当前时间,兼容好
 * ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
 ****************************************************************/

var g_calWrap = null;

var g_curDate = {year:0, month:0, date:0, hour:0, minute:0, second:0};
var g_selDate = {year:0, month:0, date:0, hour:0, minute:0, second:0};
var g_outObj = null;
var g_outTxt = null;

function ShowCalendar(txt, thisValue, bIsShowTime)
{
    if(typeof txt == 'string')
    {
        g_outTxt = $i(txt);
    }
    else
    {
        g_outTxt = txt;
    }
    var m_ThisValue = arguments[1] ? arguments[1] : '';
    var m_bIsShowTime = (typeof(bIsShowTime) == "undefined") ? false : bIsShowTime;


    this.$i = function(id)
    {
        return document.getElementById(id);
    }

    this.findPosX = function(obj)
    {
        var curleft = 0;
        if (obj.offsetParent)
        {
            while (obj.offsetParent)
            {
                curleft += obj.offsetLeft;
                obj = obj.offsetParent;
            }
        }
        else if (obj.x)
        {
            curleft += obj.x;
        }
        return curleft;
    }

    this.findPosY = function(obj)
    {
        var curtop = 0;
        if (obj.offsetParent)
        {
            while (obj.offsetParent)
            {
                curtop += obj.offsetTop;
                obj = obj.offsetParent;
            }
        }

        else if (obj.y)
    {
        curtop += obj.y;
    }
        return curtop;
    }

    this.cal_create = function(Year, Month)
    {
        return cal_header(Year, Month);
    }

    this.cal_header = function(Year, Month)
    {
        var vCode = "";
        vCode = "<table border=0 cellpadding=0 cellspacing=1 class=Calendar><tr align='center' valign='middle'>";
        vCode = vCode + "<td class='CalendarTitle' colspan='7'>";
        vCode = vCode + "<a class='CalendarDayButton' title='上一年'  onclick='preYear()'><<</a>&nbsp;&nbsp;";
        vCode = vCode + "<a class='CalendarDayButton' title='上一月' onclick='preMonth();'><</a>&nbsp;&nbsp;";
        vCode = vCode + "<a id='currShowYear'>" + Year + "</a>&nbsp;年&nbsp;<a id='currShowMonth'>" + (Month + 1) + "</a>&nbsp;月&nbsp;&nbsp;";
        vCode = vCode + "<a class='CalendarDayButton' title='下一月' onclick='nextMonth();'>></a>&nbsp;&nbsp;";
        vCode = vCode + "<a class='CalendarDayButton' title='下一年' onclick='nextYear();'>>></a>";
        vCode = vCode + "</tr><tr>";

        vCode = vCode + "<td class=CalendarDaySunTitle>日</td>";
        vCode = vCode + "<td class=CalendarDayTitle>一</td>";
        vCode = vCode + "<td class=CalendarDayTitle>二</td>";
        vCode = vCode + "<td class=CalendarDayTitle>三</td>";
        vCode = vCode + "<td class=CalendarDayTitle>四</td>";
        vCode = vCode + "<td class=CalendarDayTitle>五</td>";
        vCode = vCode + "<td class=CalendarDaySatTitle>六</td>";
        vCode = vCode + "</tr></thead>";
        vCode = vCode + cal_data(Year, Month);
        return vCode;
    }

    // Non-Leap year Month days..
    var m_DaysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // Leap year Month days..
    var m_DaysOfMonthLeap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    this.get_daysofmonth = function(monthNo, Year)
    {
        /*
         Check for leap year ..
         1.Years evenly divisible by four are normally leap years, except for...
         2.Years also evenly divisible by 100 are not leap years, except for...
         3.Years also evenly divisible by 400 are leap years.
         */
        if ((Year % 4) == 0)
        {
            if ((Year % 100) == 0 && (Year % 400) != 0)
            {
                return m_DaysOfMonth[monthNo];
            }

            return m_DaysOfMonthLeap[monthNo];
        }
        else
        {
            return m_DaysOfMonth[monthNo];
        }
    }

    this.format_day = function(year, month, day)
    {
        var strDay = day;
        if (year == g_curDate.year && month == g_curDate.month && day == g_curDate.date)
        {
            strDay = "<font COLOR='#8B0000'><b>" + day + "</b></font>";
        }
        return strDay;
    }

    this.IsToday = function(year, month, day)
    {
        var bIsToday = false;
        if (year == g_curDate.year && month == g_curDate.month && day == g_curDate.date)
        {
            bIsToday = true;
        }
        return bIsToday;
    }

    this.fillZero = function(v)
    {
        if(v < 10)
        {
            v = '0' + v;
        }

        return v;
    }

    this.cal_data = function(Year, Month)
    {
        var vCurrLastDay = get_daysofmonth(Month, Year);
        var str = "";
        var i = 0;
        var week_number = new Date(Year, Month, 1).getDay();
        str = "<tr>";
        var week_seq = 0;
        if (0 != week_number)
        {
            PreMonth = Month - 1;
            PreYear = Year;
            if(PreMonth <= 0)
            {
                PreYear--;
                PreMonth = 11;
            }
            var vPreMonthDays = get_daysofmonth(PreMonth, PreYear);
            var week_pre_month = vPreMonthDays - week_number + 1;
            for (i = week_pre_month; i <= vPreMonthDays; i++)
            {
                str += "<td class='CalendarTD'>" + i + "</td>";
                week_seq++;
            }
        }
        for (i = 0; i < vCurrLastDay; i++)
        {
            tdClass = '';
            if ((i + week_seq) % 7 == 0)
            {
                if (0 != i)
                {
                    str += "</tr><tr>";
                }
                tdClass = 'CalendarDaySun';
            }
            else if ((i + week_seq) % 7 == 6)
            {
                tdClass = 'CalendarDaySat';
            }
            else
            {
                tdClass = 'CalendarDay';
            }
            if (IsToday(Year, Month, i + 1) == true)
            {

                tdClass = 'CalendarToday';
            }
            str += "<td class='" + tdClass + "' onclick='setdate(" + (i + 1) + ");'><span class='" + tdClass + "A'>" + format_day(Year, Month, i + 1) + "</span></td>";
        }
        week_number = new Date(Year, Month, vCurrLastDay).getDay();
        if (6 != week_number)
        {
            var week_next_month = 7 - week_number - 1;
            for (i = 0; i < week_next_month; i++)
            {
                str += "<td class='CalendarTD'>" + (i + 1) + "</td>";
            }
        }
        str += "</tr>";
        if (true == m_bIsShowTime)
        {
            str += "<tr align='center' valign='middle'>";
            str += "<td class='CalendarDay' colspan='7'>";
            str += "";
            str += "<span class='CalendarCurrentTimeButton' id='currDate'>当前:" + g_curDate.year + "-" + fillZero(g_curDate.month) + "-" + fillZero(g_curDate.date) + "</span>&nbsp;";
            str += "<span class='CalendarCurrentTimeButton' id='currHour'>00</span>";
            str += "<span class='CalendarCurrentTimeButton'>:</span>";
            str += "<span class='CalendarCurrentTimeButton' id='currMinute'>00</span>";
            str += "<span class='CalendarCurrentTimeButton'>:</span>";
            str += "<span class='CalendarCurrentTimeButton' id='currSecond'>00</span>";
            str += "</tr>";
        }

        str += "<tr align='center' valign='middle'>";
        str += "<td class='CalendarTitle' colspan='7'>";
        str += "<a href='#' onclick='moveHide()' class='CalendarDayButton' title='清空'>清空</a>&nbsp;&nbsp;&nbsp;";
        str += "<a href='#' onclick='Today()' class='CalendarTodayButton' title='今天'>今天</a>&nbsp;&nbsp;&nbsp;";
        str += "<a href='#' onclick='calHide()' class='CalendarDayButton' title='关闭'>关闭</a>";
        str += "</tr></table>";

        return str;
    }

    this.Init = function()
    {

        var cur = new Date();
        g_selDate.year = g_curDate.year = cur.getFullYear();
        g_selDate.month = g_curDate.month = cur.getMonth();
        g_selDate.date = g_curDate.date = cur.getDate();
        g_calWrap = document.createElement("div");
        g_calWrap.id = "CalendarWrap";
        document.body.appendChild(g_calWrap);
        var str;
        str = "<div id='cal_data'></div>\n\n";
        g_calWrap.innerHTML = str;
        createCalendar();
        document.onclick = function(e)
        {
            var e = e || window.event;
            var srcElement = e.srcElement || e.target;
            if( srcElement != g_outTxt && srcElement.className != "CalendarDayButton" && srcElement.className != "CalendarTodayButton")
            {
                calHide();
            }
        };
    }


    this.calHide = function()
    {
        g_calWrap.style.display = "none";
    }

    this.moveHide = function()
    {
        //清空
        g_outObj.value = "";
    }

    this.Today = function()
    {
        //今天
        var today;
        g_selDate.year = ThisYear = new Date().getFullYear();
        g_selDate.month = new Date().getMonth();
        ThisMonth = g_selDate.month + 1;
        g_selDate.date = today = new Date().getDate();
        createCalendar();
    }

    this.preYear = function()
    {
        if(g_selDate.year <= 1900)
        {
            return;
        }

        g_selDate.year--;
        createCalendar();
    }

    this.nextYear = function()
    {
        if(g_selDate.year >= 99999)
        {
            return;
        }
        g_selDate.year++;
        createCalendar();
    }

    this.preMonth = function()
    {
        if(g_selDate.month <= 0)
        {
            g_selDate.year--;
            g_selDate.month = 11;
        }
        else
        {
            g_selDate.month--;
        }
        createCalendar();
    }

    this.nextMonth = function()
    {
        if(g_selDate.month >= 11)
        {
            g_selDate.year++;
            g_selDate.month = 0;
        }
        else
        {
            g_selDate.month++;
        }
        createCalendar();
    }

    this.setdate = function(j)
    {
        var month, date;
        month = fillZero(g_selDate.month + 1);
        date = fillZero(j);
        var str = g_selDate.year + "-" + month + "-" + date;
        if (true == m_bIsShowTime)
        {
            str += " " + $i('currHour').innerHTML + ":" + $i('currMinute').innerHTML + ":" + $i('currSecond').innerHTML;
        }

        g_outTxt.value = str;
        calHide();
        return false;
    }

    this.createCalendar = function()
    {
        var selDay = new Date(g_selDate.year, g_selDate.month, 1).getDay();
        var selNum = new Date(g_selDate.year, g_selDate.month + 1, 0).getDate();
        var str = "";
        str = cal_create(g_selDate.year, g_selDate.month)
        $i("cal_data").innerHTML = str;
        SetCurrentTime();
    }

    //+---------------------------------------------------
    //| 日期时间检查
    //| 格式为：YYYY-MM-DD HH:MM:SS
    //+---------------------------------------------------
    this.CheckDateTime = function(str)
    {
        if (str.length = 8)
        {
            var arrDate = str.split("-");
            g_selDate.year = arrDate[0];
            g_selDate.month = arrDate[1] - 1;
            g_selDate.date = arrDate[2];
            return true;
        }
        else
        {
            var arrDateTime = str.split(" ");
            var arrDate = arrDateTime[0].split("-");
            g_selDate.year = arrDate[0];
            g_selDate.month = arrDate[1] - 1;
            g_selDate.date = arrDate[2];
            var arrTime = arrDateTime[1].split(":");
            g_selDate.hour = arrTime[0];
            g_selDate.minute = arrTime[1] - 1;
            g_selDate.second = arrTime[2];
            return true;
        }
        return false;
    }

    this.SetCurrentTime = function()
    {
        if (true == m_bIsShowTime)

    {
        var d = new Date();
        $i('currHour').innerHTML = fillZero(d.getHours());
        $i('currMinute').innerHTML = fillZero(d.getMinutes());
        $i('currSecond').innerHTML = fillZero(d.getSeconds());
    }
    }

    g_outObj = g_outTxt;
    if (null == g_calWrap)
    {
        Init();
    }
    else
    {
        if ('' != m_ThisValue)
        {
            CheckDateTime(m_ThisValue);
        }
        createCalendar();
    }
    if (true == m_bIsShowTime)
    {
        //setTimeout("SetCurrentTime()", 1000);
        setInterval("SetCurrentTime()", 1000);
    }
    g_calWrap.style.display = "block";
    var posx = findPosX(g_outObj);
    var posy = findPosY(g_outObj);
    var objHeight = g_outObj.offsetHeight;
    g_calWrap.style.left = posx + "px";
    g_calWrap.style.top = (posy + objHeight) + "px";
}