// 创建对象
let ws
let login
let nowId = "" // 当前id
let nowType = "" // 当前类型
let friendarr = [] // 聊天好友列表
let friendonline = [] // 好友在线列表
// let grouplist = [] // 群组列表
let idarr = [] // 选择联系人（群聊）的id
let loading = false
let settime = ""//循环事件
let xiaoxi = ""//循环事件
let visibilityState = true;//页面显示隐藏事件

document.addEventListener("visibilitychange", function () {
  if (document.visibilityState == "hidden") {
    visibilityState = false;
  } else if (document.visibilityState == "visible") {
    visibilityState = true;
    Push.clear();
  }
});


$(function () {
  // 判断是否登录
  if ($.cookie('login')) {
    // 建立WebSocket链接
     //ws = new WebSocket('ws://localhost:8282')
    ws = new WebSocket('ws://152.136.218.147:8282')
    login = JSON.parse($.cookie('login'))
    // 填充页面数据
    $(".myheadimg").attr("src", "home/images/head/" + login.img)
    $(".own_head img").attr("src", "home/images/head/" + login.img)
    $(".mysex").attr("src", "home/images/icon/sex" + login.sex + ".png")
    $(".myname").text(login.name)
    $(".myname_span").text(login.name)
    $(".mywechat").text(login.wechat)
    $(".myemail").text(login.email)
    $(".myqianming").text(login.qianming)
    $(".mydiqu").text(login.diqu)
    if ($.cookie('userlist')) {
      friendarr = JSON.parse($.cookie('userlist'));
      // grouplist = login.group
      // friendonline = grouplist
      showfriendlist(friendarr, friendonline)
    }
    // setTimeout(function () {
    //   if (!loading) {
    //     closeloading("加载失败")
    //     Message.error("服务器错误请稍后重新登录", 3000, function () {
    //       window.location.href = "login";
    //     })
    //   }
    // }, 20000)
    openloading()
    let data = {
      type: "login", userdata: login,
    }
    let data3 = {
      type: "alluid", userdata: login,
    }
    // WebSocket链接建立成功时发送登录
    ws.onopen = function () {
      wssend(ws, data)
      wssend(ws, data3)
    }
    // 桌面通知
    Push.Permission.request();
  } else {
    Message.info("请先登录")
    setTimeout(function () {
      window.location.href = "login"
    }, 1000)
  }

  // WebSocket接收消息
  ws.onmessage = function (res) {
    let data = JSON.parse(res.data)
    switch (data.type) {
      case "alluid": // 初始化所有好友
        friendonline = data.alluid.map(Number)
        let data2 = {
          id: login.id
        }
        Ajax("post", "querydata", data2, function (res) {
          $.cookie('userlist', JSON.stringify(res.data), {expires: 7});
          friendarr = res.data
          showfriendlist(friendarr, friendonline)
        }, function () {
          $.cookie('userlist', JSON.stringify(res.data), {expires: 7});
          friendarr = res.data
        }, false)
        closeloading();//关闭加载动画
        settime = setInterval(function () {
          show()
        }, 30000);//30秒刷新一次
        Ajax("post", "updateidentity", {"id": login.id}, function (res) {
          login = res.data
          $.cookie('login', JSON.stringify(res.data));
          // 填充页面数据
          $(".myheadimg").attr("src", "home/images/head/" + login.img)
          $(".own_head img").attr("src", "home/images/head/" + login.img)
          $(".mysex").attr("src", "home/images/icon/sex" + login.sex + ".png")
          $(".myname").text(login.name)
          $(".myname_span").text(login.name)
          $(".mywechat").text(login.wechat)
          $(".myemail").text(login.email)
          $(".myqianming").text(login.qianming)
          $(".mydiqu").text(login.diqu)
        })
        break;

      case "toid": // 接收个人消息
        if (data.byid == nowId) {
          answers(data, true)
        } else {
          //消息红点
          let usershow = ".usershowid_" + data.type + "_" + data.byid;
          $(usershow).addClass("user_list_show")
          answers(data, false);
          // xiaoxi = setInterval(function () {
          // }, 1000)
        }
        if (!visibilityState) {
          let datatext = data['data']
          if (data['chattype'] == "img") {
            datatext = "[图片]"
          }
          let push = {
            title: data['userdata']['name'] + "【 " + data['allnum'] + " 】",
            data: datatext,
            img: "/home/images/head/" + data['userdata']['img'],
            tag: new Date().getTime(),
            time: 4000,
          }
          Push.clear();
          showPush(push)
        }
        break;

      case "ping": // 心跳检测
        friendonline = data.alluid.map(Number)
        let data3 = {
          id: login.id
        }
        Ajax("post", "querydata", data3, function (res) {
          $.cookie('userlist', JSON.stringify(res.data), {expires: 7});
          friendarr = res.data
          showfriendlist(friendarr, friendonline)
        })
        break;

      case "login": // 有人上线
        // 判断不是自己并且在线列表中没有
        if (friendonline.indexOf(data['id']) == -1 && data["id"] != login.id) {
          friendonline.push(data["id"])
          showfriendlist(friendarr, friendonline)
        }
        // 打开了当前好友的窗口
        if (nowId == data["id"]) {
          $(".lthy_name").removeClass("isonline")
        }
        // 好友列表没有这个人(新注册的)
        if (findindexOf(friendarr, "id", data["id"]) == -1 && data["id"] != login.id) {
          let data2 = {
            id: login.id
          }
          Ajax("post", "querydata", data2, function (res) {
            friendarr = res.data
            showfriendlist(friendarr, friendonline)
          })
        }
        break;

      case "force_logout": // 被顶下线
        Message.info("另一台设备登录，即将退出!", 3000, function () {
          $.removeCookie("login")
          wsclose(ws)
          window.location.href = "login"
        })
        break;

      case "logout": // 有人下线
        // 当前在在线列表中
        if (friendonline.indexOf(data['id']) !== -1) {
          friendonline.splice(friendonline.indexOf(data['id']), 1)
          showfriendlist(friendarr, friendonline)
        }
        if (nowId == data["id"]) $(".lthy_name").addClass("isonline")
        break;

      case "toall": // 群组
        if (data['userdata']['id'] != login.id) {
          if (data.byid == nowId) {
            answers(data, true)
          } else {
            //消息红点
            let usershow = ".usershowid_" + data.type + "_" + data.byid;
            $(usershow).addClass("user_list_show")
            answers(data, false);
          }
        }
        break;
    }
  }

  //WebSocket连接关闭时的消息
  ws.onclose = function () {
    clearInterval(settime);
    console.log("WebSocket连接关闭");
  }

})

