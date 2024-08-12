---
title: 08-webpack专题
footer: false
prev: false
next: false
---
# `webpack`打包方式

```
本教程仅供学习交流使用，严禁用于商业用途和非法用途，否则由此产生的一切后果均与作者无关，请各学员自觉遵守相关法律法规。
```



**学习目标:**

1. 熟悉 `webpack`打包原理
2. 熟悉 `webpack`打包方式
3. 了解 `webpack`多模块打包



### 一. `webpack`打包

**概念:**

``` 
webpack 是 JavaScript 应用程序的模块打包器,可以把开发中的所有资源（图片、js文件、css文
件等）都看成模块，通过loader（加载器）和 plugins （插件）对资源进行处理，打包成符合生产环境
部署的前端资源。所有的资源都是通过 JavaScript 渲染出来的。
```

- `webpack` 是一个基于模块化的打包（构建）工具, 它把一切都视作模块

- 如果一个页面大部分是script标签构成，80%以上是 `webpack` 打包。
- **地址**：http://cls.cn/telegraph

![](./images/038.png)

#### 1. `webpack`打包简介

![](./images/039.png)

- 整个打包的文件是一个自执行函数
- 方法里面是`webpack`的加载器   
- 存放的模块就是js的每个功能,可以有两中方式,数组和键值对的形式

#### 2. 加载器样式

- 加载器是网站的开发人员用工具生成的我们可以不用管直接拿过来用就好(一般加载器的名字都是n可以直接通过加载器的名字定位到打包的位置)
- 加载器的核心代码

```JavaScript
!function (e) {
    // 存放加载器
    var c = {}
    // t是加载器对应的名字
    function n(t) {
        // 创建一个a对象 
        var a = c[t] = {
            i: t, // 表示模块的标识符，它被设置为参数 t。
            l: !1, // 一个布尔值，初始值为 false，用于标记模块是否已经加载。
            exports: {} // 一个空对象，用于将模块的导出内容存储在其中。
        };
        console.log(a)
        // 执行函数里面的方法
        return e[t].call(a.exports, a, a.exports, n),
            // 设置模块已被加载
            a.l = !0,
            a.exports
    }
   //  
    n.m = e
    // 入口
    n(2)
}([])
```

##### 1. `webpack`数组形式

- 给需要处理业务的模块进行打包，通过下标取值

```javascript
// 这个格式就是webpack
!function (e) {
    // 存放加载器
    var c = {}
    function n(t) {
        var a = c[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        console.log(a)
        return e[t].call(a.exports, a, a.exports, n),
            a.l = !0,
            a.exports
    }
    n.m = e
    // 入口
    n(2)
}([
    // 存放模块
    function () {
        console.log('负责登陆')
    },
    function () {
        console.log('负责注册')
    },
    function () {
        console.log('负责注册')
    }
])


```

##### 2. `webpack`对象格式

- 给需要处理业务的模块进行打包，通过 key 取值

```javascript
!function (e) {
    var t = {};

// 所有的模块 都是从这个加载器 执行的 分发器
    function n(r) {
        if (t[r])
            return t[r].exports;
        var o = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, n),
            o.l = !0,
            o.exports
    }

    n('xialuo') // 对象 根据KEY 找模块
}({
        0: function () {
            console.log('我是模块1 负责加密')
        },
        'xialuo': function () {
            console.log('我是模块2 负责解密')
        },
        2: function () {
            console.log('我是模块3 负责爬数据')
        }
    }
);
```



#### 3.多个`js`文件打包

- 如果模块比较多，就会将模块打包成JS文件, 然后定义一个全局变量 `window["webpackJsonp"] =[ ] `，它的作用是存储需要动态导入的模块，然后重写 `window["webpackJsonp"] `数组的 push( ) 方法为 `webpackJsonpCallback( )` ,也就是说 `window["webpackJsonp"].push( ) `其实执行的是`webpackJsonpCallback( )` , `window["webpackJsonp"].push( )` 接收三个参数,第一个参数是模块的ID,第二个参数是 一个数组或者对象,里面定义大量的函数,第三个参数是要调用的函数(可选)

![](./images/040.png)



### 二.教学案例1

#### 1.逆向目标

- 首页：https://36kr.com/

- 逆向参数： password: 8cbf7f88e70300def68533a74c77b785e11d743c77627b624

#### 2. 参数定位

- 通过登录按钮触发发包请求   
- 关键字定位`password`

- `xhr`断点定位(根据栈堆来进行调试)

![](./images/041.png)



#### 3.逆向代码分析

- `o.a.get(t, "password")` 获取网页输入的明文密码
- `Object(i.b)`是加密代码  
- `Object(i.b)`是将`i.b`包装到新对象中实际使用和`i.b()`是差不多的
- 进入加密代码,查看加密逻辑

![](./images/042.png)

- 可以看到a函数是加密的主体逻辑    
- 通过t的导出的方法进行加密的
- n可以很明显看出为`webpack`打包的方法
- 跟进到加载器的位置,拿到加载器,把需要的方法扣下来就行



#### 4.逆向结果

- JavaScript代码

