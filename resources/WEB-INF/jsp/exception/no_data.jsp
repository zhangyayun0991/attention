<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; UTF-8" %>
<% String contextPath = request.getContextPath();%>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
    <title>暂无数据</title>
    <style>
        body,html{
            position: relative;
            height: 100%;
            padding: 0;
            margin:0;
            font-family: "微软雅黑";
        }
        *{
            box-sizing: border-box;
        }
        .main{
            width: 850px;
            height: 350px;
            position: absolute;
            left: 50%;
            top:50%;
            margin:-175px 0 0 -425px;
        }
        .main .img{
            float: left;
            width: 50%;
            height: 100%;
            background: url("<%=contextPath%>/assets/images/no_data.png") no-repeat center center;
        }
        .half{
            float: left;
            width: 50%;
            height: 100%;
        }
        .tip-wrap{
            width: 300px;
            margin:100px auto;
        }
        .tip-wrap h1{
            color:#2e2f33;
            font-size: 40px;
            font-weight: normal;
            margin:0;
            line-height: 80px;
        }
        .tip-wrap p{
            color:#fff;
            font-size: 16px;
            margin-top: 10px;
        }
        .tip-wrap a{
            display: inline-block;
            width: 90px;
            height: 32px;
            text-decoration: none;
            line-height: 32px;
            background: #2984f7;
            color:#fff;
            text-align: center;
            border:1px solid #396cbd;
            border-radius: 4px;
            font-size: 14px;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="main">
        <div class="img"></div>
        <div class="half">
            <div class="tip-wrap">
                <h1>暂无数据</h1>
                <div>
                    <a href="javascript:window.top.location.href='<%=contextPath%>';" >返回首页</a>
                </div>
            </div>
        </div>
        
    </div>
</body>
</html>