//点击切换聊天好友
$('body').on("click", ".user_list li", function () {
  nowId = $(this).attr("data-id")
  nowType = $(this).attr("data-type")
  let isline = $(this).attr("data-isline")
  // let text_name = ""
  if (isline == 0) {
    $(".lthy_name").addClass("isonline")
  } else {
    $(".lthy_name").removeClass("isonline")
  }
  $(".lthy_name").html($(this).find(".user_name").text() + "<span class='isline_name'>( 不在线 )</span>")
  let type = nowType == 1 ? 'toid' : 'toall'
  let html = ``
  let data = {
    byid: login.id,
    toid: nowId,
    type: type
  }
  let liaotianjilu = true
  Ajax("post", "querychatrecord", data, function (res) {
    let data = res.data
    for (let i = 0; i < data.length; i++) {
      if (data[i].byid == login.id) {
        if (data[i].chattype == "text") {
          html += `<li class="chatboxli me" data-id="${data[i]['byid']}"><span>${AnalyticEmotion(data[i].data)}</span><img src="home/images/head/${login.img}"></li>`;
        } else {
          html += `<li class="chatboxli me" data-id="${data[i]['byid']}"><span>${Analyticimg(data[i].data)}</span><img src="home/images/head/${login.img}"></li>`;
        }
      } else {
        if (data[i].chattype == "text") {
          html += `<li class="chatboxli other" data-id="${data[i]['byid']}"><img src="home/images/head/${data[i].img}"><span>${AnalyticEmotion(data[i].data)}</span></li>`;
        } else {
          html += `<li class="chatboxli other" data-id="${data[i]['byid']}"><img src="home/images/head/${data[i].img}"><span>${Analyticimg(data[i].data)}</span></li>`;
        }
      }
      if (liaotianjilu) {
        liaotianjilu = data[i].chattype == "text"
      }
    }
    $("#chatbox").html(html)
    //将滚动条始终保持在底部
    if (liaotianjilu) {
      $('#chatbox').scrollTop($('#chatbox')[0].scrollHeight);
    } else {
      $('#chatbox').find(".chatboxli span .chatimg").load(function () {
        $('#chatbox').scrollTop($('#chatbox')[0].scrollHeight);
      });
    }
  })

  $(this).addClass("user_active").siblings().removeClass("user_active")
  if ($(this).hasClass("user_list_show")) {
    let type = nowType == 1 ? 'toid' : 'toall'
    let data2 = {
      byid: nowId,
      toid: login.id,
      type: type
    }
    if (nowType == 1) {
      Ajax("post", "delnonews", data2) //删除未读消息
    }
    $(this).removeClass("user_list_show")
    $(this).find(".user_news_num").html("")
  }
  $(".talk_window_linshi").hide()
  $(".list_window").hide()
  $(".talk_window").show()
  $("#input_box").focus()
  for (let i = 0; i < friendarr.length; i++) {
    if (friendarr[i]['id'] == nowId && friendarr[i]['chatrecord']['allnum']) {
      friendarr[i]['chatrecord']['allnum'] = ""
      return
    }
  }
})