```JavaScript
window = global;
navigator = {};
navigator.appName = 'Netscape'
var bc;
!function (e) {
    function t(t) {
        for (var c, o, n = t[0], s = t[1], l = t[2], d = 0, u = []; d < n.length; d++)
            o = n[d],
            Object.prototype.hasOwnProperty.call(r, o) && r[o] && u.push(r[o][0]),
                r[o] = 0;
        for (c in s)
            Object.prototype.hasOwnProperty.call(s, c) && (e[c] = s[c]);
        for (f && f(t); u.length;)
            u.shift()();
        return i.push.apply(i, l || []),
            a()
    }

    function a() {
        for (var e, t = 0; t < i.length; t++) {
            for (var a = i[t], c = !0, o = 1; o < a.length; o++) {
                var s = a[o];
                0 !== r[s] && (c = !1)
            }
            c && (i.splice(t--, 1),
                e = n(n.s = a[0]))
        }
        return e
    }

    var c = {}
        , o = {
        81: 0
    }
        , r = {
        81: 0
    }
        , i = [];

    function n(t) {
        if (c[t])
            return c[t].exports;
        var a = c[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(a.exports, a, a.exports, n),
            a.l = !0,
            a.exports
    }

    n.e = function (e) {
        var t = [];
        o[e] ? t.push(o[e]) : 0 !== o[e] && {
            3: 1,
            4: 1,
            5: 1,
            6: 1,
            7: 1,
            8: 1,
            9: 1,
            10: 1,
            11: 1,
            12: 1,
            13: 1,
            14: 1,
            15: 1,
            16: 1,
            17: 1,
            18: 1,
            19: 1,
            20: 1,
            21: 1,
            23: 1,
            24: 1,
            26: 1,
            27: 1,
            28: 1,
            29: 1,
            30: 1,
            32: 1,
            33: 1,
            34: 1,
            35: 1,
            36: 1,
            37: 1,
            38: 1,
            39: 1,
            40: 1,
            41: 1,
            42: 1,
            43: 1,
            44: 1,
            45: 1,
            46: 1,
            47: 1,
            48: 1,
            49: 1,
            50: 1,
            51: 1,
            52: 1,
            53: 1,
            54: 1,
            55: 1,
            56: 1,
            57: 1,
            58: 1,
            59: 1,
            60: 1,
            61: 1,
            62: 1,
            63: 1,
            64: 1,
            65: 1,
            66: 1,
            67: 1,
            68: 1,
            69: 1,
            71: 1,
            72: 1,
            73: 1,
            74: 1,
            75: 1,
            77: 1,
            79: 1,
            80: 1,
            82: 1,
            83: 1,
            84: 1,
            85: 1,
            86: 1,
            87: 1,
            88: 1,
            89: 1,
            90: 1,
            91: 1,
            92: 1,
            93: 1,
            94: 1,
            95: 1,
            96: 1,
            97: 1,
            98: 1,
            99: 1,
            100: 1,
            101: 1,
            102: 1,
            103: 1,
            104: 1
        }[e] && t.push(o[e] = new Promise((function (t, a) {
                for (var c = "static/" + ({
                    2: "vendors~academe~acvitity~email-unsubscribe~hp-2020~motif-catalog~project-settled-welcome~special-top~0049f470",
                    3: "chronicle~home~hot-list-catalog~local-station~motif-detail~policy-detail~search-list-Detail~tags-Detail",
                    4: "newsflash-catalog",
                    5: "vendors~wise-2019~wise-2019-nov~wise-2019-nov-dec",
                    6: "home~motif-detail",
                    7: "invite-record-entry",
                    8: "live-channel~live-column",
                    9: "nftags",
                    10: "project-form-claim",
                    11: "project-settled-welcome",
                    12: "search-list",
                    13: "tags",
                    14: "video-detail",
                    16: "LPlan",
                    17: "VClub",
                    18: "about",
                    19: "about-us-en",
                    20: "academe",
                    21: "acvitity",
                    23: "application-authority",
                    24: "article",
                    25: "audit-investor",
                    26: "author",
                    27: "chronicle",
                    28: "defaultReport",
                    29: "defaultReport2021",
                    30: "dell2021FormSuccess",
                    31: "demo",
                    32: "download",
                    33: "email-unsubscribe",
                    34: "enterprise-catalog",
                    35: "enterprise-detail",
                    36: "enterprisesList",
                    37: "entrepreneurship-competition",
                    38: "entrepreneurship-project-list",
                    39: "external-author-apply",
                    40: "facebookFormSuccess",
                    41: "gclub-catalog",
                    42: "home",
                    43: "hot-list-catalog",
                    44: "hot-list-detail",
                    45: "hp-2020",
                    46: "hp-club",
                    47: "iframe-login",
                    48: "info-share-list",
                    49: "information",
                    50: "innovate",
                    51: "invite-record-success",
                    52: "live-channel",
                    53: "live-column",
                    54: "live-detail",
                    55: "live-home",
                    56: "local-station",
                    57: "mform",
                    58: "motif-catalog",
                    59: "motif-detail",
                    60: "newsflash-detail",
                    61: "nftags-Detail",
                    62: "organization-catalog",
                    63: "organization-detail",
                    64: "other-protocols",
                    65: "overseas",
                    66: "policy-detail",
                    67: "privacy-terms",
                    68: "project-claim-settled-rights",
                    69: "project-claim-settled-success",
                    70: "project-detail",
                    71: "project-info-mod",
                    72: "project-info-mod-success",
                    73: "project-library-report",
                    74: "project-seek-report",
                    75: "project-seek-report-success",
                    76: "project-topic-detail",
                    77: "project-unclaimed",
                    78: "projects-catalog",
                    79: "refute-rumor-notice",
                    80: "rss-center",
                    82: "s2city-project-list",
                    83: "s2l-project-list",
                    84: "search-list-Detail",
                    85: "search-result",
                    86: "service-agreement",
                    87: "sign-up-acvitity",
                    88: "sign-up-acvitity-form",
                    89: "sign-up-claim-activity-form-success",
                    90: "special-topic-catalog",
                    91: "special-topic-detail",
                    92: "star-2020-city",
                    93: "star-2020-yl",
                    94: "station-business",
                    95: "tags-Detail",
                    96: "unsubscribe",
                    97: "usercenter",
                    98: "vendors~LPlan",
                    99: "video-catalog",
                    100: "wise-2019",
                    101: "wise-2019-nov",
                    102: "wise-2019-nov-dec",
                    103: "wise-2020-efficiency"
                }[e] || e) + "." + {
                    0: "31d6cfe0",
                    1: "31d6cfe0",
                    2: "31d6cfe0",
                    3: "6d5e7d49",
                    4: "a2733574",
                    5: "cbdba712",
                    6: "2babbd91",
                    7: "d70f0573",
                    8: "5b198e53",
                    9: "5c3dfd32",
                    10: "ee749e7b",
                    11: "709399e8",
                    12: "0e0d4b42",
                    13: "5c3dfd32",
                    14: "04405249",
                    15: "deccf8cb",
                    16: "e7af550f",
                    17: "68f72a74",
                    18: "545152db",
                    19: "0565ab62",
                    20: "8cdfbf35",
                    21: "a7fa0e64",
                    23: "7c9ee757",
                    24: "ec4c6f61",
                    25: "31d6cfe0",
                    26: "0d19c723",
                    27: "9cce3f8f",
                    28: "e8ca8ee1",
                    29: "fccf39f2",
                    30: "e429abf5",
                    31: "31d6cfe0",
                    32: "8e6a4325",
                    33: "18ab7052",
                    34: "d1efb300",
                    35: "8e15525e",
                    36: "6fb30519",
                    37: "2e85e01c",
                    38: "83d44b8f",
                    39: "4edd63ee",
                    40: "d24e3163",
                    41: "67590a6c",
                    42: "aae5d892",
                    43: "17328b36",
                    44: "af538ce5",
                    45: "e314bb91",
                    46: "783cc139",
                    47: "84b7b4c6",
                    48: "26a313b6",
                    49: "4f218ee7",
                    50: "52f78348",
                    51: "8df055d9",
                    52: "6a8d5c79",
                    53: "dc501ece",
                    54: "71c7db8d",
                    55: "f846f294",
                    56: "7b0f6c53",
                    57: "57c2529e",
                    58: "23d2891d",
                    59: "3ce7d7ee",
                    60: "16e6c1bc",
                    61: "2a0c20c2",
                    62: "b97d8097",
                    63: "c654d3ad",
                    64: "da1bcfba",
                    65: "175d7053",
                    66: "e0074bb3",
                    67: "5a944588",
                    68: "088336ec",
                    69: "0d63ddb5",
                    70: "31d6cfe0",
                    71: "2cf6c0f6",
                    72: "57e76863",
                    73: "140d431f",
                    74: "566d2d11",
                    75: "17cbd9b4",
                    76: "31d6cfe0",
                    77: "0ec88e27",
                    78: "31d6cfe0",
                    79: "d49e4a80",
                    80: "5f82defe",
                    82: "ddec0e13",
                    83: "7a66d708",
                    84: "147ec8ad",
                    85: "afd29013",
                    86: "49c3acd0",
                    87: "df311389",
                    88: "989b849f",
                    89: "51f0d678",
                    90: "ea9b55d1",
                    91: "ab56c561",
                    92: "40c90b21",
                    93: "265801c0",
                    94: "6d2196a6",
                    95: "938cac41",
                    96: "4a0de17b",
                    97: "90906143",
                    98: "c412edf5",
                    99: "e095696f",
                    100: "2f2cd22c",
                    101: "4b5110e3",
                    102: "c6cea6b8",
                    103: "f292465d",
                    104: "2e7f48dc"
                }[e] + ".css", r = n.p + c, i = document.getElementsByTagName("link"), s = 0; s < i.length; s++) {
                    var l = (f = i[s]).getAttribute("data-href") || f.getAttribute("href");
                    if ("stylesheet" === f.rel && (l === c || l === r))
                        return t()
                }
                var d = document.getElementsByTagName("style");
                for (s = 0; s < d.length; s++) {
                    var f;
                    if ((l = (f = d[s]).getAttribute("data-href")) === c || l === r)
                        return t()
                }
                var u = document.createElement("link");
                u.rel = "stylesheet",
                    u.type = "text/css",
                    u.onload = t,
                    u.onerror = function (t) {
                        var c = t && t.target && t.target.src || r
                            , i = new Error("Loading CSS chunk " + e + " failed.\n(" + c + ")");
                        i.code = "CSS_CHUNK_LOAD_FAILED",
                            i.request = c,
                            delete o[e],
                            u.parentNode.removeChild(u),
                            a(i)
                    }
                    ,
                    u.href = r,
                    document.getElementsByTagName("head")[0].appendChild(u)
            }
        )).then((function () {
                o[e] = 0
            }
        )));
        var a = r[e];
        if (0 !== a)
            if (a)
                t.push(a[2]);
            else {
                var c = new Promise((function (t, c) {
                        a = r[e] = [t, c]
                    }
                ));
                t.push(a[2] = c);
                var i, s = document.createElement("script");
                s.charset = "utf-8",
                    s.timeout = 120,
                n.nc && s.setAttribute("nonce", n.nc),
                    s.src = function (e) {
                        return n.p + "static/" + ({
                            2: "vendors~academe~acvitity~email-unsubscribe~hp-2020~motif-catalog~project-settled-welcome~special-top~0049f470",
                            3: "chronicle~home~hot-list-catalog~local-station~motif-detail~policy-detail~search-list-Detail~tags-Detail",
                            4: "newsflash-catalog",
                            5: "vendors~wise-2019~wise-2019-nov~wise-2019-nov-dec",
                            6: "home~motif-detail",
                            7: "invite-record-entry",
                            8: "live-channel~live-column",
                            9: "nftags",
                            10: "project-form-claim",
                            11: "project-settled-welcome",
                            12: "search-list",
                            13: "tags",
                            14: "video-detail",
                            16: "LPlan",
                            17: "VClub",
                            18: "about",
                            19: "about-us-en",
                            20: "academe",
                            21: "acvitity",
                            23: "application-authority",
                            24: "article",
                            25: "audit-investor",
                            26: "author",
                            27: "chronicle",
                            28: "defaultReport",
                            29: "defaultReport2021",
                            30: "dell2021FormSuccess",
                            31: "demo",
                            32: "download",
                            33: "email-unsubscribe",
                            34: "enterprise-catalog",
                            35: "enterprise-detail",
                            36: "enterprisesList",
                            37: "entrepreneurship-competition",
                            38: "entrepreneurship-project-list",
                            39: "external-author-apply",
                            40: "facebookFormSuccess",
                            41: "gclub-catalog",
                            42: "home",
                            43: "hot-list-catalog",
                            44: "hot-list-detail",
                            45: "hp-2020",
                            46: "hp-club",
                            47: "iframe-login",
                            48: "info-share-list",
                            49: "information",
                            50: "innovate",
                            51: "invite-record-success",
                            52: "live-channel",
                            53: "live-column",
                            54: "live-detail",
                            55: "live-home",
                            56: "local-station",
                            57: "mform",
                            58: "motif-catalog",
                            59: "motif-detail",
                            60: "newsflash-detail",
                            61: "nftags-Detail",
                            62: "organization-catalog",
                            63: "organization-detail",
                            64: "other-protocols",
                            65: "overseas",
                            66: "policy-detail",
                            67: "privacy-terms",
                            68: "project-claim-settled-rights",
                            69: "project-claim-settled-success",
                            70: "project-detail",
                            71: "project-info-mod",
                            72: "project-info-mod-success",
                            73: "project-library-report",
                            74: "project-seek-report",
                            75: "project-seek-report-success",
                            76: "project-topic-detail",
                            77: "project-unclaimed",
                            78: "projects-catalog",
                            79: "refute-rumor-notice",
                            80: "rss-center",
                            82: "s2city-project-list",
                            83: "s2l-project-list",
                            84: "search-list-Detail",
                            85: "search-result",
                            86: "service-agreement",
                            87: "sign-up-acvitity",
                            88: "sign-up-acvitity-form",
                            89: "sign-up-claim-activity-form-success",
                            90: "special-topic-catalog",
                            91: "special-topic-detail",
                            92: "star-2020-city",
                            93: "star-2020-yl",
                            94: "station-business",
                            95: "tags-Detail",
                            96: "unsubscribe",
                            97: "usercenter",
                            98: "vendors~LPlan",
                            99: "video-catalog",
                            100: "wise-2019",
                            101: "wise-2019-nov",
                            102: "wise-2019-nov-dec",
                            103: "wise-2020-efficiency"
                        }[e] || e) + "." + {
                            0: "b9d3ec5f",
                            1: "f97509cb",
                            2: "2ee2d30b",
                            3: "b449d59f",
                            4: "992c6880",
                            5: "bf64abf3",
                            6: "fbafd939",
                            7: "2dfeda05",
                            8: "daab302b",
                            9: "d4f34e9c",
                            10: "df19736c",
                            11: "02329237",
                            12: "a9c4869b",
                            13: "c48a75ad",
                            14: "fd48ccd2",
                            15: "9e9efc1b",
                            16: "e0f81697",
                            17: "7f2fe808",
                            18: "a5d14007",
                            19: "9ef8a25a",
                            20: "fee933b7",
                            21: "c6546f8a",
                            23: "d243032c",
                            24: "aae21c63",
                            25: "25667f08",
                            26: "71827ee4",
                            27: "eb3b99d8",
                            28: "5808cb29",
                            29: "6ba273b7",
                            30: "d97b8773",
                            31: "83e5d74b",
                            32: "39cae625",
                            33: "19ddc421",
                            34: "a64c352a",
                            35: "3b4a5f1e",
                            36: "0fa8ddad",
                            37: "31341edc",
                            38: "67c19597",
                            39: "15d8eb8c",
                            40: "802e8167",
                            41: "cddb3ec2",
                            42: "4df8da26",
                            43: "c924fd9e",
                            44: "30dec11d",
                            45: "8a107f22",
                            46: "881747c3",
                            47: "7bf005d0",
                            48: "042c8b62",
                            49: "435066d8",
                            50: "f46115bf",
                            51: "ddfa06ab",
                            52: "e2ce6564",
                            53: "83f605d8",
                            54: "6437549b",
                            55: "dfc4b358",
                            56: "d9a7aa94",
                            57: "4f72f7e1",
                            58: "0f0c12f5",
                            59: "66df1a7a",
                            60: "7e98ea25",
                            61: "fefda7e5",
                            62: "59ab0562",
                            63: "7020eb5f",
                            64: "40a7bdbc",
                            65: "843a8254",
                            66: "e647f947",
                            67: "4b629acb",
                            68: "43482051",
                            69: "4678c5f2",
                            70: "bcd2a75f",
                            71: "28f2fd22",
                            72: "fb847ec8",
                            73: "0e21c5ee",
                            74: "3ba64acc",
                            75: "4c246ed3",
                            76: "194df890",
                            77: "f0008e1f",
                            78: "85cb477e",
                            79: "b14756d4",
                            80: "059adcf9",
                            82: "9dc92ff4",
                            83: "4a0a0c7a",
                            84: "4746f93c",
                            85: "baee5685",
                            86: "795a306a",
                            87: "4c1a0b0b",
                            88: "f30cb74f",
                            89: "a3d689f5",
                            90: "82d9b50c",
                            91: "c2605cba",
                            92: "1868f895",
                            93: "09f72b36",
                            94: "07813c3a",
                            95: "2e9a74c6",
                            96: "88066440",
                            97: "1a918888",
                            98: "17bd4923",
                            99: "b230f2c8",
                            100: "b3231235",
                            101: "6d00a42e",
                            102: "a430d40b",
                            103: "1960ef4a",
                            104: "db9f32de"
                        }[e] + ".js"
                    }(e);
                var l = new Error;
                i = function (t) {
                    s.onerror = s.onload = null,
                        clearTimeout(d);
                    var a = r[e];
                    if (0 !== a) {
                        if (a) {
                            var c = t && ("load" === t.type ? "missing" : t.type)
                                , o = t && t.target && t.target.src;
                            l.message = "Loading chunk " + e + " failed.\n(" + c + ": " + o + ")",
                                l.name = "ChunkLoadError",
                                l.type = c,
                                l.request = o,
                                a[1](l)
                        }
                        r[e] = void 0
                    }
                }
                ;
                var d = setTimeout((function () {
                        i({
                            type: "timeout",
                            target: s
                        })
                    }
                ), 12e4);
                s.onerror = s.onload = i,
                    document.head.appendChild(s)
            }
        return Promise.all(t)
    }
        ,
        n.m = e,
        n.c = c,
        n.d = function (e, t, a) {
            n.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: a
            })
        }
        ,
        n.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }),
                Object.defineProperty(e, "__esModule", {
                    value: !0
                })
        }
        ,
        n.t = function (e, t) {
            if (1 & t && (e = n(e)),
            8 & t)
                return e;
            if (4 & t && "object" == typeof e && e && e.__esModule)
                return e;
            var a = Object.create(null);
            if (n.r(a),
                Object.defineProperty(a, "default", {
                    enumerable: !0,
                    value: e
                }),
            2 & t && "string" != typeof e)
                for (var c in e)
                    n.d(a, c, function (t) {
                        return e[t]
                    }
                        .bind(null, c));
            return a
        }
        ,
        n.n = function (e) {
            var t = e && e.__esModule ? function () {
                    return e.default
                }
                : function () {
                    return e
                }
            ;
            return n.d(t, "a", t),
                t
        }
        ,
        n.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        ,
        n.p = "//static.36krcdn.com/36kr-web/",
        n.oe = function (e) {
            throw console.error(e),
                e
        }
    ;
    var s = window.webpackJsonp = window.webpackJsonp || []
        , l = s.push.bind(s);
    s.push = t,
        s = s.slice();
    for (var d = 0; d < s.length; d++)
        t(s[d]);
    var f = l;
    // a()
    bc = n;
}({
    '769': function (e, t, n) {
        var r, o, i;
        o = [t],
        void 0 === (i = "function" == typeof (r = function (e) {
                var t;

                function n(e, t, n) {
                    null != e && ("number" == typeof e ? this.fromNumber(e, t, n) : null == t && "string" != typeof e ? this.fromString(e, 256) : this.fromString(e, t))
                }

                function r() {
                    return new n(null)
                }

                "Microsoft Internet Explorer" == navigator.appName ? (n.prototype.am = function (e, t, n, r, o, i) {
                    for (var a = 32767 & t, s = t >> 15; --i >= 0;) {
                        var u = 32767 & this[e]
                            , c = this[e++] >> 15
                            , l = s * u + c * a;
                        o = ((u = a * u + ((32767 & l) << 15) + n[r] + (1073741823 & o)) >>> 30) + (l >>> 15) + s * c + (o >>> 30),
                            n[r++] = 1073741823 & u
                    }
                    return o
                }
                    ,
                    t = 30) : "Netscape" != navigator.appName ? (n.prototype.am = function (e, t, n, r, o, i) {
                    for (; --i >= 0;) {
                        var a = t * this[e++] + n[r] + o;
                        o = Math.floor(a / 67108864),
                            n[r++] = 67108863 & a
                    }
                    return o
                }
                    ,
                    t = 26) : (n.prototype.am = function (e, t, n, r, o, i) {
                    for (var a = 16383 & t, s = t >> 14; --i >= 0;) {
                        var u = 16383 & this[e]
                            , c = this[e++] >> 14
                            , l = s * u + c * a;
                        o = ((u = a * u + ((16383 & l) << 14) + n[r] + o) >> 28) + (l >> 14) + s * c,
                            n[r++] = 268435455 & u
                    }
                    return o
                }
                    ,
                    t = 28),
                    n.prototype.DB = t,
                    n.prototype.DM = (1 << t) - 1,
                    n.prototype.DV = 1 << t,
                    n.prototype.FV = Math.pow(2, 52),
                    n.prototype.F1 = 52 - t,
                    n.prototype.F2 = 2 * t - 52;
                var o, i, a = new Array;
                for (o = "0".charCodeAt(0),
                         i = 0; i <= 9; ++i)
                    a[o++] = i;
                for (o = "a".charCodeAt(0),
                         i = 10; i < 36; ++i)
                    a[o++] = i;
                for (o = "A".charCodeAt(0),
                         i = 10; i < 36; ++i)
                    a[o++] = i;

                function s(e) {
                    return "0123456789abcdefghijklmnopqrstuvwxyz".charAt(e)
                }

                function u(e, t) {
                    var n = a[e.charCodeAt(t)];
                    return null == n ? -1 : n
                }

                function c(e) {
                    var t = r();
                    return t.fromInt(e),
                        t
                }

                function l(e) {
                    var t, n = 1;
                    return 0 != (t = e >>> 16) && (e = t,
                        n += 16),
                    0 != (t = e >> 8) && (e = t,
                        n += 8),
                    0 != (t = e >> 4) && (e = t,
                        n += 4),
                    0 != (t = e >> 2) && (e = t,
                        n += 2),
                    0 != (t = e >> 1) && (e = t,
                        n += 1),
                        n
                }

                function f(e) {
                    this.m = e
                }

                function d(e) {
                    this.m = e,
                        this.mp = e.invDigit(),
                        this.mpl = 32767 & this.mp,
                        this.mph = this.mp >> 15,
                        this.um = (1 << e.DB - 15) - 1,
                        this.mt2 = 2 * e.t
                }

                function p(e, t) {
                    return e & t
                }

                function h(e, t) {
                    return e | t
                }

                function m(e, t) {
                    return e ^ t
                }

                function _(e, t) {
                    return e & ~t
                }

                function y(e) {
                    if (0 == e)
                        return -1;
                    var t = 0;
                    return 0 == (65535 & e) && (e >>= 16,
                        t += 16),
                    0 == (255 & e) && (e >>= 8,
                        t += 8),
                    0 == (15 & e) && (e >>= 4,
                        t += 4),
                    0 == (3 & e) && (e >>= 2,
                        t += 2),
                    0 == (1 & e) && ++t,
                        t
                }

                function g(e) {
                    for (var t = 0; 0 != e;)
                        e &= e - 1,
                            ++t;
                    return t
                }

                function b() {
                }

                function T(e) {
                    return e
                }

                function E(e) {
                    this.r2 = r(),
                        this.q3 = r(),
                        n.ONE.dlShiftTo(2 * e.t, this.r2),
                        this.mu = this.r2.divide(e),
                        this.m = e
                }

                f.prototype.convert = function (e) {
                    return e.s < 0 || e.compareTo(this.m) >= 0 ? e.mod(this.m) : e
                }
                    ,
                    f.prototype.revert = function (e) {
                        return e
                    }
                    ,
                    f.prototype.reduce = function (e) {
                        e.divRemTo(this.m, null, e)
                    }
                    ,
                    f.prototype.mulTo = function (e, t, n) {
                        e.multiplyTo(t, n),
                            this.reduce(n)
                    }
                    ,
                    f.prototype.sqrTo = function (e, t) {
                        e.squareTo(t),
                            this.reduce(t)
                    }
                    ,
                    d.prototype.convert = function (e) {
                        var t = r();
                        return e.abs().dlShiftTo(this.m.t, t),
                            t.divRemTo(this.m, null, t),
                        e.s < 0 && t.compareTo(n.ZERO) > 0 && this.m.subTo(t, t),
                            t
                    }
                    ,
                    d.prototype.revert = function (e) {
                        var t = r();
                        return e.copyTo(t),
                            this.reduce(t),
                            t
                    }
                    ,
                    d.prototype.reduce = function (e) {
                        for (; e.t <= this.mt2;)
                            e[e.t++] = 0;
                        for (var t = 0; t < this.m.t; ++t) {
                            var n = 32767 & e[t]
                                , r = n * this.mpl + ((n * this.mph + (e[t] >> 15) * this.mpl & this.um) << 15) & e.DM;
                            for (e[n = t + this.m.t] += this.m.am(0, r, e, t, 0, this.m.t); e[n] >= e.DV;)
                                e[n] -= e.DV,
                                    e[++n]++
                        }
                        e.clamp(),
                            e.drShiftTo(this.m.t, e),
                        e.compareTo(this.m) >= 0 && e.subTo(this.m, e)
                    }
                    ,
                    d.prototype.mulTo = function (e, t, n) {
                        e.multiplyTo(t, n),
                            this.reduce(n)
                    }
                    ,
                    d.prototype.sqrTo = function (e, t) {
                        e.squareTo(t),
                            this.reduce(t)
                    }
                    ,
                    n.prototype.copyTo = function (e) {
                        for (var t = this.t - 1; t >= 0; --t)
                            e[t] = this[t];
                        e.t = this.t,
                            e.s = this.s
                    }
                    ,
                    n.prototype.fromInt = function (e) {
                        this.t = 1,
                            this.s = e < 0 ? -1 : 0,
                            e > 0 ? this[0] = e : e < -1 ? this[0] = e + this.DV : this.t = 0
                    }
                    ,
                    n.prototype.fromString = function (e, t) {
                        var r;
                        if (16 == t)
                            r = 4;
                        else if (8 == t)
                            r = 3;
                        else if (256 == t)
                            r = 8;
                        else if (2 == t)
                            r = 1;
                        else if (32 == t)
                            r = 5;
                        else {
                            if (4 != t)
                                return void this.fromRadix(e, t);
                            r = 2
                        }
                        this.t = 0,
                            this.s = 0;
                        for (var o = e.length, i = !1, a = 0; --o >= 0;) {
                            var s = 8 == r ? 255 & e[o] : u(e, o);
                            s < 0 ? "-" == e.charAt(o) && (i = !0) : (i = !1,
                                0 == a ? this[this.t++] = s : a + r > this.DB ? (this[this.t - 1] |= (s & (1 << this.DB - a) - 1) << a,
                                    this[this.t++] = s >> this.DB - a) : this[this.t - 1] |= s << a,
                            (a += r) >= this.DB && (a -= this.DB))
                        }
                        8 == r && 0 != (128 & e[0]) && (this.s = -1,
                        a > 0 && (this[this.t - 1] |= (1 << this.DB - a) - 1 << a)),
                            this.clamp(),
                        i && n.ZERO.subTo(this, this)
                    }
                    ,
                    n.prototype.clamp = function () {
                        for (var e = this.s & this.DM; this.t > 0 && this[this.t - 1] == e;)
                            --this.t
                    }
                    ,
                    n.prototype.dlShiftTo = function (e, t) {
                        var n;
                        for (n = this.t - 1; n >= 0; --n)
                            t[n + e] = this[n];
                        for (n = e - 1; n >= 0; --n)
                            t[n] = 0;
                        t.t = this.t + e,
                            t.s = this.s
                    }
                    ,
                    n.prototype.drShiftTo = function (e, t) {
                        for (var n = e; n < this.t; ++n)
                            t[n - e] = this[n];
                        t.t = Math.max(this.t - e, 0),
                            t.s = this.s
                    }
                    ,
                    n.prototype.lShiftTo = function (e, t) {
                        var n, r = e % this.DB, o = this.DB - r, i = (1 << o) - 1, a = Math.floor(e / this.DB),
                            s = this.s << r & this.DM;
                        for (n = this.t - 1; n >= 0; --n)
                            t[n + a + 1] = this[n] >> o | s,
                                s = (this[n] & i) << r;
                        for (n = a - 1; n >= 0; --n)
                            t[n] = 0;
                        t[a] = s,
                            t.t = this.t + a + 1,
                            t.s = this.s,
                            t.clamp()
                    }
                    ,
                    n.prototype.rShiftTo = function (e, t) {
                        t.s = this.s;
                        var n = Math.floor(e / this.DB);
                        if (n >= this.t)
                            t.t = 0;
                        else {
                            var r = e % this.DB
                                , o = this.DB - r
                                , i = (1 << r) - 1;
                            t[0] = this[n] >> r;
                            for (var a = n + 1; a < this.t; ++a)
                                t[a - n - 1] |= (this[a] & i) << o,
                                    t[a - n] = this[a] >> r;
                            r > 0 && (t[this.t - n - 1] |= (this.s & i) << o),
                                t.t = this.t - n,
                                t.clamp()
                        }
                    }
                    ,
                    n.prototype.subTo = function (e, t) {
                        for (var n = 0, r = 0, o = Math.min(e.t, this.t); n < o;)
                            r += this[n] - e[n],
                                t[n++] = r & this.DM,
                                r >>= this.DB;
                        if (e.t < this.t) {
                            for (r -= e.s; n < this.t;)
                                r += this[n],
                                    t[n++] = r & this.DM,
                                    r >>= this.DB;
                            r += this.s
                        } else {
                            for (r += this.s; n < e.t;)
                                r -= e[n],
                                    t[n++] = r & this.DM,
                                    r >>= this.DB;
                            r -= e.s
                        }
                        t.s = r < 0 ? -1 : 0,
                            r < -1 ? t[n++] = this.DV + r : r > 0 && (t[n++] = r),
                            t.t = n,
                            t.clamp()
                    }
                    ,
                    n.prototype.multiplyTo = function (e, t) {
                        var r = this.abs()
                            , o = e.abs()
                            , i = r.t;
                        for (t.t = i + o.t; --i >= 0;)
                            t[i] = 0;
                        for (i = 0; i < o.t; ++i)
                            t[i + r.t] = r.am(0, o[i], t, i, 0, r.t);
                        t.s = 0,
                            t.clamp(),
                        this.s != e.s && n.ZERO.subTo(t, t)
                    }
                    ,
                    n.prototype.squareTo = function (e) {
                        for (var t = this.abs(), n = e.t = 2 * t.t; --n >= 0;)
                            e[n] = 0;
                        for (n = 0; n < t.t - 1; ++n) {
                            var r = t.am(n, t[n], e, 2 * n, 0, 1);
                            (e[n + t.t] += t.am(n + 1, 2 * t[n], e, 2 * n + 1, r, t.t - n - 1)) >= t.DV && (e[n + t.t] -= t.DV,
                                e[n + t.t + 1] = 1)
                        }
                        e.t > 0 && (e[e.t - 1] += t.am(n, t[n], e, 2 * n, 0, 1)),
                            e.s = 0,
                            e.clamp()
                    }
                    ,
                    n.prototype.divRemTo = function (e, t, o) {
                        var i = e.abs();
                        if (!(i.t <= 0)) {
                            var a = this.abs();
                            if (a.t < i.t)
                                return null != t && t.fromInt(0),
                                    void (null != o && this.copyTo(o));
                            null == o && (o = r());
                            var s = r()
                                , u = this.s
                                , c = e.s
                                , f = this.DB - l(i[i.t - 1]);
                            f > 0 ? (i.lShiftTo(f, s),
                                a.lShiftTo(f, o)) : (i.copyTo(s),
                                a.copyTo(o));
                            var d = s.t
                                , p = s[d - 1];
                            if (0 != p) {
                                var h = p * (1 << this.F1) + (d > 1 ? s[d - 2] >> this.F2 : 0)
                                    , m = this.FV / h
                                    , _ = (1 << this.F1) / h
                                    , y = 1 << this.F2
                                    , g = o.t
                                    , v = g - d
                                    , b = null == t ? r() : t;
                                for (s.dlShiftTo(v, b),
                                     o.compareTo(b) >= 0 && (o[o.t++] = 1,
                                         o.subTo(b, o)),
                                         n.ONE.dlShiftTo(d, b),
                                         b.subTo(s, s); s.t < d;)
                                    s[s.t++] = 0;
                                for (; --v >= 0;) {
                                    var T = o[--g] == p ? this.DM : Math.floor(o[g] * m + (o[g - 1] + y) * _);
                                    if ((o[g] += s.am(0, T, o, v, 0, d)) < T)
                                        for (s.dlShiftTo(v, b),
                                                 o.subTo(b, o); o[g] < --T;)
                                            o.subTo(b, o)
                                }
                                null != t && (o.drShiftTo(d, t),
                                u != c && n.ZERO.subTo(t, t)),
                                    o.t = d,
                                    o.clamp(),
                                f > 0 && o.rShiftTo(f, o),
                                u < 0 && n.ZERO.subTo(o, o)
                            }
                        }
                    }
                    ,
                    n.prototype.invDigit = function () {
                        if (this.t < 1)
                            return 0;
                        var e = this[0];
                        if (0 == (1 & e))
                            return 0;
                        var t = 3 & e;
                        return (t = (t = (t = (t = t * (2 - (15 & e) * t) & 15) * (2 - (255 & e) * t) & 255) * (2 - ((65535 & e) * t & 65535)) & 65535) * (2 - e * t % this.DV) % this.DV) > 0 ? this.DV - t : -t
                    }
                    ,
                    n.prototype.isEven = function () {
                        return 0 == (this.t > 0 ? 1 & this[0] : this.s)
                    }
                    ,
                    n.prototype.exp = function (e, t) {
                        if (e > 4294967295 || e < 1)
                            return n.ONE;
                        var o = r()
                            , i = r()
                            , a = t.convert(this)
                            , s = l(e) - 1;
                        for (a.copyTo(o); --s >= 0;)
                            if (t.sqrTo(o, i),
                            (e & 1 << s) > 0)
                                t.mulTo(i, a, o);
                            else {
                                var u = o;
                                o = i,
                                    i = u
                            }
                        return t.revert(o)
                    }
                    ,
                    n.prototype.toString = function (e) {
                        if (this.s < 0)
                            return "-" + this.negate().toString(e);
                        var t;
                        if (16 == e)
                            t = 4;
                        else if (8 == e)
                            t = 3;
                        else if (2 == e)
                            t = 1;
                        else if (32 == e)
                            t = 5;
                        else {
                            if (4 != e)
                                return this.toRadix(e);
                            t = 2
                        }
                        var n, r = (1 << t) - 1, o = !1, i = "", a = this.t, u = this.DB - a * this.DB % t;
                        if (a-- > 0)
                            for (u < this.DB && (n = this[a] >> u) > 0 && (o = !0,
                                i = s(n)); a >= 0;)
                                u < t ? (n = (this[a] & (1 << u) - 1) << t - u,
                                    n |= this[--a] >> (u += this.DB - t)) : (n = this[a] >> (u -= t) & r,
                                u <= 0 && (u += this.DB,
                                    --a)),
                                n > 0 && (o = !0),
                                o && (i += s(n));
                        return o ? i : "0"
                    }
                    ,
                    n.prototype.negate = function () {
                        var e = r();
                        return n.ZERO.subTo(this, e),
                            e
                    }
                    ,
                    n.prototype.abs = function () {
                        return this.s < 0 ? this.negate() : this
                    }
                    ,
                    n.prototype.compareTo = function (e) {
                        var t = this.s - e.s;
                        if (0 != t)
                            return t;
                        var n = this.t;
                        if (0 != (t = n - e.t))
                            return this.s < 0 ? -t : t;
                        for (; --n >= 0;)
                            if (0 != (t = this[n] - e[n]))
                                return t;
                        return 0
                    }
                    ,
                    n.prototype.bitLength = function () {
                        return this.t <= 0 ? 0 : this.DB * (this.t - 1) + l(this[this.t - 1] ^ this.s & this.DM)
                    }
                    ,
                    n.prototype.mod = function (e) {
                        var t = r();
                        return this.abs().divRemTo(e, null, t),
                        this.s < 0 && t.compareTo(n.ZERO) > 0 && e.subTo(t, t),
                            t
                    }
                    ,
                    n.prototype.modPowInt = function (e, t) {
                        var n;
                        return n = e < 256 || t.isEven() ? new f(t) : new d(t),
                            this.exp(e, n)
                    }
                    ,
                    n.ZERO = c(0),
                    n.ONE = c(1),
                    b.prototype.convert = T,
                    b.prototype.revert = T,
                    b.prototype.mulTo = function (e, t, n) {
                        e.multiplyTo(t, n)
                    }
                    ,
                    b.prototype.sqrTo = function (e, t) {
                        e.squareTo(t)
                    }
                    ,
                    E.prototype.convert = function (e) {
                        if (e.s < 0 || e.t > 2 * this.m.t)
                            return e.mod(this.m);
                        if (e.compareTo(this.m) < 0)
                            return e;
                        var t = r();
                        return e.copyTo(t),
                            this.reduce(t),
                            t
                    }
                    ,
                    E.prototype.revert = function (e) {
                        return e
                    }
                    ,
                    E.prototype.reduce = function (e) {
                        for (e.drShiftTo(this.m.t - 1, this.r2),
                             e.t > this.m.t + 1 && (e.t = this.m.t + 1,
                                 e.clamp()),
                                 this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3),
                                 this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); e.compareTo(this.r2) < 0;)
                            e.dAddOffset(1, this.m.t + 1);
                        for (e.subTo(this.r2, e); e.compareTo(this.m) >= 0;)
                            e.subTo(this.m, e)
                    }
                    ,
                    E.prototype.mulTo = function (e, t, n) {
                        e.multiplyTo(t, n),
                            this.reduce(n)
                    }
                    ,
                    E.prototype.sqrTo = function (e, t) {
                        e.squareTo(t),
                            this.reduce(t)
                    }
                ;
                var w, S, M,
                    k = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997],
                    O = (1 << 26) / k[k.length - 1];

                function L() {
                    this.i = 0,
                        this.j = 0,
                        this.S = new Array
                }

                if (n.prototype.chunkSize = function (e) {
                    return Math.floor(Math.LN2 * this.DB / Math.log(e))
                }
                    ,
                    n.prototype.toRadix = function (e) {
                        if (null == e && (e = 10),
                        0 == this.signum() || e < 2 || e > 36)
                            return "0";
                        var t = this.chunkSize(e)
                            , n = Math.pow(e, t)
                            , o = c(n)
                            , i = r()
                            , a = r()
                            , s = "";
                        for (this.divRemTo(o, i, a); i.signum() > 0;)
                            s = (n + a.intValue()).toString(e).substr(1) + s,
                                i.divRemTo(o, i, a);
                        return a.intValue().toString(e) + s
                    }
                    ,
                    n.prototype.fromRadix = function (e, t) {
                        this.fromInt(0),
                        null == t && (t = 10);
                        for (var r = this.chunkSize(t), o = Math.pow(t, r), i = !1, a = 0, s = 0, c = 0; c < e.length; ++c) {
                            var l = u(e, c);
                            l < 0 ? "-" == e.charAt(c) && 0 == this.signum() && (i = !0) : (s = t * s + l,
                            ++a >= r && (this.dMultiply(o),
                                this.dAddOffset(s, 0),
                                a = 0,
                                s = 0))
                        }
                        a > 0 && (this.dMultiply(Math.pow(t, a)),
                            this.dAddOffset(s, 0)),
                        i && n.ZERO.subTo(this, this)
                    }
                    ,
                    n.prototype.fromNumber = function (e, t, r) {
                        if ("number" == typeof t)
                            if (e < 2)
                                this.fromInt(1);
                            else
                                for (this.fromNumber(e, r),
                                     this.testBit(e - 1) || this.bitwiseTo(n.ONE.shiftLeft(e - 1), h, this),
                                     this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(t);)
                                    this.dAddOffset(2, 0),
                                    this.bitLength() > e && this.subTo(n.ONE.shiftLeft(e - 1), this);
                        else {
                            var o = new Array
                                , i = 7 & e;
                            o.length = 1 + (e >> 3),
                                t.nextBytes(o),
                                i > 0 ? o[0] &= (1 << i) - 1 : o[0] = 0,
                                this.fromString(o, 256)
                        }
                    }
                    ,
                    n.prototype.bitwiseTo = function (e, t, n) {
                        var r, o, i = Math.min(e.t, this.t);
                        for (r = 0; r < i; ++r)
                            n[r] = t(this[r], e[r]);
                        if (e.t < this.t) {
                            for (o = e.s & this.DM,
                                     r = i; r < this.t; ++r)
                                n[r] = t(this[r], o);
                            n.t = this.t
                        } else {
                            for (o = this.s & this.DM,
                                     r = i; r < e.t; ++r)
                                n[r] = t(o, e[r]);
                            n.t = e.t
                        }
                        n.s = t(this.s, e.s),
                            n.clamp()
                    }
                    ,
                    n.prototype.changeBit = function (e, t) {
                        var r = n.ONE.shiftLeft(e);
                        return this.bitwiseTo(r, t, r),
                            r
                    }
                    ,
                    n.prototype.addTo = function (e, t) {
                        for (var n = 0, r = 0, o = Math.min(e.t, this.t); n < o;)
                            r += this[n] + e[n],
                                t[n++] = r & this.DM,
                                r >>= this.DB;
                        if (e.t < this.t) {
                            for (r += e.s; n < this.t;)
                                r += this[n],
                                    t[n++] = r & this.DM,
                                    r >>= this.DB;
                            r += this.s
                        } else {
                            for (r += this.s; n < e.t;)
                                r += e[n],
                                    t[n++] = r & this.DM,
                                    r >>= this.DB;
                            r += e.s
                        }
                        t.s = r < 0 ? -1 : 0,
                            r > 0 ? t[n++] = r : r < -1 && (t[n++] = this.DV + r),
                            t.t = n,
                            t.clamp()
                    }
                    ,
                    n.prototype.dMultiply = function (e) {
                        this[this.t] = this.am(0, e - 1, this, 0, 0, this.t),
                            ++this.t,
                            this.clamp()
                    }
                    ,
                    n.prototype.dAddOffset = function (e, t) {
                        if (0 != e) {
                            for (; this.t <= t;)
                                this[this.t++] = 0;
                            for (this[t] += e; this[t] >= this.DV;)
                                this[t] -= this.DV,
                                ++t >= this.t && (this[this.t++] = 0),
                                    ++this[t]
                        }
                    }
                    ,
                    n.prototype.multiplyLowerTo = function (e, t, n) {
                        var r, o = Math.min(this.t + e.t, t);
                        for (n.s = 0,
                                 n.t = o; o > 0;)
                            n[--o] = 0;
                        for (r = n.t - this.t; o < r; ++o)
                            n[o + this.t] = this.am(0, e[o], n, o, 0, this.t);
                        for (r = Math.min(e.t, t); o < r; ++o)
                            this.am(0, e[o], n, o, 0, t - o);
                        n.clamp()
                    }
                    ,
                    n.prototype.multiplyUpperTo = function (e, t, n) {
                        --t;
                        var r = n.t = this.t + e.t - t;
                        for (n.s = 0; --r >= 0;)
                            n[r] = 0;
                        for (r = Math.max(t - this.t, 0); r < e.t; ++r)
                            n[this.t + r - t] = this.am(t - r, e[r], n, 0, 0, this.t + r - t);
                        n.clamp(),
                            n.drShiftTo(1, n)
                    }
                    ,
                    n.prototype.modInt = function (e) {
                        if (e <= 0)
                            return 0;
                        var t = this.DV % e
                            , n = this.s < 0 ? e - 1 : 0;
                        if (this.t > 0)
                            if (0 == t)
                                n = this[0] % e;
                            else
                                for (var r = this.t - 1; r >= 0; --r)
                                    n = (t * n + this[r]) % e;
                        return n
                    }
                    ,
                    n.prototype.millerRabin = function (e) {
                        var t = this.subtract(n.ONE)
                            , o = t.getLowestSetBit();
                        if (o <= 0)
                            return !1;
                        var i = t.shiftRight(o);
                        (e = e + 1 >> 1) > k.length && (e = k.length);
                        for (var a = r(), s = 0; s < e; ++s) {
                            a.fromInt(k[Math.floor(Math.random() * k.length)]);
                            var u = a.modPow(i, this);
                            if (0 != u.compareTo(n.ONE) && 0 != u.compareTo(t)) {
                                for (var c = 1; c++ < o && 0 != u.compareTo(t);)
                                    if (0 == (u = u.modPowInt(2, this)).compareTo(n.ONE))
                                        return !1;
                                if (0 != u.compareTo(t))
                                    return !1
                            }
                        }
                        return !0
                    }
                    ,
                    n.prototype.clone = function () {
                        var e = r();
                        return this.copyTo(e),
                            e
                    }
                    ,
                    n.prototype.intValue = function () {
                        if (this.s < 0) {
                            if (1 == this.t)
                                return this[0] - this.DV;
                            if (0 == this.t)
                                return -1
                        } else {
                            if (1 == this.t)
                                return this[0];
                            if (0 == this.t)
                                return 0
                        }
                        return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
                    }
                    ,
                    n.prototype.byteValue = function () {
                        return 0 == this.t ? this.s : this[0] << 24 >> 24
                    }
                    ,
                    n.prototype.shortValue = function () {
                        return 0 == this.t ? this.s : this[0] << 16 >> 16
                    }
                    ,
                    n.prototype.signum = function () {
                        return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
                    }
                    ,
                    n.prototype.toByteArray = function () {
                        var e = this.t
                            , t = new Array;
                        t[0] = this.s;
                        var n, r = this.DB - e * this.DB % 8, o = 0;
                        if (e-- > 0)
                            for (r < this.DB && (n = this[e] >> r) != (this.s & this.DM) >> r && (t[o++] = n | this.s << this.DB - r); e >= 0;)
                                r < 8 ? (n = (this[e] & (1 << r) - 1) << 8 - r,
                                    n |= this[--e] >> (r += this.DB - 8)) : (n = this[e] >> (r -= 8) & 255,
                                r <= 0 && (r += this.DB,
                                    --e)),
                                0 != (128 & n) && (n |= -256),
                                0 == o && (128 & this.s) != (128 & n) && ++o,
                                (o > 0 || n != this.s) && (t[o++] = n);
                        return t
                    }
                    ,
                    n.prototype.equals = function (e) {
                        return 0 == this.compareTo(e)
                    }
                    ,
                    n.prototype.min = function (e) {
                        return this.compareTo(e) < 0 ? this : e
                    }
                    ,
                    n.prototype.max = function (e) {
                        return this.compareTo(e) > 0 ? this : e
                    }
                    ,
                    n.prototype.and = function (e) {
                        var t = r();
                        return this.bitwiseTo(e, p, t),
                            t
                    }
                    ,
                    n.prototype.or = function (e) {
                        var t = r();
                        return this.bitwiseTo(e, h, t),
                            t
                    }
                    ,
                    n.prototype.xor = function (e) {
                        var t = r();
                        return this.bitwiseTo(e, m, t),
                            t
                    }
                    ,
                    n.prototype.andNot = function (e) {
                        var t = r();
                        return this.bitwiseTo(e, _, t),
                            t
                    }
                    ,
                    n.prototype.not = function () {
                        for (var e = r(), t = 0; t < this.t; ++t)
                            e[t] = this.DM & ~this[t];
                        return e.t = this.t,
                            e.s = ~this.s,
                            e
                    }
                    ,
                    n.prototype.shiftLeft = function (e) {
                        var t = r();
                        return e < 0 ? this.rShiftTo(-e, t) : this.lShiftTo(e, t),
                            t
                    }
                    ,
                    n.prototype.shiftRight = function (e) {
                        var t = r();
                        return e < 0 ? this.lShiftTo(-e, t) : this.rShiftTo(e, t),
                            t
                    }
                    ,
                    n.prototype.getLowestSetBit = function () {
                        for (var e = 0; e < this.t; ++e)
                            if (0 != this[e])
                                return e * this.DB + y(this[e]);
                        return this.s < 0 ? this.t * this.DB : -1
                    }
                    ,
                    n.prototype.bitCount = function () {
                        for (var e = 0, t = this.s & this.DM, n = 0; n < this.t; ++n)
                            e += g(this[n] ^ t);
                        return e
                    }
                    ,
                    n.prototype.testBit = function (e) {
                        var t = Math.floor(e / this.DB);
                        return t >= this.t ? 0 != this.s : 0 != (this[t] & 1 << e % this.DB)
                    }
                    ,
                    n.prototype.setBit = function (e) {
                        return this.changeBit(e, h)
                    }
                    ,
                    n.prototype.clearBit = function (e) {
                        return this.changeBit(e, _)
                    }
                    ,
                    n.prototype.flipBit = function (e) {
                        return this.changeBit(e, m)
                    }
                    ,
                    n.prototype.add = function (e) {
                        var t = r();
                        return this.addTo(e, t),
                            t
                    }
                    ,
                    n.prototype.subtract = function (e) {
                        var t = r();
                        return this.subTo(e, t),
                            t
                    }
                    ,
                    n.prototype.multiply = function (e) {
                        var t = r();
                        return this.multiplyTo(e, t),
                            t
                    }
                    ,
                    n.prototype.divide = function (e) {
                        var t = r();
                        return this.divRemTo(e, t, null),
                            t
                    }
                    ,
                    n.prototype.remainder = function (e) {
                        var t = r();
                        return this.divRemTo(e, null, t),
                            t
                    }
                    ,
                    n.prototype.divideAndRemainder = function (e) {
                        var t = r()
                            , n = r();
                        return this.divRemTo(e, t, n),
                            new Array(t, n)
                    }
                    ,
                    n.prototype.modPow = function (e, t) {
                        var n, o, i = e.bitLength(), a = c(1);
                        if (i <= 0)
                            return a;
                        n = i < 18 ? 1 : i < 48 ? 3 : i < 144 ? 4 : i < 768 ? 5 : 6,
                            o = i < 8 ? new f(t) : t.isEven() ? new E(t) : new d(t);
                        var s = new Array
                            , u = 3
                            , p = n - 1
                            , h = (1 << n) - 1;
                        if (s[1] = o.convert(this),
                        n > 1) {
                            var m = r();
                            for (o.sqrTo(s[1], m); u <= h;)
                                s[u] = r(),
                                    o.mulTo(m, s[u - 2], s[u]),
                                    u += 2
                        }
                        var _, y, g = e.t - 1, v = !0, b = r();
                        for (i = l(e[g]) - 1; g >= 0;) {
                            for (i >= p ? _ = e[g] >> i - p & h : (_ = (e[g] & (1 << i + 1) - 1) << p - i,
                            g > 0 && (_ |= e[g - 1] >> this.DB + i - p)),
                                     u = n; 0 == (1 & _);)
                                _ >>= 1,
                                    --u;
                            if ((i -= u) < 0 && (i += this.DB,
                                --g),
                                v)
                                s[_].copyTo(a),
                                    v = !1;
                            else {
                                for (; u > 1;)
                                    o.sqrTo(a, b),
                                        o.sqrTo(b, a),
                                        u -= 2;
                                u > 0 ? o.sqrTo(a, b) : (y = a,
                                    a = b,
                                    b = y),
                                    o.mulTo(b, s[_], a)
                            }
                            for (; g >= 0 && 0 == (e[g] & 1 << i);)
                                o.sqrTo(a, b),
                                    y = a,
                                    a = b,
                                    b = y,
                                --i < 0 && (i = this.DB - 1,
                                    --g)
                        }
                        return o.revert(a)
                    }
                    ,
                    n.prototype.modInverse = function (e) {
                        var t = e.isEven();
                        if (this.isEven() && t || 0 == e.signum())
                            return n.ZERO;
                        for (var r = e.clone(), o = this.clone(), i = c(1), a = c(0), s = c(0), u = c(1); 0 != r.signum();) {
                            for (; r.isEven();)
                                r.rShiftTo(1, r),
                                    t ? (i.isEven() && a.isEven() || (i.addTo(this, i),
                                        a.subTo(e, a)),
                                        i.rShiftTo(1, i)) : a.isEven() || a.subTo(e, a),
                                    a.rShiftTo(1, a);
                            for (; o.isEven();)
                                o.rShiftTo(1, o),
                                    t ? (s.isEven() && u.isEven() || (s.addTo(this, s),
                                        u.subTo(e, u)),
                                        s.rShiftTo(1, s)) : u.isEven() || u.subTo(e, u),
                                    u.rShiftTo(1, u);
                            r.compareTo(o) >= 0 ? (r.subTo(o, r),
                            t && i.subTo(s, i),
                                a.subTo(u, a)) : (o.subTo(r, o),
                            t && s.subTo(i, s),
                                u.subTo(a, u))
                        }
                        return 0 != o.compareTo(n.ONE) ? n.ZERO : u.compareTo(e) >= 0 ? u.subtract(e) : u.signum() < 0 ? (u.addTo(e, u),
                            u.signum() < 0 ? u.add(e) : u) : u
                    }
                    ,
                    n.prototype.pow = function (e) {
                        return this.exp(e, new b)
                    }
                    ,
                    n.prototype.gcd = function (e) {
                        var t = this.s < 0 ? this.negate() : this.clone()
                            , n = e.s < 0 ? e.negate() : e.clone();
                        if (t.compareTo(n) < 0) {
                            var r = t;
                            t = n,
                                n = r
                        }
                        var o = t.getLowestSetBit()
                            , i = n.getLowestSetBit();
                        if (i < 0)
                            return t;
                        for (o < i && (i = o),
                             i > 0 && (t.rShiftTo(i, t),
                                 n.rShiftTo(i, n)); t.signum() > 0;)
                            (o = t.getLowestSetBit()) > 0 && t.rShiftTo(o, t),
                            (o = n.getLowestSetBit()) > 0 && n.rShiftTo(o, n),
                                t.compareTo(n) >= 0 ? (t.subTo(n, t),
                                    t.rShiftTo(1, t)) : (n.subTo(t, n),
                                    n.rShiftTo(1, n));
                        return i > 0 && n.lShiftTo(i, n),
                            n
                    }
                    ,
                    n.prototype.isProbablePrime = function (e) {
                        var t, n = this.abs();
                        if (1 == n.t && n[0] <= k[k.length - 1]) {
                            for (t = 0; t < k.length; ++t)
                                if (n[0] == k[t])
                                    return !0;
                            return !1
                        }
                        if (n.isEven())
                            return !1;
                        for (t = 1; t < k.length;) {
                            for (var r = k[t], o = t + 1; o < k.length && r < O;)
                                r *= k[o++];
                            for (r = n.modInt(r); t < o;)
                                if (r % k[t++] == 0)
                                    return !1
                        }
                        return n.millerRabin(e)
                    }
                    ,
                    n.prototype.square = function () {
                        var e = r();
                        return this.squareTo(e),
                            e
                    }
                    ,
                    L.prototype.init = function (e) {
                        var t, n, r;
                        for (t = 0; t < 256; ++t)
                            this.S[t] = t;
                        for (n = 0,
                                 t = 0; t < 256; ++t)
                            n = n + this.S[t] + e[t % e.length] & 255,
                                r = this.S[t],
                                this.S[t] = this.S[n],
                                this.S[n] = r;
                        this.i = 0,
                            this.j = 0
                    }
                    ,
                    L.prototype.next = function () {
                        var e;
                        return this.i = this.i + 1 & 255,
                            this.j = this.j + this.S[this.i] & 255,
                            e = this.S[this.i],
                            this.S[this.i] = this.S[this.j],
                            this.S[this.j] = e,
                            this.S[e + this.S[this.i] & 255]
                    }
                    ,
                null == S) {
                    var A;
                    if (S = new Array,
                        M = 0,
                    window.crypto && window.crypto.getRandomValues) {
                        var D = new Uint32Array(256);
                        for (window.crypto.getRandomValues(D),
                                 A = 0; A < D.length; ++A)
                            S[M++] = 255 & D[A]
                    }
                    var x = function (e) {
                        if (this.count = this.count || 0,
                        this.count >= 256 || M >= 256)
                            window.removeEventListener ? window.removeEventListener("mousemove", x, !1) : window.detachEvent && window.detachEvent("onmousemove", x);
                        else
                            try {
                                var t = e.x + e.y;
                                S[M++] = 255 & t,
                                    this.count += 1
                            } catch (e) {
                            }
                    };
                    window.addEventListener ? window.addEventListener("mousemove", x, !1) : window.attachEvent && window.attachEvent("onmousemove", x)
                }

                function C() {
                    if (null == w) {
                        for (w = new L; M < 256;) {
                            var e = Math.floor(65536 * Math.random());
                            S[M++] = 255 & e
                        }
                        for (w.init(S),
                                 M = 0; M < S.length; ++M)
                            S[M] = 0;
                        M = 0
                    }
                    return w.next()
                }

                function N() {
                }

                function P(e, t) {
                    return new n(e, t)
                }

                function R() {
                    this.n = null,
                        this.e = 0,
                        this.d = null,
                        this.p = null,
                        this.q = null,
                        this.dmp1 = null,
                        this.dmq1 = null,
                        this.coeff = null
                }

                N.prototype.nextBytes = function (e) {
                    var t;
                    for (t = 0; t < e.length; ++t)
                        e[t] = C()
                }
                    ,
                    R.prototype.doPublic = function (e) {
                        return e.modPowInt(this.e, this.n)
                    }
                    ,
                    R.prototype.setPublic = function (e, t) {
                        null != e && null != t && e.length > 0 && t.length > 0 ? (this.n = P(e, 16),
                            this.e = parseInt(t, 16)) : console.error("Invalid RSA public key")
                    }
                    ,
                    R.prototype.encrypt = function (e) {
                        var t = function (e, t) {
                            if (t < e.length + 11)
                                return console.error("Message too long for RSA"),
                                    null;
                            for (var r = new Array, o = e.length - 1; o >= 0 && t > 0;) {
                                var i = e.charCodeAt(o--);
                                i < 128 ? r[--t] = i : i > 127 && i < 2048 ? (r[--t] = 63 & i | 128,
                                    r[--t] = i >> 6 | 192) : (r[--t] = 63 & i | 128,
                                    r[--t] = i >> 6 & 63 | 128,
                                    r[--t] = i >> 12 | 224)
                            }
                            r[--t] = 0;
                            for (var a = new N, s = new Array; t > 2;) {
                                for (s[0] = 0; 0 == s[0];)
                                    a.nextBytes(s);
                                r[--t] = s[0]
                            }
                            return r[--t] = 2,
                                r[--t] = 0,
                                new n(r)
                        }(e, this.n.bitLength() + 7 >> 3);
                        if (null == t)
                            return null;
                        var r = this.doPublic(t);
                        if (null == r)
                            return null;
                        var o = r.toString(16);
                        return 0 == (1 & o.length) ? o : "0" + o
                    }
                    ,
                    R.prototype.doPrivate = function (e) {
                        if (null == this.p || null == this.q)
                            return e.modPow(this.d, this.n);
                        for (var t = e.mod(this.p).modPow(this.dmp1, this.p), n = e.mod(this.q).modPow(this.dmq1, this.q); t.compareTo(n) < 0;)
                            t = t.add(this.p);
                        return t.subtract(n).multiply(this.coeff).mod(this.p).multiply(this.q).add(n)
                    }
                    ,
                    R.prototype.setPrivate = function (e, t, n) {
                        null != e && null != t && e.length > 0 && t.length > 0 ? (this.n = P(e, 16),
                            this.e = parseInt(t, 16),
                            this.d = P(n, 16)) : console.error("Invalid RSA private key")
                    }
                    ,
                    R.prototype.setPrivateEx = function (e, t, n, r, o, i, a, s) {
                        null != e && null != t && e.length > 0 && t.length > 0 ? (this.n = P(e, 16),
                            this.e = parseInt(t, 16),
                            this.d = P(n, 16),
                            this.p = P(r, 16),
                            this.q = P(o, 16),
                            this.dmp1 = P(i, 16),
                            this.dmq1 = P(a, 16),
                            this.coeff = P(s, 16)) : console.error("Invalid RSA private key")
                    }
                    ,
                    R.prototype.generate = function (e, t) {
                        var r = new N
                            , o = e >> 1;
                        this.e = parseInt(t, 16);
                        for (var i = new n(t, 16); ;) {
                            for (; this.p = new n(e - o, 1, r),
                                   0 != this.p.subtract(n.ONE).gcd(i).compareTo(n.ONE) || !this.p.isProbablePrime(10);)
                                ;
                            for (; this.q = new n(o, 1, r),
                                   0 != this.q.subtract(n.ONE).gcd(i).compareTo(n.ONE) || !this.q.isProbablePrime(10);)
                                ;
                            if (this.p.compareTo(this.q) <= 0) {
                                var a = this.p;
                                this.p = this.q,
                                    this.q = a
                            }
                            var s = this.p.subtract(n.ONE)
                                , u = this.q.subtract(n.ONE)
                                , c = s.multiply(u);
                            if (0 == c.gcd(i).compareTo(n.ONE)) {
                                this.n = this.p.multiply(this.q),
                                    this.d = i.modInverse(c),
                                    this.dmp1 = this.d.mod(s),
                                    this.dmq1 = this.d.mod(u),
                                    this.coeff = this.q.modInverse(this.p);
                                break
                            }
                        }
                    }
                    ,
                    R.prototype.decrypt = function (e) {
                        var t = P(e, 16)
                            , n = this.doPrivate(t);
                        return null == n ? null : function (e, t) {
                            for (var n = e.toByteArray(), r = 0; r < n.length && 0 == n[r];)
                                ++r;
                            if (n.length - r != t - 1 || 2 != n[r])
                                return null;
                            for (++r; 0 != n[r];)
                                if (++r >= n.length)
                                    return null;
                            for (var o = ""; ++r < n.length;) {
                                var i = 255 & n[r];
                                i < 128 ? o += String.fromCharCode(i) : i > 191 && i < 224 ? (o += String.fromCharCode((31 & i) << 6 | 63 & n[r + 1]),
                                    ++r) : (o += String.fromCharCode((15 & i) << 12 | (63 & n[r + 1]) << 6 | 63 & n[r + 2]),
                                    r += 2)
                            }
                            return o
                        }(n, this.n.bitLength() + 7 >> 3)
                    }
                    ,
                    R.prototype.generateAsync = function (e, t, o) {
                        var i = new N
                            , a = e >> 1;
                        this.e = parseInt(t, 16);
                        var s = new n(t, 16)
                            , u = this
                            , c = function () {
                            var t = function () {
                                if (u.p.compareTo(u.q) <= 0) {
                                    var e = u.p;
                                    u.p = u.q,
                                        u.q = e
                                }
                                var t = u.p.subtract(n.ONE)
                                    , r = u.q.subtract(n.ONE)
                                    , i = t.multiply(r);
                                0 == i.gcd(s).compareTo(n.ONE) ? (u.n = u.p.multiply(u.q),
                                    u.d = s.modInverse(i),
                                    u.dmp1 = u.d.mod(t),
                                    u.dmq1 = u.d.mod(r),
                                    u.coeff = u.q.modInverse(u.p),
                                    setTimeout((function () {
                                            o()
                                        }
                                    ), 0)) : setTimeout(c, 0)
                            }
                                , l = function () {
                                u.q = r(),
                                    u.q.fromNumberAsync(a, 1, i, (function () {
                                            u.q.subtract(n.ONE).gcda(s, (function (e) {
                                                    0 == e.compareTo(n.ONE) && u.q.isProbablePrime(10) ? setTimeout(t, 0) : setTimeout(l, 0)
                                                }
                                            ))
                                        }
                                    ))
                            }
                                , f = function () {
                                u.p = r(),
                                    u.p.fromNumberAsync(e - a, 1, i, (function () {
                                            u.p.subtract(n.ONE).gcda(s, (function (e) {
                                                    0 == e.compareTo(n.ONE) && u.p.isProbablePrime(10) ? setTimeout(l, 0) : setTimeout(f, 0)
                                                }
                                            ))
                                        }
                                    ))
                            };
                            setTimeout(f, 0)
                        };
                        setTimeout(c, 0)
                    }
                    ,
                    n.prototype.gcda = function (e, t) {
                        var n = this.s < 0 ? this.negate() : this.clone()
                            , r = e.s < 0 ? e.negate() : e.clone();
                        if (n.compareTo(r) < 0) {
                            var o = n;
                            n = r,
                                r = o
                        }
                        var i = n.getLowestSetBit()
                            , a = r.getLowestSetBit();
                        if (a < 0)
                            t(n);
                        else {
                            i < a && (a = i),
                            a > 0 && (n.rShiftTo(a, n),
                                r.rShiftTo(a, r));
                            var s = function () {
                                (i = n.getLowestSetBit()) > 0 && n.rShiftTo(i, n),
                                (i = r.getLowestSetBit()) > 0 && r.rShiftTo(i, r),
                                    n.compareTo(r) >= 0 ? (n.subTo(r, n),
                                        n.rShiftTo(1, n)) : (r.subTo(n, r),
                                        r.rShiftTo(1, r)),
                                    n.signum() > 0 ? setTimeout(s, 0) : (a > 0 && r.lShiftTo(a, r),
                                        setTimeout((function () {
                                                t(r)
                                            }
                                        ), 0))
                            };
                            setTimeout(s, 10)
                        }
                    }
                    ,
                    n.prototype.fromNumberAsync = function (e, t, r, o) {
                        if ("number" == typeof t)
                            if (e < 2)
                                this.fromInt(1);
                            else {
                                this.fromNumber(e, r),
                                this.testBit(e - 1) || this.bitwiseTo(n.ONE.shiftLeft(e - 1), h, this),
                                this.isEven() && this.dAddOffset(1, 0);
                                var i = this
                                    , a = function () {
                                    i.dAddOffset(2, 0),
                                    i.bitLength() > e && i.subTo(n.ONE.shiftLeft(e - 1), i),
                                        i.isProbablePrime(t) ? setTimeout((function () {
                                                o()
                                            }
                                        ), 0) : setTimeout(a, 0)
                                };
                                setTimeout(a, 0)
                            }
                        else {
                            var s = new Array
                                , u = 7 & e;
                            s.length = 1 + (e >> 3),
                                t.nextBytes(s),
                                u > 0 ? s[0] &= (1 << u) - 1 : s[0] = 0,
                                this.fromString(s, 256)
                        }
                    }
                ;
                var j = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

                function I(e) {
                    var t, n, r = "";
                    for (t = 0; t + 3 <= e.length; t += 3)
                        n = parseInt(e.substring(t, t + 3), 16),
                            r += j.charAt(n >> 6) + j.charAt(63 & n);
                    for (t + 1 == e.length ? (n = parseInt(e.substring(t, t + 1), 16),
                        r += j.charAt(n << 2)) : t + 2 == e.length && (n = parseInt(e.substring(t, t + 2), 16),
                        r += j.charAt(n >> 2) + j.charAt((3 & n) << 4)); (3 & r.length) > 0;)
                        r += "=";
                    return r
                }

                function Y(e) {
                    var t, n, r = "", o = 0;
                    for (t = 0; t < e.length && "=" != e.charAt(t); ++t)
                        v = j.indexOf(e.charAt(t)),
                        v < 0 || (0 == o ? (r += s(v >> 2),
                            n = 3 & v,
                            o = 1) : 1 == o ? (r += s(n << 2 | v >> 4),
                            n = 15 & v,
                            o = 2) : 2 == o ? (r += s(n),
                            r += s(v >> 2),
                            n = 3 & v,
                            o = 3) : (r += s(n << 2 | v >> 4),
                            r += s(15 & v),
                            o = 0));
                    return 1 == o && (r += s(n << 2)),
                        r
                }

                var H = H || {};
                H.env = H.env || {};
                var F = H
                    , B = Object.prototype
                    , U = ["toString", "valueOf"];
                H.env.parseUA = function (e) {
                    var t, n = function (e) {
                        var t = 0;
                        return parseFloat(e.replace(/\./g, (function () {
                                return 1 == t++ ? "" : "."
                            }
                        )))
                    }, r = navigator, o = {
                        ie: 0,
                        opera: 0,
                        gecko: 0,
                        webkit: 0,
                        chrome: 0,
                        mobile: null,
                        air: 0,
                        ipad: 0,
                        iphone: 0,
                        ipod: 0,
                        ios: null,
                        android: 0,
                        webos: 0,
                        caja: r && r.cajaVersion,
                        secure: !1,
                        os: null
                    }, i = e || navigator && navigator.userAgent, a = window && window.location, s = a && a.href;
                    return o.secure = s && 0 === s.toLowerCase().indexOf("https"),
                    i && (/windows|win32/i.test(i) ? o.os = "windows" : /macintosh/i.test(i) ? o.os = "macintosh" : /rhino/i.test(i) && (o.os = "rhino"),
                    /KHTML/.test(i) && (o.webkit = 1),
                    (t = i.match(/AppleWebKit\/([^\s]*)/)) && t[1] && (o.webkit = n(t[1]),
                        / Mobile\//.test(i) ? (o.mobile = "Apple",
                        (t = i.match(/OS ([^\s]*)/)) && t[1] && (t = n(t[1].replace("_", "."))),
                            o.ios = t,
                            o.ipad = o.ipod = o.iphone = 0,
                        (t = i.match(/iPad|iPod|iPhone/)) && t[0] && (o[t[0].toLowerCase()] = o.ios)) : ((t = i.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/)) && (o.mobile = t[0]),
                        /webOS/.test(i) && (o.mobile = "WebOS",
                        (t = i.match(/webOS\/([^\s]*);/)) && t[1] && (o.webos = n(t[1]))),
                        / Android/.test(i) && (o.mobile = "Android",
                        (t = i.match(/Android ([^\s]*);/)) && t[1] && (o.android = n(t[1])))),
                        (t = i.match(/Chrome\/([^\s]*)/)) && t[1] ? o.chrome = n(t[1]) : (t = i.match(/AdobeAIR\/([^\s]*)/)) && (o.air = t[0])),
                    o.webkit || ((t = i.match(/Opera[\s\/]([^\s]*)/)) && t[1] ? (o.opera = n(t[1]),
                    (t = i.match(/Version\/([^\s]*)/)) && t[1] && (o.opera = n(t[1])),
                    (t = i.match(/Opera Mini[^;]*/)) && (o.mobile = t[0])) : (t = i.match(/MSIE\s([^;]*)/)) && t[1] ? o.ie = n(t[1]) : (t = i.match(/Gecko\/([^\s]*)/)) && (o.gecko = 1,
                    (t = i.match(/rv:([^\s\)]*)/)) && t[1] && (o.gecko = n(t[1]))))),
                        o
                }
                    ,
                    H.env.ua = H.env.parseUA(),
                    H.isFunction = function (e) {
                        return "function" == typeof e || "[object Function]" === B.toString.apply(e)
                    }
                    ,
                    H._IEEnumFix = H.env.ua.ie ? function (e, t) {
                            var n, r, o;
                            for (n = 0; n < U.length; n += 1)
                                o = t[r = U[n]],
                                F.isFunction(o) && o != B[r] && (e[r] = o)
                        }
                        : function () {
                        }
                    ,
                    H.extend = function (e, t, n) {
                        if (!t || !e)
                            throw new Error("extend failed, please check that all dependencies are included.");
                        var r, o = function () {
                        };
                        if (o.prototype = t.prototype,
                            e.prototype = new o,
                            e.prototype.constructor = e,
                            e.superclass = t.prototype,
                        t.prototype.constructor == B.constructor && (t.prototype.constructor = t),
                            n) {
                            for (r in n)
                                F.hasOwnProperty(n, r) && (e.prototype[r] = n[r]);
                            F._IEEnumFix(e.prototype, n)
                        }
                    }
                    ,
                "undefined" != typeof KJUR && KJUR || (KJUR = {}),
                void 0 !== KJUR.asn1 && KJUR.asn1 || (KJUR.asn1 = {}),
                    KJUR.asn1.ASN1Util = new function () {
                        this.integerToByteHex = function (e) {
                            var t = e.toString(16);
                            return t.length % 2 == 1 && (t = "0" + t),
                                t
                        }
                            ,
                            this.bigIntToMinTwosComplementsHex = function (e) {
                                var t = e.toString(16);
                                if ("-" != t.substr(0, 1))
                                    t.length % 2 == 1 ? t = "0" + t : t.match(/^[0-7]/) || (t = "00" + t);
                                else {
                                    var r = t.substr(1).length;
                                    r % 2 == 1 ? r += 1 : t.match(/^[0-7]/) || (r += 2);
                                    for (var o = "", i = 0; i < r; i++)
                                        o += "f";
                                    t = new n(o, 16).xor(e).add(n.ONE).toString(16).replace(/^-/, "")
                                }
                                return t
                            }
                            ,
                            this.getPEMStringFromHex = function (e, t) {
                                var n = CryptoJS.enc.Hex.parse(e)
                                    , r = CryptoJS.enc.Base64.stringify(n).replace(/(.{64})/g, "$1\r\n");
                                return "-----BEGIN " + t + "-----\r\n" + (r = r.replace(/\r\n$/, "")) + "\r\n-----END " + t + "-----\r\n"
                            }
                    }
                    ,
                    KJUR.asn1.ASN1Object = function () {
                        this.getLengthHexFromValue = function () {
                            if (void 0 === this.hV || null == this.hV)
                                throw "this.hV is null or undefined.";
                            if (this.hV.length % 2 == 1)
                                throw "value hex must be even length: n=" + "".length + ",v=" + this.hV;
                            var e = this.hV.length / 2
                                , t = e.toString(16);
                            if (t.length % 2 == 1 && (t = "0" + t),
                            e < 128)
                                return t;
                            var n = t.length / 2;
                            if (n > 15)
                                throw "ASN.1 length too long to represent by 8x: n = " + e.toString(16);
                            return (128 + n).toString(16) + t
                        }
                            ,
                            this.getEncodedHex = function () {
                                return (null == this.hTLV || this.isModified) && (this.hV = this.getFreshValueHex(),
                                    this.hL = this.getLengthHexFromValue(),
                                    this.hTLV = this.hT + this.hL + this.hV,
                                    this.isModified = !1),
                                    this.hTLV
                            }
                            ,
                            this.getValueHex = function () {
                                return this.getEncodedHex(),
                                    this.hV
                            }
                            ,
                            this.getFreshValueHex = function () {
                                return ""
                            }
                    }
                    ,
                    KJUR.asn1.DERAbstractString = function (e) {
                        KJUR.asn1.DERAbstractString.superclass.constructor.call(this),
                            this.getString = function () {
                                return this.s
                            }
                            ,
                            this.setString = function (e) {
                                this.hTLV = null,
                                    this.isModified = !0,
                                    this.s = e,
                                    this.hV = stohex(this.s)
                            }
                            ,
                            this.setStringHex = function (e) {
                                this.hTLV = null,
                                    this.isModified = !0,
                                    this.s = null,
                                    this.hV = e
                            }
                            ,
                            this.getFreshValueHex = function () {
                                return this.hV
                            }
                            ,
                        void 0 !== e && (void 0 !== e.str ? this.setString(e.str) : void 0 !== e.hex && this.setStringHex(e.hex))
                    }
                    ,
                    H.extend(KJUR.asn1.DERAbstractString, KJUR.asn1.ASN1Object),
                    KJUR.asn1.DERAbstractTime = function (e) {
                        KJUR.asn1.DERAbstractTime.superclass.constructor.call(this),
                            this.localDateToUTC = function (e) {
                                return utc = e.getTime() + 6e4 * e.getTimezoneOffset(),
                                    new Date(utc)
                            }
                            ,
                            this.formatDate = function (e, t) {
                                var n = this.zeroPadding
                                    , r = this.localDateToUTC(e)
                                    , o = String(r.getFullYear());
                                return "utc" == t && (o = o.substr(2, 2)),
                                o + n(String(r.getMonth() + 1), 2) + n(String(r.getDate()), 2) + n(String(r.getHours()), 2) + n(String(r.getMinutes()), 2) + n(String(r.getSeconds()), 2) + "Z"
                            }
                            ,
                            this.zeroPadding = function (e, t) {
                                return e.length >= t ? e : new Array(t - e.length + 1).join("0") + e
                            }
                            ,
                            this.getString = function () {
                                return this.s
                            }
                            ,
                            this.setString = function (e) {
                                this.hTLV = null,
                                    this.isModified = !0,
                                    this.s = e,
                                    this.hV = stohex(this.s)
                            }
                            ,
                            this.setByDateValue = function (e, t, n, r, o, i) {
                                var a = new Date(Date.UTC(e, t - 1, n, r, o, i, 0));
                                this.setByDate(a)
                            }
                            ,
                            this.getFreshValueHex = function () {
                                return this.hV
                            }
                    }
                    ,
                    H.extend(KJUR.asn1.DERAbstractTime, KJUR.asn1.ASN1Object),
                    KJUR.asn1.DERAbstractStructured = function (e) {
                        KJUR.asn1.DERAbstractString.superclass.constructor.call(this),
                            this.setByASN1ObjectArray = function (e) {
                                this.hTLV = null,
                                    this.isModified = !0,
                                    this.asn1Array = e
                            }
                            ,
                            this.appendASN1Object = function (e) {
                                this.hTLV = null,
                                    this.isModified = !0,
                                    this.asn1Array.push(e)
                            }
                            ,
                            this.asn1Array = new Array,
                        void 0 !== e && void 0 !== e.array && (this.asn1Array = e.array)
                    }
                    ,
                    H.extend(KJUR.asn1.DERAbstractStructured, KJUR.asn1.ASN1Object),
                    KJUR.asn1.DERBoolean = function () {
                        KJUR.asn1.DERBoolean.superclass.constructor.call(this),
                            this.hT = "01",
                            this.hTLV = "0101ff"
                    }
                    ,
                    H.extend(KJUR.asn1.DERBoolean, KJUR.asn1.ASN1Object),
                    KJUR.asn1.DERInteger = function (e) {
                        KJUR.asn1.DERInteger.superclass.constructor.call(this),
                            this.hT = "02",
                            this.setByBigInteger = function (e) {
                                this.hTLV = null,
                                    this.isModified = !0,
                                    this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(e)
                            }
                            ,
                            this.setByInteger = function (e) {
                                var t = new n(String(e), 10);
                                this.setByBigInteger(t)
                            }
                            ,
                            this.setValueHex = function (e) {
                                this.hV = e
                            }
                            ,
                            this.getFreshValueHex = function () {
                                return this.hV
                            }
                            ,
                        void 0 !== e && (void 0 !== e.bigint ? this.setByBigInteger(e.bigint) : void 0 !== e.int ? this.setByInteger(e.int) : void 0 !== e.hex && this.setValueHex(e.hex))
                    }
                    ,
                    H.extend(KJUR.asn1.DERInteger, KJUR.asn1.ASN1Object),
                    KJUR.asn1.DERBitString = function (e) {
                        KJUR.asn1.DERBitString.superclass.constructor.call(this),
                            this.hT = "03",
                            this.setHexValueIncludingUnusedBits = function (e) {
                                this.hTLV = null,
                                    this.isModified = !0,
                                    this.hV = e
                            }
                            ,
                            this.setUnusedBitsAndHexValue = function (e, t) {
                                if (e < 0 || 7 < e)
                                    throw "unused bits shall be from 0 to 7: u = " + e;
                                var n = "0" + e;
                                this.hTLV = null,
                                    this.isModified = !0,
                                    this.hV = n + t
                            }
                            ,
                            this.setByBinaryString = function (e) {
                                var t = 8 - (e = e.replace(/0+$/, "")).length % 8;
                                8 == t && (t = 0);
                                for (var n = 0; n <= t; n++)
                                    e += "0";
                                var r = "";
                                for (n = 0; n < e.length - 1; n += 8) {
                                    var o = e.substr(n, 8)
                                        , i = parseInt(o, 2).toString(16);
                                    1 == i.length && (i = "0" + i),
                                        r += i
                                }
                                this.hTLV = null,
                                    this.isModified = !0,
                                    this.hV = "0" + t + r
                            }
                            ,
                            this.setByBooleanArray = function (e) {
                                for (var t = "", n = 0; n < e.length; n++)
                                    1 == e[n] ? t += "1" : t += "0";
                                this.setByBinaryString(t)
                            }
                            ,
                            this.newFalseArray = function (e) {
                                for (var t = new Array(e), n = 0; n < e; n++)
                                    t[n] = !1;
                                return t
                            }
                            ,
                            this.getFreshValueHex = function () {
                                return this.hV
                            }
                            ,
                        void 0 !== e && (void 0 !== e.hex ? this.setHexValueIncludingUnusedBits(e.hex) : void 0 !== e.bin ? this.setByBinaryString(e.bin) : void 0 !== e.array && this.setByBooleanArray(e.array))
                    }
                    ,
                    H.extend(KJUR.asn1.DERBitString, KJUR.asn1.ASN1Object),
                    KJUR.asn1.DEROctetString = function (e) {
                        KJUR.asn1.DEROctetString.superclass.constructor.call(this, e),
                            this.hT = "04"
                    }
                    ,
                    H.extend(KJUR.asn1.DEROctetString, KJUR.asn1.DERAbstractString),
                    KJUR.asn1.DERNull = function () {
                        KJUR.asn1.DERNull.superclass.constructor.call(this),
                            this.hT = "05",
                            this.hTLV = "0500"
                    }
                    ,
                    H.extend(KJUR.asn1.DERNull, KJUR.asn1.ASN1Object),
                    KJUR.asn1.DERObjectIdentifier = function (e) {
                        var t = function (e) {
                            var t = e.toString(16);
                            return 1 == t.length && (t = "0" + t),
                                t
                        }
                            , r = function (e) {
                            var r = ""
                                , o = new n(e, 10).toString(2)
                                , i = 7 - o.length % 7;
                            7 == i && (i = 0);
                            for (var a = "", s = 0; s < i; s++)
                                a += "0";
                            for (o = a + o,
                                     s = 0; s < o.length - 1; s += 7) {
                                var u = o.substr(s, 7);
                                s != o.length - 7 && (u = "1" + u),
                                    r += t(parseInt(u, 2))
                            }
                            return r
                        };
                        KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this),
                            this.hT = "06",
                            this.setValueHex = function (e) {
                                this.hTLV = null,
                                    this.isModified = !0,
                                    this.s = null,
                                    this.hV = e
                            }
                            ,
                            this.setValueOidString = function (e) {
                                if (!e.match(/^[0-9.]+$/))
                                    throw "malformed oid string: " + e;
                                var n = ""
                                    , o = e.split(".")
                                    , i = 40 * parseInt(o[0]) + parseInt(o[1]);
                                n += t(i),
                                    o.splice(0, 2);
                                for (var a = 0; a < o.length; a++)
                                    n += r(o[a]);
                                this.hTLV = null,
                                    this.isModified = !0,
                                    this.s = null,
                                    this.hV = n
                            }
                            ,
                            this.setValueName = function (e) {
                                if (void 0 === KJUR.asn1.x509.OID.name2oidList[e])
                                    throw "DERObjectIdentifier oidName undefined: " + e;
                                var t = KJUR.asn1.x509.OID.name2oidList[e];
                                this.setValueOidString(t)
                            }
                            ,
                            this.getFreshValueHex = function () {
                                return this.hV
                            }
                            ,
                        void 0 !== e && (void 0 !== e.oid ? this.setValueOidString(e.oid) : void 0 !== e.hex ? this.setValueHex(e.hex) : void 0 !== e.name && this.setValueName(e.name))
                    }
                    ,
                    H.extend(KJUR.asn1.DERObjectIdentifier, KJUR.asn1.ASN1Object),
                    KJUR.asn1.DERUTF8String = function (e) {
                        KJUR.asn1.DERUTF8String.superclass.constructor.call(this, e),
                            this.hT = "0c"
                    }
                    ,
                    H.extend(KJUR.asn1.DERUTF8String, KJUR.asn1.DERAbstractString),
                    KJUR.asn1.DERNumericString = function (e) {
                        KJUR.asn1.DERNumericString.superclass.constructor.call(this, e),
                            this.hT = "12"
                    }
                    ,
                    H.extend(KJUR.asn1.DERNumericString, KJUR.asn1.DERAbstractString),
                    KJUR.asn1.DERPrintableString = function (e) {
                        KJUR.asn1.DERPrintableString.superclass.constructor.call(this, e),
                            this.hT = "13"
                    }
                    ,
                    H.extend(KJUR.asn1.DERPrintableString, KJUR.asn1.DERAbstractString),
                    KJUR.asn1.DERTeletexString = function (e) {
                        KJUR.asn1.DERTeletexString.superclass.constructor.call(this, e),
                            this.hT = "14"
                    }
                    ,
                    H.extend(KJUR.asn1.DERTeletexString, KJUR.asn1.DERAbstractString),
                    KJUR.asn1.DERIA5String = function (e) {
                        KJUR.asn1.DERIA5String.superclass.constructor.call(this, e),
                            this.hT = "16"
                    }
                    ,
                    H.extend(KJUR.asn1.DERIA5String, KJUR.asn1.DERAbstractString),
                    KJUR.asn1.DERUTCTime = function (e) {
                        KJUR.asn1.DERUTCTime.superclass.constructor.call(this, e),
                            this.hT = "17",
                            this.setByDate = function (e) {
                                this.hTLV = null,
                                    this.isModified = !0,
                                    this.date = e,
                                    this.s = this.formatDate(this.date, "utc"),
                                    this.hV = stohex(this.s)
                            }
                            ,
                        void 0 !== e && (void 0 !== e.str ? this.setString(e.str) : void 0 !== e.hex ? this.setStringHex(e.hex) : void 0 !== e.date && this.setByDate(e.date))
                    }
                    ,
                    H.extend(KJUR.asn1.DERUTCTime, KJUR.asn1.DERAbstractTime),
                    KJUR.asn1.DERGeneralizedTime = function (e) {
                        KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this, e),
                            this.hT = "18",
                            this.setByDate = function (e) {
                                this.hTLV = null,
                                    this.isModified = !0,
                                    this.date = e,
                                    this.s = this.formatDate(this.date, "gen"),
                                    this.hV = stohex(this.s)
                            }
                            ,
                        void 0 !== e && (void 0 !== e.str ? this.setString(e.str) : void 0 !== e.hex ? this.setStringHex(e.hex) : void 0 !== e.date && this.setByDate(e.date))
                    }
                    ,
                    H.extend(KJUR.asn1.DERGeneralizedTime, KJUR.asn1.DERAbstractTime),
                    KJUR.asn1.DERSequence = function (e) {
                        KJUR.asn1.DERSequence.superclass.constructor.call(this, e),
                            this.hT = "30",
                            this.getFreshValueHex = function () {
                                for (var e = "", t = 0; t < this.asn1Array.length; t++)
                                    e += this.asn1Array[t].getEncodedHex();
                                return this.hV = e,
                                    this.hV
                            }
                    }
                    ,
                    H.extend(KJUR.asn1.DERSequence, KJUR.asn1.DERAbstractStructured),
                    KJUR.asn1.DERSet = function (e) {
                        KJUR.asn1.DERSet.superclass.constructor.call(this, e),
                            this.hT = "31",
                            this.getFreshValueHex = function () {
                                for (var e = new Array, t = 0; t < this.asn1Array.length; t++) {
                                    var n = this.asn1Array[t];
                                    e.push(n.getEncodedHex())
                                }
                                return e.sort(),
                                    this.hV = e.join(""),
                                    this.hV
                            }
                    }
                    ,
                    H.extend(KJUR.asn1.DERSet, KJUR.asn1.DERAbstractStructured),
                    KJUR.asn1.DERTaggedObject = function (e) {
                        KJUR.asn1.DERTaggedObject.superclass.constructor.call(this),
                            this.hT = "a0",
                            this.hV = "",
                            this.isExplicit = !0,
                            this.asn1Object = null,
                            this.setASN1Object = function (e, t, n) {
                                this.hT = t,
                                    this.isExplicit = e,
                                    this.asn1Object = n,
                                    this.isExplicit ? (this.hV = this.asn1Object.getEncodedHex(),
                                        this.hTLV = null,
                                        this.isModified = !0) : (this.hV = null,
                                        this.hTLV = n.getEncodedHex(),
                                        this.hTLV = this.hTLV.replace(/^../, t),
                                        this.isModified = !1)
                            }
                            ,
                            this.getFreshValueHex = function () {
                                return this.hV
                            }
                            ,
                        void 0 !== e && (void 0 !== e.tag && (this.hT = e.tag),
                        void 0 !== e.explicit && (this.isExplicit = e.explicit),
                        void 0 !== e.obj && (this.asn1Object = e.obj,
                            this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)))
                    }
                    ,
                    H.extend(KJUR.asn1.DERTaggedObject, KJUR.asn1.ASN1Object),
                    function (e) {
                        "use strict";
                        var t, n = {
                            decode: function (e) {
                                var n;
                                if (void 0 === t) {
                                    var r = "0123456789ABCDEF";
                                    for (t = [],
                                             n = 0; n < 16; ++n)
                                        t[r.charAt(n)] = n;
                                    for (r = r.toLowerCase(),
                                             n = 10; n < 16; ++n)
                                        t[r.charAt(n)] = n;
                                    for (n = 0; n < " \f\n\r\t \u2028\u2029".length; ++n)
                                        t[" \f\n\r\t \u2028\u2029".charAt(n)] = -1
                                }
                                var o = []
                                    , i = 0
                                    , a = 0;
                                for (n = 0; n < e.length; ++n) {
                                    var s = e.charAt(n);
                                    if ("=" == s)
                                        break;
                                    if (-1 != (s = t[s])) {
                                        if (void 0 === s)
                                            throw "Illegal character at offset " + n;
                                        i |= s,
                                            ++a >= 2 ? (o[o.length] = i,
                                                i = 0,
                                                a = 0) : i <<= 4
                                    }
                                }
                                if (a)
                                    throw "Hex encoding incomplete: 4 bits missing";
                                return o
                            }
                        };
                        window.Hex = n
                    }(),
                    function (e) {
                        "use strict";
                        var t, n = {
                            decode: function (e) {
                                var n;
                                if (void 0 === t) {
                                    for (t = [],
                                             n = 0; n < 64; ++n)
                                        t["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(n)] = n;
                                    for (n = 0; n < "= \f\n\r\t \u2028\u2029".length; ++n)
                                        t["= \f\n\r\t \u2028\u2029".charAt(n)] = -1
                                }
                                var r = []
                                    , o = 0
                                    , i = 0;
                                for (n = 0; n < e.length; ++n) {
                                    var a = e.charAt(n);
                                    if ("=" == a)
                                        break;
                                    if (-1 != (a = t[a])) {
                                        if (void 0 === a)
                                            throw "Illegal character at offset " + n;
                                        o |= a,
                                            ++i >= 4 ? (r[r.length] = o >> 16,
                                                r[r.length] = o >> 8 & 255,
                                                r[r.length] = 255 & o,
                                                o = 0,
                                                i = 0) : o <<= 6
                                    }
                                }
                                switch (i) {
                                    case 1:
                                        throw "Base64 encoding incomplete: at least 2 bits missing";
                                    case 2:
                                        r[r.length] = o >> 10;
                                        break;
                                    case 3:
                                        r[r.length] = o >> 16,
                                            r[r.length] = o >> 8 & 255
                                }
                                return r
                            },
                            re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
                            unarmor: function (e) {
                                var t = n.re.exec(e);
                                if (t)
                                    if (t[1])
                                        e = t[1];
                                    else {
                                        if (!t[2])
                                            throw "RegExp out of sync";
                                        e = t[2]
                                    }
                                return n.decode(e)
                            }
                        };
                        window.Base64 = n
                    }(),
                    function (e) {
                        "use strict";
                        var t = function (e, t) {
                            var n = document.createElement(e);
                            return n.className = t,
                                n
                        }
                            , n = function (e) {
                            return document.createTextNode(e)
                        };

                        function r(e, t) {
                            e instanceof r ? (this.enc = e.enc,
                                this.pos = e.pos) : (this.enc = e,
                                this.pos = t)
                        }

                        function o(e, t, n, r, o) {
                            this.stream = e,
                                this.header = t,
                                this.length = n,
                                this.tag = r,
                                this.sub = o
                        }

                        r.prototype.get = function (e) {
                            if (void 0 === e && (e = this.pos++),
                            e >= this.enc.length)
                                throw "Requesting byte offset " + e + " on a stream of length " + this.enc.length;
                            return this.enc[e]
                        }
                            ,
                            r.prototype.hexDigits = "0123456789ABCDEF",
                            r.prototype.hexByte = function (e) {
                                return this.hexDigits.charAt(e >> 4 & 15) + this.hexDigits.charAt(15 & e)
                            }
                            ,
                            r.prototype.hexDump = function (e, t, n) {
                                for (var r = "", o = e; o < t; ++o)
                                    if (r += this.hexByte(this.get(o)),
                                    !0 !== n)
                                        switch (15 & o) {
                                            case 7:
                                                r += "  ";
                                                break;
                                            case 15:
                                                r += "\n";
                                                break;
                                            default:
                                                r += " "
                                        }
                                return r
                            }
                            ,
                            r.prototype.parseStringISO = function (e, t) {
                                for (var n = "", r = e; r < t; ++r)
                                    n += String.fromCharCode(this.get(r));
                                return n
                            }
                            ,
                            r.prototype.parseStringUTF = function (e, t) {
                                for (var n = "", r = e; r < t;) {
                                    var o = this.get(r++);
                                    n += o < 128 ? String.fromCharCode(o) : o > 191 && o < 224 ? String.fromCharCode((31 & o) << 6 | 63 & this.get(r++)) : String.fromCharCode((15 & o) << 12 | (63 & this.get(r++)) << 6 | 63 & this.get(r++))
                                }
                                return n
                            }
                            ,
                            r.prototype.parseStringBMP = function (e, t) {
                                for (var n = "", r = e; r < t; r += 2) {
                                    var o = this.get(r)
                                        , i = this.get(r + 1);
                                    n += String.fromCharCode((o << 8) + i)
                                }
                                return n
                            }
                            ,
                            r.prototype.reTime = /^((?:1[89]|2\d)?\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/,
                            r.prototype.parseTime = function (e, t) {
                                var n = this.parseStringISO(e, t)
                                    , r = this.reTime.exec(n);
                                return r ? (n = r[1] + "-" + r[2] + "-" + r[3] + " " + r[4],
                                r[5] && (n += ":" + r[5],
                                r[6] && (n += ":" + r[6],
                                r[7] && (n += "." + r[7]))),
                                r[8] && (n += " UTC",
                                "Z" != r[8] && (n += r[8],
                                r[9] && (n += ":" + r[9]))),
                                    n) : "Unrecognized time: " + n
                            }
                            ,
                            r.prototype.parseInteger = function (e, t) {
                                var n = t - e;
                                if (n > 4) {
                                    n <<= 3;
                                    var r = this.get(e);
                                    if (0 === r)
                                        n -= 8;
                                    else
                                        for (; r < 128;)
                                            r <<= 1,
                                                --n;
                                    return "(" + n + " bit)"
                                }
                                for (var o = 0, i = e; i < t; ++i)
                                    o = o << 8 | this.get(i);
                                return o
                            }
                            ,
                            r.prototype.parseBitString = function (e, t) {
                                var n = this.get(e)
                                    , r = (t - e - 1 << 3) - n
                                    , o = "(" + r + " bit)";
                                if (r <= 20) {
                                    var i = n;
                                    o += " ";
                                    for (var a = t - 1; a > e; --a) {
                                        for (var s = this.get(a), u = i; u < 8; ++u)
                                            o += s >> u & 1 ? "1" : "0";
                                        i = 0
                                    }
                                }
                                return o
                            }
                            ,
                            r.prototype.parseOctetString = function (e, t) {
                                var n = t - e
                                    , r = "(" + n + " byte) ";
                                n > 100 && (t = e + 100);
                                for (var o = e; o < t; ++o)
                                    r += this.hexByte(this.get(o));
                                return n > 100 && (r += "…"),
                                    r
                            }
                            ,
                            r.prototype.parseOID = function (e, t) {
                                for (var n = "", r = 0, o = 0, i = e; i < t; ++i) {
                                    var a = this.get(i);
                                    if (r = r << 7 | 127 & a,
                                        o += 7,
                                        !(128 & a)) {
                                        if ("" === n) {
                                            var s = r < 80 ? r < 40 ? 0 : 1 : 2;
                                            n = s + "." + (r - 40 * s)
                                        } else
                                            n += "." + (o >= 31 ? "bigint" : r);
                                        r = o = 0
                                    }
                                }
                                return n
                            }
                            ,
                            o.prototype.typeName = function () {
                                if (void 0 === this.tag)
                                    return "unknown";
                                var e = this.tag >> 6
                                    , t = (this.tag,
                                31 & this.tag);
                                switch (e) {
                                    case 0:
                                        switch (t) {
                                            case 0:
                                                return "EOC";
                                            case 1:
                                                return "BOOLEAN";
                                            case 2:
                                                return "INTEGER";
                                            case 3:
                                                return "BIT_STRING";
                                            case 4:
                                                return "OCTET_STRING";
                                            case 5:
                                                return "NULL";
                                            case 6:
                                                return "OBJECT_IDENTIFIER";
                                            case 7:
                                                return "ObjectDescriptor";
                                            case 8:
                                                return "EXTERNAL";
                                            case 9:
                                                return "REAL";
                                            case 10:
                                                return "ENUMERATED";
                                            case 11:
                                                return "EMBEDDED_PDV";
                                            case 12:
                                                return "UTF8String";
                                            case 16:
                                                return "SEQUENCE";
                                            case 17:
                                                return "SET";
                                            case 18:
                                                return "NumericString";
                                            case 19:
                                                return "PrintableString";
                                            case 20:
                                                return "TeletexString";
                                            case 21:
                                                return "VideotexString";
                                            case 22:
                                                return "IA5String";
                                            case 23:
                                                return "UTCTime";
                                            case 24:
                                                return "GeneralizedTime";
                                            case 25:
                                                return "GraphicString";
                                            case 26:
                                                return "VisibleString";
                                            case 27:
                                                return "GeneralString";
                                            case 28:
                                                return "UniversalString";
                                            case 30:
                                                return "BMPString";
                                            default:
                                                return "Universal_" + t.toString(16)
                                        }
                                    case 1:
                                        return "Application_" + t.toString(16);
                                    case 2:
                                        return "[" + t + "]";
                                    case 3:
                                        return "Private_" + t.toString(16)
                                }
                            }
                            ,
                            o.prototype.reSeemsASCII = /^[ -~]+$/,
                            o.prototype.content = function () {
                                if (void 0 === this.tag)
                                    return null;
                                var e = this.tag >> 6
                                    , t = 31 & this.tag
                                    , n = this.posContent()
                                    , r = Math.abs(this.length);
                                if (0 !== e) {
                                    if (null !== this.sub)
                                        return "(" + this.sub.length + " elem)";
                                    var o = this.stream.parseStringISO(n, n + Math.min(r, 100));
                                    return this.reSeemsASCII.test(o) ? o.substring(0, 200) + (o.length > 200 ? "…" : "") : this.stream.parseOctetString(n, n + r)
                                }
                                switch (t) {
                                    case 1:
                                        return 0 === this.stream.get(n) ? "false" : "true";
                                    case 2:
                                        return this.stream.parseInteger(n, n + r);
                                    case 3:
                                        return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(n, n + r);
                                    case 4:
                                        return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(n, n + r);
                                    case 6:
                                        return this.stream.parseOID(n, n + r);
                                    case 16:
                                    case 17:
                                        return "(" + this.sub.length + " elem)";
                                    case 12:
                                        return this.stream.parseStringUTF(n, n + r);
                                    case 18:
                                    case 19:
                                    case 20:
                                    case 21:
                                    case 22:
                                    case 26:
                                        return this.stream.parseStringISO(n, n + r);
                                    case 30:
                                        return this.stream.parseStringBMP(n, n + r);
                                    case 23:
                                    case 24:
                                        return this.stream.parseTime(n, n + r)
                                }
                                return null
                            }
                            ,
                            o.prototype.toString = function () {
                                return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (null === this.sub ? "null" : this.sub.length) + "]"
                            }
                            ,
                            o.prototype.print = function (e) {
                                if (void 0 === e && (e = ""),
                                    document.writeln(e + this),
                                null !== this.sub) {
                                    e += "  ";
                                    for (var t = 0, n = this.sub.length; t < n; ++t)
                                        this.sub[t].print(e)
                                }
                            }
                            ,
                            o.prototype.toPrettyString = function (e) {
                                void 0 === e && (e = "");
                                var t = e + this.typeName() + " @" + this.stream.pos;
                                if (this.length >= 0 && (t += "+"),
                                    t += this.length,
                                    32 & this.tag ? t += " (constructed)" : 3 != this.tag && 4 != this.tag || null === this.sub || (t += " (encapsulates)"),
                                    t += "\n",
                                null !== this.sub) {
                                    e += "  ";
                                    for (var n = 0, r = this.sub.length; n < r; ++n)
                                        t += this.sub[n].toPrettyString(e)
                                }
                                return t
                            }
                            ,
                            o.prototype.toDOM = function () {
                                var e = t("div", "node");
                                e.asn1 = this;
                                var r = t("div", "head")
                                    , o = this.typeName().replace(/_/g, " ");
                                r.innerHTML = o;
                                var i = this.content();
                                if (null !== i) {
                                    i = String(i).replace(/</g, "&lt;");
                                    var a = t("span", "preview");
                                    a.appendChild(n(i)),
                                        r.appendChild(a)
                                }
                                e.appendChild(r),
                                    this.node = e,
                                    this.head = r;
                                var s = t("div", "value");
                                if (o = "Offset: " + this.stream.pos + "<br/>",
                                    o += "Length: " + this.header + "+",
                                    this.length >= 0 ? o += this.length : o += -this.length + " (undefined)",
                                    32 & this.tag ? o += "<br/>(constructed)" : 3 != this.tag && 4 != this.tag || null === this.sub || (o += "<br/>(encapsulates)"),
                                null !== i && (o += "<br/>Value:<br/><b>" + i + "</b>",
                                "object" == typeof oids && 6 == this.tag)) {
                                    var u = oids[i];
                                    u && (u.d && (o += "<br/>" + u.d),
                                    u.c && (o += "<br/>" + u.c),
                                    u.w && (o += "<br/>(warning!)"))
                                }
                                s.innerHTML = o,
                                    e.appendChild(s);
                                var c = t("div", "sub");
                                if (null !== this.sub)
                                    for (var l = 0, f = this.sub.length; l < f; ++l)
                                        c.appendChild(this.sub[l].toDOM());
                                return e.appendChild(c),
                                    r.onclick = function () {
                                        e.className = "node collapsed" == e.className ? "node" : "node collapsed"
                                    }
                                    ,
                                    e
                            }
                            ,
                            o.prototype.posStart = function () {
                                return this.stream.pos
                            }
                            ,
                            o.prototype.posContent = function () {
                                return this.stream.pos + this.header
                            }
                            ,
                            o.prototype.posEnd = function () {
                                return this.stream.pos + this.header + Math.abs(this.length)
                            }
                            ,
                            o.prototype.fakeHover = function (e) {
                                this.node.className += " hover",
                                e && (this.head.className += " hover")
                            }
                            ,
                            o.prototype.fakeOut = function (e) {
                                var t = / ?hover/;
                                this.node.className = this.node.className.replace(t, ""),
                                e && (this.head.className = this.head.className.replace(t, ""))
                            }
                            ,
                            o.prototype.toHexDOM_sub = function (e, r, o, i, a) {
                                if (!(i >= a)) {
                                    var s = t("span", r);
                                    s.appendChild(n(o.hexDump(i, a))),
                                        e.appendChild(s)
                                }
                            }
                            ,
                            o.prototype.toHexDOM = function (e) {
                                var r = t("span", "hex");
                                if (void 0 === e && (e = r),
                                    this.head.hexNode = r,
                                    this.head.onmouseover = function () {
                                        this.hexNode.className = "hexCurrent"
                                    }
                                    ,
                                    this.head.onmouseout = function () {
                                        this.hexNode.className = "hex"
                                    }
                                    ,
                                    r.asn1 = this,
                                    r.onmouseover = function () {
                                        var t = !e.selected;
                                        t && (e.selected = this.asn1,
                                            this.className = "hexCurrent"),
                                            this.asn1.fakeHover(t)
                                    }
                                    ,
                                    r.onmouseout = function () {
                                        var t = e.selected == this.asn1;
                                        this.asn1.fakeOut(t),
                                        t && (e.selected = null,
                                            this.className = "hex")
                                    }
                                    ,
                                    this.toHexDOM_sub(r, "tag", this.stream, this.posStart(), this.posStart() + 1),
                                    this.toHexDOM_sub(r, this.length >= 0 ? "dlen" : "ulen", this.stream, this.posStart() + 1, this.posContent()),
                                null === this.sub)
                                    r.appendChild(n(this.stream.hexDump(this.posContent(), this.posEnd())));
                                else if (this.sub.length > 0) {
                                    var o = this.sub[0]
                                        , i = this.sub[this.sub.length - 1];
                                    this.toHexDOM_sub(r, "intro", this.stream, this.posContent(), o.posStart());
                                    for (var a = 0, s = this.sub.length; a < s; ++a)
                                        r.appendChild(this.sub[a].toHexDOM(e));
                                    this.toHexDOM_sub(r, "outro", this.stream, i.posEnd(), this.posEnd())
                                }
                                return r
                            }
                            ,
                            o.prototype.toHexString = function (e) {
                                return this.stream.hexDump(this.posStart(), this.posEnd(), !0)
                            }
                            ,
                            o.decodeLength = function (e) {
                                var t = e.get()
                                    , n = 127 & t;
                                if (n == t)
                                    return n;
                                if (n > 3)
                                    throw "Length over 24 bits not supported at position " + (e.pos - 1);
                                if (0 === n)
                                    return -1;
                                t = 0;
                                for (var r = 0; r < n; ++r)
                                    t = t << 8 | e.get();
                                return t
                            }
                            ,
                            o.hasContent = function (e, t, n) {
                                if (32 & e)
                                    return !0;
                                if (e < 3 || e > 4)
                                    return !1;
                                var i = new r(n);
                                if (3 == e && i.get(),
                                i.get() >> 6 & 1)
                                    return !1;
                                try {
                                    var a = o.decodeLength(i);
                                    return i.pos - n.pos + a == t
                                } catch (e) {
                                    return !1
                                }
                            }
                            ,
                            o.decode = function (e) {
                                e instanceof r || (e = new r(e, 0));
                                var t = new r(e)
                                    , n = e.get()
                                    , i = o.decodeLength(e)
                                    , a = e.pos - t.pos
                                    , s = null;
                                if (o.hasContent(n, i, e)) {
                                    var u = e.pos;
                                    if (3 == n && e.get(),
                                        s = [],
                                    i >= 0) {
                                        for (var c = u + i; e.pos < c;)
                                            s[s.length] = o.decode(e);
                                        if (e.pos != c)
                                            throw "Content size is not correct for container starting at offset " + u
                                    } else
                                        try {
                                            for (; ;) {
                                                var l = o.decode(e);
                                                if (0 === l.tag)
                                                    break;
                                                s[s.length] = l
                                            }
                                            i = u - e.pos
                                        } catch (e) {
                                            throw "Exception while decoding undefined length content: " + e
                                        }
                                } else
                                    e.pos += i;
                                return new o(t, a, i, n, s)
                            }
                            ,
                            o.test = function () {
                                for (var e = [{
                                    value: [39],
                                    expected: 39
                                }, {
                                    value: [129, 201],
                                    expected: 201
                                }, {
                                    value: [131, 254, 220, 186],
                                    expected: 16702650
                                }], t = 0, n = e.length; t < n; ++t) {
                                    var i = new r(e[t].value, 0)
                                        , a = o.decodeLength(i);
                                    a != e[t].expected && document.write("In test[" + t + "] expected " + e[t].expected + " got " + a + "\n")
                                }
                            }
                            ,
                            window.ASN1 = o
                    }(),
                    ASN1.prototype.getHexStringValue = function () {
                        var e = this.toHexString()
                            , t = 2 * this.header
                            , n = 2 * this.length;
                        return e.substr(t, n)
                    }
                    ,
                    R.prototype.parseKey = function (e) {
                        try {
                            var t = 0
                                , n = 0
                                , r = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/.test(e) ? Hex.decode(e) : Base64.unarmor(e)
                                , o = ASN1.decode(r);
                            if (3 === o.sub.length && (o = o.sub[2].sub[0]),
                            9 === o.sub.length) {
                                t = o.sub[1].getHexStringValue(),
                                    this.n = P(t, 16),
                                    n = o.sub[2].getHexStringValue(),
                                    this.e = parseInt(n, 16);
                                var i = o.sub[3].getHexStringValue();
                                this.d = P(i, 16);
                                var a = o.sub[4].getHexStringValue();
                                this.p = P(a, 16);
                                var s = o.sub[5].getHexStringValue();
                                this.q = P(s, 16);
                                var u = o.sub[6].getHexStringValue();
                                this.dmp1 = P(u, 16);
                                var c = o.sub[7].getHexStringValue();
                                this.dmq1 = P(c, 16);
                                var l = o.sub[8].getHexStringValue();
                                this.coeff = P(l, 16)
                            } else {
                                if (2 !== o.sub.length)
                                    return !1;
                                var f = o.sub[1].sub[0];
                                t = f.sub[0].getHexStringValue(),
                                    this.n = P(t, 16),
                                    n = f.sub[1].getHexStringValue(),
                                    this.e = parseInt(n, 16)
                            }
                            return !0
                        } catch (e) {
                            return !1
                        }
                    }
                    ,
                    R.prototype.getPrivateBaseKey = function () {
                        var e = {
                            array: [new KJUR.asn1.DERInteger({
                                int: 0
                            }), new KJUR.asn1.DERInteger({
                                bigint: this.n
                            }), new KJUR.asn1.DERInteger({
                                int: this.e
                            }), new KJUR.asn1.DERInteger({
                                bigint: this.d
                            }), new KJUR.asn1.DERInteger({
                                bigint: this.p
                            }), new KJUR.asn1.DERInteger({
                                bigint: this.q
                            }), new KJUR.asn1.DERInteger({
                                bigint: this.dmp1
                            }), new KJUR.asn1.DERInteger({
                                bigint: this.dmq1
                            }), new KJUR.asn1.DERInteger({
                                bigint: this.coeff
                            })]
                        };
                        return new KJUR.asn1.DERSequence(e).getEncodedHex()
                    }
                    ,
                    R.prototype.getPrivateBaseKeyB64 = function () {
                        return I(this.getPrivateBaseKey())
                    }
                    ,
                    R.prototype.getPublicBaseKey = function () {
                        var e = {
                            array: [new KJUR.asn1.DERObjectIdentifier({
                                oid: "1.2.840.113549.1.1.1"
                            }), new KJUR.asn1.DERNull]
                        }
                            , t = new KJUR.asn1.DERSequence(e);
                        return e = {
                            array: [new KJUR.asn1.DERInteger({
                                bigint: this.n
                            }), new KJUR.asn1.DERInteger({
                                int: this.e
                            })]
                        },
                            e = {
                                hex: "00" + new KJUR.asn1.DERSequence(e).getEncodedHex()
                            },
                            e = {
                                array: [t, new KJUR.asn1.DERBitString(e)]
                            },
                            new KJUR.asn1.DERSequence(e).getEncodedHex()
                    }
                    ,
                    R.prototype.getPublicBaseKeyB64 = function () {
                        return I(this.getPublicBaseKey())
                    }
                    ,
                    R.prototype.wordwrap = function (e, t) {
                        if (!e)
                            return e;
                        var n = "(.{1," + (t = t || 64) + "})( +|$\n?)|(.{1," + t + "})";
                        return e.match(RegExp(n, "g")).join("\n")
                    }
                    ,
                    R.prototype.getPrivateKey = function () {
                        var e = "-----BEGIN RSA PRIVATE KEY-----\n";
                        return e += this.wordwrap(this.getPrivateBaseKeyB64()) + "\n",
                            e += "-----END RSA PRIVATE KEY-----"
                    }
                    ,
                    R.prototype.getPublicKey = function () {
                        var e = "-----BEGIN PUBLIC KEY-----\n";
                        return e += this.wordwrap(this.getPublicBaseKeyB64()) + "\n",
                            e += "-----END PUBLIC KEY-----"
                    }
                    ,
                    R.prototype.hasPublicKeyProperty = function (e) {
                        return (e = e || {}).hasOwnProperty("n") && e.hasOwnProperty("e")
                    }
                    ,
                    R.prototype.hasPrivateKeyProperty = function (e) {
                        return (e = e || {}).hasOwnProperty("n") && e.hasOwnProperty("e") && e.hasOwnProperty("d") && e.hasOwnProperty("p") && e.hasOwnProperty("q") && e.hasOwnProperty("dmp1") && e.hasOwnProperty("dmq1") && e.hasOwnProperty("coeff")
                    }
                    ,
                    R.prototype.parsePropertiesFrom = function (e) {
                        this.n = e.n,
                            this.e = e.e,
                        e.hasOwnProperty("d") && (this.d = e.d,
                            this.p = e.p,
                            this.q = e.q,
                            this.dmp1 = e.dmp1,
                            this.dmq1 = e.dmq1,
                            this.coeff = e.coeff)
                    }
                ;
                var W = function (e) {
                    R.call(this),
                    e && ("string" == typeof e ? this.parseKey(e) : (this.hasPrivateKeyProperty(e) || this.hasPublicKeyProperty(e)) && this.parsePropertiesFrom(e))
                };
                (W.prototype = new R).constructor = W;
                var G = function (e) {
                    e = e || {},
                        this.default_key_size = parseInt(e.default_key_size) || 1024,
                        this.default_public_exponent = e.default_public_exponent || "010001",
                        this.log = e.log || !1,
                        this.key = null
                };
                G.prototype.setKey = function (e) {
                    this.log && this.key && console.warn("A key was already set, overriding existing."),
                        this.key = new W(e)
                }
                    ,
                    G.prototype.setPrivateKey = function (e) {
                        this.setKey(e)
                    }
                    ,
                    G.prototype.setPublicKey = function (e) {
                        this.setKey(e)
                    }
                    ,
                    G.prototype.decrypt = function (e) {
                        try {
                            return this.getKey().decrypt(Y(e))
                        } catch (e) {
                            return !1
                        }
                    }
                    ,
                    G.prototype.encrypt = function (e) {
                        try {
                            return I(this.getKey().encrypt(e))
                        } catch (e) {
                            return !1
                        }
                    }
                    ,
                    G.prototype.getKey = function (e) {
                        if (!this.key) {
                            if (this.key = new W,
                            e && "[object Function]" === {}.toString.call(e))
                                return void this.key.generateAsync(this.default_key_size, this.default_public_exponent, e);
                            this.key.generate(this.default_key_size, this.default_public_exponent)
                        }
                        return this.key
                    }
                    ,
                    G.prototype.getPrivateKey = function () {
                        return this.getKey().getPrivateKey()
                    }
                    ,
                    G.prototype.getPrivateKeyB64 = function () {
                        return this.getKey().getPrivateBaseKeyB64()
                    }
                    ,
                    G.prototype.getPublicKey = function () {
                        return this.getKey().getPublicKey()
                    }
                    ,
                    G.prototype.getPublicKeyB64 = function () {
                        return this.getKey().getPublicBaseKeyB64()
                    }
                    ,
                    G.version = "2.3.1",
                    e.JSEncrypt = G
            }
        ) ? r.apply(t, o) : r) || (e.exports = i)
    }
});

// console.log()


i = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCeiLxP4ZavN8qhI+x+whAiFpGWpY9y1AHSQC86qEMBVnmqC8vdZAfxxuQWeQaeMWG07lXhXegTjZ5wn9pHnjg15wbjRGSTfwuZxSFW6sS3GYlrg40ckqAagzIjkE+5OLPsdjVYQyhLfKxj/79oOfjl/lV3rQnk/SSczHW0PEyUbQIDAQAB"
a = function (e) {
    var t = bc('769')
        , r = new t.JSEncrypt;
    r.setPublicKey(i);
    var a = r.encrypt(e);
    return a

}
console.log(a('1234'));
```







