/**
 * Created by Leon Revill on 21/06/16.
 * Blog: http://www.revilweb.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */
//Custom Safari shim (window.HTMLElement to prevent fatal error in IE8)
if (window.HTMLElement !== undefined && typeof window.HTMLElement !== 'function'){
    var _HTMLElement = function(){};
    _HTMLElement.prototype = HTMLElement.prototype;
    HTMLElement = _HTMLElement;
}

var c = " ", f = "flex", fw = "-webkit-"+f, e = document.createElement('b');
try {
    e.style.display = fw;
    e.style.display = f;
    c += (e.style.display == f || e.style.display == fw) ? f : "no-"+f;
} catch(e) {
    c += "no-"+f;
}
document.documentElement.className += c;