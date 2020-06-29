$(function(){
  function buildHTML(message){
     if ( message.image ) {
      var html =
       `<div class="chat-main__groups__top">
          <div class="chat-main__groups__top__word">
            ${message.user_name}
            <div class="chat-main__groups__top__word__day">
              ${message.created_at}
            </div>
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
       `<div class="chat-main__groups__top">
          <div class="chat-main__groups__top__word">
            ${message.user_name}
            <div class="chat-main__groups__top__word__day">
              ${message.created_at}
            </div>
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


});