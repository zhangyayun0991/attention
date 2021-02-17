<%--
  Created by IntelliJ IDEA.
  User: dingdasha
  Date: 2020-02-18
  Time: 14:24
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>流程类-数据分析+流程视化参考实现</title>
</head>

<body>
<div id="progressVisWrap">
    <header>
        <div class="head-left">
            <img class="logo" src="<%ctxPath%>/components/com/senior-data-governance/1.0.0/images/logo.png" alt="">
            <div class="title">
                <div class="ch-text">数据治理可视化</div>
                <div class="en-text">Data Governance Visualization</div>
            </div>
        </div>
        <div class="head-right">
        </div>
    </header>
    <div class="content">
        <div class="path1">
            <svg id="path1" width="1593px" height="497px">
                <path fill-rule="evenodd" stroke="rgb(255, 244, 92)" stroke-width="10px" stroke-linecap="round" stroke-linejoin="round" fill="none"
                      d="M1173.000,38.000 C1198.350,62.839 1451.334,318.364 1551.500,418.000 C1586.868,451.194 1577.766,477.000 1516.500,476.000 C1278.922,476.000 321.086,476.000 59.000,476.000 C11.386,476.000 6.234,443.747 29.000,418.000 C153.192,293.551 401.506,45.507 410.000,37.000 C424.233,22.744 435.481,16.000 453.000,16.000 C470.055,16.000 1123.000,16.000 1123.000,16.000 C1144.475,16.000 1161.174,26.412 1173.000,38.000 Z"
                />
            </svg>
            <div id="path1Point1" class="green-detail"></div>
        </div>
        <div class="path2">
            <svg id="path2" width="402px" height="97px">
                <path fill-rule="evenodd" stroke="rgb(0, 255, 255)" stroke-width="2px" stroke-linecap="butt" stroke-linejoin="miter" fill="none"
                      d="M3.886,1.000 L3.886,1.000 C3.886,21.410 20.352,37.956 40.664,37.956 L365.225,38.029 C384.429,38.029 399.997,53.861 399.997,73.390 L399.997,94.999 "
                />
            </svg>
            <div id="path2Point1" class="green-point"></div>
        </div>
        <div class="path3">
            <svg id="path3" width="693px" height="171px">
                <path fill-rule="evenodd" stroke="rgb(0, 255, 255)" stroke-width="2px" stroke-linecap="butt" stroke-linejoin="miter" fill="none"
                      d="M3.886,1.000 L3.886,1.000 C3.886,21.410 20.352,37.956 40.663,37.956 L606.140,38.046 C653.010,38.046 691.004,76.257 691.004,123.393 L691.004,168.997 "
                />
            </svg>
            <div id="path3Point1" class="green-point"></div>
            <div id="path3Point2" class="red-point"></div>
        </div>
        <div class="path4">
            <svg id="path4" width="227px" height="146px">
                <path fill-rule="evenodd" stroke="rgb(0, 255, 255)" stroke-width="2px" stroke-linecap="butt" stroke-linejoin="miter" fill="none"
                      d="M3.976,1.000 L3.976,1.000 C3.976,18.091 17.597,31.946 34.398,31.946 L165.510,31.410 C198.362,31.410 224.995,58.172 224.995,91.183 L224.995,143.998 "
                />
            </svg>
            <div id="path4Point1" class="red-point"></div>
        </div>
        <div class="path5">
            <svg id="path5" width="393px" height="228px">
                <path fill-rule="evenodd" stroke="rgb(0, 255, 255)" stroke-width="2px" stroke-linecap="butt" stroke-linejoin="miter" fill="none"
                      d="M3.886,1.000 L3.886,1.000 C3.886,21.410 20.352,37.956 40.663,37.956 L283.174,38.027 C342.721,38.027 390.993,86.577 390.993,146.465 L390.993,225.996 "
                />
            </svg>
            <div id="path5Point1" class="purple-point"></div>
        </div>
        <div class="path6">
            <svg id="path6" width="230px" height="169px">
                <path fill-rule="evenodd" stroke="rgb(0, 255, 255)" stroke-width="2px" stroke-linecap="butt" stroke-linejoin="miter" fill="none"
                      d="M227.987,1.000 L227.987,1.000 C227.987,21.410 211.530,37.956 191.228,37.956 L86.893,37.990 C40.562,37.990 3.004,75.876 3.004,122.611 L3.004,166.997 "
                />
            </svg>
            <div id="path6Point1" class="green-point"></div>
        </div>
        <div class="path7">
            <svg id="path7" width="444px" height="136px">
                <path fill-rule="evenodd" stroke="rgb(0, 255, 255)" stroke-width="2px" stroke-linecap="butt" stroke-linejoin="miter" fill="none"
                      d="M441.987,1.000 L441.987,1.000 C441.987,21.410 425.526,37.956 405.221,37.956 L64.690,38.150 C30.621,38.150 3.003,66.267 3.003,100.950 L3.003,133.998 "
                />
            </svg>
            <div id="path7Point1" class="lightgreen-point"></div>
        </div>
        <div class="path8">
            <svg id="path8" width="584px" height="165px">
                <path fill-rule="evenodd" stroke="rgb(0, 255, 255)" stroke-width="2px" stroke-linecap="butt" stroke-linejoin="miter" fill="none"
                      d="M582.004,1.000 L582.004,1.000 C582.004,42.668 548.730,76.446 507.683,76.446 L53.971,75.995 C25.822,75.995 3.002,99.170 3.002,127.758 L3.002,162.998 "
                />
            </svg>
            <div id="path8Point1" class="purple-point"></div>
        </div>
        <div class="path9">
            <svg id="path9" width="374.5px" height="94.5px">
                <path fill-rule="evenodd" stroke="rgb(5, 199, 255)" stroke-width="3px" stroke-linecap="round" stroke-linejoin="round" fill="none"
                      d="M369.500,89.495 L104.500,6.500 C93.026,3.571 85.483,1.583 74.500,5.500 L3.500,27.500 " />
            </svg>
            <div id="path9Point1" class="green-point"></div>
        </div>
        <div class="path10">
            <svg id="path10" width="367.5px" height="68.5px">
                <path fill-rule="evenodd" stroke="rgb(5, 199, 255)" stroke-width="3px" stroke-linecap="round" stroke-linejoin="round" fill="none"
                      d="M3.500,57.500 C3.500,57.500 106.183,23.801 160.499,6.500 C173.677,2.303 183.655,4.030 191.499,6.500 C199.361,8.975 362.500,63.500 362.500,63.500 "
                />
            </svg>
            <div id="path10Point1" class="green-point"></div>
        </div>
        <div class="path11">
            <svg id="path11" width="534.5px" height="81.5px">
                <path fill-rule="evenodd" stroke="rgb(5, 199, 255)" stroke-width="3px" stroke-linecap="round" stroke-linejoin="round" fill="none"
                      d="M529.500,3.500 L373.500,52.500 C363.353,55.574 353.898,56.873 344.188,52.319 L227.682,11.621 C218.212,8.768 207.748,8.186 197.214,11.398 L3.500,76.500 "
                />
            </svg>
            <div id="path11Point1" class="green-point"></div>
        </div>
        <div class="path12">
            <svg id="path12" width="432.5px" height="170.5px">
                <path fill-rule="evenodd" stroke="rgb(5, 199, 255)" stroke-width="3px" stroke-linecap="round" stroke-linejoin="round" fill="none"
                      d="M427.499,3.500 L8.500,132.500 C2.833,135.167 2.500,138.833 7.500,141.500 C11.266,143.509 66.567,164.367 69.500,165.500 "
                />
            </svg>
            <div id="path12Point1" class="green-point"></div>
        </div>
        <div class="path13">
            <svg id="path13" width="242.5px" height="154.5px">
                <path fill-rule="evenodd" stroke="rgb(5, 199, 255)" stroke-width="3px" stroke-linecap="round" stroke-linejoin="round" fill="none"
                      d="M41.539,3.500 L231.500,62.500 C238.446,64.715 239.602,72.000 232.500,74.500 L3.500,149.500 " />
            </svg>
            <div id="path13Point1" class="green-point"></div>
        </div>
        <div class="path14">
            <svg id="path14" width="408.5px" height="186.5px">
                <path fill-rule="evenodd" stroke="rgb(5, 199, 255)" stroke-width="3px" stroke-linecap="round" stroke-linejoin="round" fill="none"
                      d="M3.498,3.500 L397.500,129.500 C404.994,132.212 406.260,138.344 399.499,141.500 L271.500,181.500 "
                />
            </svg>
            <div id="path14Point1" class="green-point"></div>
        </div>
        <div class="box">
            <img src="<%ctxPath%>/components/com/senior-data-governance/1.0.0/images/box.png" alt="">
        </div>
        <div class="building">
            <img src="<%ctxPath%>/components/com/senior-data-governance/1.0.0/images/buliding.png" alt="">
        </div>
        <div class="middle-data">
            <div class="data"></div>
            <div class="data"></div>
            <div class="data"></div>
        </div>
        <div class="top-text">
            <img src="<%ctxPath%>/components/com/senior-data-governance/1.0.0/images/top_text.png" alt="">
        </div>
        <div class="screen-text">
            <div class="text">
                <div class="info-text">
                    <span class="color-green">位置主题库</span>正在接入数据
                    <span class="color-green">3,529条</span>
                </div>
                <div class="info-text">
                    <span class="color-green">关系主题库 </span>正在接入数据
                    <span class="color-green">9,674条</span>
                </div>
                <div class="info-text">
                    <span class="color-green">全息档案</span>正在接入数据
                    <span class="color-green">6,523条</span>
                </div>
                <div class="info-text">
                    <span class="color-green">图上作战</span>正在接入数据
                    <span class="color-green">665条</span>
                </div>
            </div>
            <div class="text">
                <div class="info-text">
                    <span class="color-green">位置主题库</span>正在接入数据
                    <span class="color-green">3,529条</span>
                </div>
                <div class="info-text">
                    <span class="color-green">关系主题库 </span>正在接入数据
                    <span class="color-green">9,674条</span>
                </div>
                <div class="info-text">
                    <span class="color-green">全息档案</span>正在接入数据
                    <span class="color-green">6,523条</span>
                </div>
                <div class="info-text">
                    <span class="color-green">图上作战</span>正在接入数据
                    <span class="color-green">665条</span>
                </div>
            </div>
            <div class="text">
                <div class="info-text">
                    <span class="color-green">位置主题库</span>正在接入数据
                    <span class="color-green">3,529条</span>
                </div>
                <div class="info-text">
                    <span class="color-green">关系主题库 </span>正在接入数据
                    <span class="color-green">9,674条</span>
                </div>
                <div class="info-text">
                    <span class="color-green">全息档案</span>正在接入数据
                    <span class="color-green">6,523条</span>
                </div>
                <div class="info-text">
                    <span class="color-green">图上作战</span>正在接入数据
                    <span class="color-green">665条</span>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<%ctxPath%>/assets/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="<%ctxPath%>/assets/libs/echarts/4.2.1/echarts.min.js"></script>
<script src="<%ctxPath%>/assets/libs/animejs/3.0.1/anime.min.js"></script>
</body>

</html>