// 聊天界面点击查看好友详情
$("body").on("click", "#chatbox .chatboxli > img", function () {
  let toid = $(this).parents(".chatboxli").attr("data-id")
  if (toid == login.id) {
    return
  }
  document.getElementById('si_1').style.background = ""
  document.getElementById('si_2').style.background = "url(home/images/icon/head_3_1.png) no-repeat";
  document.getElementById('si_3').style.background = "";
  $(".middle").hide().eq(1).show();
  $("#si_2").click()
  let user_list = ".friends_list .friends_box_" + toid
  $(user_list).click()
})

//好友列表点击查看详情
$('body').on("click", ".friends_list .friends_box", function () {
  nowId = $(this).attr("data-id")
  let userdata = friendarr[findindexOf(friendarr, "id", nowId)]
  $(this).addClass("user_active").siblings().removeClass("user_active").parents(".haoyouliebiao").siblings().find(".friends_box").removeClass("user_active")
  $(".list_content_email").text(userdata['email'])
  $(".list_content_sex").attr("home/images/icon/sex" + userdata['sex'] + ".png")
  $(".list_content_qm").text(userdata['qianming'])
  $(".list_content_tx").attr("src", "home/images/head/" + userdata['img'])
  $(".list_content_wxh").text(userdata['wechat'])
  $(".list_content_dq").text(userdata['diqu'])
  $(".list_content3").show()

  $(".talk_window_linshi").hide()
  $(".talk_window").hide()
  $(".list_window").show()

})

//好友列表点击发送消息
$('body').on("click", ".list_content3", function () {
  document.getElementById('si_1').style.background = "url(home/images/icon/head_2_1.png) no-repeat"
  document.getElementById('si_2').style.background = "";
  document.getElementById('si_3').style.background = "";
  $(".middle").hide().eq(0).show();
  let user_list = ".user_list .usershowid_toid_" + nowId
  $(user_list).click()

})

