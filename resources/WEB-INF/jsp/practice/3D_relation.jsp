<%--
  Created by IntelliJ IDEA.
  User: dingdasha
  Date: 2020-02-18
  Time: 14:40
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en-us">

<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Unity WebGL Player | DataRelation</title>
    <link rel="stylesheet" href="<%ctxPath%>/assets/u3d/BuddlePackage/TemplateData/style.css">
    <script src="<%ctxPath%>/assets/u3d/BuddlePackage/TemplateData/UnityProgress.js"></script>
    <script src="<%ctxPath%>/assets/u3d/BuddlePackage/Build/UnityLoader.js"></script>
    <script>
        var gameInstance = UnityLoader.instantiate("gameContainer", "<%ctxPath%>/assets/u3d/BuddlePackage/Build/BuddlePackage.json", {onProgress: UnityProgress});
    </script>
</head>

<body>
<div class="webgl-content">
    <div id="gameContainer" style="width: 960px; height: 600px"></div>
    <div class="footer">
        <div class="webgl-logo"></div>
        <div class="fullscreen" onclick="gameInstance.SetFullscreen(1)"></div>
        <div class="title">DataRelation</div>
    </div>
</div>
<!-- js资源依赖 -->
<script src="<%ctxPath%>/assets/libs/jquery/3.4.1/jquery.min.js"></script>
</body>

</html>
