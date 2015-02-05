(function() {

  var MIN_HEIGHT = 30;
  var MIN_WIDTH = 30;
  var MAX_HEIGHT = 350;
  var MAX_WIDTH = 350;

  var PATH_TO_VIDEO = "http://www.youtube.com/v/MAtCSio876c?version=3&autoplay=1&loop=1&playlist=MAtCSio876c";

  // var CSS_BASE_CLASS = "left-shark-start";
  // var CSS_SLOW_CLASS = "left-shark-slow";
  // var CSS_FIRST_CLASS = "im_first";
  // var CSS_OTHER_CLASSES = ["swirl", "macarena", "trippin", "ass-drop"];

  // var CSS_STROBE_CLASS = "strobe-light";

  // var PATH_TO_CSS = "//cdn.rawgit.com/left-shark/left-shark/master/css/leftShark.css";
  var PATH_TO_CSS = "../css/leftShark.css";

  var FILE_ADDED_CLASS = "added-css";

  function addCSS() {
    var css = document.createElement("link");
    css.setAttribute("type", "text/css");
    css.setAttribute("rel", "stylesheet");
    css.setAttribute("href", PATH_TO_CSS);
    css.setAttribute("class", FILE_ADDED_CLASS);

    document.body.appendChild(css);
  }

  // function removeAddedFiles() {
  //   var addedFiles = document.getElementsByClassName(FILE_ADDED_CLASS);
  //   for (var i=0; i<addedFiles.length; i++) {
  //     document.body.removeChild(addedFiles[i]);
  //   }
  // }

  // function flashScreen() {
  //   var flash = document.createElement("div");
  //   flash.setAttribute("class", CSS_STROBE_CLASS);
  //   document.body.appendChild(flash);

  //   setTimeout(function() {
  //     document.body.removeChild(flash);
  //   }, 100);
  // }

  function size(node) {
    return {
      height: node.offsetHeight,
      width: node.offsetWidth
    };
  }

  function withinBounds(node) {
    var nodeFrame = size(node);
    return (nodeFrame.height > MIN_HEIGHT &&
            nodeFrame.height < MAX_HEIGHT &&
            nodeFrame.width > MIN_WIDTH &&
            nodeFrame.width < MAX_WIDTH);
  }

  function posY(elm) {
    var test = elm;
    var top = 0;
    while (!!test) {
      top += test.offsetTop;
      test = test.offsetParent;
    }
    return top;
  }

  function viewPortHeight() {
    var de = document.documentElement;
    if (!!window.innerWidth) {
      return window.innerHeight;
    } else if (de && !isNaN(de.clientHeight)) {
      return de.clientHeight;
    }
    return 0;
  }

  function scrollY() {
    if (window.pageYOffset) {
      return window.pageYOffset;
    }
    return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
  }

  var vpH = viewPortHeight();
  var st = scrollY();
  function isVisible(node) {
    var y = posY(node);

    return (y >= st && y <= (vpH + st));
  }

  function playVideo() {
    var video = document.createElement("iframe");
    // video.setAttribute("class", FILE_ADDED_CLASS);
    video.src = PATH_TO_VIDEO;
    video.height = 400;
    video.width = 400;
    video.autoplay = true;
    document.body.appendChild(video);
  }

  // function firstDance(node) {
  //   node.className += " "+CSS_BASE_CLASS+" "+CSS_FIRST_CLASS;
  // }
  // function othersDance(node) {
  //   node.className += " "+CSS_BASE_CLASS+" "+CSS_OTHER_CLASSES[Math.floor(Math.random()*CSS_OTHER_CLASSES.length)];
  // }

  // function allSlowDance() {
  //   var shakingNodes = document.getElementsByClassName(CSS_BASE_CLASS);
  //   for (var i=0; i<shakingNodes.length; ) {
  //     shakingNodes[i].className = shakingNodes[i].className.replace(CSS_BASE_CLASS, CSS_SLOW_CLASS);
  //   }
  //   CSS_BASE_CLASS = CSS_SLOW_CLASS;
  // }

  // function allStopDancing() {
  //   var shakingNodes = document.getElementsByClassName(CSS_BASE_CLASS);
  //   var regex = new RegExp('\\b'+CSS_BASE_CLASS+'\\b');
  //   for (var i=0; i<shakingNodes.length; ) {
  //     shakingNodes[i].className = shakingNodes[i].className.replace(regex, "");
  //   }
  // }

  // get first item
  var allNodes = document.getElementsByTagName("*"), len = allNodes.length, i, thisNode;
  var firstNode = null;
  for (i = 0; i < len; i++) {
    thisNode = allNodes[i];
    if (withinBounds(thisNode)) {
      if(isVisible(thisNode)) {
        firstNode = thisNode;
        break;
      }
    }
  }

  if (thisNode === null) {
    alert("Could not find a node of the right size. Please try a different page.");
    return;
  }

  // insert CSS
  addCSS();

  // play song
  playVideo();

  var allShakeableNodes = [];

  for (i = 0; i < len; i++) {
    thisNode = allNodes[i];
    if (withinBounds(thisNode)) {
      allShakeableNodes.push(thisNode);
    }
  }


  var allElements = document.querySelectorAll('body *');
  for (var i = 0; i < allElements.length; i++) {
    var element = allElements[i];

    setTimeout(function(element) {
      element.classList.add('wobble');
      element.classList.add('left-shark-start');
      element.classList.add('left-shark-slow');
    }.bind(null, element), 100 + Math.random()*1000);
  }


  return true;
})();