//点击创建群聊
$('body').on("click", ".setgroup", function () {
  let data2 = {
    id: login.id
  }
  Ajax("post", "querydata2", data2, function (res) {
    let data = res.data
    let html1 = ""
    let html2 = ""
    for (let key in data) {
      let arr = data[key]
      html1 += `<li class="haoyouliebiao haoyouliebiao_${key}"><p>${key}</p>`
      for (let j = 0; j < arr.length; j++) {
        html1 += `<div class="friends_box friends_box_${arr[j]['id']}" data-id="${arr[j]['id']}">
                <div class="user_head"><img src="home/images/head/${arr[j]['img']}"/></div>
                <div class="friends_text"><p class="user_name">${arr[j]['name']}</p></div>
                <div class="setgroup_checkbox"><div class="setgroup_checkbox_content"></div></div></div>`
      }
      html1 += `</li>`
    }
    $(".setgroup_mengban_content_list1").html(html1)
    $(".setgroup_mengban").show()
  })

})

//点击选择群聊好友（创建）
$("body").on("click", ".setgroup_mengban_content_list1 .friends_box", function () {
  let id = $(this).attr("data-id")
  let userdata = {}
  $(this).toggleClass("user_active")
  if ($(this).hasClass("user_active")) {
    idarr.push(id)
    userdata = friendarr[findindexOf(friendarr, "id", id)]
    let html = `<div class="friends_box friends_box_${userdata['id']}" data-id="${userdata['id']}">
                <div class="user_head"><img src="home/images/head/${userdata['img']}"/></div>
                <div class="friends_text"><p class="user_name">${userdata['name']}</p></div>
                <div class="setgroup_close" title="点击取消选择">X</div></div>`
    $(".setgroup_mengban_content_list2").append(html)
  } else {
    if (idarr.indexOf(id) != -1) {
      idarr.splice(idarr.indexOf(id), 1);
    }
    let friends_box = ".setgroup_mengban_content_list2 .friends_box_" + id
    $(friends_box).remove()
  }
  $(".setgroup_idnum").text(idarr.length)
})

//点击取消选择群聊好友（创建）
$("body").on("click", ".setgroup_mengban_content_list2 .setgroup_close", function () {
  let id = $(this).parents(".friends_box").attr("data-id")
  if (idarr.indexOf(id) != -1) {
    idarr.splice(idarr.indexOf(id), 1);
  }
  let friends_box = ".setgroup_mengban_content_list1 .friends_box_" + id
  $(friends_box).removeClass("user_active")
  $(this).parents(".friends_box").remove()
  $(".setgroup_idnum").text(idarr.length)
})

//点击创建群聊（创建）
$("body").on("click", ".setgroup_mengban_content_list2_btn1", function () {
  if (idarr.length < 1) {
    Message.info("请先选择需要添加的联系人", 2000)
    return;
  }
  let data = {
    id: login.id,
    name: login.name,
    idarr: idarr
  }

  Ajax("post", "setgroup", data, function (res) {
    if (res.code == 1) {
      Message.success(res.data, 2000, function () {
        window.location.reload()
      })
    }

  })

})

