// ==UserScript==
// @namespace         https://greasyfork.org/zh-CN/users/106222-qxin-i

// @name              网页限制解除(改)
// @name:en           Remove web limits(modified)
// @name:zh           网页限制解除(改)
// @name:zh-CN        网页限制解除(改)
// @name:ja           ウェブの規制緩和(変更)

// @author            Cat73 & iqxin(修改) 
// @contributor       iqxin

// @description       通杀大部分网站,可以解除禁止复制、剪切、选择文本、右键菜单的限制。原作者cat73,因为和搜索跳转脚本冲突,遂进行了改动,改为黑名单制。
// @description:en    Pass to kill most of the site, you can lift the restrictions prohibited to copy, cut, select the text, right-click menu.revised version
// @description:zh    通杀大部分网站,可以解除禁止复制、剪切、选择文本、右键菜单的限制。原作者cat73,因为和搜索跳转脚本冲突,遂进行了改动,改为黑名单制。
// @description:zh-CN 通杀大部分网站,可以解除禁止复制、剪切、选择文本、右键菜单的限制。原作者cat73,因为和搜索跳转脚本冲突,遂进行了改动,改为黑名单制。
// @description:zh-TW 通殺大部分網站,可以解除禁止復制、剪切、選擇文本、右鍵菜單的限制。
// @description:ja    サイトのほとんどを殺すために渡し、あなたは、コピー切り取り、テキスト、右クリックメニューを選択することは禁止の制限を解除することができます。

// @description       原作者https://www.github.com/Cat7373/,因为和搜索跳转脚本冲突,遂进行了改动
// @homepageURL       https://cat7373.github.io/remove-web-limits/
// @supportURL        https://greasyfork.org/zh-CN/scripts/28497

// @icon               data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAABpElEQVR4nO3Vv2uUQRDG8c/ebSMWqay0trATAxrUSi1S2AiWFoJYpNCgoBjURsHWJKeNRfAvsDgFixQqKdPZ2ViEiCJYBOQu8f1hEXO59713j7MUfLZ6d2a/O8vMO0OzDnin9Ku2Mjvuaw07xgSAYEVXe2indMhj92zpKJLnBhF8MDeye9hn6zbN70eRiqCw02Bra3up8BBLu1FEBxsBucXqW4csz0ULe4jorSCMuPU89boRELDMHiI6Y8V65bbCUTccc70RkaOwKLOg0IkyXa9qTjOu2LAs6NZuD86hrdTyxRNTkUqqdhXlHrngGRVEZsMpJwex9DxIZSHYclesIb65LCoHgIs66UJq6btDBZHZrPh8V6YBOX66LbOkTGckBYimBW2FVTNeuOZNyrFJ236Yl4NSy5SbVm1PDvhodqgyMledTdRlAtDzqfL9tfkwUtyaRkv9LwFj9B/w7wPycXOhqlJ0yZHKPChMi5MCiM47XhsopbVJAUHfrYbmN/EToN+02eLPfz9OYyZhFJzW1Jn3lTsxaKQjCkp52jy45r1ZvSbTb9M0d4PBozGZAAAAAElFTkSuQmCC

// @version           4.1.2
// @license           LGPLv3

// @compatible        chrome Chrome_46.0.2490.86 + TamperMonkey + 脚本_1.3 测试通过
// @compatible        firefox Firefox_42.0 + GreaseMonkey + 脚本_1.2.1 测试通过
// @compatible        opera Opera_33.0.1990.115 + TamperMonkey + 脚本_1.1.3 测试通过
// @compatible        safari 未测试

// @match             *://*/*
// @exclude        *www.bilibili.com/video*
// @exclude        *www.bilibili.com/bangumi*
// @exclude        *www.panda.tv*

