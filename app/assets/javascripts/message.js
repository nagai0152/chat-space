$(function(){
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.chat-main__groups__top:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      //メッセージが入ったHTMLに、入れ物ごと追加
      $('.chat-main__groups').append(insertHTML);
      $('.chat-main__groups').animate({ scrollTop: $('.chat-main__groups')[0].scrollHeight});
    }
    })
    .fail(function() {
      alert('error');
    });
  };

function buildHTML(message){
  if ( message.image ) {
   var html =
    `<div class="chat-main__groups__top" data-message-id=${message.id}>
       <div class="chat-main__groups__top__word">
         ${message.user_name}
         <div class="chat-main__groups__top__word__day">
           ${message.created_at}
         </div>
       </div>
       <p class="chat-main__groups__top__coment">
         ${message.content}
       </p>
     <img src=${message.image} >
    </div>`
   return html;
 } else {
   var html =
    `<div class="chat-main__groups__top" data-message-id=${message.id}>
       <div class="chat-main__groups__top__word">
         ${message.user_name}
         <div class="chat-main__groups__top__word__day">
           ${message.created_at}
         </div>
       </div>
       <p class="chat-main__groups__top__coment">
         ${message.content}
       </p>
    </div>`
   return html;
 };
}

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__groups').append(html);
      $('form')[0].reset();
      $('.chat-main__groups').animate({ scrollTop: $('.chat-main__groups')[0].scrollHeight});
      $('.chat-main__form__right').prop('disabled', false);

    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    })
  });

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});