//显示聊天好友列表
function showfriendlist(arr, alluid) {
  let html = ""
  let zaixian = []
  let buzaixian = []
  for (let i = 0; i < arr.length; i++) {
    if (alluid.indexOf(arr[i]['id']) != -1 || arr[i]['type'] == '2') {
      zaixian.push(arr[i])
    } else {
      //不在线
      buzaixian.push(arr[i])
    }
  }
  arr = zaixian.concat(buzaixian)
  friendarr = zaixian.concat(buzaixian)
  $.cookie('userlist', JSON.stringify(friendarr), {expires: 7});
  for (let i = 0; i < arr.length; i++) {
    // let usershow = ".usershowid_" + arr[i]['id'];
    let type = arr[i]['type'] == 1 ? 'toid' : 'toall'
    let user_message
    let user_time = gettime(arr[i]['chatrecord']['date'] ? arr[i]['chatrecord']['date'] : '');
    let user_news_num = arr[i]['chatrecord']['allnum'] ? '[ <span class="user_news_num_text">' + (arr[i]['chatrecord']['allnum'] < 100 ? arr[i]['chatrecord']['allnum'] : "99+") + '条 ]' : '';
    let user_list_show = arr[i]['chatrecord']['allnum'] ? 'user_list_show' : '';
    if (arr[i]['chatrecord']['chattype'] == 'text') {
      user_message = arr[i]['chatrecord']['data'] ? arr[i]['chatrecord']['data'] : '';
    } else {
      user_message = arr[i]['chatrecord']['data'] ? '[图片]' : '';
    }
    html += `<li class="usershowid_${type}_${arr[i]['id']} ${alluid.indexOf(arr[i]['id']) != -1 || arr[i]['type'] == '2' ? '' : 'isonline'}
      ${arr[i]['id'] == nowId ? 'user_active' : ''} ${user_list_show}"  data-id="${arr[i]['id']}"
      data-type="${arr[i]['type']}" data-isline="${alluid.indexOf(arr[i]['id']) != -1 || arr[i]['type'] == '2' ? '1' : '0'}">
      <div class="user_head"><img class="gray" src="home/images/head/${arr[i]['img']}" alt=""/></div>
      <div class="user_text"><p class="user_name">${arr[i]['name']}</p>
      <p class="user_message">${arr[i]['type'] == '2' && arr[i]['chatrecord']['name'] ? arr[i]['chatrecord']['name'] + ':&nbsp;' : ''}${user_message}</p></div>
      <div class="user_time">${user_time}</div>
      <div class="hongdian"></div>
      <div class="user_news_num">${user_news_num}</div></li>`;
  }
  $(".user_list").html(html)
}

//发送消息
function send() {
  let text = document.getElementById('input_box');
  let chat = document.getElementById('chatbox');
  let talk = document.getElementById('talkbox');

  if (text.value == '') {
    Message.info("不能发送空消息");
  } else {
    let type = nowType == 1 ? 'toid' : 'toall'
    let data = {
      type: type,
      date: new Date().getTime(),
      data: text.value.toString(),
      byid: login.id,
      toid: nowId,
      chattype: "text",
      userdata: login,
    }
    wssend(ws, data); //实时发送
    Ajax("post", "insertdata", data) //存入数据库
    chat.innerHTML += `<li class="chatboxli me"><span>${AnalyticEmotion(text.value)}</span><img src="home/images/head/${login.img}"></li>`;
    text.value = '';
    text.innerHTML = '';
    talk.style.background = "#FFFFFF";
    text.style.background = "#FFFFFF";
    let message = ".usershowid_" + type + "_" + nowId + " .user_message"
    let user_time = ".usershowid_" + type + "_" + nowId + " .user_time"
    $(message).text(data.data)
    $(user_time).text(gettime(data.date))
    //将滚动条始终保持在底部
    $('#chatbox').scrollTop($('#chatbox')[0].scrollHeight);
    for (let i = 0; i < friendarr.length; i++) {
      if (friendarr[i]['id'] == nowId) {
        friendarr[i]['chatrecord']['data'] = data.data
        friendarr[i]['chatrecord']['date'] = data.date
        friendarr[i]['chatrecord']['allnum'] = ""
        friendarr[i]['chatrecord']['chattype'] = data.chattype
        return
      }
    }
    showfriendlist(friendarr, friendonline)
    $.cookie('userlist', JSON.stringify(friendarr), {expires: 7});
  }
}

