import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as a,a as i}from"./app-CFFpmDzR.js";const l="/assets/118-BOAKt0SS.png",p="/assets/119-BC2cM2Ol.png",e="/assets/120-CObmIAlA.png",t="/assets/121-BXwTafiQ.png",d="/assets/122-C_ypXq8t.png",r={},h=i('<h2 id="akamai-系列产品" tabindex="-1"><a class="header-anchor" href="#akamai-系列产品"><span>AKAMAI 系列产品</span></a></h2><p><strong>学习目标:</strong></p><ol><li>了解 akamai 执行过程</li><li>熟悉 akamai 解析思路</li><li>掌握 tls 指纹反爬原理</li></ol><h3 id="一-简介" tabindex="-1"><a class="header-anchor" href="#一-简介"><span>一.简介</span></a></h3><h4 id="_1-akamai" tabindex="-1"><a class="header-anchor" href="#_1-akamai"><span>1. Akamai</span></a></h4><ul><li>Akamai 是一家提供内容传递网络（CDN）和云服务的公司。CDN 通过将内容分发到全球各地的服务器，以减少网络延迟并提高用户访问网站的速度和性能。在其服务中，Akamai 使用一种称为 Akamai Cookie 加密的技术来增强安全性和保护用户的隐私。</li><li>Akamai 常见的时 1.75 和 2 的版本,传递的数据是明文的数据就是 1.75,2 版本的数据是进行编码的</li></ul><h4 id="_2-执行流程" tabindex="-1"><a class="header-anchor" href="#_2-执行流程"><span>2. 执行流程</span></a></h4><p>Akamai 也是对 cookie 进加密处理的过程,但是和瑞数有区别,Akamai 请求过程:</p><ul><li>请求网页地址,网页地址会返回一个外链的 js 代码</li></ul><figure><img src="'+l+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>对外链地址发送 get 请求,获取到对应的 js 代码</li><li>在对当前外链 js 地址发送 post 请求,带上参数<code>sensor_data</code></li><li>带上参数请求之后,会响应一个正确的<code>_abck</code></li></ul><figure><img src="'+p+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>逆向参数时需要注意 Akamai,每周会有一小改,一个月会大改一次</li><li>最重要的就是第二次的 post 请求,逆向的参数是<code>sensor_data</code></li></ul><h3 id="二-逆向分析" tabindex="-1"><a class="header-anchor" href="#二-逆向分析"><span>二.逆向分析</span></a></h3><h4 id="_1-逆向目标" tabindex="-1"><a class="header-anchor" href="#_1-逆向目标"><span>1. 逆向目标</span></a></h4><ul><li><p>网址:https://www.dhl.com/cn-zh/home/tracking/tracking-ecommerce.html?submit=1&amp;tracking-id=1232343</p></li><li><p>逆向目标:<code>sensor_data</code></p></li></ul><h4 id="_2-逆向分析" tabindex="-1"><a class="header-anchor" href="#_2-逆向分析"><span>2.逆向分析</span></a></h4><ul><li>找到数据生成的位置,可以直接通过 xhr,或者通过启动器来定位</li></ul><figure><img src="'+e+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>断点之后可以看到数据是 bwt 生成数据的,是由 RST 来的数据</li></ul><figure><img src="'+t+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>可以找一下 RST 的生成位置</li></ul><figure><img src="'+d+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>把他需要的代码都拿下来执行生成代码</li></ul><h4 id="_3-逆向结果" tabindex="-1"><a class="header-anchor" href="#_3-逆向结果"><span>3.逆向结果</span></a></h4><ul><li>JavaScript 代码</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>c6T = [300000, 4095, 1, 60, 40, 20, 0, 5, 16, 1000, 4, 21, 22, 30, 31, 8888888, 7777777, 8, 126, 47, 2, 10, 0.8, 0.7, 0.98, 0.4, 0.9, 0.95, 0.1, 0.025, 0.08, 0.075, 0.22, 255, 6, 4294967296, 999999, 13, 11, 24, 32, 3600000, 65535, 65793, 4294967295, 8388607, 4282663, 39, 3, 4064256, 9]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function B5T() {</span></span>
<span class="line"><span>    return VVT = Date.now &amp;&amp; Date.now(), VVT;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>var r1T = function () {</span></span>
<span class="line"><span>    var C4T = &quot;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36&quot;;</span></span>
<span class="line"><span>    var P4T = &quot;8108&quot;;</span></span>
<span class="line"><span>    var Q4T = 850845805802.5;</span></span>
<span class="line"><span>    var f4T = -1;</span></span>
<span class="line"><span>    var hzT = -1;</span></span>
<span class="line"><span>    var TzT = -1;</span></span>
<span class="line"><span>    var dzT = -1;</span></span>
<span class="line"><span>    var JzT = -1;</span></span>
<span class="line"><span>    var KzT = -1;</span></span>
<span class="line"><span>    var XzT = -1;</span></span>
<span class="line"><span>    var HzT = -1;</span></span>
<span class="line"><span>    HzT = 0;</span></span>
<span class="line"><span>    f4T = 1920;</span></span>
<span class="line"><span>    hzT = 1040;</span></span>
<span class="line"><span>    TzT = 1920;</span></span>
<span class="line"><span>    dzT = 1080;</span></span>
<span class="line"><span>    JzT = 150;</span></span>
<span class="line"><span>    KzT = 1920;</span></span>
<span class="line"><span>    XzT = 1920;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    NzT = 41869,</span></span>
<span class="line"><span>        FXT = 0;</span></span>
<span class="line"><span>    var wzT = Math.random();</span></span>
<span class="line"><span>    var LzT = parseInt(1000 * wzT / 2, 10);</span></span>
<span class="line"><span>    var nzT = (&#39;&#39;).concat(wzT);</span></span>
<span class="line"><span>    nzT = Mn(nzT.slice(0, 11), LzT);</span></span>
<span class="line"><span>    var tzT = [</span></span>
<span class="line"><span>        &quot;20030107&quot;,</span></span>
<span class="line"><span>        &quot;zh-CN&quot;,</span></span>
<span class="line"><span>        &quot;Gecko&quot;,</span></span>
<span class="line"><span>        5</span></span>
<span class="line"><span>    ];</span></span>
<span class="line"><span>    var DzT = tzT[0];</span></span>
<span class="line"><span>    var EzT = tzT[1];</span></span>
<span class="line"><span>    var szT = tzT[2];</span></span>
<span class="line"><span>    var czT = tzT[3];</span></span>
<span class="line"><span>    var jzT = 0;</span></span>
<span class="line"><span>    var FzT = 0;</span></span>
<span class="line"><span>    var IzT = 0;</span></span>
<span class="line"><span>    var lzT;</span></span>
<span class="line"><span>    return lzT = ((((((((((((((((((((((((&#39;&#39;).concat(C4T, &#39;,uaend,&#39;)).concat(function gzT() {</span></span>
<span class="line"><span>        var mzT;</span></span>
<span class="line"><span>        var BzT;</span></span>
<span class="line"><span>        var kzT = 1;</span></span>
<span class="line"><span>        var CzT = 1;</span></span>
<span class="line"><span>        var PzT = 0;</span></span>
<span class="line"><span>        var QzT = 0;</span></span>
<span class="line"><span>        var fzT = 1;</span></span>
<span class="line"><span>        var h3T = 1;</span></span>
<span class="line"><span>        var T3T = 1;</span></span>
<span class="line"><span>        var d3T = 0;</span></span>
<span class="line"><span>        var J3T = 1;</span></span>
<span class="line"><span>        var K3T = 1;</span></span>
<span class="line"><span>        var X3T = 0;</span></span>
<span class="line"><span>        var H3T = 1;</span></span>
<span class="line"><span>        mzT = 1;</span></span>
<span class="line"><span>        BzT = 1;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        var V3T;</span></span>
<span class="line"><span>        return V3T = Mn(Mn(Mn(Mn(Mn(Mn(Mn(Mn(Mn(Mn(Mn(Mn(Mn(kzT, BXT(CzT, 1)), BXT(PzT, 2)), BXT(QzT, c6T[48])), BXT(fzT, 4)), BXT(h3T, 5)), BXT(T3T, c6T[34])), BXT(d3T, 7)), BXT(mzT, 8)), BXT(BzT, 9)), BXT(J3T, 10)), BXT(K3T, 11)), BXT(X3T, 12)), BXT(H3T, 13)),</span></span>
<span class="line"><span>            V3T;</span></span>
<span class="line"><span>    }(), &#39;,&#39;)).concat(DzT, &#39;,&#39;)).concat(EzT, &#39;,&#39;)).concat(szT, &#39;,&#39;)).concat(czT, &#39;,&#39;)).concat(jzT, &#39;,&#39;)).concat(FzT, &#39;,&#39;)).concat(IzT, &#39;,&#39;)).concat(NzT, &#39;,&#39;)).concat(0, &#39;,&#39;)).concat(f4T, &#39;,&#39;)).concat(hzT, &#39;,&#39;)).concat(TzT, &#39;,&#39;)).concat(dzT, &#39;,&#39;)).concat(KzT, &#39;,&#39;)).concat(JzT, &#39;,&#39;)).concat(XzT, &#39;,&#39;)).concat(function x3T() {</span></span>
<span class="line"><span>        var W3T = [</span></span>
<span class="line"><span>            &quot;,cpen:0&quot;,</span></span>
<span class="line"><span>            &quot;i1:0&quot;,</span></span>
<span class="line"><span>            &quot;dm:0&quot;,</span></span>
<span class="line"><span>            &quot;cwen:0&quot;,</span></span>
<span class="line"><span>            &quot;non:1&quot;,</span></span>
<span class="line"><span>            &quot;opc:0&quot;,</span></span>
<span class="line"><span>            &quot;fc:0&quot;,</span></span>
<span class="line"><span>            &quot;sc:0&quot;,</span></span>
<span class="line"><span>            &quot;wrc:1&quot;,</span></span>
<span class="line"><span>            &quot;isc:0&quot;,</span></span>
<span class="line"><span>            &quot;vib:1&quot;,</span></span>
<span class="line"><span>            &quot;bat:1&quot;,</span></span>
<span class="line"><span>            &quot;x11:0&quot;,</span></span>
<span class="line"><span>            &quot;x12:1&quot;</span></span>
<span class="line"><span>        ];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        var M3T;</span></span>
<span class="line"><span>        return M3T = W3T.join(&#39;,&#39;),</span></span>
<span class="line"><span>            M3T;</span></span>
<span class="line"><span>    }(), &#39;,&#39;)).concat(P4T, &#39;,&#39;)).concat(nzT, &#39;,&#39;)).concat(Q4T, &#39;,&#39;)).concat(0, &#39;,&#39;)).concat(HzT, &#39;#H,\\x01 &#39;),</span></span>
<span class="line"><span>        lzT;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function cST(bm_sz) {</span></span>
<span class="line"><span>    var YWT = bm_sz;</span></span>
<span class="line"><span>    var EWT = decodeURIComponent(YWT).split(&quot;~&quot;);</span></span>
<span class="line"><span>    var sWT = parseInt(EWT[2], 10), cWT = parseInt(EWT[3], 10);</span></span>
<span class="line"><span>    tWT = [sWT, cWT];</span></span>
<span class="line"><span>    return FWT = tWT</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>function ZST(Pz, xz) {</span></span>
<span class="line"><span>    var Lz = xz[0];</span></span>
<span class="line"><span>    var Vz = xz[1];</span></span>
<span class="line"><span>    var Rz = xz[2];</span></span>
<span class="line"><span>    (function sz() {</span></span>
<span class="line"><span>        fz = [];</span></span>
<span class="line"><span>        var Cj = 53;</span></span>
<span class="line"><span>        var Zj = &quot;case gC:&quot;;</span></span>
<span class="line"><span>        var pj = 1663;</span></span>
<span class="line"><span>        var Dj = 0;</span></span>
<span class="line"><span>        for (var Fj = Cj; Fj &lt; pj; ++Fj) {</span></span>
<span class="line"><span>            var Xj = &quot;function lz(Pz,xz){&#39;use strict&#39;;var Bz=lz;switch(Pz){case sC:{var Lz=xz[sr];var Vz=xz[gr];var Rz=xz[Nr];A6.push(Sz);(function sz(){A6.push(gz);if(Nz(typeof fz[h6],b6(h7.Lw(S6([]),Uz,xC,vj),[][[]]))){A6.pop();return;}function hj(wj){A6.push(Ij);var bj;return bj=Jj(typeof wj,h7.pw(Gj,BC))?h7.Nw(Tj,qj):b6(b6(h7.sw.apply(null,[LC,Aj]),wj),h7.gw(Hj,VC)),A6.pop(),bj;}var kj=h7[h7.Yw.call(null,Ej,rj,tj)].call(Bz);var Cj=kj[h7.fw(RC,Qj)](hj(mj[h6]),dj[h6]);var Zj=hj(Yj[h6]);var pj=kj[h7.fw(RC,Qj)](Zj,b6(Cj,cj[h6]));var Dj=h6;for(var Fj=Cj;Fj&lt;pj;++Fj){var Xj=kj[h7.Uw.call(null,Mj,zj)](Fj);if(Xj!=jj&amp;&amp;Xj!=qj&amp;&amp;Xj!=nj){Dj=(Dj&lt;&lt;Oj)-Dj+Xj;Dj=Dj|h6;}}fz[h6]=Dj?Dj:H6;h7[h7.Sw.call(null,Kj,SC)][h6]=b6(h6,H6);A6.pop();}());if(h7.q7[sr]&gt;sr){Wj(fz[sr]-lj[sr]);}var Pj;var xj;var Bj=S6(h6);var Lj=h7.Hb(Vj,Rj);var Sj=Rz?gj:sj;if(S6(Nj)&amp;&amp;(Nj=h7.Tb.apply(null,[fj,Uj,vn]),UM(Vz,h6)&amp;&amp;hn(Vz,wn)))for(Pj=h6;hn(Pj,wn);++Pj)if(Nz(Pj,Vz))for(xj=h6;M6(xj,In);++xj)Nj+=Pj[h7.Fw(bn,Jn)]();for(;;){for(Lj=h7.Hb.apply(null,[Vj,Rj]),Bj=S6(h6),Pj=h6;M6(Pj,b6(v7[h7.qb(Cc,gj)][h7.kb.call(null,Gn,An)](Hn(v7[h7.qb.apply(null,[Cc,gj])][h7.Eb(Aj,qj,Qc,zj)](),Sj)),Sj));++Pj){for(xj=h6;M6(xj,b6(v7[h7.qb.apply(null,[Cc,gj])][h7.kb(Gn,An)](Hn(v7[h7.qb.apply(null,[Cc,gj])][h7.Eb.apply(null,[S6(S6(h6)),Tn,Qc,zj])](),Sj)),Sj));++xj)Lj+=Nj[v7[h7.qb.call(null,Cc,gj)][h7.kb(Gn,An)](Hn(v7[h7.qb(Cc,gj)][h7.Eb.apply(null,[qn,S6(H6),Qc,zj])](),Nj[h7.Cw.apply(null,[mc,kn])]))];Lj+=h7.Hb.call(null,Vj,Rj);}for(Pj=h6;M6(Pj,Lz[h7.Cw.apply(null,[mc,kn])]);++Pj)if(Nz(En(H6),(Lz[Pj][h7.Fw.apply(null,[bn,Jn])]())[h7.fw(dc,Qj)](Lj))){Bj=S6(H6);break;}if(Bj){var rn;return rn=Lj,A6.pop(),rn;}}A6.pop();}break;case gC:{if(sr){throw Math.random();}}break;}}&quot;.charCodeAt(Fj);</span></span>
<span class="line"><span>            if (Xj != 10 &amp;&amp; Xj != 13 &amp;&amp; Xj != 32) {</span></span>
<span class="line"><span>                Dj = (Dj &lt;&lt; 5) - Dj + Xj;</span></span>
<span class="line"><span>                Dj = Dj | 0;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        fz[0] = Dj ? Dj : 1;</span></span>
<span class="line"><span>    }());</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    var Pj;</span></span>
<span class="line"><span>    var xj;</span></span>
<span class="line"><span>    var Bj = true;</span></span>
<span class="line"><span>    var Lj = &quot;,&quot;;</span></span>
<span class="line"><span>    var Sj = 3;</span></span>
<span class="line"><span>    Nj = &quot;&quot;</span></span>
<span class="line"><span>    if (!Nj &amp;&amp; (Nj = &quot;abcdefghijklmnopaqrstuvxyzABCDEFGHIJKLMNOPAQRSTUVXYZ!@#%&amp;-_=;:&lt;&gt;,~&quot;, (Vz &gt;= 0) &amp;&amp; Vz &lt;= 9)) for (Pj = 0; Pj &lt;= 9; ++Pj) if (Pj !== Vz) for (xj = 0; xj &lt; 20; ++xj) Nj += Pj.toString();</span></span>
<span class="line"><span>    for (; ;) {</span></span>
<span class="line"><span>        for (Lj = &quot;,&quot;, Bj = true, Pj = 0; Pj &lt; Math.floor(Math.random() * Sj) + Sj; ++Pj) {</span></span>
<span class="line"><span>            for (xj = 0; xj &lt; Math.floor(Math.random() * Sj) + Sj; ++xj) Lj += Nj[Math.floor(Math.random() * Nj.length)];</span></span>
<span class="line"><span>            Lj += &quot;,&quot;;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        for (Pj = 0; Pj &lt; Lz.length; ++Pj) if (-1 !== (Lz[Pj].toString()).indexOf(Lj)) {</span></span>
<span class="line"><span>            Bj = false;</span></span>
<span class="line"><span>            break;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        if (Bj) {</span></span>
<span class="line"><span>            return Lj</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function HY(sHA) {</span></span>
<span class="line"><span>    for (var CHA = 0, bHA = 0; bHA &lt; sHA.length; bHA++) {</span></span>
<span class="line"><span>        var tHA = sHA.charCodeAt(bHA);</span></span>
<span class="line"><span>        tHA &lt; 128 &amp;&amp; (CHA += tHA);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return CHA</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var ZY = function (Oc, pc) {</span></span>
<span class="line"><span>    return Oc &amp; pc;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>var zY = function (gET, mET) {</span></span>
<span class="line"><span>    return gET % mET;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>var r6T = function (O6T, p6T) {</span></span>
<span class="line"><span>    return O6T &gt;&gt; p6T;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var zn = function (Vn, An) {</span></span>
<span class="line"><span>    return Vn &lt; An;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>var Jt = function (jET, FET) {</span></span>
<span class="line"><span>    return jET === FET;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>var Mn = function (bn, Gn) {</span></span>
<span class="line"><span>    return bn + Gn;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var BXT = function (rET, OET) {</span></span>
<span class="line"><span>    return rET &lt;&lt; OET;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var U1T = function (bm_sz, _abck, html_url) {</span></span>
<span class="line"><span>    A1T = B5T()</span></span>
<span class="line"><span>    var sST = cST(bm_sz);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    RST = 0</span></span>
<span class="line"><span>    R1T = r1T()</span></span>
<span class="line"><span>    vST = &quot;0,0,0,0,4873,113,0;0,-1,0,1,4763,1101,0;0,0,0,0,4880,113,0;0,-1,0,1,4870,1101,0;0,-1,0,1,4664,1101,0;0,0,0,0,4888,113,0;0,-1,0,1,4754,1101,0;0,0,0,0,4686,113,0;0,-1,0,1,3602,1101,0;&quot;</span></span>
<span class="line"><span>    L1T = &#39;0,0,0,0,4873,113,0;0,-1,0,1,4763,1101,0;0,0,0,0,4880,113,0;0,-1,0,1,4870,1101,0;0,-1,0,1,4664,1101,0;0,0,0,0,4888,113,0;0,-1,0,1,4754,1101,0;0,0,0,0,4686,113,0;0,-1,0,1,3602,1101,0;&#39;</span></span>
<span class="line"><span>    fXT = [1, 32, 32, 0, 0, 0, 0, 4, 0, B5T(), -999999, 18204, 0, 0, 3034, 0, 0, 8, 0, &#39;0&#39;, _abck, 39098, &#39;-1&#39;, &#39;-1&#39;, 30261693, &#39;PiZtE&#39;, 83797, 56, 0, &#39;0&#39;, 0, &#39;,&#39;, &#39;&#39;].join(&#39;,&#39;)</span></span>
<span class="line"><span>    W1T = [&quot;-100&quot;, R1T, &#39;-105&#39;, vST, &#39;-108&#39;, &#39;&#39;, &#39;-101&#39;, &quot;do_en,dm_en,t_en&quot;, &quot;-110&quot;, &#39;&#39;, &#39;-117&#39;, &#39;&#39;, &#39;-109&#39;, &#39;&#39;, &#39;-102&#39;, L1T, &#39;-111&#39;, &#39;&#39;, &#39;-114&#39;, &#39;&#39;, &#39;-103&#39;, &#39;&#39;, &#39;-106&#39;, &#39;0,0&#39;, &#39;-115&#39;, fXT, &#39;-112&#39;, html_url, &#39;-119&#39;, &#39;-1&#39;, &#39;-122&#39;, &#39;0,0,0,0,1,0,0&#39;, &#39;-123&#39;, &#39;&#39;, &#39;-124&#39;, &#39;&#39;, &#39;-126&#39;, &#39;&#39;, &#39;-127&#39;, 8, &#39;-128&#39;, &#39;,,&#39;, &#39;-131&#39;, &#39;,,,&#39;, &#39;-132&#39;, &#39;&#39;, &#39;-133&#39;, &#39;&#39;, &#39;-70&#39;, &#39;-1&#39;, &#39;-80&#39;, &#39;94&#39;, &#39;-90&#39;, &#39;9d94de22821c3355a13b27ed05656084f29f5daaa8066edff7b0a320a0df4079&#39;, &#39;-116&#39;, 0];</span></span>
<span class="line"><span>    x1T = ZST(34, [W1T, 2, false])</span></span>
<span class="line"><span>    // console.log(x1T)</span></span>
<span class="line"><span>    RST = W1T.join(x1T)</span></span>
<span class="line"><span>    // console.log(RST)</span></span>
<span class="line"><span>    EST = &#39;7a74G7m23Vrp0o5c947885&#39;</span></span>
<span class="line"><span>    lST = &#39;yC4xvrXgniGeyikKztHA5Q==&#39;</span></span>
<span class="line"><span>    RST = Mn(Mn(Mn(Mn(2, x1T), 2), x1T), RST = Mn(Mn(Mn(Mn(Mn(EST, lST), x1T), 24 ^ HY(RST), x1T), RST)));</span></span>
<span class="line"><span>    RST = function BST(kST, CST) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        var PST;</span></span>
<span class="line"><span>        var QST;</span></span>
<span class="line"><span>        var fST;</span></span>
<span class="line"><span>        var hvT;</span></span>
<span class="line"><span>        var TvT = kST.split(&#39;,&#39;);</span></span>
<span class="line"><span>        for (hvT = 0; hvT &lt; TvT.length; hvT++)</span></span>
<span class="line"><span>            PST = zY(ZY(CST &gt;&gt; c6T[17], c6T[42]), TvT.length),</span></span>
<span class="line"><span>                CST *= c6T[43],</span></span>
<span class="line"><span>                CST &amp;= c6T[44],</span></span>
<span class="line"><span>                CST += 4282663,</span></span>
<span class="line"><span>                QST = zY(ZY(r6T(CST &amp;= c6T[45], 8), c6T[42]), TvT.length),</span></span>
<span class="line"><span>                CST *= 65793, CST &amp;= c6T[44], CST += c6T[46], CST &amp;= c6T[45], fST = TvT[PST], TvT[PST] = TvT[QST], TvT[QST] = fST;</span></span>
<span class="line"><span>        var dvT;</span></span>
<span class="line"><span>        return dvT = TvT.join(&#39;,&#39;), dvT;</span></span>
<span class="line"><span>    }(RST, sST[1]);</span></span>
<span class="line"><span>    var UvT = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]</span></span>
<span class="line"><span>    SvT = &#39;&#39;</span></span>
<span class="line"><span>    RST = function KvT(XvT, HvT) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        for (var vvT = 0; zn(vvT, 127); ++vvT)</span></span>
<span class="line"><span>            zn(vvT, c6T[40]) || Jt(c6T[47], vvT) || Jt(34, vvT) || Jt(92, vvT) ? UvT[vvT] = -1 : (UvT[vvT] = SvT.length,</span></span>
<span class="line"><span>                SvT += String.fromCharCode(vvT));</span></span>
<span class="line"><span>        for (var zvT = &#39;&#39;, VvT = 0; zn(VvT, XvT.length); VvT++) {</span></span>
<span class="line"><span>            var AvT = XvT.charAt(VvT)</span></span>
<span class="line"><span>                , xvT = ZY(r6T(HvT, 8), c6T[42]);</span></span>
<span class="line"><span>            HvT *= c6T[43],</span></span>
<span class="line"><span>                HvT &amp;= c6T[44],</span></span>
<span class="line"><span>                HvT += c6T[46],</span></span>
<span class="line"><span>                HvT &amp;= c6T[45];</span></span>
<span class="line"><span>            var WvT = UvT[XvT.charCodeAt(VvT)];</span></span>
<span class="line"><span>            if (&#39;function&#39; == typeof AvT.codePointAt) {</span></span>
<span class="line"><span>                var MvT = AvT.codePointAt(c6T[6]);</span></span>
<span class="line"><span>                MvT &gt;= 32 &amp;&amp; zn(MvT, 127) &amp;&amp; (WvT = UvT[MvT]);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            WvT &gt;= 0 &amp;&amp; (WvT += zY(xvT, SvT.length),</span></span>
<span class="line"><span>                WvT %= SvT.length,</span></span>
<span class="line"><span>                AvT = SvT[WvT]),</span></span>
<span class="line"><span>                zvT += AvT;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        var bvT;</span></span>
<span class="line"><span>        return bvT = zvT,</span></span>
<span class="line"><span>            bvT;</span></span>
<span class="line"><span>    }(RST, sST[0])</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    var GvT = ((((((&quot;&quot;)[&quot;concat&quot;](B5T() - A1T, &quot;,&quot;))[&quot;concat&quot;](0, &quot;,&quot;))[&quot;concat&quot;](0, &quot;,&quot;))[&quot;concat&quot;](1, &quot;,&quot;))[&quot;concat&quot;](2, &quot;,&quot;))[&quot;concat&quot;](0);</span></span>
<span class="line"><span>    RST = Mn(Mn(Mn(Mn(Mn(Mn(Mn(&quot;2;&quot;, sST[0]), &quot;;&quot;), sST[1]), &quot;;&quot;), GvT), &quot;;&quot;), RST);</span></span>
<span class="line"><span>    return RST</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>console.log(U1T(&quot;4C0EB5576E56746FEA7E44353E408D11~YAAQR/6Yc5BPnNqLAQAAFFPwLhX7EkI2BZKgs0KasB3v8z1/DXKLlqPjmBokz04h+DYiIl9tIvrKfh9dQt/TeFfljUF+nyZqYk3OFGHYsF0nAp51CGFMES2LeMCS6BV91mOd+E30H9Wm2r84gdtqIG/2xbLNgDBr5G1goDbTWKo4cmQckkVSohHHY/pHJBMWf57Smr1kkqSrpc0eAsKCjoj9efCCjpaTwQ4xH5M90aInNQ4nrGSWkOXwjAiWMCXjKmrCUzAY+pOn1t3iZ7XsTESbLCrD9j/QiWq0Bp2GfHOzGoyurQiyyLXLKTKD3E828pr/GcQOjaSawUW4DLkj/3MYdNj6B7ORTvm2tkZKtQ+goghIFv91U3dRGTAXNehjKWPx7MOQKVHOFYjp14E=~3293492~3355459&quot;, &#39;9536F265393639331496ED854EE3E805~-1~YAAQrwrgerSeg92LAQAAo3UkNQt6QJJSDBrga9f5KmTHn9Wdd3SzFcOdHquwxSdmh0HUhJUSMrccC/vqwqr9XLD7ZOrXt/VN967VZr6gy174KqV7m/HOA4ufRJJ/qdwaFdRwWnImEJdtbK4TRWvDjy9XPvtcz1A2+qtmV09bV8DuvO0wAIQD9JJxomFL5+GFgLa97spFGlATFHBz4JLX8oOscnBGv6qOKOQvYZgDhbP0Z6vuuS+NcsbF1IdyVzF3/zs/Yb5F5Tuy6wbiKUd/IAAwoWj9Vg/Y4y5n8mk1OjMIpnd6YB9f3Hnso+26lEqcCidXHYq6i8Zb+KlFVr9IyfYIuhxWZo6/OjYvTtKVLNqzOOB2W/XIdS9CQVvXoAtEnd7gNmFA7gZtCrJDZwYmSdcTo5VVrH/iZ5igXjw/~-1~-1~-1&#39;, &#39;https://www.dhl.com/cn-zh/home.html&#39;));</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>python 代码</li></ul><div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> execjs</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> requests</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> re</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">headers </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    &quot;user-agent&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36&quot;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">url </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;https://www.dhl.com/cn-zh/home/tracking/tracking-ecommerce.html&quot;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">params </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    &quot;submit&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;1&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    &quot;tracking-id&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;1232343&quot;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">response </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> requests.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">get</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(url, </span><span style="--shiki-light:#986801;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">headers</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">headers, </span><span style="--shiki-light:#986801;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">params</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">params)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">js_url </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;https://www.dhl.com&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> +</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> re.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">findall</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;/noscript&gt;&lt;script type=&quot;text/javascript&quot;  src=&quot;(.*?)&quot;&gt;&lt;/sc&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, response.text)[</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">cookies </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    &#39;_abck&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: response.cookies.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">get</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;_abck&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">),</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    &#39;bm_sz&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: response.cookies.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">get</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;bm_sz&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">),</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    &#39;ak_bmsc&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: response.cookies.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">get</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;ak_bmsc&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">headers </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    &quot;referer&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;https://www.dhl.com/cn-zh/home/tracking/tracking-ecommerce.html?submit=1&amp;tracking-id=1232343&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    &quot;user-agent&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36&quot;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">res </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> requests.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">get</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(js_url, </span><span style="--shiki-light:#986801;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">headers</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">headers, </span><span style="--shiki-light:#986801;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">cookies</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">cookies)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">dd </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> execjs.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">compile</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">open</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;扣代码.js&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#986801;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">encoding</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;utf-8&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">).</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">read</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()).</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">call</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;U1T&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, cookies[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;bm_sz&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">], res.cookies.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">get</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;_abck&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">), url)</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"># print(dd)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">cookies[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;_abck&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">] </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> res.cookies.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">get</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;_abck&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">data </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;sensor_data&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:dd}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">headers1 </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    &quot;origin&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;https://www.dhl.com&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    &quot;referer&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;https://www.dhl.com/cn-zh/home/tracking/tracking-ecommerce.html?submit=1&amp;tracking-id=1232343&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    &quot;user-agent&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36&quot;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(data)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">res1 </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> requests.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">post</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(js_url, </span><span style="--shiki-light:#986801;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">headers</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">headers1, </span><span style="--shiki-light:#986801;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">cookies</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">cookies, </span><span style="--shiki-light:#986801;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">json</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">data)</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(res1.cookies)</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(res1.text)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="三-tls-指纹" tabindex="-1"><a class="header-anchor" href="#三-tls-指纹"><span>三.TLS 指纹</span></a></h3><h4 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介"><span>1. 简介</span></a></h4><ul><li>TLS（传输层安全性）指纹是指一种用于标识和识别 TLS 协议连接的技术。TLS 是一种加密通信协议，用于在计算机网络上保护数据的传输安全。TLS 指纹可用于唯一标识特定 TLS 连接的加密参数和协商结果。</li><li>指纹的携带一般都是在 https 当中的, ssl/tls 都是在安全套接字层,可以把 ssl/tls 当做是两个步骤,先会去验证 ssl/tls,通过之后再去发送 http 请求</li></ul><h4 id="_2-导致的后果" tabindex="-1"><a class="header-anchor" href="#_2-导致的后果"><span>2. 导致的后果</span></a></h4><ul><li>通过浏览器能正常获取到数据,但是通过代码哪怕带上全部的请求头的信息也是请求失败,返回的数据不对</li><li>那这种网站多半检测浏览器指纹,每个浏览器都会有指纹,通过 requests 发送请求时,底层用的是 urllib3 的库,库也会生成对应的指纹,服务器会检测这些指纹是不是属于这些库的,要是指纹不对,就不会返回数据</li></ul><h4 id="_3-测试指纹" tabindex="-1"><a class="header-anchor" href="#_3-测试指纹"><span>3. 测试指纹</span></a></h4><ul><li>测试 tsl 指纹网址:https://tls.browserleaks.com/json</li><li>练习网址:https://ascii2d.net/</li></ul><div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> requests</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> curl_cffi </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> requests</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;edge99:&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, requests.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">get</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;https://tls.browserleaks.com/json&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#986801;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">impersonate</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;edge99&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">).</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">json</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">())</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;chrome110:&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, requests.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">get</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;https://tls.browserleaks.com/json&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#986801;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">impersonate</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;chrome110&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">).</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">json</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">())</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;safari15_3:&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, requests.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">get</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;https://tls.browserleaks.com/json&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#986801;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">impersonate</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;safari15_3&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">).</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">json</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">())</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,37),c=[h];function k(v,u){return a(),n("div",null,c)}const A=s(r,[["render",k],["__file","18-cookie专题-3.html.vue"]]),b=JSON.parse('{"path":"/python/2.%E7%88%AC%E8%99%AB/2.js%E9%80%86%E5%90%91/18-cookie%E4%B8%93%E9%A2%98-3.html","title":"18-cookie专题-3","lang":"zh-CN","frontmatter":{"title":"18-cookie专题-3","footer":false,"prev":false,"next":false,"description":"AKAMAI 系列产品 学习目标: 了解 akamai 执行过程 熟悉 akamai 解析思路 掌握 tls 指纹反爬原理 一.简介 1. Akamai Akamai 是一家提供内容传递网络（CDN）和云服务的公司。CDN 通过将内容分发到全球各地的服务器，以减少网络延迟并提高用户访问网站的速度和性能。在其服务中，Akamai 使用一种称为 Akama...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/python/2.%E7%88%AC%E8%99%AB/2.js%E9%80%86%E5%90%91/18-cookie%E4%B8%93%E9%A2%98-3.html"}],["meta",{"property":"og:site_name","content":"学习笔记"}],["meta",{"property":"og:title","content":"18-cookie专题-3"}],["meta",{"property":"og:description","content":"AKAMAI 系列产品 学习目标: 了解 akamai 执行过程 熟悉 akamai 解析思路 掌握 tls 指纹反爬原理 一.简介 1. Akamai Akamai 是一家提供内容传递网络（CDN）和云服务的公司。CDN 通过将内容分发到全球各地的服务器，以减少网络延迟并提高用户访问网站的速度和性能。在其服务中，Akamai 使用一种称为 Akama..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"YL"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"18-cookie专题-3\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"YL\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"headers":[{"level":2,"title":"AKAMAI 系列产品","slug":"akamai-系列产品","link":"#akamai-系列产品","children":[{"level":3,"title":"一.简介","slug":"一-简介","link":"#一-简介","children":[]},{"level":3,"title":"二.逆向分析","slug":"二-逆向分析","link":"#二-逆向分析","children":[]},{"level":3,"title":"三.TLS 指纹","slug":"三-tls-指纹","link":"#三-tls-指纹","children":[]}]}],"git":{},"readingTime":{"minutes":8.68,"words":2604},"filePathRelative":"python/2.爬虫/2.js逆向/18-cookie专题-3.md","autoDesc":true}');export{A as comp,b as data};