// @connect     eemm.me
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_addStyle
// @grant       GM_deleteValue
// @grant       GM_xmlhttpRequest
// @grant       GM_setClipboard
// @run-at      document-start
// ==/UserScript==
(function() {
    'use strict';

    var settingData = {
        "status":1,
        "version" : 0.1,
        "message" : "啦啦啦,啦啦啦,我是卖报的小行家",
        // "position" : ["0","0","auto"],
        "positionTop":"0",
        "positionLeft":"0",
        "positionRight":"auto",
        "addBtn" : true,
        "connectToTheServer" : true,
        "waitUpload":[],
        "currentURL":"null",
        // 域名规则列表
        "rules" : {
            "rule_def": {
                "name": "default",
                "hook_eventNames": "contextmenu|select|selectstart|copy|cut|dragstart|mousemove|beforeunload",
                "unhook_eventNames": "mousedown|mouseup|keydown|keyup",
                "dom0": true,
                "hook_addEventListener": true,
                "hook_preventDefault": true,
                "hook_set_returnValue": true,
                "add_css": true
            },
            "rule_plus": {
                "name": "default",
                "hook_eventNames": "contextmenu|select|selectstart|copy|cut|dragstart|mousedown|mouseup|mousemove|beforeunload",
                "unhook_eventNames": "keydown|keyup",
                "dom0": true,
                "hook_addEventListener": true,
                "hook_preventDefault": true,
                "hook_set_returnValue": true,
                "add_css": true
            },
            "rule_zhihu": {
                "name": "default",
                "hook_eventNames": "contextmenu|select|selectstart|copy|cut|dragstart|mousemove",
                "unhook_eventNames": "keydown|keyup",
                "dom0": true,
                "hook_addEventListener": true,
                "hook_preventDefault": true,
                "hook_set_returnValue": true,
                "add_css": true
            }
        },
        "data": [
            "b.faloo.com",
            "bbs.coocaa.com",
            "book.hjsm.tom.com",
            "book.zhulang.com",
            "book.zongheng.com",
            "chokstick.com",
            "chuangshi.qq.com",
            "city.udn.com",
            "cutelisa55.pixnet.net",
            "huayu.baidu.com",
            "imac.hk",
            "life.tw",
            "luxmuscles.com",
            "news.missevan.com",
            "read.qidian.com",
            "www.15yan.com",
            "www.17k.com",
            "www.18183.com",
            "www.360doc.com",
            "www.coco01.net",
            "www.eyu.com",
            "www.hongshu.com",
            "www.hongxiu.com",
            "www.imooc.com",
            "www.jjwxc.net",
            "www.readnovel.com",
            "www.tadu.com",
            "www.xxsy.net",
            "www.z3z4.com",
            "www.zhihu.com",
            "yuedu.163.com",
            "www.ppkao.com",
            "movie.douban.com",
            "www.ruiwen.com",
            "vipreader.qidian.com",
            "www.pigai.org",
            "www.shangc.net",
            "www.sdifen.com"
        ]
    }

    var rwl_userData = null;
    var hostname = window.location.hostname;
    var btn_node = null;   
    var rule = null;
    var list = null;
    
    // 储存名称
    var storageName = "iqxinStorageName";
    // 要处理的 event 列表
    var hook_eventNames, unhook_eventNames, eventNames;
    // 储存被 Hook 的函数
    var EventTarget_addEventListener = EventTarget.prototype.addEventListener;
    var document_addEventListener = document.addEventListener;
    var Event_preventDefault = Event.prototype.preventDefault;


    // 查看本地是否存在旧数据
    rwl_userData = GM_getValue("rwl_userData");
    if(!rwl_userData){
        rwl_userData = settingData
        // GM_setValue("rwl_userData",rwl_userData);
    }

    version_up_3_to_4();

    // 获取黑名单网站
    list = get_black_list();

    // 添加按钮
    if(rwl_userData.addBtn){
        addBtn();  // 添加
        btn_node = document.getElementById("black_node");
        setTimeout(function(){
            try {
                dragBtn()
            } catch (e) {
                console.error("dragBtn函数 报错");
            }
        },1000)
        // dragBtn();  // 增加拖动事件
    }

    // 检查是否在黑名单中
    if(check_black_list(list,hostname)){
        try {
            if(rwl_userData.addBtn){
                btn_node.checked = true;
            }
        } catch (e) {
            console.error("脚本rwl-错误：\n btn_node : %s\n%s\n脚本rwl-错误位置： btn_node.checked = true;",btn_node,e);
        } finally {
            init();
        }
    }


    // // ------------------------------函数 func

    //添加按钮 func
    function addBtn(){
        var node = document.createElement("remove-web-limits-iqxin");
        node.id = "rwl-iqxin";
        node.className = "rwl-exempt";

        // 再次打开窗口小于之前窗口的情况,导致按钮出现在可视窗口之外
        var screenClientHeight = document.documentElement.clientHeight;
        var tempHeight;
        if (rwl_userData.positionTop>screenClientHeight){
            tempHeight  = screenClientHeight -40;
        } else{
            tempHeight = rwl_userData.positionTop;
        }
        // 改变窗口大小的情况
        window.onresize=function(){  
            var screenClientHeight = document.documentElement.clientHeight;
            var tempHeight;

            if (rwl_userData.positionTop>screenClientHeight){
                    tempHeight  = screenClientHeight -40;
            } else{
                tempHeight = rwl_userData.positionTop;
            }

            node.style.top =  tempHeight + "px";
        }

        tempHeight = tempHeight<0?0:tempHeight
        node.style.cssText = "top:"+tempHeight+"px;left:"+rwl_userData.positionLeft+"px;right:"+rwl_userData.positionRight+"px;";
        // node.innerHTML = '<label><input type="checkbox" name="" id="black_node">黑名单</label><button id="delete">delete</btton>';
        // node.innerHTML = '<label>限制解除 <input type="checkbox"  name="" id="black_node"></label>';
        node.innerHTML = '<button type="button" id="rwl-setbtn"> set </button> <lalala style="cursor:move;">限制解除</lalala> <input type="checkbox" name="" id="black_node" >';
        if(window.self === window.top){
            if (document.querySelector("body")){
                document.body.appendChild(node);
            } else {
                document.documentElement.appendChild(node);
            }
        }
        node.addEventListener("mouseover",function(){
            node.classList.add("rwl-active-iqxin");
        });
        node.addEventListener("mouseleave",function(){
            setTimeout(function(){
                node.classList.remove("rwl-active-iqxin");
                black_check(black_node.checked);
            },100)
        });
        // 删除本地存的黑名单
        // document.getElementById("delete").addEventListener("click",function(){
        //  GM_deleteValue ("list_user");
        //  test();
        // });
        GM_addStyle(
            "#rwl-iqxin{" +
                "position:fixed;" +
                // "top:0;" +
                // "left:0px;" +
                "transform:translate(-90px,0);" +
                "width:85px;" +
                "height:25px;" +
                "font-size:12px;" +
                "font-weight: 500;" +
                "font-family:Verdana, Arial, '宋体';" +
                "color:#fff;" +
                "background:#333;" +
                "z-index:2147483647;" +
                "margin: 0;" +
                "opacity:0.05;" +
                "transition:0.3s;" +
                "overflow:hidden;" +
                "user-select:none;" +
                "text-align:center;" +
                "white-space:nowrap;" +
                "line-height:25px;" +
                "padding:0 16px;" +
                "border:1px solid #ccc;" +
                "border-width:1px 1px 1px 0;" +
                "border-bottom-right-radius:5px;" +
                "box-sizing: content-box;" +
            "}" +
            "#rwl-iqxin input{" +
                "margin: 0;" +
                "padding: 0;" +
                "vertical-align:middle;" +
                "-webkit-appearance:checkbox;" +
                "-moz-appearance:checkbox;" +
                "position: static;" +
                "clip: auto;" +
                "opacity: 1;" +
                "cursor: pointer;" +
            "}" +
            "#rwl-iqxin.rwl-active-iqxin{" +
                // "top: 10px;" +
                "left: 0px;" +
                "transform:translate(0,0);" +
                "opacity: 0.9;" +
                "height: 32px;" +
                "line-height: 32px" +
            "}" +
            "#rwl-iqxin label{" +
                "margin:0;" +
                "padding:0;" +
                "font-weight:500;" +
            "}" +
            "#rwl-iqxin button{" +
                "margin: 0;" +
                "padding: 0 2px;" +
                "border: none;" +
                "border-radius: 2px;" +
                "cursor: pointer;" +
            "}" +
            // 设置菜单
            "#rwl-setMenu{" +
                "text-align:left;" +
                "font-size:14px;" +
                "z-index:999999;" +
            "}" +
            "#rwl-setMenu p{" +
                "margin:5px auto;" +
            "}" +
            // 广告
            "#rwl-ad{" +
                "height:100%;" +
                "width:350px;" +
                "position: absolute;" +
                "top: 0;" +
                "right: -100%;" +
                "border-radius:4px;" +
                "padding:2px;" +
                "background:#fff;" +
            "}" +
            "#rwl-ad #xin-ad-pic{" +
                "width:100%;" +
            "}" +
            "#rwl-ad #xin-ad-code{" +
                "background: #fff;" +
                "text-align: center;" +
                "font-size: 1.2em;" +
                "color: #F4C774;" +
                "transition:0.5s;" +
                "padding-bottom:10px;" +
            "}" +
            "#rwl-ad:hover #xin-ad-code{" +
                "transform:translate(0,-50%);" +
                "color:red" +
            "}" +
            " "
        )
    };


    document.querySelector("#rwl-setbtn").addEventListener("click",function(){
        var oldEditBox = document.querySelector("#rwl-setMenu");
        if(oldEditBox){
            oldEditBox.parentNode.removeChild(oldEditBox);
            return;
        }
        var userSetting = GM_getValue("rwl_userData");
        var upload_checked = userSetting.connectToTheServer?"checked":"";

        var odom = document.createElement("div");
        odom.id = "rwl-setMenu";
        odom.style.cssText ="position: absolute;" +
            "top: 50px;" +
            "left: 20px;" +
            "padding: 10px;" +
            "background: #fff;" +
            "border-radius: 4px;";
        var innerH = "" +
            "<p>距离顶部距离（单位 像素） <input id='positiontop' type='text' value=" + userSetting.positionTop + "></p>" + "" +
            "<laberl> <p>允许上传黑名单<input id='uploadchecked'  type='checkbox' " + upload_checked + "></p>" + "</laberl>" +
            "<p><s>显示按钮（待添加）</s></p>" +
            "<p><s>按钮透明度（待添加）</s></p>" +
            "<p><s>快速复制（待添加）</s></p>" +
            "<p><s>关闭广告（待添加，希望能理解）</s></p>" +
            "<p><s>（待添加）</s></p>" +
            "<textarea wrap='off' cols='45' rows='20' style='overflow:auto;border-radius:4px;'>" + JSON.stringify(userSetting.data,false,4) + "</textarea>" + 
            "<br>" +
            // "<button id='rwl-reset'>清空设置</button> &nbsp;&nbsp;&nbsp;" +
            "<button id='rwl-setMenuSave'>保存</button> &nbsp;&nbsp;&nbsp;" +
            "<button id='rwl-setMenuClose' onclick='this.parentNode.parentNode.removeChild(this.parentNode);' >关闭</button> &nbsp;&nbsp;&nbsp;" +
            // "<button id='rwl-codeboxsave'>保存</button>" +
            "<span style='font-size:0.7em;'>-- 各位小哥哥姐姐，买个桃吃呗 --</span>" +
            "<div id='rwl-ad'>" +
                "<span id='xin-ad-pics'>" +
                    "<img id='xin-ad-pic' alt='黄金油桃5斤整装' src='data:image/png;base64,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' >"+
                    "<div id='xin-ad-code' title='二维码'>" +
                        "<p>新店开张，还望多多支持</p>" +
                        "<p>清晨采摘，立马发货，保证新鲜</p>" +
                        "<p>请使用微信扫一扫</p>" +
                        "<img id='xin-ad-code-pic' alt='二维码' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgAAAEYAQMAAAC9QHvPAAAABlBMVEX///8AAABVwtN+AAACdUlEQVR4nO1awZHjMAyjxw8/XYJKcWlSaS7FJfiZR8ZcAJQu2c3MFUBHH3sieB8YAiClNbvxmlyrTc/Zz7Lrh8fqe/Vrjq3EmCcZ2Jo7X7a9YuthxZtd84NbNTNmcT+2RlqwtfOj5VRJzOAJRN0Aw9qwjaWwoEiCn/tgxE/FD70mvpg37VAysIutGUk8Nm+f+kqH6Z55zc8Fnknwgy+1ffpqNsxY3Sp3g3+AH6vNPlZGTAEL5Onki4EWGEiDLvC0rSXG0AoOPmkOURv8rraomt0SY8zWo4QuYAW9NlxdEzKz3B7D1hFMhUvsbKi6dpgkCta8GHVNm189JqidB2mpk0s7nhfDrIR2Kp9rBIfywioa6lXTRFpM52f0CQgO9ZCYm3qPlB1TaAXAqDZi1Z4gd8coObjn0UeFiFwc+ilW02Kiftglh3lyZECCgJ+LYjosMSYSEanwq5cors5qcJgUY7JKlMJz7vEwSw61OSeqkhlDformZckh4lNbkwdReTFDF/RD68HhIgxf/dHOHTGjW5romcQoJvTVq36SYiiVA2+XysZ1xghepJ232SElpmcl5yaxEXmBXrIO88yMQWukrKRANoyKmJt0nnCNg9a0GIuRwbsKQJR+A/hvptwVwwlanok6wp7zbLnEfdOZG8P6oXZ0xXJse510lrLHV6f+SlbMWPSNlRkJyVBNtb332Dkx41zdx6JdjDuF1V+zVUYMlW+vO1bzkZXk53XekhOz/MtK6UJy4NYg7IuJO+hnzwu1EODQXp6ZHjO0M4dnWu+jWmZMaKfPDqb7ZZ2lBD+pMd0zY6bWVfoSc5NipPz+n5xcmO/67/oBajcq/qSYS1MAAAAASUVORK5CYII='>" +
                        "<p>做个精神股东</p>" +
                        "<p>收藏下店铺也是极好的</p>" +
                    "</div>" +
                "</span>" +
            "</div>" +
            ""
        "";
        odom.innerHTML = innerH;
        document.body.appendChild(odom);

        document.querySelector("#rwl-setMenuSave").addEventListener("click",saveSetting);

    })

    // 保存选项
    function saveSetting(){
        var positionTop = document.querySelector("#rwl-setMenu #positiontop").value;
        var uploadChecked = document.querySelector("#rwl-setMenu #uploadchecked").checked;
        var codevalue = document.querySelector("#rwl-setMenu textarea").value;
        // console.log(positionTop,uploadChecked);
        if(codevalue){
            console.log(JSON.parse(codevalue));
            var userSetting = GM_getValue("rwl_userData");

            userSetting.data = JSON.parse(codevalue);
            userSetting.positionTop = parseInt(positionTop);
            userSetting.connectToTheServer = uploadChecked;

            GM_setValue("rwl_userData",userSetting);
            // console.log(GM_getValue("searchEngineJumpData"));
            // 刷新页面
            setTimeout(function(){
                window.location.reload();
            },300);
        } else {
            alert("输入为空");
            // this.reset();
        }
        closeMenu();
    }

    //关闭菜单
    function closeMenu(){
        var oldEditBox = document.querySelector("#rwl-setMenu");
        if(oldEditBox){
            oldEditBox.parentNode.removeChild(oldEditBox);
            return;
        }
    }

    // 增加拖动事件 func
    function dragBtn(){
        var rwl_node = document.querySelector("#rwl-iqxin");
        // console.log(rwl_node);
        rwl_node.addEventListener("mousedown",function(event){
            rwl_node.style.transition = "null";
            var disX = event.clientX - rwl_node.offsetLeft;
            var disY = event.clientY - rwl_node.offsetTop;

            var move = function(event){
                rwl_node.style.left = event.clientX - disX + "px" ;
                rwl_node.style.top  = event.clientY - disY + "px" ;
            }

            document.addEventListener("mousemove",move);
            document.addEventListener("mouseup",function(){
                rwl_node.style.transition = "0.3s";
                document.removeEventListener("mousemove",move);
                // 此函数内所有的注释语句都是有用的
                    // 开启后,可拖动到屏幕右侧,但尚未添加css
                    // 在上面添加 rwl-active-iqxin 的地方加上判断左右,在加上相应的css即可
                    // 懒 2018-04-18 21:51:32
                // var bodyWidth = document.body.clientWidth;
                var rwl_nodeWidth = rwl_node.offsetLeft + rwl_node.offsetWidth/2;
                // if(rwl_nodeWidth > bodyWidth/2){
                //     rwl_node.style.left = "auto";
                //     rwl_node.style.right = 0;
                //     rwl_userData.positionLeft = "auto";
                //     rwl_userData.positionRight = "0";
                // } else {
                    rwl_node.style.right = rwl_userData.positionRight = "auto";
                    rwl_node.style.left = rwl_userData.positionLeft =  0;
                // }
                rwl_userData.positionTop = rwl_node.offsetTop;
                // console.log(rwl_userData);
                GM_setValue("rwl_userData",rwl_userData);

            })
        })
    }

    // 初始化 init func
    function init() {
        console.log("脚本-rwl-复制限制解除(改)------使用规则-----------------iqxin");
        // 针对个别网站采取不同的策略
        rule = clear();
        // 设置 event 列表
        hook_eventNames = rule.hook_eventNames.split("|");
        // TODO Allowed to return value
        unhook_eventNames = rule.unhook_eventNames.split("|");
        eventNames = hook_eventNames.concat(unhook_eventNames);

        // 调用清理 DOM0 event 方法的循环
        if(rule.dom0) {
            setInterval(clearLoop, 5 * 1000);
            setTimeout(clearLoop, 1500);
            window.addEventListener('load', clearLoop, true);
            clearLoop();
        }

        // hook addEventListener //导致搜索跳转失效的原因
        if(rule.hook_addEventListener) {
            EventTarget.prototype.addEventListener = addEventListener;
            document.addEventListener = addEventListener;
        }

        // hook preventDefault
        if(rule.hook_preventDefault) {
            Event.prototype.preventDefault = function() {
                if(hook_eventNames.indexOf(this.type) < 0) {
                    Event_preventDefault.apply(this, arguments);
                }
            };
        }

        // Hook set returnValue
        if(rule.hook_set_returnValue) {
            Event.prototype.__defineSetter__('returnValue', function() {
                if(this.returnValue !== true && hook_eventNames.indexOf(this.type) >= 0) {
                    this.returnValue = true;
                }
            });
        }

        // 添加CSS     // console.debug('url: ' + url, 'storageName：' + storageName, 'rule: ' + rule.name);
        if(rule.add_css) {
            GM_addStyle('html, :not([class*="rwl-exempt"]) {-webkit-user-select:text!important; -moz-user-select:text!important;} :not([class*="rwl-exempt"]) ::selection {color:#fff; background:#3390FF; !important;}');
        } //else {
            //GM_addStyle('html, :not([class*="rwl-exempt"]) {-webkit-user-select:text!important; -moz-user-select:text!important;}');
        //}
    }

    // Hook addEventListener proc
    function addEventListener(type, func, useCapture) {
        var _addEventListener = this === document ? document_addEventListener : EventTarget_addEventListener;
        if(hook_eventNames.indexOf(type) >= 0) {
            _addEventListener.apply(this, [type, returnTrue, useCapture]);
        } else if(unhook_eventNames.indexOf(type) >= 0) {
            var funcsName = storageName + type + (useCapture ? 't' : 'f');

            if(this[funcsName] === undefined) {
                this[funcsName] = [];
                _addEventListener.apply(this, [type, useCapture ? unhook_t : unhook_f, useCapture]);
            }

            this[funcsName].push(func);
        } else {
            _addEventListener.apply(this, arguments);
        }
    }

    // 清理循环
    function clearLoop() {
        rule = clear() // 对于动态生成的节点,随时检测
        var elements = getElements();

        for(var i in elements) {
          for(var j in eventNames) {
            var name = 'on' + eventNames[j];

            // ;?未解决
                // 2018-04-02 elements中会有字符串出现,原版不会,问题不明,根本原因尚未解决
                // 相关反馈  https://greasyfork.org/zh-CN/forum/discussion/36014
                // 问题版本号  v3.0.7
                // 问题补充   之前可以使用,具体版本未测（2018-04-02 21:27:53）,原版可以使用
            if(Object.prototype.toString.call(elements[i])=="[object String]"){
                continue;
            }

            if(elements[i][name] !== null && elements[i][name] !== onxxx) {
                if(unhook_eventNames.indexOf(eventNames[j]) >= 0) {
                    elements[i][storageName + name] = elements[i][name];
                    elements[i][name] = onxxx;
              } else {
                    elements[i][name] = null;
              }
            }
          }
        }
    }

    // 返回true的函数
    function returnTrue(e) {
        return true;
    }
    function unhook_t(e) {
        return unhook(e, this, storageName + e.type + 't');
    }
    function unhook_f(e) {
        return unhook(e, this, storageName + e.type + 'f');
    }
    function unhook(e, self, funcsName) {
        var list = self[funcsName];
        for(var i in list) {
            list[i](e);
        }

        e.returnValue = true;
        return true;
    }
    function onxxx(e) {
        var name = storageName + 'on' + e.type;
        this[name](e);

        e.returnValue = true;
        return true;
    }

    // 获取所有元素 包括document
    function getElements() {
        var elements = Array.prototype.slice.call(document.getElementsByTagName('*'));
        elements.push(document);
        return elements;
    };

    // 获取黑名单网站 Func
    function get_black_list(){
        // 之前版本可能导致存储空的字符串
            // 2018-06-11 15:11:44 保留,当容错处理
        var data_temp = rwl_userData.data;
        data_temp = data_temp.filter(function(item){
                return item.length>1;
            })
        return data_temp;
    }
    
    // 检查是否存在于黑名单中 返回位置 func
    function check_black_list(list,host){
        for(let i=0;i<list.length;i++){
            if(~hostname.indexOf(list[i])){
                return i+1;  //万一匹配到第一个,返回0
            }
        }
        return false;
    }

    // 鼠标点击后按钮后 检查是否在黑名单
    function black_check(bool){
        var list = GM_getValue("rwl_userData").data
        var check = check_black_list(list,hostname);

        console.log(list)

        if (bool && !check) {
            console.log(list);
            list = list.concat(hostname);
            console.log("选中 不在黑名单, 增加",hostname,list);

            console.log("before: ",rwl_userData.waitUpload)
            rwl_userData.waitUpload.push(hostname); //准备上传
            rwl_userData.currentURL = window.location.href;
            console.log("after: ",rwl_userData.waitUpload)

            saveData(list);
            init();

        }else if(!bool && check){
            // console.log(check-1);
            console.log("check: ",check)
            list.splice(check-1,1);
            console.log("未选中 在黑名单, 刪除",list);

            saveData(list);

            // 刷新页面
            setTimeout(function(){
                window.location.reload(true);
                console.log("刷新页面loading");
            },350);
        }else{
            console.log("返回false");
            return false;
        }
    }

    // 保存本地数据,并将数据上传至服务器
    function saveData(lists){
        console.log(lists);
        lists = lists.filter(function(item){
            return item.length>1;
        })

        // 更新数据
        rwl_userData.data = lists.sort();

        // 将本地黑名单上传
        if (rwl_userData.waitUpload.length > 0 && rwl_userData.connectToTheServer){
            // console.log("rwl : 上传...",rwl_userData.waitUpload);
            // console.log("rwl : 开始上传-----");
            GM_xmlhttpRequest({
              method: "POST",
              // url: "http://127.0.0.1:8000/tool/testajax/",
              url: "http://eemm.me/tool/rwl_upload/",
              data: JSON.stringify(rwl_userData),
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              onload: function(response) {
                // console.log("rwl : 上传成功----");
              }
            });
            rwl_userData.waitUpload = [];
        }

        GM_setValue("rwl_userData",rwl_userData);
        // console.log(GM_getValue("rwl_userData"));
        return rwl_userData;
    }

    // 数组去重
    function unique(arr) {
      var ret = []
      for (var i = 0; i < arr.length; i++) {
        var item = arr[i]
        if (ret.indexOf(item) === -1) {
          ret.push(item)
        }
      }
      return ret;
    }

    // 复制到剪贴板
    function setClipboard(){
        var text_obj = window.getSelection();
        var text = text_obj.toString();
        GM_setClipboard(text);

    }

    // 部分网站采用了其他的防复制手段
    function clear(){
        // console.log("进入clear",hostname,rwl_userData.rules);
        switch (hostname){
            case "www.z3z4.com": clear_covers(".moviedownaddiv"); break;
            case "huayu.baidu.com": clear_covers("#jqContextMenu"); break;
            case "zhihu.com":
            case "www.zhihu.com": return rwl_userData.rules.rule_zhihu; break;
            case "t.bilibili.com": clear_link_bilibili(); break;
            case "www.shangc.net": return rwl_userData.rules.rule_plus; break;
        }
        return rwl_userData.rules.rule_def;
    }
    // 去除覆盖层
    function clear_covers(ele){
        var odiv = document.querySelector(ele);
        if(odiv){
            odiv.parentNode.removeChild(odiv);
        }
    }
    // b站将文字嵌套在链接中
    function clear_link_bilibili(){
        var odiv = document.querySelector(".description");
        // console.log(odiv);
        if(odiv){
            var tDiv = odiv.querySelector(".content-ellipsis");
            var aDiv = odiv.querySelector("a");
             // console.log(tDiv);
             // console.log(aDiv);
             odiv.appendChild(tDiv);
        }
    }

    // 3.x.x 过渡 4.x.x 版本
    function version_up_3_to_4(){
        var old_version = GM_getValue("black_list");
        if(!old_version){return};
        rwl_userData.data = unique(rwl_userData.data.concat(old_version.data));
        GM_setValue("rwl_userData",rwl_userData);

        GM_deleteValue("black_list");
        GM_deleteValue("rwl_userdata");
    }
})(); 