//接收消息
function answers(res, isnow) {
  let message = ".usershowid_" + res.type + "_" + res.byid + " .user_message"
  let user_time = ".usershowid_" + res.type + "_" + res.byid + " .user_time"
  let user_news = ".usershowid_" + res.type + "_" + res.byid + " .user_news_num"

  if (res.chattype == "text") {
    $(message).text(res.data)
  } else {
    $(message).text("[图片]")
  }
  $(user_time).text(gettime(res.date))
  let res_allnum = res.allnum
  if (isnow) {
    res_allnum = ""
    let answer = '';
    if (res.chattype == "text") {
      answer += `<li class="chatboxli other"><img src="home/images/head/${res.userdata.img}"><span>${AnalyticEmotion(res.data)}</span></li>`;
      $('#chatbox').append(answer);
      //将滚动条始终保持在底部
      $('#chatbox').scrollTop($('#chatbox')[0].scrollHeight);
    } else {
      answer += `<li class="chatboxli other"><img src="home/images/head/${res.userdata.img}"><span>${Analyticimg(res.data)}</span></li>`;
      $('#chatbox').append(answer);
      //将滚动条始终保持在底部
      $('#chatbox').find(".chatboxli:last-child > span .chatimg").load(function () {
        $('#chatbox').scrollTop($('#chatbox')[0].scrollHeight);
      });
    }
    let data = {
      byid: nowId,
      toid: login.id
    }
    if (nowType == 1) {
      Ajax("post", "delnonews", data) //删除未读消息
    }
  } else {
    let user_news_text = res.allnum ? '[ <span class="user_news_num_text">' + (res.allnum < 100 ? res.allnum : "99+") + '条 ]' : '';
    $(user_news).html(user_news_text)
  }

  for (let i = 0; i < friendarr.length; i++) {
    if (friendarr[i]['id'] == res.byid) {
      friendarr[i]['chatrecord']['data'] = res.data
      friendarr[i]['chatrecord']['date'] = res.date
      friendarr[i]['chatrecord']['allnum'] = res_allnum
      friendarr[i]['chatrecord']['chattype'] = res.chattype
      return;
    }
  }

}

//发送图片消息
function selectimg(upimg, callback, errFun) {
  let pic = upimg[0].files[0];
  let file = new FormData();
  if (pic['type'].indexOf("image") == -1) {
    Message.info("请选择图片", 2000, function () {
      $(".linshi").remove()
    })
    return false;
  }
  file.append('byid', login.id);
  file.append('toid', nowId);
  file.append('chattype', "img");
  file.append('file', pic);
  $.ajax({
    url: "index/selectimg",
    type: "post",
    data: file,
    cache: false,
    contentType: false,
    processData: false,
    success: function (res) {
      callback(res)
    },
    error: function (err) {
      errFun(err)
      console.log(err);
    }
  });
}

//上传头像到服务器
function upimg(upimg) {
  let pic = upimg[0].files[0];
  let file = new FormData();
  file.append('id', login.id);
  file.append('file', pic);
  let data_url = null
  $.ajax({
    url: "index/upimg",
    type: "post",
    data: file,
    cache: false,
    async: false,
    contentType: false,
    processData: false,
    success: function (res) {
      let data = JSON.parse(res)
      if (data.code == 1) {
        data_url = data.data
      }
    },
    error: function (err) {
      console.log(err);
    }
  });
  return data_url
}

