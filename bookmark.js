var title="";
var url;
$(document).ready(function(){
  load();
  $(".button1").click(function(){ save(); });
  $("li a").on('click', function(){ chrome.tabs.create({url: $(this).attr('href')});});
  $(".delete").on('click', function(){ delete_keys($(this).attr('value'));});
});

/*
 * 記事をLocalStorageへ保存する
 */
function save() {
  // backgroundへ
  var bg =chrome.extension.getBackgroundPage();
  title = bg.title;
  url = bg.url;
  if(!window.localStorage.getItem("num")){
    window.localStorage.setItem("num", "00000000000000000000000000001");
  }
  //window.localStorage.setItem(url, title);
  window.localStorage.setItem(window.localStorage.getItem("num") + ':' + url, title);
  window.localStorage.setItem("num", fillZero(parseInt(window.localStorage.getItem("num"),10)+1,6));
  location.reload();
}


/*
 *
 */
function load(){
    //var list = document.getElementById("list");
    for(var keys in localStorage){
      if(keys!="num"){
        var str = keys.substring(keys.indexOf(':')+1,keys.length);
        $('#list ul').append('<li><a href="'+str+'">'+htmlEscape(localStorage[keys])+
                             '</a><button class="delete" value="'+keys+'">削除</button></li>')

      }
    }
}


/*
 * bookmark削除
 */
function delete_keys(keys){
  //alert(keys);
  window.localStorage.removeItem(keys);
  location.reload();
}

/*
 * HTMLエスケープ
 * http://blog.livedoor.jp/okashi1/archives/51823804.html
 */
function htmlEscape(s) {
	return s.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/'/g, '&#039;')
		.replace(/"/g, '&quot;')
		.replace(/\n/g, '<br />');
}

/**
 * 必要な桁数まで0を埋める。
 * @param number 数値
 * @param size 桁数
 * http://d.hatena.ne.jp/unageanu/20081223/1230000882
 */
function fillZero( number, size ) {
  var s = Math.log( number ) * Math.LOG10E;
  for( i=1,n=size-s,str="";i<n;i++ ) str += "0";
  return str+number;
}
