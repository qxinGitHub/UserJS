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

// @version           4.1.1
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
                "position: absolute;" +
                "top: 0;" +
                "right: -100%;" +
                "border-radius:4px;" +
                "padding:2px;" +
                "background:#fff;" +
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
        odom.style.cssText ="position: fixed;" +
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
                    "<img id='xin-ad-pic' alt='黄金油桃5斤整装' src='data:image/jpeg;base64,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' >"+
                    "<div id='xin-ad-code' title='二维码'>" +
                        "<p>新店开张，还望多多支持</p>" +
                        "<p>清晨采摘，立马发货，保证新鲜</p>" +
                        "<p>请使用微信扫一扫</p>" +
                        "<img id='xin-ad-code-pic' alt='二维码' src='data:image/jpeg;base64,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'>" +
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