### 三.教学案例2

#### 1.逆向目标

- 首页：https://kuajing.pinduoduo.com/login

- 逆向参数： encryptPassword

#### 2. 参数定位

- 像这种参数比较特别的,不容易起冲突的关键字可以直接用搜索的方法来进行定位`encryptPassword`

![](./images/043.png)

#### 3.逆向代码分析

- 通过`Object(P.a)`来实现加密, `b.password`是明文密码, `G.current`是秘钥

![](./images/044.png)

- 可以很直观看出加密方法,o的对象生成是调用了o = t(1394)
- 我们直接找到加载期去触发1394 的任务就行   
- 秘钥是后台请求返回的,登录接口会请求两次,第一次就是返回的秘钥文件

#### 4.逆向结果

- JavaScript代码

```javascript
var bc;
var window = global
!function (e) {
    var n = {};
    function c(t) {
        var r = n[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        console.log(t)
        return e[t].call(r.exports, r, r.exports, c),
            r.l = !0,
            r.exports
    }

    c.e = function (e) {
        var t = [];
        a[e] ? t.push(a[e]) : 0 !== a[e] && {
            2: 1,
            5: 1,
            6: 1,
            7: 1,
            8: 1,
            9: 1,
            10: 1,
            14: 1,
            15: 1,
            16: 1,
            17: 1,
            18: 1,
            19: 1,
            20: 1,
            21: 1,
            23: 1,
            24: 1,
            25: 1,
            27: 1,
            28: 1,
            31: 1
        }[e] && t.push(a[e] = new Promise((function (t, r) {
                for (var n = "static/css/" + ({
                    5: "modify-mobile",
                    6: "reset-password",
                    14: "agreement-signing",
                    15: "enterprise-entry",
                    16: "entry-new-mall",
                    17: "home-main",
                    18: "login",
                    19: "login-hosting",
                    20: "login-mms",
                    21: "login-register",
                    23: "main-message",
                    24: "mall-info",
                    25: "rule-center",
                    27: "seller-login",
                    28: "site-trusteeship"
                }[e] || e) + "." + {
                    0: "31d6cfe0d",
                    1: "31d6cfe0d",
                    2: "160cf5d9f",
                    3: "31d6cfe0d",
                    4: "31d6cfe0d",
                    5: "10f1b234c",
                    6: "48e26ad27",
                    7: "193351c1c",
                    8: "d167b5c50",
                    9: "4ade89f4b",
                    10: "b8c0958c4",
                    11: "31d6cfe0d",
                    12: "31d6cfe0d",
                    13: "31d6cfe0d",
                    14: "a91b9e241",
                    15: "a4ff21809",
                    16: "a4ff23376",
                    17: "619ffbc8b",
                    18: "4e8cfdd5e",
                    19: "f0154cf7d",
                    20: "981932300",
                    21: "e615e079f",
                    23: "d3ed07f10",
                    24: "db1390718",
                    25: "cbc3ae15f",
                    27: "19a2f2210",
                    28: "218bcbb77",
                    30: "31d6cfe0d",
                    31: "f29b15389",
                    32: "31d6cfe0d"
                }[e] + ".chunk.css", a = c.p + n, o = document.getElementsByTagName("link"), i = 0; i < o.length; i++) {
                    var f = (s = o[i]).getAttribute("data-href") || s.getAttribute("href");
                    if ("stylesheet" === s.rel && (f === n || f === a))
                        return t()
                }
                var d = document.getElementsByTagName("style");
                for (i = 0; i < d.length; i++) {
                    var s;
                    if ((f = (s = d[i]).getAttribute("data-href")) === n || f === a)
                        return t()
                }
                var l = document.createElement("link");
                l.rel = "stylesheet",
                    l.type = "text/css",
                    l.onload = t,
                    l.onerror = function (t) {
                        var n = t && t.target && t.target.src || a
                            , o = new Error("Loading CSS chunk " + e + " failed.\n(" + n + ")");
                        o.request = n,
                            r(o)
                    }
                    ,
                    l.href = a,
                    document.getElementsByTagName("head")[0].appendChild(l)
            }
        )).then((function () {
                a[e] = 0
            }
        )));
        var r = o[e];
        if (0 !== r)
            if (r)
                t.push(r[2]);
            else {
                var n = new Promise((function (t, n) {
                        r = o[e] = [t, n]
                    }
                ));
                t.push(r[2] = n);
                var i, f = document.createElement("script");
                f.charset = "utf-8",
                    f.timeout = 120,
                c.nc && f.setAttribute("nonce", c.nc),
                    f.src = function (e) {
                        return c.p + "static/js/" + ({
                            5: "modify-mobile",
                            6: "reset-password",
                            14: "agreement-signing",
                            15: "enterprise-entry",
                            16: "entry-new-mall",
                            17: "home-main",
                            18: "login",
                            19: "login-hosting",
                            20: "login-mms",
                            21: "login-register",
                            23: "main-message",
                            24: "mall-info",
                            25: "rule-center",
                            27: "seller-login",
                            28: "site-trusteeship"
                        }[e] || e) + "." + {
                            0: "ab2908ad",
                            1: "c278894e",
                            2: "8cf56e9a",
                            3: "7336a4ac",
                            4: "64ec36a6",
                            5: "f2316d43",
                            6: "8e75e4e2",
                            7: "d098e2d2",
                            8: "6339094e",
                            9: "35faee2a",
                            10: "fb6a7f7c",
                            11: "884a6412",
                            12: "a0d5793d",
                            13: "2ce9dd7b",
                            14: "ccaec36a",
                            15: "11ba3c92",
                            16: "f89e7f6b",
                            17: "3ccd7a66",
                            18: "66259a47",
                            19: "b3a90a09",
                            20: "8cad0987",
                            21: "85432ddc",
                            23: "6ed26402",
                            24: "953de4a2",
                            25: "9ecd4fe0",
                            27: "fed62164",
                            28: "77250de0",
                            30: "bd37ca54",
                            31: "e2890473",
                            32: "1b811fd2"
                        }[e] + ".chunk.bgb-sc-settle_v20231015232011_a3a64124.js"
                    }(e);
                var d = new Error;
                i = function (t) {
                    f.onerror = f.onload = null,
                        clearTimeout(s);
                    var r = o[e];
                    if (0 !== r) {
                        if (r) {
                            var n = t && ("load" === t.type ? "missing" : t.type)
                                , a = t && t.target && t.target.src;
                            d.message = "Loading chunk " + e + " failed.\n(" + n + ": " + a + ")",
                                d.name = "ChunkLoadError",
                                d.type = n,
                                d.request = a,
                                r[1](d)
                        }
                        o[e] = void 0
                    }
                }
                ;
                var s = setTimeout((function () {
                        i({
                            type: "timeout",
                            target: f
                        })
                    }
                ), 12e4);
                f.onerror = f.onload = i,
                    document.head.appendChild(f)
            }
        return Promise.all(t)
    }
        ,
        c.m = e,

        c.d = function (e, t, r) {
            c.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: r
            })
        }
        ,
        c.r = function (e) {
            "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }),
                Object.defineProperty(e, "__esModule", {
                    value: !0
                })
        }
        ,
        c.t = function (e, t) {
            if (1 & t && (e = c(e)),
            8 & t)
                return e;
            if (4 & t && "object" === typeof e && e && e.__esModule)
                return e;
            var r = Object.create(null);
            if (c.r(r),
                Object.defineProperty(r, "default", {
                    enumerable: !0,
                    value: e
                }),
            2 & t && "string" != typeof e)
                for (var n in e)
                    c.d(r, n, function (t) {
                        return e[t]
                    }
                        .bind(null, n));
            return r
        }
        ,
        c.n = function (e) {
            var t = e && e.__esModule ? function () {
                    return e.default
                }
                : function () {
                    return e
                }
            ;
            return c.d(t, "a", t),
                t
        }
        ,
        c.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        ,
        c.p = "https://kj-bstatic.pddpic.com/static/settle/",
        c.oe = function (e) {
            throw console.error(e),
                e
        }
    ;
    bc = c
}({
    '1394': function (t, e, r) {
        "use strict";

        function n(t) {
            return "0123456789abcdefghijklmnopqrstuvwxyz".charAt(t)
        }

        function i(t, e) {
            return t & e
        }

        function o(t, e) {
            return t | e
        }

        function s(t, e) {
            return t ^ e
        }

        function u(t, e) {
            return t & ~e
        }

        function a(t) {
            if (0 == t)
                return -1;
            var e = 0;
            return 0 == (65535 & t) && (t >>= 16,
                e += 16),
            0 == (255 & t) && (t >>= 8,
                e += 8),
            0 == (15 & t) && (t >>= 4,
                e += 4),
            0 == (3 & t) && (t >>= 2,
                e += 2),
            0 == (1 & t) && ++e,
                e
        }

        function h(t) {
            for (var e = 0; 0 != t;)
                t &= t - 1,
                    ++e;
            return e
        }

        var f, c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

        function l(t) {
            var e, r, n = "";
            for (e = 0; e + 3 <= t.length; e += 3)
                r = parseInt(t.substring(e, e + 3), 16),
                    n += c.charAt(r >> 6) + c.charAt(63 & r);
            for (e + 1 == t.length ? (r = parseInt(t.substring(e, e + 1), 16),
                n += c.charAt(r << 2)) : e + 2 == t.length && (r = parseInt(t.substring(e, e + 2), 16),
                n += c.charAt(r >> 2) + c.charAt((3 & r) << 4)); (3 & n.length) > 0;)
                n += "=";
            return n
        }

        function p(t) {
            var e, r = "", i = 0, o = 0;
            for (e = 0; e < t.length && "=" != t.charAt(e); ++e) {
                var s = c.indexOf(t.charAt(e));
                s < 0 || (0 == i ? (r += n(s >> 2),
                    o = 3 & s,
                    i = 1) : 1 == i ? (r += n(o << 2 | s >> 4),
                    o = 15 & s,
                    i = 2) : 2 == i ? (r += n(o),
                    r += n(s >> 2),
                    o = 3 & s,
                    i = 3) : (r += n(o << 2 | s >> 4),
                    r += n(15 & s),
                    i = 0))
            }
            return 1 == i && (r += n(o << 2)),
                r
        }

        var d, g = function (t) {
                var e;
                if (void 0 === f) {
                    var r = "0123456789ABCDEF"
                        , n = " \f\n\r\t\xa0\u2028\u2029";
                    for (f = {},
                             e = 0; e < 16; ++e)
                        f[r.charAt(e)] = e;
                    for (r = r.toLowerCase(),
                             e = 10; e < 16; ++e)
                        f[r.charAt(e)] = e;
                    for (e = 0; e < n.length; ++e)
                        f[n.charAt(e)] = -1
                }
                var i = []
                    , o = 0
                    , s = 0;
                for (e = 0; e < t.length; ++e) {
                    var u = t.charAt(e);
                    if ("=" == u)
                        break;
                    if (-1 != (u = f[u])) {
                        if (void 0 === u)
                            throw new Error("Illegal character at offset " + e);
                        o |= u,
                            ++s >= 2 ? (i[i.length] = o,
                                o = 0,
                                s = 0) : o <<= 4
                    }
                }
                if (s)
                    throw new Error("Hex encoding incomplete: 4 bits missing");
                return i
            }, y = {
                decode: function (t) {
                    var e;
                    if (void 0 === d) {
                        var r = "= \f\n\r\t\xa0\u2028\u2029";
                        for (d = Object.create(null),
                                 e = 0; e < 64; ++e)
                            d["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e)] = e;
                        for (d["-"] = 62,
                                 d._ = 63,
                                 e = 0; e < r.length; ++e)
                            d[r.charAt(e)] = -1
                    }
                    var n = []
                        , i = 0
                        , o = 0;
                    for (e = 0; e < t.length; ++e) {
                        var s = t.charAt(e);
                        if ("=" == s)
                            break;
                        if (-1 != (s = d[s])) {
                            if (void 0 === s)
                                throw new Error("Illegal character at offset " + e);
                            i |= s,
                                ++o >= 4 ? (n[n.length] = i >> 16,
                                    n[n.length] = i >> 8 & 255,
                                    n[n.length] = 255 & i,
                                    i = 0,
                                    o = 0) : i <<= 6
                        }
                    }
                    switch (o) {
                        case 1:
                            throw new Error("Base64 encoding incomplete: at least 2 bits missing");
                        case 2:
                            n[n.length] = i >> 10;
                            break;
                        case 3:
                            n[n.length] = i >> 16,
                                n[n.length] = i >> 8 & 255
                    }
                    return n
                },
                re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
                unarmor: function (t) {
                    var e = y.re.exec(t);
                    if (e)
                        if (e[1])
                            t = e[1];
                        else {
                            if (!e[2])
                                throw new Error("RegExp out of sync");
                            t = e[2]
                        }
                    return y.decode(t)
                }
            }, m = 1e13, v = function () {
                function t(t) {
                    this.buf = [+t || 0]
                }

                return t.prototype.mulAdd = function (t, e) {
                    var r, n, i = this.buf, o = i.length;
                    for (r = 0; r < o; ++r)
                        (n = i[r] * t + e) < m ? e = 0 : n -= (e = 0 | n / m) * m,
                            i[r] = n;
                    e > 0 && (i[r] = e)
                }
                    ,
                    t.prototype.sub = function (t) {
                        var e, r, n = this.buf, i = n.length;
                        for (e = 0; e < i; ++e)
                            (r = n[e] - t) < 0 ? (r += m,
                                t = 1) : t = 0,
                                n[e] = r;
                        for (; 0 === n[n.length - 1];)
                            n.pop()
                    }
                    ,
                    t.prototype.toString = function (t) {
                        if (10 != (t || 10))
                            throw new Error("only base 10 is supported");
                        for (var e = this.buf, r = e[e.length - 1].toString(), n = e.length - 2; n >= 0; --n)
                            r += (m + e[n]).toString().substring(1);
                        return r
                    }
                    ,
                    t.prototype.valueOf = function () {
                        for (var t = this.buf, e = 0, r = t.length - 1; r >= 0; --r)
                            e = e * m + t[r];
                        return e
                    }
                    ,
                    t.prototype.simplify = function () {
                        var t = this.buf;
                        return 1 == t.length ? t[0] : this
                    }
                    ,
                    t
            }(),
            b = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/,
            w = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;

        function E(t, e) {
            return t.length > e && (t = t.substring(0, e) + "\u2026"),
                t
        }

        var S, T = function () {
                function t(e, r) {
                    this.hexDigits = "0123456789ABCDEF",
                        e instanceof t ? (this.enc = e.enc,
                            this.pos = e.pos) : (this.enc = e,
                            this.pos = r)
                }

                return t.prototype.get = function (t) {
                    if (void 0 === t && (t = this.pos++),
                    t >= this.enc.length)
                        throw new Error("Requesting byte offset " + t + " on a stream of length " + this.enc.length);
                    return "string" === typeof this.enc ? this.enc.charCodeAt(t) : this.enc[t]
                }
                    ,
                    t.prototype.hexByte = function (t) {
                        return this.hexDigits.charAt(t >> 4 & 15) + this.hexDigits.charAt(15 & t)
                    }
                    ,
                    t.prototype.hexDump = function (t, e, r) {
                        for (var n = "", i = t; i < e; ++i)
                            if (n += this.hexByte(this.get(i)),
                            !0 !== r)
                                switch (15 & i) {
                                    case 7:
                                        n += "  ";
                                        break;
                                    case 15:
                                        n += "\n";
                                        break;
                                    default:
                                        n += " "
                                }
                        return n
                    }
                    ,
                    t.prototype.isASCII = function (t, e) {
                        for (var r = t; r < e; ++r) {
                            var n = this.get(r);
                            if (n < 32 || n > 176)
                                return !1
                        }
                        return !0
                    }
                    ,
                    t.prototype.parseStringISO = function (t, e) {
                        for (var r = "", n = t; n < e; ++n)
                            r += String.fromCharCode(this.get(n));
                        return r
                    }
                    ,
                    t.prototype.parseStringUTF = function (t, e) {
                        for (var r = "", n = t; n < e;) {
                            var i = this.get(n++);
                            r += i < 128 ? String.fromCharCode(i) : i > 191 && i < 224 ? String.fromCharCode((31 & i) << 6 | 63 & this.get(n++)) : String.fromCharCode((15 & i) << 12 | (63 & this.get(n++)) << 6 | 63 & this.get(n++))
                        }
                        return r
                    }
                    ,
                    t.prototype.parseStringBMP = function (t, e) {
                        for (var r, n, i = "", o = t; o < e;)
                            r = this.get(o++),
                                n = this.get(o++),
                                i += String.fromCharCode(r << 8 | n);
                        return i
                    }
                    ,
                    t.prototype.parseTime = function (t, e, r) {
                        var n = this.parseStringISO(t, e)
                            , i = (r ? b : w).exec(n);
                        return i ? (r && (i[1] = +i[1],
                            i[1] += +i[1] < 70 ? 2e3 : 1900),
                            n = i[1] + "-" + i[2] + "-" + i[3] + " " + i[4],
                        i[5] && (n += ":" + i[5],
                        i[6] && (n += ":" + i[6],
                        i[7] && (n += "." + i[7]))),
                        i[8] && (n += " UTC",
                        "Z" != i[8] && (n += i[8],
                        i[9] && (n += ":" + i[9]))),
                            n) : "Unrecognized time: " + n
                    }
                    ,
                    t.prototype.parseInteger = function (t, e) {
                        for (var r, n = this.get(t), i = n > 127, o = i ? 255 : 0, s = ""; n == o && ++t < e;)
                            n = this.get(t);
                        if (0 === (r = e - t))
                            return i ? -1 : 0;
                        if (r > 4) {
                            for (s = n,
                                     r <<= 3; 0 == (128 & (+s ^ o));)
                                s = +s << 1,
                                    --r;
                            s = "(" + r + " bit)\n"
                        }
                        i && (n -= 256);
                        for (var u = new v(n), a = t + 1; a < e; ++a)
                            u.mulAdd(256, this.get(a));
                        return s + u.toString()
                    }
                    ,
                    t.prototype.parseBitString = function (t, e, r) {
                        for (var n = this.get(t), i = "(" + ((e - t - 1 << 3) - n) + " bit)\n", o = "", s = t + 1; s < e; ++s) {
                            for (var u = this.get(s), a = s == e - 1 ? n : 0, h = 7; h >= a; --h)
                                o += u >> h & 1 ? "1" : "0";
                            if (o.length > r)
                                return i + E(o, r)
                        }
                        return i + o
                    }
                    ,
                    t.prototype.parseOctetString = function (t, e, r) {
                        if (this.isASCII(t, e))
                            return E(this.parseStringISO(t, e), r);
                        var n = e - t
                            , i = "(" + n + " byte)\n";
                        n > (r /= 2) && (e = t + r);
                        for (var o = t; o < e; ++o)
                            i += this.hexByte(this.get(o));
                        return n > r && (i += "\u2026"),
                            i
                    }
                    ,
                    t.prototype.parseOID = function (t, e, r) {
                        for (var n = "", i = new v, o = 0, s = t; s < e; ++s) {
                            var u = this.get(s);
                            if (i.mulAdd(128, 127 & u),
                                o += 7,
                                !(128 & u)) {
                                if ("" === n)
                                    if ((i = i.simplify()) instanceof v)
                                        i.sub(80),
                                            n = "2." + i.toString();
                                    else {
                                        var a = i < 80 ? i < 40 ? 0 : 1 : 2;
                                        n = a + "." + (i - 40 * a)
                                    }
                                else
                                    n += "." + i.toString();
                                if (n.length > r)
                                    return E(n, r);
                                i = new v,
                                    o = 0
                            }
                        }
                        return o > 0 && (n += ".incomplete"),
                            n
                    }
                    ,
                    t
            }(), D = function () {
                function t(t, e, r, n, i) {
                    if (!(n instanceof B))
                        throw new Error("Invalid tag value.");
                    this.stream = t,
                        this.header = e,
                        this.length = r,
                        this.tag = n,
                        this.sub = i
                }

                return t.prototype.typeName = function () {
                    switch (this.tag.tagClass) {
                        case 0:
                            switch (this.tag.tagNumber) {
                                case 0:
                                    return "EOC";
                                case 1:
                                    return "BOOLEAN";
                                case 2:
                                    return "INTEGER";
                                case 3:
                                    return "BIT_STRING";
                                case 4:
                                    return "OCTET_STRING";
                                case 5:
                                    return "NULL";
                                case 6:
                                    return "OBJECT_IDENTIFIER";
                                case 7:
                                    return "ObjectDescriptor";
                                case 8:
                                    return "EXTERNAL";
                                case 9:
                                    return "REAL";
                                case 10:
                                    return "ENUMERATED";
                                case 11:
                                    return "EMBEDDED_PDV";
                                case 12:
                                    return "UTF8String";
                                case 16:
                                    return "SEQUENCE";
                                case 17:
                                    return "SET";
                                case 18:
                                    return "NumericString";
                                case 19:
                                    return "PrintableString";
                                case 20:
                                    return "TeletexString";
                                case 21:
                                    return "VideotexString";
                                case 22:
                                    return "IA5String";
                                case 23:
                                    return "UTCTime";
                                case 24:
                                    return "GeneralizedTime";
                                case 25:
                                    return "GraphicString";
                                case 26:
                                    return "VisibleString";
                                case 27:
                                    return "GeneralString";
                                case 28:
                                    return "UniversalString";
                                case 30:
                                    return "BMPString"
                            }
                            return "Universal_" + this.tag.tagNumber.toString();
                        case 1:
                            return "Application_" + this.tag.tagNumber.toString();
                        case 2:
                            return "[" + this.tag.tagNumber.toString() + "]";
                        case 3:
                            return "Private_" + this.tag.tagNumber.toString()
                    }
                }
                    ,
                    t.prototype.content = function (t) {
                        if (void 0 === this.tag)
                            return null;
                        void 0 === t && (t = 1 / 0);
                        var e = this.posContent()
                            , r = Math.abs(this.length);
                        if (!this.tag.isUniversal())
                            return null !== this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e, e + r, t);
                        switch (this.tag.tagNumber) {
                            case 1:
                                return 0 === this.stream.get(e) ? "false" : "true";
                            case 2:
                                return this.stream.parseInteger(e, e + r);
                            case 3:
                                return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(e, e + r, t);
                            case 4:
                                return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e, e + r, t);
                            case 6:
                                return this.stream.parseOID(e, e + r, t);
                            case 16:
                            case 17:
                                return null !== this.sub ? "(" + this.sub.length + " elem)" : "(no elem)";
                            case 12:
                                return E(this.stream.parseStringUTF(e, e + r), t);
                            case 18:
                            case 19:
                            case 20:
                            case 21:
                            case 22:
                            case 26:
                                return E(this.stream.parseStringISO(e, e + r), t);
                            case 30:
                                return E(this.stream.parseStringBMP(e, e + r), t);
                            case 23:
                            case 24:
                                return this.stream.parseTime(e, e + r, 23 == this.tag.tagNumber)
                        }
                        return null
                    }
                    ,
                    t.prototype.toString = function () {
                        return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (null === this.sub ? "null" : this.sub.length) + "]"
                    }
                    ,
                    t.prototype.toPrettyString = function (t) {
                        void 0 === t && (t = "");
                        var e = t + this.typeName() + " @" + this.stream.pos;
                        if (this.length >= 0 && (e += "+"),
                            e += this.length,
                            this.tag.tagConstructed ? e += " (constructed)" : !this.tag.isUniversal() || 3 != this.tag.tagNumber && 4 != this.tag.tagNumber || null === this.sub || (e += " (encapsulates)"),
                            e += "\n",
                        null !== this.sub) {
                            t += "  ";
                            for (var r = 0, n = this.sub.length; r < n; ++r)
                                e += this.sub[r].toPrettyString(t)
                        }
                        return e
                    }
                    ,
                    t.prototype.posStart = function () {
                        return this.stream.pos
                    }
                    ,
                    t.prototype.posContent = function () {
                        return this.stream.pos + this.header
                    }
                    ,
                    t.prototype.posEnd = function () {
                        return this.stream.pos + this.header + Math.abs(this.length)
                    }
                    ,
                    t.prototype.toHexString = function () {
                        return this.stream.hexDump(this.posStart(), this.posEnd(), !0)
                    }
                    ,
                    t.decodeLength = function (t) {
                        var e = t.get()
                            , r = 127 & e;
                        if (r == e)
                            return r;
                        if (r > 6)
                            throw new Error("Length over 48 bits not supported at position " + (t.pos - 1));
                        if (0 === r)
                            return null;
                        e = 0;
                        for (var n = 0; n < r; ++n)
                            e = 256 * e + t.get();
                        return e
                    }
                    ,
                    t.prototype.getHexStringValue = function () {
                        var t = this.toHexString()
                            , e = 2 * this.header
                            , r = 2 * this.length;
                        return t.substr(e, r)
                    }
                    ,
                    t.decode = function (e) {
                        var r;
                        r = e instanceof T ? e : new T(e, 0);
                        var n = new T(r)
                            , i = new B(r)
                            , o = t.decodeLength(r)
                            , s = r.pos
                            , u = s - n.pos
                            , a = null
                            , h = function () {
                            var e = [];
                            if (null !== o) {
                                for (var n = s + o; r.pos < n;)
                                    e[e.length] = t.decode(r);
                                if (r.pos != n)
                                    throw new Error("Content size is not correct for container starting at offset " + s)
                            } else
                                try {
                                    for (; ;) {
                                        var i = t.decode(r);
                                        if (i.tag.isEOC())
                                            break;
                                        e[e.length] = i
                                    }
                                    o = s - r.pos
                                } catch (u) {
                                    throw new Error("Exception while decoding undefined length content: " + u)
                                }
                            return e
                        };
                        if (i.tagConstructed)
                            a = h();
                        else if (i.isUniversal() && (3 == i.tagNumber || 4 == i.tagNumber))
                            try {
                                if (3 == i.tagNumber && 0 != r.get())
                                    throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
                                a = h();
                                for (var f = 0; f < a.length; ++f)
                                    if (a[f].tag.isEOC())
                                        throw new Error("EOC is not supposed to be actual content.")
                            } catch (c) {
                                a = null
                            }
                        if (null === a) {
                            if (null === o)
                                throw new Error("We can't skip over an invalid tag with undefined length at offset " + s);
                            r.pos = s + Math.abs(o)
                        }
                        return new t(n, u, o, i, a)
                    }
                    ,
                    t
            }(), B = function () {
                function t(t) {
                    var e = t.get();
                    if (this.tagClass = e >> 6,
                        this.tagConstructed = 0 !== (32 & e),
                        this.tagNumber = 31 & e,
                    31 == this.tagNumber) {
                        var r = new v;
                        do {
                            e = t.get(),
                                r.mulAdd(128, 127 & e)
                        } while (128 & e);
                        this.tagNumber = r.simplify()
                    }
                }

                return t.prototype.isUniversal = function () {
                    return 0 === this.tagClass
                }
                    ,
                    t.prototype.isEOC = function () {
                        return 0 === this.tagClass && 0 === this.tagNumber
                    }
                    ,
                    t
            }(),
            x = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997],
            A = (1 << 26) / x[x.length - 1], I = function () {
                function t(t, e, r) {
                    null != t && ("number" == typeof t ? this.fromNumber(t, e, r) : null == e && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, e))
                }

                return t.prototype.toString = function (t) {
                    if (this.s < 0)
                        return "-" + this.negate().toString(t);
                    var e;
                    if (16 == t)
                        e = 4;
                    else if (8 == t)
                        e = 3;
                    else if (2 == t)
                        e = 1;
                    else if (32 == t)
                        e = 5;
                    else {
                        if (4 != t)
                            return this.toRadix(t);
                        e = 2
                    }
                    var r, i = (1 << e) - 1, o = !1, s = "", u = this.t, a = this.DB - u * this.DB % e;
                    if (u-- > 0)
                        for (a < this.DB && (r = this[u] >> a) > 0 && (o = !0,
                            s = n(r)); u >= 0;)
                            a < e ? (r = (this[u] & (1 << a) - 1) << e - a,
                                r |= this[--u] >> (a += this.DB - e)) : (r = this[u] >> (a -= e) & i,
                            a <= 0 && (a += this.DB,
                                --u)),
                            r > 0 && (o = !0),
                            o && (s += n(r));
                    return o ? s : "0"
                }
                    ,
                    t.prototype.negate = function () {
                        var e = N();
                        return t.ZERO.subTo(this, e),
                            e
                    }
                    ,
                    t.prototype.abs = function () {
                        return this.s < 0 ? this.negate() : this
                    }
                    ,
                    t.prototype.compareTo = function (t) {
                        var e = this.s - t.s;
                        if (0 != e)
                            return e;
                        var r = this.t;
                        if (0 != (e = r - t.t))
                            return this.s < 0 ? -e : e;
                        for (; --r >= 0;)
                            if (0 != (e = this[r] - t[r]))
                                return e;
                        return 0
                    }
                    ,
                    t.prototype.bitLength = function () {
                        return this.t <= 0 ? 0 : this.DB * (this.t - 1) + H(this[this.t - 1] ^ this.s & this.DM)
                    }
                    ,
                    t.prototype.mod = function (e) {
                        var r = N();
                        return this.abs().divRemTo(e, null, r),
                        this.s < 0 && r.compareTo(t.ZERO) > 0 && e.subTo(r, r),
                            r
                    }
                    ,
                    t.prototype.modPowInt = function (t, e) {
                        var r;
                        return r = t < 256 || e.isEven() ? new _(e) : new O(e),
                            this.exp(t, r)
                    }
                    ,
                    t.prototype.clone = function () {
                        var t = N();
                        return this.copyTo(t),
                            t
                    }
                    ,
                    t.prototype.intValue = function () {
                        if (this.s < 0) {
                            if (1 == this.t)
                                return this[0] - this.DV;
                            if (0 == this.t)
                                return -1
                        } else {
                            if (1 == this.t)
                                return this[0];
                            if (0 == this.t)
                                return 0
                        }
                        return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
                    }
                    ,
                    t.prototype.byteValue = function () {
                        return 0 == this.t ? this.s : this[0] << 24 >> 24
                    }
                    ,
                    t.prototype.shortValue = function () {
                        return 0 == this.t ? this.s : this[0] << 16 >> 16
                    }
                    ,
                    t.prototype.signum = function () {
                        return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
                    }
                    ,
                    t.prototype.toByteArray = function () {
                        var t = this.t
                            , e = [];
                        e[0] = this.s;
                        var r, n = this.DB - t * this.DB % 8, i = 0;
                        if (t-- > 0)
                            for (n < this.DB && (r = this[t] >> n) != (this.s & this.DM) >> n && (e[i++] = r | this.s << this.DB - n); t >= 0;)
                                n < 8 ? (r = (this[t] & (1 << n) - 1) << 8 - n,
                                    r |= this[--t] >> (n += this.DB - 8)) : (r = this[t] >> (n -= 8) & 255,
                                n <= 0 && (n += this.DB,
                                    --t)),
                                0 != (128 & r) && (r |= -256),
                                0 == i && (128 & this.s) != (128 & r) && ++i,
                                (i > 0 || r != this.s) && (e[i++] = r);
                        return e
                    }
                    ,
                    t.prototype.equals = function (t) {
                        return 0 == this.compareTo(t)
                    }
                    ,
                    t.prototype.min = function (t) {
                        return this.compareTo(t) < 0 ? this : t
                    }
                    ,
                    t.prototype.max = function (t) {
                        return this.compareTo(t) > 0 ? this : t
                    }
                    ,
                    t.prototype.and = function (t) {
                        var e = N();
                        return this.bitwiseTo(t, i, e),
                            e
                    }
                    ,
                    t.prototype.or = function (t) {
                        var e = N();
                        return this.bitwiseTo(t, o, e),
                            e
                    }
                    ,
                    t.prototype.xor = function (t) {
                        var e = N();
                        return this.bitwiseTo(t, s, e),
                            e
                    }
                    ,
                    t.prototype.andNot = function (t) {
                        var e = N();
                        return this.bitwiseTo(t, u, e),
                            e
                    }
                    ,
                    t.prototype.not = function () {
                        for (var t = N(), e = 0; e < this.t; ++e)
                            t[e] = this.DM & ~this[e];
                        return t.t = this.t,
                            t.s = ~this.s,
                            t
                    }
                    ,
                    t.prototype.shiftLeft = function (t) {
                        var e = N();
                        return t < 0 ? this.rShiftTo(-t, e) : this.lShiftTo(t, e),
                            e
                    }
                    ,
                    t.prototype.shiftRight = function (t) {
                        var e = N();
                        return t < 0 ? this.lShiftTo(-t, e) : this.rShiftTo(t, e),
                            e
                    }
                    ,
                    t.prototype.getLowestSetBit = function () {
                        for (var t = 0; t < this.t; ++t)
                            if (0 != this[t])
                                return t * this.DB + a(this[t]);
                        return this.s < 0 ? this.t * this.DB : -1
                    }
                    ,
                    t.prototype.bitCount = function () {
                        for (var t = 0, e = this.s & this.DM, r = 0; r < this.t; ++r)
                            t += h(this[r] ^ e);
                        return t
                    }
                    ,
                    t.prototype.testBit = function (t) {
                        var e = Math.floor(t / this.DB);
                        return e >= this.t ? 0 != this.s : 0 != (this[e] & 1 << t % this.DB)
                    }
                    ,
                    t.prototype.setBit = function (t) {
                        return this.changeBit(t, o)
                    }
                    ,
                    t.prototype.clearBit = function (t) {
                        return this.changeBit(t, u)
                    }
                    ,
                    t.prototype.flipBit = function (t) {
                        return this.changeBit(t, s)
                    }
                    ,
                    t.prototype.add = function (t) {
                        var e = N();
                        return this.addTo(t, e),
                            e
                    }
                    ,
                    t.prototype.subtract = function (t) {
                        var e = N();
                        return this.subTo(t, e),
                            e
                    }
                    ,
                    t.prototype.multiply = function (t) {
                        var e = N();
                        return this.multiplyTo(t, e),
                            e
                    }
                    ,
                    t.prototype.divide = function (t) {
                        var e = N();
                        return this.divRemTo(t, e, null),
                            e
                    }
                    ,
                    t.prototype.remainder = function (t) {
                        var e = N();
                        return this.divRemTo(t, null, e),
                            e
                    }
                    ,
                    t.prototype.divideAndRemainder = function (t) {
                        var e = N()
                            , r = N();
                        return this.divRemTo(t, e, r),
                            [e, r]
                    }
                    ,
                    t.prototype.modPow = function (t, e) {
                        var r, n, i = t.bitLength(), o = q(1);
                        if (i <= 0)
                            return o;
                        r = i < 18 ? 1 : i < 48 ? 3 : i < 144 ? 4 : i < 768 ? 5 : 6,
                            n = i < 8 ? new _(e) : e.isEven() ? new V(e) : new O(e);
                        var s = []
                            , u = 3
                            , a = r - 1
                            , h = (1 << r) - 1;
                        if (s[1] = n.convert(this),
                        r > 1) {
                            var f = N();
                            for (n.sqrTo(s[1], f); u <= h;)
                                s[u] = N(),
                                    n.mulTo(f, s[u - 2], s[u]),
                                    u += 2
                        }
                        var c, l, p = t.t - 1, d = !0, g = N();
                        for (i = H(t[p]) - 1; p >= 0;) {
                            for (i >= a ? c = t[p] >> i - a & h : (c = (t[p] & (1 << i + 1) - 1) << a - i,
                            p > 0 && (c |= t[p - 1] >> this.DB + i - a)),
                                     u = r; 0 == (1 & c);)
                                c >>= 1,
                                    --u;
                            if ((i -= u) < 0 && (i += this.DB,
                                --p),
                                d)
                                s[c].copyTo(o),
                                    d = !1;
                            else {
                                for (; u > 1;)
                                    n.sqrTo(o, g),
                                        n.sqrTo(g, o),
                                        u -= 2;
                                u > 0 ? n.sqrTo(o, g) : (l = o,
                                    o = g,
                                    g = l),
                                    n.mulTo(g, s[c], o)
                            }
                            for (; p >= 0 && 0 == (t[p] & 1 << i);)
                                n.sqrTo(o, g),
                                    l = o,
                                    o = g,
                                    g = l,
                                --i < 0 && (i = this.DB - 1,
                                    --p)
                        }
                        return n.revert(o)
                    }
                    ,
                    t.prototype.modInverse = function (e) {
                        var r = e.isEven();
                        if (this.isEven() && r || 0 == e.signum())
                            return t.ZERO;
                        for (var n = e.clone(), i = this.clone(), o = q(1), s = q(0), u = q(0), a = q(1); 0 != n.signum();) {
                            for (; n.isEven();)
                                n.rShiftTo(1, n),
                                    r ? (o.isEven() && s.isEven() || (o.addTo(this, o),
                                        s.subTo(e, s)),
                                        o.rShiftTo(1, o)) : s.isEven() || s.subTo(e, s),
                                    s.rShiftTo(1, s);
                            for (; i.isEven();)
                                i.rShiftTo(1, i),
                                    r ? (u.isEven() && a.isEven() || (u.addTo(this, u),
                                        a.subTo(e, a)),
                                        u.rShiftTo(1, u)) : a.isEven() || a.subTo(e, a),
                                    a.rShiftTo(1, a);
                            n.compareTo(i) >= 0 ? (n.subTo(i, n),
                            r && o.subTo(u, o),
                                s.subTo(a, s)) : (i.subTo(n, i),
                            r && u.subTo(o, u),
                                a.subTo(s, a))
                        }
                        return 0 != i.compareTo(t.ONE) ? t.ZERO : a.compareTo(e) >= 0 ? a.subtract(e) : a.signum() < 0 ? (a.addTo(e, a),
                            a.signum() < 0 ? a.add(e) : a) : a
                    }
                    ,
                    t.prototype.pow = function (t) {
                        return this.exp(t, new R)
                    }
                    ,
                    t.prototype.gcd = function (t) {
                        var e = this.s < 0 ? this.negate() : this.clone()
                            , r = t.s < 0 ? t.negate() : t.clone();
                        if (e.compareTo(r) < 0) {
                            var n = e;
                            e = r,
                                r = n
                        }
                        var i = e.getLowestSetBit()
                            , o = r.getLowestSetBit();
                        if (o < 0)
                            return e;
                        for (i < o && (o = i),
                             o > 0 && (e.rShiftTo(o, e),
                                 r.rShiftTo(o, r)); e.signum() > 0;)
                            (i = e.getLowestSetBit()) > 0 && e.rShiftTo(i, e),
                            (i = r.getLowestSetBit()) > 0 && r.rShiftTo(i, r),
                                e.compareTo(r) >= 0 ? (e.subTo(r, e),
                                    e.rShiftTo(1, e)) : (r.subTo(e, r),
                                    r.rShiftTo(1, r));
                        return o > 0 && r.lShiftTo(o, r),
                            r
                    }
                    ,
                    t.prototype.isProbablePrime = function (t) {
                        var e, r = this.abs();
                        if (1 == r.t && r[0] <= x[x.length - 1]) {
                            for (e = 0; e < x.length; ++e)
                                if (r[0] == x[e])
                                    return !0;
                            return !1
                        }
                        if (r.isEven())
                            return !1;
                        for (e = 1; e < x.length;) {
                            for (var n = x[e], i = e + 1; i < x.length && n < A;)
                                n *= x[i++];
                            for (n = r.modInt(n); e < i;)
                                if (n % x[e++] == 0)
                                    return !1
                        }
                        return r.millerRabin(t)
                    }
                    ,
                    t.prototype.copyTo = function (t) {
                        for (var e = this.t - 1; e >= 0; --e)
                            t[e] = this[e];
                        t.t = this.t,
                            t.s = this.s
                    }
                    ,
                    t.prototype.fromInt = function (t) {
                        this.t = 1,
                            this.s = t < 0 ? -1 : 0,
                            t > 0 ? this[0] = t : t < -1 ? this[0] = t + this.DV : this.t = 0
                    }
                    ,
                    t.prototype.fromString = function (e, r) {
                        var n;
                        if (16 == r)
                            n = 4;
                        else if (8 == r)
                            n = 3;
                        else if (256 == r)
                            n = 8;
                        else if (2 == r)
                            n = 1;
                        else if (32 == r)
                            n = 5;
                        else {
                            if (4 != r)
                                return void this.fromRadix(e, r);
                            n = 2
                        }
                        this.t = 0,
                            this.s = 0;
                        for (var i = e.length, o = !1, s = 0; --i >= 0;) {
                            var u = 8 == n ? 255 & +e[i] : U(e, i);
                            u < 0 ? "-" == e.charAt(i) && (o = !0) : (o = !1,
                                0 == s ? this[this.t++] = u : s + n > this.DB ? (this[this.t - 1] |= (u & (1 << this.DB - s) - 1) << s,
                                    this[this.t++] = u >> this.DB - s) : this[this.t - 1] |= u << s,
                            (s += n) >= this.DB && (s -= this.DB))
                        }
                        8 == n && 0 != (128 & +e[0]) && (this.s = -1,
                        s > 0 && (this[this.t - 1] |= (1 << this.DB - s) - 1 << s)),
                            this.clamp(),
                        o && t.ZERO.subTo(this, this)
                    }
                    ,
                    t.prototype.clamp = function () {
                        for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t;)
                            --this.t
                    }
                    ,
                    t.prototype.dlShiftTo = function (t, e) {
                        var r;
                        for (r = this.t - 1; r >= 0; --r)
                            e[r + t] = this[r];
                        for (r = t - 1; r >= 0; --r)
                            e[r] = 0;
                        e.t = this.t + t,
                            e.s = this.s
                    }
                    ,
                    t.prototype.drShiftTo = function (t, e) {
                        for (var r = t; r < this.t; ++r)
                            e[r - t] = this[r];
                        e.t = Math.max(this.t - t, 0),
                            e.s = this.s
                    }
                    ,
                    t.prototype.lShiftTo = function (t, e) {
                        for (var r = t % this.DB, n = this.DB - r, i = (1 << n) - 1, o = Math.floor(t / this.DB), s = this.s << r & this.DM, u = this.t - 1; u >= 0; --u)
                            e[u + o + 1] = this[u] >> n | s,
                                s = (this[u] & i) << r;
                        for (u = o - 1; u >= 0; --u)
                            e[u] = 0;
                        e[o] = s,
                            e.t = this.t + o + 1,
                            e.s = this.s,
                            e.clamp()
                    }
                    ,
                    t.prototype.rShiftTo = function (t, e) {
                        e.s = this.s;
                        var r = Math.floor(t / this.DB);
                        if (r >= this.t)
                            e.t = 0;
                        else {
                            var n = t % this.DB
                                , i = this.DB - n
                                , o = (1 << n) - 1;
                            e[0] = this[r] >> n;
                            for (var s = r + 1; s < this.t; ++s)
                                e[s - r - 1] |= (this[s] & o) << i,
                                    e[s - r] = this[s] >> n;
                            n > 0 && (e[this.t - r - 1] |= (this.s & o) << i),
                                e.t = this.t - r,
                                e.clamp()
                        }
                    }
                    ,
                    t.prototype.subTo = function (t, e) {
                        for (var r = 0, n = 0, i = Math.min(t.t, this.t); r < i;)
                            n += this[r] - t[r],
                                e[r++] = n & this.DM,
                                n >>= this.DB;
                        if (t.t < this.t) {
                            for (n -= t.s; r < this.t;)
                                n += this[r],
                                    e[r++] = n & this.DM,
                                    n >>= this.DB;
                            n += this.s
                        } else {
                            for (n += this.s; r < t.t;)
                                n -= t[r],
                                    e[r++] = n & this.DM,
                                    n >>= this.DB;
                            n -= t.s
                        }
                        e.s = n < 0 ? -1 : 0,
                            n < -1 ? e[r++] = this.DV + n : n > 0 && (e[r++] = n),
                            e.t = r,
                            e.clamp()
                    }
                    ,
                    t.prototype.multiplyTo = function (e, r) {
                        var n = this.abs()
                            , i = e.abs()
                            , o = n.t;
                        for (r.t = o + i.t; --o >= 0;)
                            r[o] = 0;
                        for (o = 0; o < i.t; ++o)
                            r[o + n.t] = n.am(0, i[o], r, o, 0, n.t);
                        r.s = 0,
                            r.clamp(),
                        this.s != e.s && t.ZERO.subTo(r, r)
                    }
                    ,
                    t.prototype.squareTo = function (t) {
                        for (var e = this.abs(), r = t.t = 2 * e.t; --r >= 0;)
                            t[r] = 0;
                        for (r = 0; r < e.t - 1; ++r) {
                            var n = e.am(r, e[r], t, 2 * r, 0, 1);
                            (t[r + e.t] += e.am(r + 1, 2 * e[r], t, 2 * r + 1, n, e.t - r - 1)) >= e.DV && (t[r + e.t] -= e.DV,
                                t[r + e.t + 1] = 1)
                        }
                        t.t > 0 && (t[t.t - 1] += e.am(r, e[r], t, 2 * r, 0, 1)),
                            t.s = 0,
                            t.clamp()
                    }
                    ,
                    t.prototype.divRemTo = function (e, r, n) {
                        var i = e.abs();
                        if (!(i.t <= 0)) {
                            var o = this.abs();
                            if (o.t < i.t)
                                return null != r && r.fromInt(0),
                                    void (null != n && this.copyTo(n));
                            null == n && (n = N());
                            var s = N()
                                , u = this.s
                                , a = e.s
                                , h = this.DB - H(i[i.t - 1]);
                            h > 0 ? (i.lShiftTo(h, s),
                                o.lShiftTo(h, n)) : (i.copyTo(s),
                                o.copyTo(n));
                            var f = s.t
                                , c = s[f - 1];
                            if (0 != c) {
                                var l = c * (1 << this.F1) + (f > 1 ? s[f - 2] >> this.F2 : 0)
                                    , p = this.FV / l
                                    , d = (1 << this.F1) / l
                                    , g = 1 << this.F2
                                    , y = n.t
                                    , m = y - f
                                    , v = null == r ? N() : r;
                                for (s.dlShiftTo(m, v),
                                     n.compareTo(v) >= 0 && (n[n.t++] = 1,
                                         n.subTo(v, n)),
                                         t.ONE.dlShiftTo(f, v),
                                         v.subTo(s, s); s.t < f;)
                                    s[s.t++] = 0;
                                for (; --m >= 0;) {
                                    var b = n[--y] == c ? this.DM : Math.floor(n[y] * p + (n[y - 1] + g) * d);
                                    if ((n[y] += s.am(0, b, n, m, 0, f)) < b)
                                        for (s.dlShiftTo(m, v),
                                                 n.subTo(v, n); n[y] < --b;)
                                            n.subTo(v, n)
                                }
                                null != r && (n.drShiftTo(f, r),
                                u != a && t.ZERO.subTo(r, r)),
                                    n.t = f,
                                    n.clamp(),
                                h > 0 && n.rShiftTo(h, n),
                                u < 0 && t.ZERO.subTo(n, n)
                            }
                        }
                    }
                    ,
                    t.prototype.invDigit = function () {
                        if (this.t < 1)
                            return 0;
                        var t = this[0];
                        if (0 == (1 & t))
                            return 0;
                        var e = 3 & t;
                        return (e = (e = (e = (e = e * (2 - (15 & t) * e) & 15) * (2 - (255 & t) * e) & 255) * (2 - ((65535 & t) * e & 65535)) & 65535) * (2 - t * e % this.DV) % this.DV) > 0 ? this.DV - e : -e
                    }
                    ,
                    t.prototype.isEven = function () {
                        return 0 == (this.t > 0 ? 1 & this[0] : this.s)
                    }
                    ,
                    t.prototype.exp = function (e, r) {
                        if (e > 4294967295 || e < 1)
                            return t.ONE;
                        var n = N()
                            , i = N()
                            , o = r.convert(this)
                            , s = H(e) - 1;
                        for (o.copyTo(n); --s >= 0;)
                            if (r.sqrTo(n, i),
                            (e & 1 << s) > 0)
                                r.mulTo(i, o, n);
                            else {
                                var u = n;
                                n = i,
                                    i = u
                            }
                        return r.revert(n)
                    }
                    ,
                    t.prototype.chunkSize = function (t) {
                        return Math.floor(Math.LN2 * this.DB / Math.log(t))
                    }
                    ,
                    t.prototype.toRadix = function (t) {
                        if (null == t && (t = 10),
                        0 == this.signum() || t < 2 || t > 36)
                            return "0";
                        var e = this.chunkSize(t)
                            , r = Math.pow(t, e)
                            , n = q(r)
                            , i = N()
                            , o = N()
                            , s = "";
                        for (this.divRemTo(n, i, o); i.signum() > 0;)
                            s = (r + o.intValue()).toString(t).substr(1) + s,
                                i.divRemTo(n, i, o);
                        return o.intValue().toString(t) + s
                    }
                    ,
                    t.prototype.fromRadix = function (e, r) {
                        this.fromInt(0),
                        null == r && (r = 10);
                        for (var n = this.chunkSize(r), i = Math.pow(r, n), o = !1, s = 0, u = 0, a = 0; a < e.length; ++a) {
                            var h = U(e, a);
                            h < 0 ? "-" == e.charAt(a) && 0 == this.signum() && (o = !0) : (u = r * u + h,
                            ++s >= n && (this.dMultiply(i),
                                this.dAddOffset(u, 0),
                                s = 0,
                                u = 0))
                        }
                        s > 0 && (this.dMultiply(Math.pow(r, s)),
                            this.dAddOffset(u, 0)),
                        o && t.ZERO.subTo(this, this)
                    }
                    ,
                    t.prototype.fromNumber = function (e, r, n) {
                        if ("number" == typeof r)
                            if (e < 2)
                                this.fromInt(1);
                            else
                                for (this.fromNumber(e, n),
                                     this.testBit(e - 1) || this.bitwiseTo(t.ONE.shiftLeft(e - 1), o, this),
                                     this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(r);)
                                    this.dAddOffset(2, 0),
                                    this.bitLength() > e && this.subTo(t.ONE.shiftLeft(e - 1), this);
                        else {
                            var i = []
                                , s = 7 & e;
                            i.length = 1 + (e >> 3),
                                r.nextBytes(i),
                                s > 0 ? i[0] &= (1 << s) - 1 : i[0] = 0,
                                this.fromString(i, 256)
                        }
                    }
                    ,
                    t.prototype.bitwiseTo = function (t, e, r) {
                        var n, i, o = Math.min(t.t, this.t);
                        for (n = 0; n < o; ++n)
                            r[n] = e(this[n], t[n]);
                        if (t.t < this.t) {
                            for (i = t.s & this.DM,
                                     n = o; n < this.t; ++n)
                                r[n] = e(this[n], i);
                            r.t = this.t
                        } else {
                            for (i = this.s & this.DM,
                                     n = o; n < t.t; ++n)
                                r[n] = e(i, t[n]);
                            r.t = t.t
                        }
                        r.s = e(this.s, t.s),
                            r.clamp()
                    }
                    ,
                    t.prototype.changeBit = function (e, r) {
                        var n = t.ONE.shiftLeft(e);
                        return this.bitwiseTo(n, r, n),
                            n
                    }
                    ,
                    t.prototype.addTo = function (t, e) {
                        for (var r = 0, n = 0, i = Math.min(t.t, this.t); r < i;)
                            n += this[r] + t[r],
                                e[r++] = n & this.DM,
                                n >>= this.DB;
                        if (t.t < this.t) {
                            for (n += t.s; r < this.t;)
                                n += this[r],
                                    e[r++] = n & this.DM,
                                    n >>= this.DB;
                            n += this.s
                        } else {
                            for (n += this.s; r < t.t;)
                                n += t[r],
                                    e[r++] = n & this.DM,
                                    n >>= this.DB;
                            n += t.s
                        }
                        e.s = n < 0 ? -1 : 0,
                            n > 0 ? e[r++] = n : n < -1 && (e[r++] = this.DV + n),
                            e.t = r,
                            e.clamp()
                    }
                    ,
                    t.prototype.dMultiply = function (t) {
                        this[this.t] = this.am(0, t - 1, this, 0, 0, this.t),
                            ++this.t,
                            this.clamp()
                    }
                    ,
                    t.prototype.dAddOffset = function (t, e) {
                        if (0 != t) {
                            for (; this.t <= e;)
                                this[this.t++] = 0;
                            for (this[e] += t; this[e] >= this.DV;)
                                this[e] -= this.DV,
                                ++e >= this.t && (this[this.t++] = 0),
                                    ++this[e]
                        }
                    }
                    ,
                    t.prototype.multiplyLowerTo = function (t, e, r) {
                        var n = Math.min(this.t + t.t, e);
                        for (r.s = 0,
                                 r.t = n; n > 0;)
                            r[--n] = 0;
                        for (var i = r.t - this.t; n < i; ++n)
                            r[n + this.t] = this.am(0, t[n], r, n, 0, this.t);
                        for (i = Math.min(t.t, e); n < i; ++n)
                            this.am(0, t[n], r, n, 0, e - n);
                        r.clamp()
                    }
                    ,
                    t.prototype.multiplyUpperTo = function (t, e, r) {
                        --e;
                        var n = r.t = this.t + t.t - e;
                        for (r.s = 0; --n >= 0;)
                            r[n] = 0;
                        for (n = Math.max(e - this.t, 0); n < t.t; ++n)
                            r[this.t + n - e] = this.am(e - n, t[n], r, 0, 0, this.t + n - e);
                        r.clamp(),
                            r.drShiftTo(1, r)
                    }
                    ,
                    t.prototype.modInt = function (t) {
                        if (t <= 0)
                            return 0;
                        var e = this.DV % t
                            , r = this.s < 0 ? t - 1 : 0;
                        if (this.t > 0)
                            if (0 == e)
                                r = this[0] % t;
                            else
                                for (var n = this.t - 1; n >= 0; --n)
                                    r = (e * r + this[n]) % t;
                        return r
                    }
                    ,
                    t.prototype.millerRabin = function (e) {
                        var r = this.subtract(t.ONE)
                            , n = r.getLowestSetBit();
                        if (n <= 0)
                            return !1;
                        var i = r.shiftRight(n);
                        (e = e + 1 >> 1) > x.length && (e = x.length);
                        for (var o = N(), s = 0; s < e; ++s) {
                            o.fromInt(x[Math.floor(Math.random() * x.length)]);
                            var u = o.modPow(i, this);
                            if (0 != u.compareTo(t.ONE) && 0 != u.compareTo(r)) {
                                for (var a = 1; a++ < n && 0 != u.compareTo(r);)
                                    if (0 == (u = u.modPowInt(2, this)).compareTo(t.ONE))
                                        return !1;
                                if (0 != u.compareTo(r))
                                    return !1
                            }
                        }
                        return !0
                    }
                    ,
                    t.prototype.square = function () {
                        var t = N();
                        return this.squareTo(t),
                            t
                    }
                    ,
                    t.prototype.gcda = function (t, e) {
                        var r = this.s < 0 ? this.negate() : this.clone()
                            , n = t.s < 0 ? t.negate() : t.clone();
                        if (r.compareTo(n) < 0) {
                            var i = r;
                            r = n,
                                n = i
                        }
                        var o = r.getLowestSetBit()
                            , s = n.getLowestSetBit();
                        if (s < 0)
                            e(r);
                        else {
                            o < s && (s = o),
                            s > 0 && (r.rShiftTo(s, r),
                                n.rShiftTo(s, n));
                            var u = function () {
                                (o = r.getLowestSetBit()) > 0 && r.rShiftTo(o, r),
                                (o = n.getLowestSetBit()) > 0 && n.rShiftTo(o, n),
                                    r.compareTo(n) >= 0 ? (r.subTo(n, r),
                                        r.rShiftTo(1, r)) : (n.subTo(r, n),
                                        n.rShiftTo(1, n)),
                                    r.signum() > 0 ? setTimeout(u, 0) : (s > 0 && n.lShiftTo(s, n),
                                        setTimeout((function () {
                                                e(n)
                                            }
                                        ), 0))
                            };
                            setTimeout(u, 10)
                        }
                    }
                    ,
                    t.prototype.fromNumberAsync = function (e, r, n, i) {
                        if ("number" == typeof r)
                            if (e < 2)
                                this.fromInt(1);
                            else {
                                this.fromNumber(e, n),
                                this.testBit(e - 1) || this.bitwiseTo(t.ONE.shiftLeft(e - 1), o, this),
                                this.isEven() && this.dAddOffset(1, 0);
                                var s = this
                                    , u = function () {
                                    s.dAddOffset(2, 0),
                                    s.bitLength() > e && s.subTo(t.ONE.shiftLeft(e - 1), s),
                                        s.isProbablePrime(r) ? setTimeout((function () {
                                                i()
                                            }
                                        ), 0) : setTimeout(u, 0)
                                };
                                setTimeout(u, 0)
                            }
                        else {
                            var a = []
                                , h = 7 & e;
                            a.length = 1 + (e >> 3),
                                r.nextBytes(a),
                                h > 0 ? a[0] &= (1 << h) - 1 : a[0] = 0,
                                this.fromString(a, 256)
                        }
                    }
                    ,
                    t
            }(), R = function () {
                function t() {
                }

                return t.prototype.convert = function (t) {
                    return t
                }
                    ,
                    t.prototype.revert = function (t) {
                        return t
                    }
                    ,
                    t.prototype.mulTo = function (t, e, r) {
                        t.multiplyTo(e, r)
                    }
                    ,
                    t.prototype.sqrTo = function (t, e) {
                        t.squareTo(e)
                    }
                    ,
                    t
            }(), _ = function () {
                function t(t) {
                    this.m = t
                }

                return t.prototype.convert = function (t) {
                    return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t
                }
                    ,
                    t.prototype.revert = function (t) {
                        return t
                    }
                    ,
                    t.prototype.reduce = function (t) {
                        t.divRemTo(this.m, null, t)
                    }
                    ,
                    t.prototype.mulTo = function (t, e, r) {
                        t.multiplyTo(e, r),
                            this.reduce(r)
                    }
                    ,
                    t.prototype.sqrTo = function (t, e) {
                        t.squareTo(e),
                            this.reduce(e)
                    }
                    ,
                    t
            }(), O = function () {
                function t(t) {
                    this.m = t,
                        this.mp = t.invDigit(),
                        this.mpl = 32767 & this.mp,
                        this.mph = this.mp >> 15,
                        this.um = (1 << t.DB - 15) - 1,
                        this.mt2 = 2 * t.t
                }

                return t.prototype.convert = function (t) {
                    var e = N();
                    return t.abs().dlShiftTo(this.m.t, e),
                        e.divRemTo(this.m, null, e),
                    t.s < 0 && e.compareTo(I.ZERO) > 0 && this.m.subTo(e, e),
                        e
                }
                    ,
                    t.prototype.revert = function (t) {
                        var e = N();
                        return t.copyTo(e),
                            this.reduce(e),
                            e
                    }
                    ,
                    t.prototype.reduce = function (t) {
                        for (; t.t <= this.mt2;)
                            t[t.t++] = 0;
                        for (var e = 0; e < this.m.t; ++e) {
                            var r = 32767 & t[e]
                                , n = r * this.mpl + ((r * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;
                            for (t[r = e + this.m.t] += this.m.am(0, n, t, e, 0, this.m.t); t[r] >= t.DV;)
                                t[r] -= t.DV,
                                    t[++r]++
                        }
                        t.clamp(),
                            t.drShiftTo(this.m.t, t),
                        t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
                    }
                    ,
                    t.prototype.mulTo = function (t, e, r) {
                        t.multiplyTo(e, r),
                            this.reduce(r)
                    }
                    ,
                    t.prototype.sqrTo = function (t, e) {
                        t.squareTo(e),
                            this.reduce(e)
                    }
                    ,
                    t
            }(), V = function () {
                function t(t) {
                    this.m = t,
                        this.r2 = N(),
                        this.q3 = N(),
                        I.ONE.dlShiftTo(2 * t.t, this.r2),
                        this.mu = this.r2.divide(t)
                }

                return t.prototype.convert = function (t) {
                    if (t.s < 0 || t.t > 2 * this.m.t)
                        return t.mod(this.m);
                    if (t.compareTo(this.m) < 0)
                        return t;
                    var e = N();
                    return t.copyTo(e),
                        this.reduce(e),
                        e
                }
                    ,
                    t.prototype.revert = function (t) {
                        return t
                    }
                    ,
                    t.prototype.reduce = function (t) {
                        for (t.drShiftTo(this.m.t - 1, this.r2),
                             t.t > this.m.t + 1 && (t.t = this.m.t + 1,
                                 t.clamp()),
                                 this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3),
                                 this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); t.compareTo(this.r2) < 0;)
                            t.dAddOffset(1, this.m.t + 1);
                        for (t.subTo(this.r2, t); t.compareTo(this.m) >= 0;)
                            t.subTo(this.m, t)
                    }
                    ,
                    t.prototype.mulTo = function (t, e, r) {
                        t.multiplyTo(e, r),
                            this.reduce(r)
                    }
                    ,
                    t.prototype.sqrTo = function (t, e) {
                        t.squareTo(e),
                            this.reduce(e)
                    }
                    ,
                    t
            }();

        function N() {
            return new I(null)
        }

        function L(t, e) {
            return new I(t, e)
        }

        var M = "undefined" !== typeof navigator;
        M && "Microsoft Internet Explorer" == navigator.appName ? (I.prototype.am = function (t, e, r, n, i, o) {
            for (var s = 32767 & e, u = e >> 15; --o >= 0;) {
                var a = 32767 & this[t]
                    , h = this[t++] >> 15
                    , f = u * a + h * s;
                i = ((a = s * a + ((32767 & f) << 15) + r[n] + (1073741823 & i)) >>> 30) + (f >>> 15) + u * h + (i >>> 30),
                    r[n++] = 1073741823 & a
            }
            return i
        }
            ,
            S = 30) : M && "Netscape" != navigator.appName ? (I.prototype.am = function (t, e, r, n, i, o) {
            for (; --o >= 0;) {
                var s = e * this[t++] + r[n] + i;
                i = Math.floor(s / 67108864),
                    r[n++] = 67108863 & s
            }
            return i
        }
            ,
            S = 26) : (I.prototype.am = function (t, e, r, n, i, o) {
            for (var s = 16383 & e, u = e >> 14; --o >= 0;) {
                var a = 16383 & this[t]
                    , h = this[t++] >> 14
                    , f = u * a + h * s;
                i = ((a = s * a + ((16383 & f) << 14) + r[n] + i) >> 28) + (f >> 14) + u * h,
                    r[n++] = 268435455 & a
            }
            return i
        }
            ,
            S = 28),
            I.prototype.DB = S,
            I.prototype.DM = (1 << S) - 1,
            I.prototype.DV = 1 << S;
        I.prototype.FV = Math.pow(2, 52),
            I.prototype.F1 = 52 - S,
            I.prototype.F2 = 2 * S - 52;
        var j, C, P = [];
        for (j = "0".charCodeAt(0),
                 C = 0; C <= 9; ++C)
            P[j++] = C;
        for (j = "a".charCodeAt(0),
                 C = 10; C < 36; ++C)
            P[j++] = C;
        for (j = "A".charCodeAt(0),
                 C = 10; C < 36; ++C)
            P[j++] = C;

        function U(t, e) {
            var r = P[t.charCodeAt(e)];
            return null == r ? -1 : r
        }

        function q(t) {
            var e = N();
            return e.fromInt(t),
                e
        }

        function H(t) {
            var e, r = 1;
            return 0 != (e = t >>> 16) && (t = e,
                r += 16),
            0 != (e = t >> 8) && (t = e,
                r += 8),
            0 != (e = t >> 4) && (t = e,
                r += 4),
            0 != (e = t >> 2) && (t = e,
                r += 2),
            0 != (e = t >> 1) && (t = e,
                r += 1),
                r
        }

        I.ZERO = q(0),
            I.ONE = q(1);
        var k = function () {
            function t() {
                this.i = 0,
                    this.j = 0,
                    this.S = []
            }

            return t.prototype.init = function (t) {
                var e, r, n;
                for (e = 0; e < 256; ++e)
                    this.S[e] = e;
                for (r = 0,
                         e = 0; e < 256; ++e)
                    r = r + this.S[e] + t[e % t.length] & 255,
                        n = this.S[e],
                        this.S[e] = this.S[r],
                        this.S[r] = n;
                this.i = 0,
                    this.j = 0
            }
                ,
                t.prototype.next = function () {
                    var t;
                    return this.i = this.i + 1 & 255,
                        this.j = this.j + this.S[this.i] & 255,
                        t = this.S[this.i],
                        this.S[this.i] = this.S[this.j],
                        this.S[this.j] = t,
                        this.S[t + this.S[this.i] & 255]
                }
                ,
                t
        }();
        var F, K, Y = null;
        if (null == Y) {
            Y = [],
                K = 0;
            var z = void 0;
            if (window.crypto && window.crypto.getRandomValues) {
                var Z = new Uint32Array(256);
                for (window.crypto.getRandomValues(Z),
                         z = 0; z < Z.length; ++z)
                    Y[K++] = 255 & Z[z]
            }
            var G = 0
                , $ = function (t) {
                if ((G = G || 0) >= 256 || K >= 256)
                    window.removeEventListener ? window.removeEventListener("mousemove", $, !1) : window.detachEvent && window.detachEvent("onmousemove", $);
                else
                    try {
                        var e = t.x + t.y;
                        Y[K++] = 255 & e,
                            G += 1
                    } catch (r) {
                    }
            };
            window.addEventListener ? window.addEventListener("mousemove", $, !1) : window.attachEvent && window.attachEvent("onmousemove", $)
        }

        function J() {
            if (null == F) {
                for (F = new k; K < 256;) {
                    var t = Math.floor(65536 * Math.random());
                    Y[K++] = 255 & t
                }
                for (F.init(Y),
                         K = 0; K < Y.length; ++K)
                    Y[K] = 0;
                K = 0
            }
            return F.next()
        }

        var W = function () {
            function t() {
            }

            return t.prototype.nextBytes = function (t) {
                for (var e = 0; e < t.length; ++e)
                    t[e] = J()
            }
                ,
                t
        }();
        var X = function () {
            function t() {
                this.n = null,
                    this.e = 0,
                    this.d = null,
                    this.p = null,
                    this.q = null,
                    this.dmp1 = null,
                    this.dmq1 = null,
                    this.coeff = null
            }

            return t.prototype.doPublic = function (t) {
                return t.modPowInt(this.e, this.n)
            }
                ,
                t.prototype.doPrivate = function (t) {
                    if (null == this.p || null == this.q)
                        return t.modPow(this.d, this.n);
                    for (var e = t.mod(this.p).modPow(this.dmp1, this.p), r = t.mod(this.q).modPow(this.dmq1, this.q); e.compareTo(r) < 0;)
                        e = e.add(this.p);
                    return e.subtract(r).multiply(this.coeff).mod(this.p).multiply(this.q).add(r)
                }
                ,
                t.prototype.setPublic = function (t, e) {
                    null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = L(t, 16),
                        this.e = parseInt(e, 16)) : console.error("Invalid RSA public key")
                }
                ,
                t.prototype.encrypt = function (t) {
                    var e = this.n.bitLength() + 7 >> 3
                        , r = function (t, e) {
                        if (e < t.length + 11)
                            return console.error("Message too long for RSA"),
                                null;
                        for (var r = [], n = t.length - 1; n >= 0 && e > 0;) {
                            var i = t.charCodeAt(n--);
                            i < 128 ? r[--e] = i : i > 127 && i < 2048 ? (r[--e] = 63 & i | 128,
                                r[--e] = i >> 6 | 192) : (r[--e] = 63 & i | 128,
                                r[--e] = i >> 6 & 63 | 128,
                                r[--e] = i >> 12 | 224)
                        }
                        r[--e] = 0;
                        for (var o = new W, s = []; e > 2;) {
                            for (s[0] = 0; 0 == s[0];)
                                o.nextBytes(s);
                            r[--e] = s[0]
                        }
                        return r[--e] = 2,
                            r[--e] = 0,
                            new I(r)
                    }(t, e);
                    if (null == r)
                        return null;
                    var n = this.doPublic(r);
                    if (null == n)
                        return null;
                    for (var i = n.toString(16), o = i.length, s = 0; s < 2 * e - o; s++)
                        i = "0" + i;
                    return i
                }
                ,
                t.prototype.setPrivate = function (t, e, r) {
                    null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = L(t, 16),
                        this.e = parseInt(e, 16),
                        this.d = L(r, 16)) : console.error("Invalid RSA private key")
                }
                ,
                t.prototype.setPrivateEx = function (t, e, r, n, i, o, s, u) {
                    null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = L(t, 16),
                        this.e = parseInt(e, 16),
                        this.d = L(r, 16),
                        this.p = L(n, 16),
                        this.q = L(i, 16),
                        this.dmp1 = L(o, 16),
                        this.dmq1 = L(s, 16),
                        this.coeff = L(u, 16)) : console.error("Invalid RSA private key")
                }
                ,
                t.prototype.generate = function (t, e) {
                    var r = new W
                        , n = t >> 1;
                    this.e = parseInt(e, 16);
                    for (var i = new I(e, 16); ;) {
                        for (; this.p = new I(t - n, 1, r),
                               0 != this.p.subtract(I.ONE).gcd(i).compareTo(I.ONE) || !this.p.isProbablePrime(10);)
                            ;
                        for (; this.q = new I(n, 1, r),
                               0 != this.q.subtract(I.ONE).gcd(i).compareTo(I.ONE) || !this.q.isProbablePrime(10);)
                            ;
                        if (this.p.compareTo(this.q) <= 0) {
                            var o = this.p;
                            this.p = this.q,
                                this.q = o
                        }
                        var s = this.p.subtract(I.ONE)
                            , u = this.q.subtract(I.ONE)
                            , a = s.multiply(u);
                        if (0 == a.gcd(i).compareTo(I.ONE)) {
                            this.n = this.p.multiply(this.q),
                                this.d = i.modInverse(a),
                                this.dmp1 = this.d.mod(s),
                                this.dmq1 = this.d.mod(u),
                                this.coeff = this.q.modInverse(this.p);
                            break
                        }
                    }
                }
                ,
                t.prototype.decrypt = function (t) {
                    var e = L(t, 16)
                        , r = this.doPrivate(e);
                    return null == r ? null : function (t, e) {
                        var r = t.toByteArray()
                            , n = 0;
                        for (; n < r.length && 0 == r[n];)
                            ++n;
                        if (r.length - n != e - 1 || 2 != r[n])
                            return null;
                        ++n;
                        for (; 0 != r[n];)
                            if (++n >= r.length)
                                return null;
                        var i = "";
                        for (; ++n < r.length;) {
                            var o = 255 & r[n];
                            o < 128 ? i += String.fromCharCode(o) : o > 191 && o < 224 ? (i += String.fromCharCode((31 & o) << 6 | 63 & r[n + 1]),
                                ++n) : (i += String.fromCharCode((15 & o) << 12 | (63 & r[n + 1]) << 6 | 63 & r[n + 2]),
                                n += 2)
                        }
                        return i
                    }(r, this.n.bitLength() + 7 >> 3)
                }
                ,
                t.prototype.generateAsync = function (t, e, r) {
                    var n = new W
                        , i = t >> 1;
                    this.e = parseInt(e, 16);
                    var o = new I(e, 16)
                        , s = this
                        , u = function () {
                        var e = function () {
                            if (s.p.compareTo(s.q) <= 0) {
                                var t = s.p;
                                s.p = s.q,
                                    s.q = t
                            }
                            var e = s.p.subtract(I.ONE)
                                , n = s.q.subtract(I.ONE)
                                , i = e.multiply(n);
                            0 == i.gcd(o).compareTo(I.ONE) ? (s.n = s.p.multiply(s.q),
                                s.d = o.modInverse(i),
                                s.dmp1 = s.d.mod(e),
                                s.dmq1 = s.d.mod(n),
                                s.coeff = s.q.modInverse(s.p),
                                setTimeout((function () {
                                        r()
                                    }
                                ), 0)) : setTimeout(u, 0)
                        }
                            , a = function () {
                            s.q = N(),
                                s.q.fromNumberAsync(i, 1, n, (function () {
                                        s.q.subtract(I.ONE).gcda(o, (function (t) {
                                                0 == t.compareTo(I.ONE) && s.q.isProbablePrime(10) ? setTimeout(e, 0) : setTimeout(a, 0)
                                            }
                                        ))
                                    }
                                ))
                        }
                            , h = function () {
                            s.p = N(),
                                s.p.fromNumberAsync(t - i, 1, n, (function () {
                                        s.p.subtract(I.ONE).gcda(o, (function (t) {
                                                0 == t.compareTo(I.ONE) && s.p.isProbablePrime(10) ? setTimeout(a, 0) : setTimeout(h, 0)
                                            }
                                        ))
                                    }
                                ))
                        };
                        setTimeout(h, 0)
                    };
                    setTimeout(u, 0)
                }
                ,
                t.prototype.sign = function (t, e, r) {
                    var n = function (t, e) {
                        if (e < t.length + 22)
                            return console.error("Message too long for RSA"),
                                null;
                        for (var r = e - t.length - 6, n = "", i = 0; i < r; i += 2)
                            n += "ff";
                        return L("0001" + n + "00" + t, 16)
                    }((Q[r] || "") + e(t).toString(), this.n.bitLength() / 4);
                    if (null == n)
                        return null;
                    var i = this.doPrivate(n);
                    if (null == i)
                        return null;
                    var o = i.toString(16);
                    return 0 == (1 & o.length) ? o : "0" + o
                }
                ,
                t.prototype.verify = function (t, e, r) {
                    var n = L(e, 16)
                        , i = this.doPublic(n);
                    return null == i ? null : function (t) {
                        for (var e in Q)
                            if (Q.hasOwnProperty(e)) {
                                var r = Q[e]
                                    , n = r.length;
                                if (t.substr(0, n) == r)
                                    return t.substr(n)
                            }
                        return t
                    }(i.toString(16).replace(/^1f+00/, "")) == r(t).toString()
                }
                ,
                t
        }();
        var Q = {
            md2: "3020300c06082a864886f70d020205000410",
            md5: "3020300c06082a864886f70d020505000410",
            sha1: "3021300906052b0e03021a05000414",
            sha224: "302d300d06096086480165030402040500041c",
            sha256: "3031300d060960864801650304020105000420",
            sha384: "3041300d060960864801650304020205000430",
            sha512: "3051300d060960864801650304020305000440",
            ripemd160: "3021300906052b2403020105000414"
        };
        var tt = {};
        tt.lang = {
            extend: function (t, e, r) {
                if (!e || !t)
                    throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");
                var n = function () {
                };
                if (n.prototype = e.prototype,
                    t.prototype = new n,
                    t.prototype.constructor = t,
                    t.superclass = e.prototype,
                e.prototype.constructor == Object.prototype.constructor && (e.prototype.constructor = e),
                    r) {
                    var i;
                    for (i in r)
                        t.prototype[i] = r[i];
                    var o = function () {
                    }
                        , s = ["toString", "valueOf"];
                    try {
                        /MSIE/.test(navigator.userAgent) && (o = function (t, e) {
                                for (i = 0; i < s.length; i += 1) {
                                    var r = s[i]
                                        , n = e[r];
                                    "function" === typeof n && n != Object.prototype[r] && (t[r] = n)
                                }
                            }
                        )
                    } catch (u) {
                    }
                    o(t.prototype, r)
                }
            }
        };
        var et = {};
        "undefined" != typeof et.asn1 && et.asn1 || (et.asn1 = {}),
            et.asn1.ASN1Util = new function () {
                this.integerToByteHex = function (t) {
                    var e = t.toString(16);
                    return e.length % 2 == 1 && (e = "0" + e),
                        e
                }
                    ,
                    this.bigIntToMinTwosComplementsHex = function (t) {
                        var e = t.toString(16);
                        if ("-" != e.substr(0, 1))
                            e.length % 2 == 1 ? e = "0" + e : e.match(/^[0-7]/) || (e = "00" + e);
                        else {
                            var r = e.substr(1).length;
                            r % 2 == 1 ? r += 1 : e.match(/^[0-7]/) || (r += 2);
                            for (var n = "", i = 0; i < r; i++)
                                n += "f";
                            e = new I(n, 16).xor(t).add(I.ONE).toString(16).replace(/^-/, "")
                        }
                        return e
                    }
                    ,
                    this.getPEMStringFromHex = function (t, e) {
                        return hextopem(t, e)
                    }
                    ,
                    this.newObject = function (t) {
                        var e = et.asn1
                            , r = e.DERBoolean
                            , n = e.DERInteger
                            , i = e.DERBitString
                            , o = e.DEROctetString
                            , s = e.DERNull
                            , u = e.DERObjectIdentifier
                            , a = e.DEREnumerated
                            , h = e.DERUTF8String
                            , f = e.DERNumericString
                            , c = e.DERPrintableString
                            , l = e.DERTeletexString
                            , p = e.DERIA5String
                            , d = e.DERUTCTime
                            , g = e.DERGeneralizedTime
                            , y = e.DERSequence
                            , m = e.DERSet
                            , v = e.DERTaggedObject
                            , b = e.ASN1Util.newObject
                            , w = Object.keys(t);
                        if (1 != w.length)
                            throw "key of param shall be only one.";
                        var E = w[0];
                        if (-1 == ":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + E + ":"))
                            throw "undefined key: " + E;
                        if ("bool" == E)
                            return new r(t[E]);
                        if ("int" == E)
                            return new n(t[E]);
                        if ("bitstr" == E)
                            return new i(t[E]);
                        if ("octstr" == E)
                            return new o(t[E]);
                        if ("null" == E)
                            return new s(t[E]);
                        if ("oid" == E)
                            return new u(t[E]);
                        if ("enum" == E)
                            return new a(t[E]);
                        if ("utf8str" == E)
                            return new h(t[E]);
                        if ("numstr" == E)
                            return new f(t[E]);
                        if ("prnstr" == E)
                            return new c(t[E]);
                        if ("telstr" == E)
                            return new l(t[E]);
                        if ("ia5str" == E)
                            return new p(t[E]);
                        if ("utctime" == E)
                            return new d(t[E]);
                        if ("gentime" == E)
                            return new g(t[E]);
                        if ("seq" == E) {
                            for (var S = t[E], T = [], D = 0; D < S.length; D++) {
                                var B = b(S[D]);
                                T.push(B)
                            }
                            return new y({
                                array: T
                            })
                        }
                        if ("set" == E) {
                            for (S = t[E],
                                     T = [],
                                     D = 0; D < S.length; D++) {
                                B = b(S[D]);
                                T.push(B)
                            }
                            return new m({
                                array: T
                            })
                        }
                        if ("tag" == E) {
                            var x = t[E];
                            if ("[object Array]" === Object.prototype.toString.call(x) && 3 == x.length) {
                                var A = b(x[2]);
                                return new v({
                                    tag: x[0],
                                    explicit: x[1],
                                    obj: A
                                })
                            }
                            var I = {};
                            if (void 0 !== x.explicit && (I.explicit = x.explicit),
                            void 0 !== x.tag && (I.tag = x.tag),
                            void 0 === x.obj)
                                throw "obj shall be specified for 'tag'.";
                            return I.obj = b(x.obj),
                                new v(I)
                        }
                    }
                    ,
                    this.jsonToASN1HEX = function (t) {
                        return this.newObject(t).getEncodedHex()
                    }
            }
            ,
            et.asn1.ASN1Util.oidHexToInt = function (t) {
                for (var e = "", r = parseInt(t.substr(0, 2), 16), n = (e = Math.floor(r / 40) + "." + r % 40,
                    ""), i = 2; i < t.length; i += 2) {
                    var o = ("00000000" + parseInt(t.substr(i, 2), 16).toString(2)).slice(-8);
                    if (n += o.substr(1, 7),
                    "0" == o.substr(0, 1))
                        e = e + "." + new I(n, 2).toString(10),
                            n = ""
                }
                return e
            }
            ,
            et.asn1.ASN1Util.oidIntToHex = function (t) {
                var e = function (t) {
                    var e = t.toString(16);
                    return 1 == e.length && (e = "0" + e),
                        e
                }
                    , r = function (t) {
                    var r = ""
                        , n = new I(t, 10).toString(2)
                        , i = 7 - n.length % 7;
                    7 == i && (i = 0);
                    for (var o = "", s = 0; s < i; s++)
                        o += "0";
                    n = o + n;
                    for (s = 0; s < n.length - 1; s += 7) {
                        var u = n.substr(s, 7);
                        s != n.length - 7 && (u = "1" + u),
                            r += e(parseInt(u, 2))
                    }
                    return r
                };
                if (!t.match(/^[0-9.]+$/))
                    throw "malformed oid string: " + t;
                var n = ""
                    , i = t.split(".")
                    , o = 40 * parseInt(i[0]) + parseInt(i[1]);
                n += e(o),
                    i.splice(0, 2);
                for (var s = 0; s < i.length; s++)
                    n += r(i[s]);
                return n
            }
            ,
            et.asn1.ASN1Object = function () {
                this.getLengthHexFromValue = function () {
                    if ("undefined" == typeof this.hV || null == this.hV)
                        throw "this.hV is null or undefined.";
                    if (this.hV.length % 2 == 1)
                        throw "value hex must be even length: n=" + "".length + ",v=" + this.hV;
                    var t = this.hV.length / 2
                        , e = t.toString(16);
                    if (e.length % 2 == 1 && (e = "0" + e),
                    t < 128)
                        return e;
                    var r = e.length / 2;
                    if (r > 15)
                        throw "ASN.1 length too long to represent by 8x: n = " + t.toString(16);
                    return (128 + r).toString(16) + e
                }
                    ,
                    this.getEncodedHex = function () {
                        return (null == this.hTLV || this.isModified) && (this.hV = this.getFreshValueHex(),
                            this.hL = this.getLengthHexFromValue(),
                            this.hTLV = this.hT + this.hL + this.hV,
                            this.isModified = !1),
                            this.hTLV
                    }
                    ,
                    this.getValueHex = function () {
                        return this.getEncodedHex(),
                            this.hV
                    }
                    ,
                    this.getFreshValueHex = function () {
                        return ""
                    }
            }
            ,
            et.asn1.DERAbstractString = function (t) {
                et.asn1.DERAbstractString.superclass.constructor.call(this);
                this.getString = function () {
                    return this.s
                }
                    ,
                    this.setString = function (t) {
                        this.hTLV = null,
                            this.isModified = !0,
                            this.s = t,
                            this.hV = stohex(this.s)
                    }
                    ,
                    this.setStringHex = function (t) {
                        this.hTLV = null,
                            this.isModified = !0,
                            this.s = null,
                            this.hV = t
                    }
                    ,
                    this.getFreshValueHex = function () {
                        return this.hV
                    }
                    ,
                "undefined" != typeof t && ("string" == typeof t ? this.setString(t) : "undefined" != typeof t.str ? this.setString(t.str) : "undefined" != typeof t.hex && this.setStringHex(t.hex))
            }
            ,
            tt.lang.extend(et.asn1.DERAbstractString, et.asn1.ASN1Object),
            et.asn1.DERAbstractTime = function (t) {
                et.asn1.DERAbstractTime.superclass.constructor.call(this);
                this.localDateToUTC = function (t) {
                    return utc = t.getTime() + 6e4 * t.getTimezoneOffset(),
                        new Date(utc)
                }
                    ,
                    this.formatDate = function (t, e, r) {
                        var n = this.zeroPadding
                            , i = this.localDateToUTC(t)
                            , o = String(i.getFullYear());
                        "utc" == e && (o = o.substr(2, 2));
                        var s = o + n(String(i.getMonth() + 1), 2) + n(String(i.getDate()), 2) + n(String(i.getHours()), 2) + n(String(i.getMinutes()), 2) + n(String(i.getSeconds()), 2);
                        if (!0 === r) {
                            var u = i.getMilliseconds();
                            if (0 != u) {
                                var a = n(String(u), 3);
                                s = s + "." + (a = a.replace(/[0]+$/, ""))
                            }
                        }
                        return s + "Z"
                    }
                    ,
                    this.zeroPadding = function (t, e) {
                        return t.length >= e ? t : new Array(e - t.length + 1).join("0") + t
                    }
                    ,
                    this.getString = function () {
                        return this.s
                    }
                    ,
                    this.setString = function (t) {
                        this.hTLV = null,
                            this.isModified = !0,
                            this.s = t,
                            this.hV = stohex(t)
                    }
                    ,
                    this.setByDateValue = function (t, e, r, n, i, o) {
                        var s = new Date(Date.UTC(t, e - 1, r, n, i, o, 0));
                        this.setByDate(s)
                    }
                    ,
                    this.getFreshValueHex = function () {
                        return this.hV
                    }
            }
            ,
            tt.lang.extend(et.asn1.DERAbstractTime, et.asn1.ASN1Object),
            et.asn1.DERAbstractStructured = function (t) {
                et.asn1.DERAbstractString.superclass.constructor.call(this);
                this.setByASN1ObjectArray = function (t) {
                    this.hTLV = null,
                        this.isModified = !0,
                        this.asn1Array = t
                }
                    ,
                    this.appendASN1Object = function (t) {
                        this.hTLV = null,
                            this.isModified = !0,
                            this.asn1Array.push(t)
                    }
                    ,
                    this.asn1Array = new Array,
                "undefined" != typeof t && "undefined" != typeof t.array && (this.asn1Array = t.array)
            }
            ,
            tt.lang.extend(et.asn1.DERAbstractStructured, et.asn1.ASN1Object),
            et.asn1.DERBoolean = function () {
                et.asn1.DERBoolean.superclass.constructor.call(this),
                    this.hT = "01",
                    this.hTLV = "0101ff"
            }
            ,
            tt.lang.extend(et.asn1.DERBoolean, et.asn1.ASN1Object),
            et.asn1.DERInteger = function (t) {
                et.asn1.DERInteger.superclass.constructor.call(this),
                    this.hT = "02",
                    this.setByBigInteger = function (t) {
                        this.hTLV = null,
                            this.isModified = !0,
                            this.hV = et.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
                    }
                    ,
                    this.setByInteger = function (t) {
                        var e = new I(String(t), 10);
                        this.setByBigInteger(e)
                    }
                    ,
                    this.setValueHex = function (t) {
                        this.hV = t
                    }
                    ,
                    this.getFreshValueHex = function () {
                        return this.hV
                    }
                    ,
                "undefined" != typeof t && ("undefined" != typeof t.bigint ? this.setByBigInteger(t.bigint) : "undefined" != typeof t.int ? this.setByInteger(t.int) : "number" == typeof t ? this.setByInteger(t) : "undefined" != typeof t.hex && this.setValueHex(t.hex))
            }
            ,
            tt.lang.extend(et.asn1.DERInteger, et.asn1.ASN1Object),
            et.asn1.DERBitString = function (t) {
                if (void 0 !== t && "undefined" !== typeof t.obj) {
                    var e = et.asn1.ASN1Util.newObject(t.obj);
                    t.hex = "00" + e.getEncodedHex()
                }
                et.asn1.DERBitString.superclass.constructor.call(this),
                    this.hT = "03",
                    this.setHexValueIncludingUnusedBits = function (t) {
                        this.hTLV = null,
                            this.isModified = !0,
                            this.hV = t
                    }
                    ,
                    this.setUnusedBitsAndHexValue = function (t, e) {
                        if (t < 0 || 7 < t)
                            throw "unused bits shall be from 0 to 7: u = " + t;
                        var r = "0" + t;
                        this.hTLV = null,
                            this.isModified = !0,
                            this.hV = r + e
                    }
                    ,
                    this.setByBinaryString = function (t) {
                        var e = 8 - (t = t.replace(/0+$/, "")).length % 8;
                        8 == e && (e = 0);
                        for (var r = 0; r <= e; r++)
                            t += "0";
                        var n = "";
                        for (r = 0; r < t.length - 1; r += 8) {
                            var i = t.substr(r, 8)
                                , o = parseInt(i, 2).toString(16);
                            1 == o.length && (o = "0" + o),
                                n += o
                        }
                        this.hTLV = null,
                            this.isModified = !0,
                            this.hV = "0" + e + n
                    }
                    ,
                    this.setByBooleanArray = function (t) {
                        for (var e = "", r = 0; r < t.length; r++)
                            1 == t[r] ? e += "1" : e += "0";
                        this.setByBinaryString(e)
                    }
                    ,
                    this.newFalseArray = function (t) {
                        for (var e = new Array(t), r = 0; r < t; r++)
                            e[r] = !1;
                        return e
                    }
                    ,
                    this.getFreshValueHex = function () {
                        return this.hV
                    }
                    ,
                "undefined" != typeof t && ("string" == typeof t && t.toLowerCase().match(/^[0-9a-f]+$/) ? this.setHexValueIncludingUnusedBits(t) : "undefined" != typeof t.hex ? this.setHexValueIncludingUnusedBits(t.hex) : "undefined" != typeof t.bin ? this.setByBinaryString(t.bin) : "undefined" != typeof t.array && this.setByBooleanArray(t.array))
            }
            ,
            tt.lang.extend(et.asn1.DERBitString, et.asn1.ASN1Object),
            et.asn1.DEROctetString = function (t) {
                if (void 0 !== t && "undefined" !== typeof t.obj) {
                    var e = et.asn1.ASN1Util.newObject(t.obj);
                    t.hex = e.getEncodedHex()
                }
                et.asn1.DEROctetString.superclass.constructor.call(this, t),
                    this.hT = "04"
            }
            ,
            tt.lang.extend(et.asn1.DEROctetString, et.asn1.DERAbstractString),
            et.asn1.DERNull = function () {
                et.asn1.DERNull.superclass.constructor.call(this),
                    this.hT = "05",
                    this.hTLV = "0500"
            }
            ,
            tt.lang.extend(et.asn1.DERNull, et.asn1.ASN1Object),
            et.asn1.DERObjectIdentifier = function (t) {
                var e = function (t) {
                    var e = t.toString(16);
                    return 1 == e.length && (e = "0" + e),
                        e
                }
                    , r = function (t) {
                    var r = ""
                        , n = new I(t, 10).toString(2)
                        , i = 7 - n.length % 7;
                    7 == i && (i = 0);
                    for (var o = "", s = 0; s < i; s++)
                        o += "0";
                    n = o + n;
                    for (s = 0; s < n.length - 1; s += 7) {
                        var u = n.substr(s, 7);
                        s != n.length - 7 && (u = "1" + u),
                            r += e(parseInt(u, 2))
                    }
                    return r
                };
                et.asn1.DERObjectIdentifier.superclass.constructor.call(this),
                    this.hT = "06",
                    this.setValueHex = function (t) {
                        this.hTLV = null,
                            this.isModified = !0,
                            this.s = null,
                            this.hV = t
                    }
                    ,
                    this.setValueOidString = function (t) {
                        if (!t.match(/^[0-9.]+$/))
                            throw "malformed oid string: " + t;
                        var n = ""
                            , i = t.split(".")
                            , o = 40 * parseInt(i[0]) + parseInt(i[1]);
                        n += e(o),
                            i.splice(0, 2);
                        for (var s = 0; s < i.length; s++)
                            n += r(i[s]);
                        this.hTLV = null,
                            this.isModified = !0,
                            this.s = null,
                            this.hV = n
                    }
                    ,
                    this.setValueName = function (t) {
                        var e = et.asn1.x509.OID.name2oid(t);
                        if ("" === e)
                            throw "DERObjectIdentifier oidName undefined: " + t;
                        this.setValueOidString(e)
                    }
                    ,
                    this.getFreshValueHex = function () {
                        return this.hV
                    }
                    ,
                void 0 !== t && ("string" === typeof t ? t.match(/^[0-2].[0-9.]+$/) ? this.setValueOidString(t) : this.setValueName(t) : void 0 !== t.oid ? this.setValueOidString(t.oid) : void 0 !== t.hex ? this.setValueHex(t.hex) : void 0 !== t.name && this.setValueName(t.name))
            }
            ,
            tt.lang.extend(et.asn1.DERObjectIdentifier, et.asn1.ASN1Object),
            et.asn1.DEREnumerated = function (t) {
                et.asn1.DEREnumerated.superclass.constructor.call(this),
                    this.hT = "0a",
                    this.setByBigInteger = function (t) {
                        this.hTLV = null,
                            this.isModified = !0,
                            this.hV = et.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
                    }
                    ,
                    this.setByInteger = function (t) {
                        var e = new I(String(t), 10);
                        this.setByBigInteger(e)
                    }
                    ,
                    this.setValueHex = function (t) {
                        this.hV = t
                    }
                    ,
                    this.getFreshValueHex = function () {
                        return this.hV
                    }
                    ,
                "undefined" != typeof t && ("undefined" != typeof t.int ? this.setByInteger(t.int) : "number" == typeof t ? this.setByInteger(t) : "undefined" != typeof t.hex && this.setValueHex(t.hex))
            }
            ,
            tt.lang.extend(et.asn1.DEREnumerated, et.asn1.ASN1Object),
            et.asn1.DERUTF8String = function (t) {
                et.asn1.DERUTF8String.superclass.constructor.call(this, t),
                    this.hT = "0c"
            }
            ,
            tt.lang.extend(et.asn1.DERUTF8String, et.asn1.DERAbstractString),
            et.asn1.DERNumericString = function (t) {
                et.asn1.DERNumericString.superclass.constructor.call(this, t),
                    this.hT = "12"
            }
            ,
            tt.lang.extend(et.asn1.DERNumericString, et.asn1.DERAbstractString),
            et.asn1.DERPrintableString = function (t) {
                et.asn1.DERPrintableString.superclass.constructor.call(this, t),
                    this.hT = "13"
            }
            ,
            tt.lang.extend(et.asn1.DERPrintableString, et.asn1.DERAbstractString),
            et.asn1.DERTeletexString = function (t) {
                et.asn1.DERTeletexString.superclass.constructor.call(this, t),
                    this.hT = "14"
            }
            ,
            tt.lang.extend(et.asn1.DERTeletexString, et.asn1.DERAbstractString),
            et.asn1.DERIA5String = function (t) {
                et.asn1.DERIA5String.superclass.constructor.call(this, t),
                    this.hT = "16"
            }
            ,
            tt.lang.extend(et.asn1.DERIA5String, et.asn1.DERAbstractString),
            et.asn1.DERUTCTime = function (t) {
                et.asn1.DERUTCTime.superclass.constructor.call(this, t),
                    this.hT = "17",
                    this.setByDate = function (t) {
                        this.hTLV = null,
                            this.isModified = !0,
                            this.date = t,
                            this.s = this.formatDate(this.date, "utc"),
                            this.hV = stohex(this.s)
                    }
                    ,
                    this.getFreshValueHex = function () {
                        return "undefined" == typeof this.date && "undefined" == typeof this.s && (this.date = new Date,
                            this.s = this.formatDate(this.date, "utc"),
                            this.hV = stohex(this.s)),
                            this.hV
                    }
                    ,
                void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : "string" == typeof t && t.match(/^[0-9]{12}Z$/) ? this.setString(t) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date))
            }
            ,
            tt.lang.extend(et.asn1.DERUTCTime, et.asn1.DERAbstractTime),
            et.asn1.DERGeneralizedTime = function (t) {
                et.asn1.DERGeneralizedTime.superclass.constructor.call(this, t),
                    this.hT = "18",
                    this.withMillis = !1,
                    this.setByDate = function (t) {
                        this.hTLV = null,
                            this.isModified = !0,
                            this.date = t,
                            this.s = this.formatDate(this.date, "gen", this.withMillis),
                            this.hV = stohex(this.s)
                    }
                    ,
                    this.getFreshValueHex = function () {
                        return void 0 === this.date && void 0 === this.s && (this.date = new Date,
                            this.s = this.formatDate(this.date, "gen", this.withMillis),
                            this.hV = stohex(this.s)),
                            this.hV
                    }
                    ,
                void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : "string" == typeof t && t.match(/^[0-9]{14}Z$/) ? this.setString(t) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date),
                !0 === t.millis && (this.withMillis = !0))
            }
            ,
            tt.lang.extend(et.asn1.DERGeneralizedTime, et.asn1.DERAbstractTime),
            et.asn1.DERSequence = function (t) {
                et.asn1.DERSequence.superclass.constructor.call(this, t),
                    this.hT = "30",
                    this.getFreshValueHex = function () {
                        for (var t = "", e = 0; e < this.asn1Array.length; e++) {
                            t += this.asn1Array[e].getEncodedHex()
                        }
                        return this.hV = t,
                            this.hV
                    }
            }
            ,
            tt.lang.extend(et.asn1.DERSequence, et.asn1.DERAbstractStructured),
            et.asn1.DERSet = function (t) {
                et.asn1.DERSet.superclass.constructor.call(this, t),
                    this.hT = "31",
                    this.sortFlag = !0,
                    this.getFreshValueHex = function () {
                        for (var t = new Array, e = 0; e < this.asn1Array.length; e++) {
                            var r = this.asn1Array[e];
                            t.push(r.getEncodedHex())
                        }
                        return 1 == this.sortFlag && t.sort(),
                            this.hV = t.join(""),
                            this.hV
                    }
                    ,
                "undefined" != typeof t && "undefined" != typeof t.sortflag && 0 == t.sortflag && (this.sortFlag = !1)
            }
            ,
            tt.lang.extend(et.asn1.DERSet, et.asn1.DERAbstractStructured),
            et.asn1.DERTaggedObject = function (t) {
                et.asn1.DERTaggedObject.superclass.constructor.call(this),
                    this.hT = "a0",
                    this.hV = "",
                    this.isExplicit = !0,
                    this.asn1Object = null,
                    this.setASN1Object = function (t, e, r) {
                        this.hT = e,
                            this.isExplicit = t,
                            this.asn1Object = r,
                            this.isExplicit ? (this.hV = this.asn1Object.getEncodedHex(),
                                this.hTLV = null,
                                this.isModified = !0) : (this.hV = null,
                                this.hTLV = r.getEncodedHex(),
                                this.hTLV = this.hTLV.replace(/^../, e),
                                this.isModified = !1)
                    }
                    ,
                    this.getFreshValueHex = function () {
                        return this.hV
                    }
                    ,
                "undefined" != typeof t && ("undefined" != typeof t.tag && (this.hT = t.tag),
                "undefined" != typeof t.explicit && (this.isExplicit = t.explicit),
                "undefined" != typeof t.obj && (this.asn1Object = t.obj,
                    this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)))
            }
            ,
            tt.lang.extend(et.asn1.DERTaggedObject, et.asn1.ASN1Object);
        var rt = function () {
            var t = function (e, r) {
                return t = Object.setPrototypeOf || {
                        __proto__: []
                    } instanceof Array && function (t, e) {
                        t.__proto__ = e
                    }
                    || function (t, e) {
                        for (var r in e)
                            Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r])
                    }
                    ,
                    t(e, r)
            };
            return function (e, r) {
                if ("function" !== typeof r && null !== r)
                    throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");

                function n() {
                    this.constructor = e
                }

                t(e, r),
                    e.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype,
                        new n)
            }
        }()
            , nt = function (t) {
            function e(r) {
                var n = t.call(this) || this;
                return r && ("string" === typeof r ? n.parseKey(r) : (e.hasPrivateKeyProperty(r) || e.hasPublicKeyProperty(r)) && n.parsePropertiesFrom(r)),
                    n
            }

            return rt(e, t),
                e.prototype.parseKey = function (t) {
                    try {
                        var e = 0
                            , r = 0
                            , n = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/.test(t) ? g(t) : y.unarmor(t)
                            , i = D.decode(n);
                        if (3 === i.sub.length && (i = i.sub[2].sub[0]),
                        9 === i.sub.length) {
                            e = i.sub[1].getHexStringValue(),
                                this.n = L(e, 16),
                                r = i.sub[2].getHexStringValue(),
                                this.e = parseInt(r, 16);
                            var o = i.sub[3].getHexStringValue();
                            this.d = L(o, 16);
                            var s = i.sub[4].getHexStringValue();
                            this.p = L(s, 16);
                            var u = i.sub[5].getHexStringValue();
                            this.q = L(u, 16);
                            var a = i.sub[6].getHexStringValue();
                            this.dmp1 = L(a, 16);
                            var h = i.sub[7].getHexStringValue();
                            this.dmq1 = L(h, 16);
                            var f = i.sub[8].getHexStringValue();
                            this.coeff = L(f, 16)
                        } else {
                            if (2 !== i.sub.length)
                                return !1;
                            var c = i.sub[1].sub[0];
                            e = c.sub[0].getHexStringValue(),
                                this.n = L(e, 16),
                                r = c.sub[1].getHexStringValue(),
                                this.e = parseInt(r, 16)
                        }
                        return !0
                    } catch (l) {
                        return !1
                    }
                }
                ,
                e.prototype.getPrivateBaseKey = function () {
                    var t = {
                        array: [new et.asn1.DERInteger({
                            int: 0
                        }), new et.asn1.DERInteger({
                            bigint: this.n
                        }), new et.asn1.DERInteger({
                            int: this.e
                        }), new et.asn1.DERInteger({
                            bigint: this.d
                        }), new et.asn1.DERInteger({
                            bigint: this.p
                        }), new et.asn1.DERInteger({
                            bigint: this.q
                        }), new et.asn1.DERInteger({
                            bigint: this.dmp1
                        }), new et.asn1.DERInteger({
                            bigint: this.dmq1
                        }), new et.asn1.DERInteger({
                            bigint: this.coeff
                        })]
                    };
                    return new et.asn1.DERSequence(t).getEncodedHex()
                }
                ,
                e.prototype.getPrivateBaseKeyB64 = function () {
                    return l(this.getPrivateBaseKey())
                }
                ,
                e.prototype.getPublicBaseKey = function () {
                    var t = new et.asn1.DERSequence({
                        array: [new et.asn1.DERObjectIdentifier({
                            oid: "1.2.840.113549.1.1.1"
                        }), new et.asn1.DERNull]
                    })
                        , e = new et.asn1.DERSequence({
                        array: [new et.asn1.DERInteger({
                            bigint: this.n
                        }), new et.asn1.DERInteger({
                            int: this.e
                        })]
                    })
                        , r = new et.asn1.DERBitString({
                        hex: "00" + e.getEncodedHex()
                    });
                    return new et.asn1.DERSequence({
                        array: [t, r]
                    }).getEncodedHex()
                }
                ,
                e.prototype.getPublicBaseKeyB64 = function () {
                    return l(this.getPublicBaseKey())
                }
                ,
                e.wordwrap = function (t, e) {
                    if (!t)
                        return t;
                    var r = "(.{1," + (e = e || 64) + "})( +|$\n?)|(.{1," + e + "})";
                    return t.match(RegExp(r, "g")).join("\n")
                }
                ,
                e.prototype.getPrivateKey = function () {
                    var t = "-----BEGIN RSA PRIVATE KEY-----\n";
                    return t += e.wordwrap(this.getPrivateBaseKeyB64()) + "\n",
                        t += "-----END RSA PRIVATE KEY-----"
                }
                ,
                e.prototype.getPublicKey = function () {
                    var t = "-----BEGIN PUBLIC KEY-----\n";
                    return t += e.wordwrap(this.getPublicBaseKeyB64()) + "\n",
                        t += "-----END PUBLIC KEY-----"
                }
                ,
                e.hasPublicKeyProperty = function (t) {
                    return (t = t || {}).hasOwnProperty("n") && t.hasOwnProperty("e")
                }
                ,
                e.hasPrivateKeyProperty = function (t) {
                    return (t = t || {}).hasOwnProperty("n") && t.hasOwnProperty("e") && t.hasOwnProperty("d") && t.hasOwnProperty("p") && t.hasOwnProperty("q") && t.hasOwnProperty("dmp1") && t.hasOwnProperty("dmq1") && t.hasOwnProperty("coeff")
                }
                ,
                e.prototype.parsePropertiesFrom = function (t) {
                    this.n = t.n,
                        this.e = t.e,
                    t.hasOwnProperty("d") && (this.d = t.d,
                        this.p = t.p,
                        this.q = t.q,
                        this.dmp1 = t.dmp1,
                        this.dmq1 = t.dmq1,
                        this.coeff = t.coeff)
                }
                ,
                e
        }(X)
            , it = r(1600)
            , ot = function () {
            function t(t) {
                void 0 === t && (t = {}),
                    t = t || {},
                    this.default_key_size = t.default_key_size ? parseInt(t.default_key_size, 10) : 1024,
                    this.default_public_exponent = t.default_public_exponent || "010001",
                    this.log = t.log || !1,
                    this.key = null
            }

            return t.prototype.setKey = function (t) {
                this.log && this.key && console.warn("A key was already set, overriding existing."),
                    this.key = new nt(t)
            }
                ,
                t.prototype.setPrivateKey = function (t) {
                    this.setKey(t)
                }
                ,
                t.prototype.setPublicKey = function (t) {
                    this.setKey(t)
                }
                ,
                t.prototype.decrypt = function (t) {
                    try {
                        return this.getKey().decrypt(p(t))
                    } catch (e) {
                        return !1
                    }
                }
                ,
                t.prototype.encrypt = function (t) {
                    try {
                        return l(this.getKey().encrypt(t))
                    } catch (e) {
                        return !1
                    }
                }
                ,
                t.prototype.sign = function (t, e, r) {
                    try {
                        return l(this.getKey().sign(t, e, r))
                    } catch (n) {
                        return !1
                    }
                }
                ,
                t.prototype.verify = function (t, e, r) {
                    try {
                        return this.getKey().verify(t, p(e), r)
                    } catch (n) {
                        return !1
                    }
                }
                ,
                t.prototype.getKey = function (t) {
                    if (!this.key) {
                        if (this.key = new nt,
                        t && "[object Function]" === {}.toString.call(t))
                            return void this.key.generateAsync(this.default_key_size, this.default_public_exponent, t);
                        this.key.generate(this.default_key_size, this.default_public_exponent)
                    }
                    return this.key
                }
                ,
                t.prototype.getPrivateKey = function () {
                    return this.getKey().getPrivateKey()
                }
                ,
                t.prototype.getPrivateKeyB64 = function () {
                    return this.getKey().getPrivateBaseKeyB64()
                }
                ,
                t.prototype.getPublicKey = function () {
                    return this.getKey().getPublicKey()
                }
                ,
                t.prototype.getPublicKeyB64 = function () {
                    return this.getKey().getPublicBaseKeyB64()
                }
                ,
                t.version = it.version,
                t
        }();
        e.a = ot
    },
        '1600': function(t) {
        t.exports = JSON.parse('{"version":"3.2.1"}')
    }

});

o = bc('1394')

cc = function (e, n) {
    var t = new o.a;
    return t.setPublicKey(n.publicKey),
        t.encrypt(e)
}

res = cc("asdasd", {
    "publicKey": "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDJpaLPONg3qWfi2kdwauqOT3L7AEK6lrMZqKYZv0ikWPZtzTqnVLMeolsE7x3Sc4UxS6ews+WS0ijwIEU8GAbhr2aJh0F+o6bpYQgWosHBts4lMW/IdtKg45DSGgBWg8gWDTK7K+T+zWfTjEQGwEgNHsZ2NbQBtTEZ35CDWUP7iQIDAQAB",
    "version": "1"
})
console.log(res)
```





