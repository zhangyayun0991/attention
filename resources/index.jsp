
<%--<% String welcomPage = com.nuts.framework.PlatformAPI.getSysConfigValue("local.welcome.page");%>--%>

<%--<jsp:forward page="<%=welcomPage%>"/>--%>


<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
</head>
<body>
<div style="margin: 0 auto">

    我是内容 index页面
</div>
</body>

<script>
var contextPath = '<%=path%>';
//window.location.href = contextPath + "/welcome";
</script>
</html>
