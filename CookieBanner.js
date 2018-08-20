/* CREATE, SET, READ & ERASE COOKIES
 * =============================== */
var Cookies = {
    init: function () {
        var allCookies = document.cookie.split('; ');
        for (var i = 0; i < allCookies.length; i++) {
            var cookiePair = allCookies[i].split('=');
            this[cookiePair[0]] = cookiePair[1];
        }
    },
    create: function (name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
        this[name] = value;
    },
    erase: function (name) {
        this.create(name, '', -1);
        this[name] = undefined;
    }
};
Cookies.init();

//COOKIE POLICY
function cookiePolicy(cookieKey, cookieName,days) {
  Cookies.create(cookieKey, cookieName, days);
}

//BANNER VARIABLE
setTimeout(function(){
  var cookieBanner = document.getElementById("cookieBanner");
},100);

//IF COOKIES NOT ACCEPTED
document.addEventListener("DOMContentLoaded", function () {
    var cookieKey = document.getElementById('hdnCookieKey').value;
    if (!Cookies[cookieKey]) {
        cookieBanner.classList.add('slideInDown')
        setTimeout(function () { cookieBanner.style.display = "flex" }, 900);
    }
})

//COOKIE BANNER STYLE
var translateZ = "-webkit-transform:translateZ(0);transform:translateZ(0)",
    translate3d = "-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0);visibility:",
    css = document.createElement('style');

css.innerHTML = "@keyframes slideOutUp{0%{" + translateZ + "}to {" + translate3d + "hidden;}}"
    + "@-webkit-keyframes slideOutUp{0%{" + translateZ + "}to {" + translate3d + "hidden;}}"
    + "#cookieBanner.out {-webkit-animation: slideOutUp .6s ease 0s; animation: slideOutUp .6s ease 0s;}"
    + "@-webkit-keyframes slideInDown{0%{" + translate3d + "visible}to{" + translateZ + "}}"
    + "@keyframes slideInDown{0%{" + translate3d + "visible}to{" + translateZ + "}}"
    + ".slideInDown{-webkit-animation: slideInDown .6s ease 0s; animation: slideInDown .6s ease 0s;}";
document.getElementsByTagName("head")[0].appendChild(css);

//COOKIE BANNER CLICK
function acceptCookies(cookieKey, cookieName, days) {
  cookiePolicy(cookieKey, cookieName, days);
  cookieBanner.classList.add('out');
  setInterval(function(){cookieBanner.style.display="none";},600);
}

//COOKIE BANNER SCROLL
function bannerScroll() {

  var docClass = document.getElementsByClassName.bind(document),
      scroll =  document.body.scrollTop || document.documentElement.scrollTop,
      headerHeight = docClass("top-header")[0].offsetHeight + docClass("bottom-header")[0].offsetHeight;

    if (scroll >= headerHeight) {
      cookieBanner.classList.add("affix","top-left","slideInDown")
    } else {
      cookieBanner.classList.remove("affix","top-left","slideInDown")
    }

}
window.addEventListener("scroll", bannerScroll);