//建立一可存取到file的url
function getObjectURL(file) {
  let url = null;
  if (window.createObjectURL != undefined) { // basic
    url = window.createObjectURL(file);
  } else if (window.URL != undefined) { // mozilla(firefox)
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL != undefined) { // webkit or chrome
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
}

//个性化输出时间
function gettime(time) {
  if (!time) {
    return "";
  }
  let passTime

  if (String(time).indexOf("-") != -1) {
    passTime = Date.parse(time);
  } else {
    passTime = time
  }

  let newTime = new Date().getTime();
  let shicha = newTime - passTime;
  //计算出相差天数
  let days = Math.floor(shicha / (24 * 3600 * 1000));
  //计算出小时数
  let leave1 = shicha % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
  let hours = Math.floor(leave1 / (3600 * 1000));
  //计算相差分钟数
  let leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
  let minutes = Math.floor(leave2 / (60 * 1000));
  //计算相差秒数
  let leave3 = leave2 % (60 * 1000);      //计算分钟数后剩余的毫秒数
  let seconds = Math.round(leave3 / 1000);
  //判断返回
  let d = new Date(time);
  if (days >= 366) {
    return d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日';
  } else if (days > 1 && days < 366) {
    return (d.getMonth() + 1) + '月' + d.getDate() + '日';
  } else if (days === 1) {
    return '昨天';
  } else if (hours >= 1 && hours < 24) {
    return hours + '小时前';
  } else if (hours < 1 && minutes >= 1) {
    return minutes + '分钟前';
  } else {
    return '刚刚';
  }
}

//封装ajax
function Ajax(method, url, data, callback = function () {
}, errFun = function () {
}, async = true) {
  $.ajax({
    url: "index/" + url,
    method: method,
    header: {'content-type': 'application/x-www-form-urlencoded'},
    data: data,
    timeout: 30000,
    async: async,
    success: function (res) {
      let data = JSON.parse(res)
      callback(data);
      if (data.code == "0") {
        console.log(data.msg)
      }
    },
    fail: function (err) {
      errFun(err)
      console.log(err);
    }
  })
}

//替换img
function Analyticimg(s, width, click) {
  return `<img class="chatimg ${click ? 'ViewBigImg_show' : ''}" src="${s}" style="width: ${width};">`
}

//查找数组
function findindexOf(arr, key, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] == val) {
      return i
    }
  }
  return -1
}

//心跳检测
function show() {
  ws.send(JSON.stringify({type: "ping", userdata: login}))
}

//发送实时消息(gatewaywork)
function wssend(ws, data) {
  ws.send(JSON.stringify(data))
}

//关闭实时发送链接(gatewaywork)
function wsclose(ws) {
  ws.close();
}

//开启加载gif
function openloading() {
  $(".office_text_loading p").hide()
  $(".office_text_loading img").show()
  // $(".office_text_loading .office_text_loading_bg").show()
  $(".office_text_loading").slideDown();
}

//关闭加载gif
function closeloading(msg = "加载成功") {
  loading = true
  $(".office_text_loading p").text(msg).show()
  $(".office_text_loading img").hide()
  // $(".office_text_loading .office_text_loading_bg").hide()
  setTimeout(function () {
    $(".office_text_loading").slideUp();
  }, 300)
}

//显示桌面通知
function showPush(data) {
  Push.create(data.title, {
    // body 选项是通知的内容
    body: data.data,
    // icon 选项是通知的图片
    icon: data.img,
    tag: data.id,
    // timeout 选项是通知停留时间
    timeout: data.time ? data.time : false,
    onClick: function () {
      window.focus();
      this.close();
    }
  });
}

$("body").on("click", ".ViewBigImg_show", function () {
  let src = $(this).attr("src")
  let html = `<div class="ViewBigImg"><div class="ViewBigImg_bg"></div><div class="ViewBigImg_content">
              <img src="${src}" alt="图片"></div></div>`
  $("body").append(html)

})
$("body").on("click", ".ViewBigImg_bg", function () {
  $(".ViewBigImg").remove()
})

//发送消息
$("#send").click(function () {
  send()
})
$('#input_box').on('keypress', function (e) {
  if (e.keyCode == '13') {  //按下回车
    e.preventDefault();
    send()
  }
})

//退出登录
$('.qcsession').click(function () {
  let data = {
    type: "logout", userdata: login,
  }
  wssend(ws, data)
  $.removeCookie("login")
  Message.success("退出成功", 600, function () {
    wsclose(ws)
    window.location.href = "login"
  })
})

//清空聊天记录
// $('.qkliaotianjilu').click(function () {
//   let data = {
//     byid: login.id, toid: nowId,
//   }
//   Ajax("post", "delchatrecord", data, function (res) {
//     for (let i = 0; i < friendarr.length; i++) {
//       if (friendarr[i]['id'] == res.byid) {
//         friendarr[i]['chatrecord'] = ""
//       }
//     }
//     Message.success("清空成功", 1000, function () {
//       window.location.reload()
//     })
//   })
// })