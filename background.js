var title="";
var url ="";

// 記事タイトルをcontent scriptより受け取る
chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    generateBookmarkData(request.post_title);

});


//タブが変更された時の処理
chrome.tabs.onSelectionChanged.addListener(function(tabid){
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendRequest(tab.id, {greeting: "hello"}, function(response) {
      generateBookmarkData(request.post_title);
    });
  });
});


/*
 * ブックマークのタイトル・URLを設定する
 * 単純に表示中のタブのタイトル・URLを取得する場合はこの処理だけでOK
 */
function generateBookmarkData(str){
  title = str.substring(0,str.indexOf('URL:'));
  url = str.substring(str.indexOf('URL:')+4,str.length);
  if(title==''){
    chrome.tabs.getSelected(null,function(tab) {
      title = tab.title;
    });
  }
  // URL生成
  if(url==''){
    chrome.tabs.getSelected(null,function(tab) {
      url = tab.url; 
    });
  }
}