### 四.教学案例3

#### 1.逆向目标

- 地址:https://fse.agilestudio.cn/search?keyword=%E7%81%AB%E8%BD%A6%E5%91%BC%E5%95%B8%E8%80%8C%E8%BF%87
- 逆向参数:X-Signature  请求头数据(主要是扣webpack打包)

#### 2. 参数定位

- `xhr`定位数据

- `xhr`定位的数据有时候里加密的位置会非常远,尤其是遇见异步加载的方法的时候会更加的难找,遇见异步的时候我们可以用跳过函数执行的方法,先快速的把整个异步方法都过一边,过的过程中看有没有生成我们想要的数据,先粗在细的查找方法对定位会更加有帮助

- 关键字`X-Signature`定位

![](./images/045.png)

#### 3.逆向代码分析

- 调用了`_`函数`e.params`是查询字符串的参数

![](./images/046.png)

- 赋值了一个时间戳,通过`Object(c["a"])`对数组键进行处理
- c是一个加载器进行赋值,需要将加载器扣下来
- 要是加载的模块比较多的话建议全扣



#### 4.逆向结果

- JavaScript代码

```javascript
var c = xxx('b85c')
var crypto = require('crypto-js')
d = function (e) {
    e._ts = (new Date).getTime() - 9999;
    var t, n = Object.keys(e), i = "", o = Object(c["a"])(n.sort());
    try {
        for (o.s(); !(t = o.n()).done;) {
            var a = t.value;
            void 0 !== e[a] && null !== e[a] && (i += "".concat(a, "=").concat(e[a], ","))
        }
    } catch (r) {
        o.e(r)
    } finally {
        o.f()
    };
    return {
        'sign':crypto.MD5(i).toString(),
        'time': e._ts
    }
}

console.log(d({
    "keyword": "火车呼啸而过)",
    "page": 1,
    "limit": 12,
    "_platform": "web",
    "_versioin": "0.2.5"
}))
```

- python 代码

```python
import requests
import execjs


class SouZen():

    def __init__(self):
        self.params = {
            "keyword": "火车呼啸而过",
            "page": "2",
            "limit": "12",
            "_platform": "web",
            "_versioin": "0.2.5",
        }
        self.headers = {
            "Origin": "https://fse.agilestudio.cn",
            "Referer": "https://fse.agilestudio.cn/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
        }
        self.url = "https://fse-api.agilestudio.cn/api/search"

    def get_data(self):
        js = execjs.compile(open('demo.js', encoding='utf-8').read())
        res = js.call('d', self.params)
        self.params['_ts'] = res['time']
        self.headers["X-Signature"] = res['sign']
        response = requests.get(self.url, headers=self.headers, params=self.params)
        print(response.json())

    def parse_data(self):
        pass

    def save_data(self):
        pass


if __name__ == '__main__':
    sz = SouZen()
    sz.get_data()

```

