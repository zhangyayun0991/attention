<%--
  Created by IntelliJ IDEA.
  User: dingdasha
  Date: 2020-02-18
  Time: 14:20
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>数据处理量分析</title>
</head>

<body>
<div id="wrap">
    <h2 class="panel-title">数据处理量(PB)</h2>
    <div class="number"></div>
    <div class="chart-liquid-items">
        <div class="chart-liquid-item">
            <div class="liquid-bg"></div>
            <div id="chart-liquid-fill1" style="width: 156px;height:164px;"></div>
        </div>
        <div class="chart-liquid-item">
            <div class="liquid-bg"></div>
            <div id="chart-liquid-fill2" style="width: 156px;height:164px;"></div>
        </div>
        <div class="chart-liquid-item">
            <div class="liquid-bg"></div>
            <div id="chart-liquid-fill3" style="width: 156px;height:164px;"></div>
        </div>
        <div class="chart-liquid-item">
            <div class="liquid-bg"></div>
            <div id="chart-liquid-fill4" style="width: 156px;height:164px;"></div>
        </div>
    </div>
    <div class="center-panel">
        <div class="panel-content">


            <div class="panel-base"></div>

        </div>
    </div>
    <div id="showcase" class="noselect" style="position: relative; overflow: hidden; visibility: visible;">
        <!-- <div class="cloud9-item">
<div class="chart-item" id="main">
<div class="chart-item-title">数据占比分析</div>
<div class="chart-main" id="chart-basic-pie1" style="width: 540px;height:320px;"></div>
</div>
</div> -->
        <div class="cloud9-item">
            <div class="chart-item" id="main">
                <div class="chart-item-title">数据处理效率分析</div>
                <div class="chart-main" id="chart-basic-line1" style="width: 540px;height:320px;"></div>
            </div>
        </div>
        <!-- <div class="cloud9-item">
<div class="chart-item" id="main">
<div class="chart-item-title">数据占比分析</div>
<div class="chart-main" id="chart-basic-pie2" style="width: 540px;height:320px;"></div>
</div>
</div> -->
        <div class="cloud9-item">
            <div class="chart-item" id="main">
                <div class="chart-item-title">数据处理效率分析</div>
                <div class="chart-main" id="chart-basic-line2" style="width: 540px;height:320px;"></div>
            </div>
        </div>
        <div class="cloud9-item">
            <div class="chart-item" id="main">
                <div class="chart-item-title">数据处理效率分析</div>
                <div class="chart-main" id="chart-basic-bar1" style="width: 540px;height:320px;"></div>
            </div>
        </div>
        <div class="cloud9-item">
            <div class="chart-item" id="main">
                <div class="chart-item-title">数据处理效率分析</div>
                <div class="chart-main" id="chart-basic-line3" style="width: 540px;height:320px;"></div>
            </div>
        </div>
        <div class="cloud9-item">
            <div class="chart-item" id="main">
                <div class="chart-item-title">数据处理效率分析</div>
                <div class="chart-main" id="chart-basic-bar2" style="width: 540px;height:320px;"></div>
            </div>
        </div>
        <div class="cloud9-item">
            <div class="chart-item" id="main">
                <div class="chart-item-title">数据处理效率分析</div>
                <div class="chart-main" id="chart-basic-bar3" style="width: 540px;height:320px;"></div>
            </div>
        </div>
        <div class="cloud9-item">
            <div class="chart-item" id="main">
                <div class="chart-item-title">数据处理效率分析</div>
                <div class="chart-main" id="chart-basic-line4" style="width: 540px;height:320px;"></div>
            </div>
        </div>
        <div class="cloud9-item">
            <div class="chart-item" id="main">
                <div class="chart-item-title">数据处理效率分析</div>
                <div class="chart-main" id="chart-basic-bar4" style="width: 540px;height:320px;"></div>
            </div>
        </div>
        <div class="cloud9-item">
            <div class="chart-item" id="main">
                <div class="chart-item-title">数据处理效率分析</div>
                <div class="chart-main" id="chart-basic-line5" style="width: 540px;height:320px;"></div>
            </div>
        </div>
        <div class="cloud9-item">
            <div class="chart-item" id="main">
                <div class="chart-item-title">数据处理效率分析</div>
                <div class="chart-main" id="chart-basic-bar5" style="width: 540px;height:320px;"></div>
            </div>
        </div>
    </div>
</div>
<script src="<%ctxPath%>/assets/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="<%ctxPath%>/assets/libs/echarts/4.2.1/echarts.min.js"></script>
<script src="<%ctxPath%>/assets/libs/animejs/3.0.1/anime.min.js"></script>
<script src="<%ctxPath%>/assets/plugins/echarts-liquidfill/echarts-liquidfill.min.js"></script>

</body>

</html>
