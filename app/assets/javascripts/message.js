$(function(){
  function buildHTNL(message){
    if (message.image) {
      var html =  
        `<div class="main-chat__message-list--message">
          <div class="message-info">
            <div class="message-info__member-name">
              ${message.user_name}
            </div>
            <div class="message-info__date">
              ${message.created_at}
            </div>
          </div>
          <p>
            ${message.content}
          </p>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
        `<div class="main-chat__message-list--message">
          <div class="message-info">
            <div class="message-info__member-name">
              ${message.user_name}
            </div>
            <div class="message-info__date">
              ${message.created_at}
            </div>
          </div>
          <p>
            ${message.content}
          </p>
        </div>`
      return html;
    };
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTNL(message);
      $('.main-chat__message-list').append(html);
      $('form')[0].reset();
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    })
    .always(function(){
      $('.send-btn').removeAttr("disabled");
    });
  })
});
