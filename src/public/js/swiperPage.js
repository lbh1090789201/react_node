/**
   * curPage 当前页码
   * el 目标元素
   * direction 切换方向，默认竖直方向切换 竖-vertical 横-parallel
   * time Number 页面切换效果时长 单位 秒 默认 1S
   * wrapper 子容器的元素
   * height 容器高度 单位 px
   * width 容器宽度 单位 px
   * minDistance 设置手指移动多长距离后开始开始判断是否移动容器 默认 20
   * maxDistance  设置手指移动多长距离后开始开始判断是否切换页面 默认 40
   * successFun 获取数据成功后需要执行的方法，需传参 className/totalPage
   * failFun 获取数据失败后需要执行的方法，需传参 className
   */
function PageSwiper(options) {
  var obj = null;
   obj = {
    direction: options.direction || "parallel",
    curPage : options.curPage || 1,
    totalPage : options.totalPage || 1,
    startPageX : 0,
    endPageX : 0,
    startPageY : 0,
    endPageY : 0,
    moveDistanceX : 0,
    moveDistanceY : 0,
    minDistance : 20,
    maxDistance : 80,
    time : options.time || 1,
    loadPreFinish : true,
    loadNextFinish : true,
    width : "",
    height: "",
    currentPageMoveDistance : 0,
    refresh : false,
    elClassName : options.el + " ",
    getData : (function() {
        if(options.getData) {
            return options.getData;
        }
        alert("getData不能为空！");
        return;
    })(),
    el : function(e) {
        var el = options.el ? options.el : "#swiper_container";
        var elem = document.querySelector(el);
        if(elem) {
            // this.elClassName = options.el + " ";
            return elem;
        }
        alert("el不能为空！");
        return;
    }(),
    wrapper : (function() {
        var wrapper = options.wrapper ? options.wrapper : ".current_swiper_subject";
        var elem = document.querySelector(wrapper);
        if(elem) {
            return elem;
        }
        alert("wrapper不能为空！");
        return;
    })(),
  }
  // obj.el();
      // var _this = null;
      // this.direction = options.direction || "parallel";
      // this.curPage = options.curPage || 1;
      // this.totalPage = options.totalPage || 1;
      // this.startPageX = 0;
      // this.endPageX = 0;
      // this.startPageY = 0;
      // this.endPageY = 0;
      // this.moveDistanceX = 0; // 手指横向移动距离
      // this.moveDistanceY = 0; // 手指竖向移动距离
      // this.minDistance = 20; // 设置手指移动多长距离后开始开始判断是否移动容器
      // this.maxDistance = 80; // 设置手指移动多长距离后开始开始判断是否切换页面
      // this.time = options.time || 1;
      // this.loadPreFinish= true; // 判断加载是否完成
      // this.loadNextFinish= true;
      // this.width;
      // this.height;
      // this.currentPageMoveDistance = 0;
      // this.refresh = false;
      // var _this = this;
      // this.getData = (function() {
      //     if(options.getData) {
      //         return options.getData;
      //     }
      //     alert("getData不能为空！");
      //     return;
      // })();
      // this.el = (function() {
      //     var el = options.el ? options.el : "#swiper_container";
      //     var elem = document.querySelector(el);
      //     if(elem) {
      //         obj.elClassName = options.el + " ";
      //         return elem;
      //     }
      //     alert("el不能为空！");
      //     return;
      // })();
      // this.wrapper = (function() {
      //     var wrapper = options.wrapper ? options.wrapper : ".current_swiper_subject";
      //     var elem = document.querySelector(wrapper);
      //     if(elem) {
      //         return elem;
      //     }
      //     alert("wrapper不能为空！");
      //     return;
      // })();
      function getStartTouchGrid(event) {
          event.preventDefault();
          event.stopPropagation();
          var touch = event.touches[0];
          obj.startPageX = touch.pageX;
          obj.startPageY = touch.pageY;
          obj.endPageX = touch.pageX;
          obj.endPageY = touch.pageY;
      };

      function getTouchMoveGrid() {
          event.preventDefault();
          event.stopPropagation();
          var touch = event.touches[0];
          obj.moveDistanceX = touch.pageX - obj.endPageX;
          obj.moveDistanceY = touch.pageY - obj.endPageY;
          obj.endPageX = touch.pageX;
          obj.endPageY = touch.pageY;

          if(obj.direction === "vertical") {
              if(obj.moveDistanceY > 0) {
                  // 向下方向移动
                  if(obj.curPage === 1) return;
                  // 先判断是否已加载完成
                  var transform = document.defaultView.getComputedStyle(obj.el, null).transform;
                  var isMoveDistanceY = Number(transform.substring(7).split(",")[5].replace(")", ""));
                  if(Math.abs(isMoveDistanceY) <= 0 && (!obj.loadNextFinish || !obj.loadPreFinish)) return;
                  // 判断数据是否加载成功，成功请在当前子容器上添加class true
                  var cur_curPage = document.querySelector(obj.elClassName + ".current_swiper_subject");
                  var children = obj.el.children;
                  var cur_curPage_index = [].indexOf.call(children, cur_curPage);
                  if(obj.wrapper.getAttribute("getData")== "true" || (cur_curPage_index + 1 == children.length && obj.wrapper.getAttribute("getData")== "false")) {
                      if(Math.abs(obj.endPageY - obj.startPageY) >= obj.minDistance && Math.abs(obj.endPageY - obj.startPageY) <= Number(obj.height.replace("px", ""))) {
                          // 开始移动容器
                          var hasMoveDistanceY = isMoveDistanceY + obj.moveDistanceY;
                          obj.el.style.transform = "translate3d(0, "+hasMoveDistanceY+"px, 0)";
                      }
                  }
              } else {
                  // 向上方向移动
                  if(obj.curPage === obj.totalPage) return;
                  // 先判断是否已加载完成
                  var transform = document.defaultView.getComputedStyle(obj.el, null).transform;
                  var isMoveDistanceY = Number(transform.substring(7).split(",")[5].replace(")", ""));
                  if(Math.abs(isMoveDistanceY) >= (obj.el.children.length - 1) * Number(obj.height.replace("px", "")) && (!obj.loadNextFinish || !obj.loadPreFinish)) return;
                  var cur_curPage = document.querySelector(obj.elClassName + ".current_swiper_subject");
                  var children = obj.el.children;
                  var cur_curPage_index = [].indexOf.call(children, cur_curPage);
                  if(obj.wrapper.getAttribute("getData")== "true" || (cur_curPage_index === 0 && obj.wrapper.getAttribute("getData")== "false")) {
                      if(Math.abs(obj.endPageY - obj.startPageY) >= obj.minDistance && Math.abs(obj.endPageY - obj.startPageY) <= Number(obj.height.replace("px", ""))) {
                          // 开始移动容器
                          var hasMoveDistanceY = isMoveDistanceY + obj.moveDistanceY;
                          obj.el.style.transform = "translate3d(0, "+hasMoveDistanceY+"px, 0)";
                      }
                  }
              }
          } else {
              if(obj.moveDistanceX > 0) {
                  // 向右方向移动
                  if(obj.curPage === 1) return;
                  // 先判断是否已加载完成
                  var transform = document.defaultView.getComputedStyle(obj.el, null).transform;
                  var isMoveDistanceX = Number(transform.substring(7).split(",")[4]);
                  if(Math.abs(isMoveDistanceX) <= 0 && (!obj.loadNextFinish || !obj.loadPreFinish)) return;
                  // 判断数据是否加载成功，成功请在当前子容器上添加class true
                  var cur_curPage = document.querySelector(obj.elClassName + ".current_swiper_subject");
                  var children = obj.el.children;
                  var cur_curPage_index = [].indexOf.call(children, cur_curPage);
                  if(obj.wrapper.getAttribute("getData")== "true" || (cur_curPage_index + 1 == children.length && obj.wrapper.getAttribute("getData")== "false")) {
                      if(Math.abs(obj.endPageX - obj.startPageX) >= obj.minDistance && Math.abs(obj.endPageX - obj.startPageX) <= Number(obj.width.replace("px", ""))) {
                          // 开始移动容器
                          var hasMoveDistanceX = isMoveDistanceX + obj.moveDistanceX;
                          obj.el.style.transform = "translate3d("+hasMoveDistanceX+"px, 0, 0)";
                      }
                  }
              } else {
                  // 向左方向移动
                  if(obj.curPage === obj.totalPage) return;
                  // 先判断是否已加载完成
                  var transform = document.defaultView.getComputedStyle(obj.el, null).transform;
                  var isMoveDistanceX = Number(transform.substring(7).split(",")[4]);
                  if(Math.abs(isMoveDistanceX) >= (obj.el.children.length - 1) * Number(obj.width.replace("px", "")) && (!obj.loadNextFinish || !obj.loadPreFinish)) return;
                  if(obj.wrapper.getAttribute("class").indexOf("next_swiper_subject") >= 0 && (!obj.loadNextFinish || !obj.loadPreFinish)) return;
                  var cur_curPage = document.querySelector(obj.elClassName + ".current_swiper_subject");
                  var children = obj.el.children;
                  var cur_curPage_index = [].indexOf.call(children, cur_curPage);
                  if(obj.wrapper.getAttribute("getData")== "true" || (cur_curPage_index === 0 && obj.wrapper.getAttribute("getData")== "false")) {
                      if(Math.abs(obj.endPageX - obj.startPageX) >= obj.minDistance && Math.abs(obj.endPageX - obj.startPageX) <= Number(obj.width.replace("px", ""))) {
                          // 开始移动容器
                          var hasMoveDistanceX = isMoveDistanceX + obj.moveDistanceX;
                          obj.el.style.transform = "translate3d("+hasMoveDistanceX+"px, 0, 0)";
                      }
                  }
              }
          }
      }
      function getTouchEndGrid() {
          event.preventDefault();
          event.stopPropagation();
          if(obj.direction === "vertical") {
              if(obj.endPageY - obj.startPageY > 0) {
                  // 向下方向移动
                  if(obj.curPage === 1) return;
                  // 先判断是否已加载完成
                  var transform = document.defaultView.getComputedStyle(obj.el, null).transform;
                  var isMoveDistanceY = Number(transform.substring(7).split(",")[5].replace(")", ""));
                  if(Math.abs(isMoveDistanceY) <= 0 && (!obj.loadNextFinish || !obj.loadPreFinish)) return;
                  var cur_curPage = document.querySelector(obj.elClassName + ".current_swiper_subject");
                  var children = obj.el.children;
                  var cur_curPage_index = [].indexOf.call(children, cur_curPage);
                  if(obj.wrapper.getAttribute("getData")== "true" || (cur_curPage_index + 1 == children.length && obj.wrapper.getAttribute("getData")== "false")) {
                      var hasMoveDistanceY = isMoveDistanceY;
                      if(Math.abs(obj.endPageY - obj.startPageY) >= obj.maxDistance) {
                          // 翻页
                          var needMoveDistanceY = Number(obj.height.replace("px", "")) - (obj.currentPageMoveDistance - Math.abs(hasMoveDistanceY));
                          obj.el.style.transform = "translate3d(0, "+(hasMoveDistanceY + needMoveDistanceY)+"px, 0)";
                          obj.el.style.transition = "transform, "+obj.time+"s";
                          obj.currentPageMoveDistance -= Number(obj.height.replace("px", ""));

                          setTimeout(function() {
                              obj.el.style.transition = "transform, 0s";
                          }, obj.time * 1000);
                          var timer1 = setInterval(function() {
                              // 先判断是否已加载完成
                              if(obj.loadNextFinish && obj.loadPreFinish) {
                                  clearInterval(timer1)
                                  // 重新赋值
                                  var old_prePage = document.querySelector(obj.elClassName + ".pre_swiper_subject");
                                  var old_curPage = document.querySelector(obj.elClassName + ".current_swiper_subject");
                                  var old_nextPage = document.querySelector(obj.elClassName + ".next_swiper_subject");
                                  var children = obj.el.children;
                                  var old_prePage_index = [].indexOf.call(children, old_prePage);
                                  old_prePage.setAttribute("class", old_prePage.className.replace("pre_swiper_subject", "current_swiper_subject"));
                                  old_curPage.setAttribute("class", old_curPage.className.replace("current_swiper_subject", "next_swiper_subject"));
                                  if(old_nextPage) {
                                      // 可能会不存在下一页
                                      old_nextPage.setAttribute("class", old_nextPage.className.replace("next_swiper_subject", ""));
                                  }
                                  obj.wrapper = old_prePage;
                                  obj.curPage -= 1;
                                  if(old_prePage_index == 0) {
                                      // 当前页是第一页
                                      if(obj.curPage !== 1 && old_prePage.getAttribute("getData")== "true") {
                                          obj.generatePrePage(obj.curPage - 1);
                                          obj.el.style.height = Number(obj.el.style.height.replace("px", "")) + Number(obj.height.replace("px", "")) + "px";
                                          obj.el.style.transform = "translate3d(0, -"+(obj.currentPageMoveDistance + Number(obj.height.replace("px", "")))+"px, 0)";
                                          obj.currentPageMoveDistance += Number(obj.height.replace("px", ""));
                                      }
                                  } else {
                                      // 已存在上一页
                                      children[old_prePage_index - 1].setAttribute("class", children[old_prePage_index - 1].className+" pre_swiper_subject");
                                  }
                              }
                          }, 10)


                      } else {
                          // 回退到当前页面
                          obj.el.style.transform = "translate3d(0, -"+obj.currentPageMoveDistance+"px, 0)";
                      }
                  }
              } else {
                  // 向上方向移动
                  if(obj.curPage === obj.totalPage) return;
                  // 先判断是否已加载完成
                  var transform = document.defaultView.getComputedStyle(obj.el, null).transform;
                  var isMoveDistanceY = Number(transform.substring(7).split(",")[5].replace(")", ""));
                  if(Math.abs(isMoveDistanceY) >= (obj.el.children.length - 1) * Number(obj.height.replace("px", "")) && (!obj.loadNextFinish || !obj.loadPreFinish)) return;
                  var cur_curPage = document.querySelector(obj.elClassName + ".current_swiper_subject");
                  var children = obj.el.children;
                  var cur_curPage_index = [].indexOf.call(children, cur_curPage);
                  if(obj.wrapper.getAttribute("getData")== "true" || (cur_curPage_index === 0 && obj.wrapper.getAttribute("getData")== "false")) {
                      var hasMoveDistanceY = isMoveDistanceY;
                      if(Math.abs(obj.endPageY - obj.startPageY) >= obj.maxDistance) {
                          // 翻页
                          var needMoveDistanceY = Number(obj.height.replace("px", "")) - (Math.abs(hasMoveDistanceY) - obj.currentPageMoveDistance);
                          obj.el.style.transform = "translate3d(0, "+(hasMoveDistanceY - needMoveDistanceY)+"px, 0)";
                          obj.el.style.transition = "transform, "+obj.time+"s";
                          obj.currentPageMoveDistance += Number(obj.height.replace("px", ""));

                          setTimeout(function() {
                              obj.el.style.transition = "transform, 0s";
                          }, obj.time * 1000);

                          var timer2 = setInterval(function() {
                              // 先判断是否已加载完成
                              if(obj.loadNextFinish && obj.loadPreFinish) {
                                  clearInterval(timer2);
                                  // 重新赋值
                                  var old_prePage = document.querySelector(obj.elClassName + ".pre_swiper_subject");
                                  var old_curPage = document.querySelector(obj.elClassName + ".current_swiper_subject");
                                  var old_nextPage = document.querySelector(obj.elClassName + ".next_swiper_subject");
                                  var children = obj.el.children;
                                  var old_nextPage_index = [].indexOf.call(children, old_nextPage);
                                  if(old_prePage) {
                                      // 可能会不存在上一页
                                      old_prePage.setAttribute("class", old_prePage.className.replace("pre_swiper_subject", ""));
                                  }
                                  old_curPage.setAttribute("class", old_curPage.className.replace("current_swiper_subject", "pre_swiper_subject"));
                                  old_nextPage.setAttribute("class", old_nextPage.className.replace("next_swiper_subject", "current_swiper_subject"));
                                  obj.wrapper = old_nextPage;
                                  obj.curPage += 1;
                                  if(old_nextPage_index + 1 === children.length) {
                                      // 当前页已是最后一页
                                      if(obj.curPage !== obj.totalPage && old_nextPage.getAttribute("getData")== "true") {
                                          obj.generateNextPage(obj.curPage + 1);
                                          obj.el.style.height = Number(obj.el.style.height.replace("px", "")) + Number(obj.height.replace("px", "")) + "px";
                                      }
                                  } else {
                                      // 已存在下一页
                                      children[old_nextPage_index + 1].setAttribute("class", children[old_nextPage_index + 1].className+" next_swiper_subject");
                                  }
                              }

                          }, 10);
                      } else {
                          // 回退到当前页面
                          obj.el.style.transform = "translate3d(0, -"+obj.currentPageMoveDistance+"px, 0)";
                      }
                  }
              }
          } else {
              if(obj.endPageX - obj.startPageX > 0) {
                  // 向右方向移动
                  if(obj.curPage === 1) return;
                  // 先判断是否已加载完成
                  var transform = document.defaultView.getComputedStyle(obj.el, null).transform;
                  var isMoveDistanceX = Number(transform.substring(7).split(",")[4]);
                  if(Math.abs(isMoveDistanceX) <= 0 && (!obj.loadNextFinish || !obj.loadPreFinish)) return;
                  var cur_curPage = document.querySelector(obj.elClassName + ".current_swiper_subject");
                  var children = obj.el.children;
                  var cur_curPage_index = [].indexOf.call(children, cur_curPage);
                  if(obj.wrapper.getAttribute("getData")== "true" || (cur_curPage_index + 1 == children.length && obj.wrapper.getAttribute("getData")== "false")) {
                      var hasMoveDistanceX = isMoveDistanceX;
                      if(Math.abs(obj.endPageX - obj.startPageX) >= obj.maxDistance) {
                          // 翻页
                          var needMoveDistanceX = Number(obj.width.replace("px", "")) - (obj.currentPageMoveDistance - Math.abs(hasMoveDistanceX));
                          obj.el.style.transform = "translate3d("+(hasMoveDistanceX + needMoveDistanceX)+"px, 0, 0)";
                          obj.el.style.transition = "transform, "+obj.time+"s";
                          obj.currentPageMoveDistance -= Number(obj.width.replace("px", ""));

                          setTimeout(function() {
                              obj.el.style.transition = "transform, 0s";
                          }, obj.time * 1000);
                          var timer1 = setInterval(function() {
                              // 先判断是否已加载完成
                              if(obj.loadNextFinish && obj.loadPreFinish) {
                                  clearInterval(timer1)
                                  // 重新赋值
                                  var old_prePage = document.querySelector(obj.elClassName + ".pre_swiper_subject");
                                  var old_curPage = document.querySelector(obj.elClassName + ".current_swiper_subject");
                                  var old_nextPage = document.querySelector(obj.elClassName + ".next_swiper_subject");
                                  var children = obj.el.children;
                                  var old_prePage_index = [].indexOf.call(children, old_prePage);
                                  old_prePage.setAttribute("class", old_prePage.className.replace("pre_swiper_subject", "current_swiper_subject"));
                                  old_curPage.setAttribute("class", old_curPage.className.replace("current_swiper_subject", "next_swiper_subject"));
                                  if(old_nextPage) {
                                      // 可能会不存在下一页
                                      old_nextPage.setAttribute("class", old_nextPage.className.replace("next_swiper_subject", ""));
                                  }
                                  obj.wrapper = old_prePage;
                                  obj.curPage -= 1;
                                  if(old_prePage_index == 0) {
                                      // 当前页是第一页
                                      if(obj.curPage !== 1 && old_prePage.getAttribute("getData")== "true") {
                                          obj.generatePrePage(obj.curPage - 1);
                                          obj.el.style.width = Number(obj.el.style.width.replace("px", "")) + Number(obj.width.replace("px", "")) + "px";
                                          obj.el.style.transform = "translate3d(-"+(obj.currentPageMoveDistance + Number(obj.width.replace("px", "")))+"px, 0, 0)";
                                          obj.currentPageMoveDistance += Number(obj.width.replace("px", ""));
                                      }
                                  } else {
                                      // 已存在上一页
                                      children[old_prePage_index - 1].setAttribute("class", children[old_prePage_index - 1].className+" pre_swiper_subject");
                                  }
                              }
                          }, 10)


                      } else {
                          // 回退到当前页面
                          obj.el.style.transform = "translate3d(-"+obj.currentPageMoveDistance+"px, 0, 0)";
                      }
                  }
              } else {
                  // 向左方向移动
                  if(obj.curPage === obj.totalPage) return;
                  // 先判断是否已加载完成
                  var transform = document.defaultView.getComputedStyle(obj.el, null).transform;
                  var isMoveDistanceX = Number(transform.substring(7).split(",")[4]);
                  if(Math.abs(isMoveDistanceX) >= (obj.el.children.length - 1) * Number(obj.width.replace("px", "")) && (!obj.loadNextFinish || !obj.loadPreFinish)) return;
                  var cur_curPage = document.querySelector(obj.elClassName + ".current_swiper_subject");
                  var children = obj.el.children;
                  var cur_curPage_index = [].indexOf.call(children, cur_curPage);
                  if(obj.wrapper.getAttribute("getData")== "true" || (cur_curPage_index === 0 && obj.wrapper.getAttribute("getData")== "false")) {
                      var hasMoveDistanceX = isMoveDistanceX;
                      if(Math.abs(obj.endPageX - obj.startPageX) >= obj.maxDistance) {
                          // 翻页
                          var needMoveDistanceX = Number(obj.width.replace("px", "")) - (Math.abs(hasMoveDistanceX) - obj.currentPageMoveDistance);
                          obj.el.style.transform = "translate3d("+(hasMoveDistanceX - needMoveDistanceX)+"px, 0, 0)";
                          obj.el.style.transition = "transform, "+obj.time+"s";
                          obj.currentPageMoveDistance += Number(obj.width.replace("px", ""));

                          setTimeout(function() {
                              obj.el.style.transition = "transform, 0s";
                          }, obj.time * 1000);

                          var timer2 = setInterval(function() {
                              // 先判断是否已加载完成
                              if(obj.loadNextFinish && obj.loadPreFinish) {
                                  clearInterval(timer2);
                                  // 重新赋值
                                  var old_prePage = document.querySelector(obj.elClassName + ".pre_swiper_subject");
                                  var old_curPage = document.querySelector(obj.elClassName + ".current_swiper_subject");
                                  var old_nextPage = document.querySelector(obj.elClassName + ".next_swiper_subject");
                                  var children = obj.el.children;
                                  var old_nextPage_index = [].indexOf.call(children, old_nextPage);
                                  if(old_prePage) {
                                      // 可能会不存在上一页
                                      old_prePage.setAttribute("class", old_prePage.className.replace("pre_swiper_subject", ""));
                                  }
                                  old_curPage.setAttribute("class", old_curPage.className.replace("current_swiper_subject", "pre_swiper_subject"));
                                  old_nextPage.setAttribute("class", old_nextPage.className.replace("next_swiper_subject", "current_swiper_subject"));
                                  obj.wrapper = old_nextPage;
                                  obj.curPage += 1;
                                  if(old_nextPage_index + 1 === children.length) {
                                      // 当前页已是最后一页
                                      if(obj.curPage !== obj.totalPage && old_nextPage.getAttribute("getData")== "true") {
                                          obj.generateNextPage(obj.curPage + 1);
                                          obj.el.style.width = Number(obj.el.style.width.replace("px", "")) + Number(obj.width.replace("px", "")) + "px";
                                      }
                                  } else {
                                      // 已存在下一页
                                      children[old_nextPage_index + 1].setAttribute("class", children[old_nextPage_index + 1].className+" next_swiper_subject");
                                  }
                              }

                          }, 10);
                      } else {
                          // 回退到当前页面
                          obj.el.style.transform = "translate3d(-"+obj.currentPageMoveDistance+"px, 0, 0)";
                      }
                  }
              }
          }

      }
      /**
       * 生成上一页的容器
       */
      obj.generatePrePage = function(page, boolean) {
          obj.loadPreFinish = false;
          var className = obj.wrapper.getAttribute("class");
          className = className.replace("current_swiper_subject", "pre_swiper_subject").replace("true", "");
          var prePage = document.createElement("div");
          prePage.className = className;
          if(obj.direction !== "vertical") {
              prePage.style.float = "left";
              prePage.style.overflowX = "hidden";
              prePage.style.overflowY = "auto";
              prePage.style.padding =  "0 2px";
          } else {
              prePage.style.overflow = "hidden";
          }
          prePage.style.height = obj.height;
          prePage.style.width = obj.width;
          if(!boolean) {
              prePage.innerHTML = "<div>加载中...</div>";
          }
          obj.el.insertBefore(prePage,obj.el.firstChild);
          obj.getData(obj.elClassName + ".pre_swiper_subject", page, obj.successFun, obj.failFun);
      }
      /**
       * 生成下一页的容器
       */
      obj.generateNextPage = function(page) {
          obj.loadNextFinish = false;
          var className = obj.wrapper.getAttribute("class");
          className = className.replace("current_swiper_subject", "next_swiper_subject").replace("true", "");
          var nextPage = document.createElement("div");
          nextPage.className = className;
          if(obj.direction !== "vertical") {
              nextPage.style.float = "left";
              nextPage.style.overflowX = "hidden";
              nextPage.style.overflowY = "auto";
              nextPage.style.padding =  "0 2px";
          } else {
              nextPage.style.overflow = "hidden";
          }
          nextPage.style.height = obj.height;
          nextPage.style.width = obj.width;
          nextPage.innerHTML = "<div>加载中2...</div>";
          obj.el.appendChild(nextPage);
          obj.getData(obj.elClassName + ".next_swiper_subject", page, obj.successFun, obj.failFun);
      }
      /**
       * successFun 获取数据成功后需要执行的方法
       */
      obj.successFun = function(className, totalPages) {
            obj.totalPage = totalPages;
            var elem = document.querySelector(className);
            if(!elem.getAttribute("getData")) {
                elem.setAttribute("getData", "true");
            } else if(elem.getAttribute("getData") == "false") {
                // refress-data重新获取数据，成功后的回调
                var children = obj.el.children;
                var elem_index = [].indexOf.call(children, elem);
                if(elem_index === 0) {
                    // 当前页为第一页
                    if(obj.curPage !== 1) {
                          obj.generatePrePage(obj.curPage - 1);
                          obj.el.style.width = Number(obj.el.style.width.replace("px", "")) + Number(obj.width.replace("px", "")) + "px";
                          obj.el.style.transform = "translate3d(-"+(obj.currentPageMoveDistance + Number(obj.width.replace("px", "")))+"px, 0, 0)";
                          obj.currentPageMoveDistance += Number(obj.width.replace("px", ""));
                      }
                } else {
                    if(obj.curPage !== obj.totalPage) {
                          obj.generateNextPage(obj.curPage + 1);
                          obj.el.style.width = Number(obj.el.style.width.replace("px", "")) + Number(obj.width.replace("px", "")) + "px";
                      }
                }
            }

            if(className.indexOf(".pre_swiper_subject") >= 0) {
                obj.loadPreFinish = true;
            } else if(className.indexOf(".next_swiper_subject") >= 0) {
                obj.loadNextFinish = true;
            }
      }
      /**
       * failFun 获取数据失败后需要执行的方法
       */
      obj.failFun = function(className) {
          var elem = document.querySelector(className);
          elem.setAttribute("getData", "false");
          elem.innerHTML = '<div><span class="refress-data" style="color: blue;">重新刷新</span></div>';
          document.querySelector(obj.elClassName + ".refress-data").addEventListener("touchstart", function() {
              obj.getData(obj.elClassName + ".current_swiper_subject", obj.curPage, obj.successFun, obj.failFun);
          });
          if(className.indexOf(".pre_swiper_subject") >= 0) {
              obj.loadPreFinish = true;
          } else if(className.indexOf(".next_swiper_subject") >= 0) {
              obj.loadNextFinish = true;
          }
      }
      /**
       * 添加事件
       */
      obj.addEvent = function() {
          obj.el.ontouchstart = getStartTouchGrid;
          obj.el.ontouchmove = getTouchMoveGrid;
          obj.el.ontouchend = getTouchEndGrid;
      }
      /**
       * 移除事件
       */
      obj.removeEvent = function() {
          // obj.el.removeEventListener("touchstart", getStartTouchGrid, true);
          // obj.el.removeEventListener("touchmove", getTouchMoveGrid, true);
          // obj.el.removeEventListener("touchend", getTouchEndGrid, true);
      }
      /**
       * 初始化插件
       */
      obj.initSwiper = function() {
          obj.addEvent();
          // 为当前页面添加class
          if(obj.direction === "vertical") {
              var contianer = document.createElement("div");
              contianer.style.height = options.height ?  Number(options.height.replace("px", "")) + "px" : document.body.clientHeight + "px" ;
              contianer.style.width = options.width || document.body.clientWidth + "px" ;
              obj.el.style.overflow = "hidden";
              obj.el.style.height = options.height || document.body.clientHeight + "px" ;
              obj.el.style.width = options.width || document.body.clientWidth + "px" ;
              obj.el.innerHTML = "";
              obj.el.appendChild(contianer);
              obj.el = contianer;
              obj.el.appendChild(obj.wrapper);
              obj.height = options.height || document.body.clientHeight + "px";
              obj.width = options.width || obj.el.offsetWidth + "px";
              obj.wrapper.style.overflow = "hidden";
          } else {
              obj.el.style.height = options.height || document.body.clientHeight + "px" ;
              obj.el.style.width = options.width ? Number(options.width.replace("px", "")) + "px" : document.body.clientWidth + "px";
              obj.wrapper.style.float = "left";
              obj.wrapper.style.overflowX = "hidden";
              obj.wrapper.style.overflowY = "auto";
              obj.wrapper.style.padding =  "0 2px";
              obj.height = options.height || obj.el.offsetHeight + "px";
              obj.width = options.width || document.body.clientWidth + "px";
          }
          obj.wrapper.style.height = obj.height;
          obj.wrapper.style.width = obj.width;
          obj.el.style.transform = "translate3d(0, 0, 0)";

          // 自动生成上下一页的内容容器及数据
          if(obj.curPage !== 1) {
              // 非首页
              obj.generatePrePage(obj.curPage - 1, true);
              obj.el.style.width = Number(obj.el.style.width.replace("px", "")) + Number(obj.width.replace("px", "")) + "px";
              var elem = document.querySelector(obj.elClassName + ".pre_swiper_subject");
              if(obj.direction === "vertical") {
                  obj.el.style.transform = "translate3d(0, -"+obj.height+", 0)";
                  obj.currentPageMoveDistance = Number(obj.height.replace("px", ""));
              } else {
                  obj.el.style.transform = "translate3d(-"+obj.width+", 0, 0)";
                  obj.currentPageMoveDistance = Number(obj.width.replace("px", ""));
              }
          };
          if(obj.curPage !== obj.totalPage) {
              // 存在下一页
              obj.generateNextPage(obj.curPage + 1);
              obj.el.style.width = Number(obj.el.style.width.replace("px", "")) + Number(obj.width.replace("px", "")) + "px";
          }
      }

      /**
       * 初始化，获取数据
       */
      obj.init = function() {
          var classList = obj.wrapper.getAttribute("class");
          if(classList.indexOf("current_swiper_subject") == -1) {
              obj.wrapper.setAttribute("class", classList + " current_swiper_subject");
          }
          obj.getData(obj.elClassName + ".current_swiper_subject", obj.curPage, obj.successFun, obj.failFun);
      }

      // 初始化，只在初次构建才会执行初始化
      if(!obj.refresh && obj.el && obj.wrapper && obj.getData) {
          obj.refresh = true;
          obj.init();
          obj.initSwiper();
      }
  }
  export default PageSwiper;
