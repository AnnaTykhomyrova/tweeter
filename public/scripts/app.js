// Whatever code you write inside the $(document ).ready() method will run once the page DOM is ready to execute
// JavaScript code
$(document).ready(function() {

  // function that prevent Cross-Site Scripting
  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// function that creates new tweets
  function createTweetElement (tweetObj) {
    var $tweetArticle = `
      <article class="tweets-container">
          <header>
            <div class="logo2"><img src='${tweetObj.user.avatars.small}'></div>
            <span class="header">${tweetObj.user.name}</span>
            <span class="header_el">${tweetObj.user.handle}</span>
          </header>
          <section>
            <h3>${escape(tweetObj.content.text)}</h3>
          </section>
          <footer>
            <h5>${tweetObj.created_at}</h5>
            <div class="footer_images">
              <i class="fas fa-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i>
            </div>
          </footer>
        </article>
    `;
    return $tweetArticle;
  }

// function that shows new tweets on the page
function renderTweets (tweetData) {
  for (tweet of tweetData) {
    var $tweet = createTweetElement(tweet);
    $('.tweets').prepend($tweet);
  }
}
$( ".compose-button" ).click(function() {
  $( ".new-tweet" ).slideToggle( "slow" );
  $("textarea").focus();
});

// function that loads new tweets using ajax GET
function loadTweets () {
 $.ajax({
    method: 'GET',
    url: '/tweets/',
    success: function (dataTweets) {
      $('.tweets').empty();
      renderTweets(dataTweets);
    }
  });
}

loadTweets();

var $form = $('#new-tweet-form');

// event listener that waits when the Tweet button will be pushed and function that will be executed after.
// Also here is some validation for form
$form.on('submit',function (ev) {
  ev.preventDefault();
  const data = $form.serialize();
  var input = $('#new-tweet-form textarea').val();
  if (input.length === 0) {
    return $(".error").text("Error: Your tweet content is not present").slideToggle(true);
  } else if (input.length > 140) {
    return $(".error").text("Error: Your tweet content is too long").slideToggle(true);
  } else {
    $('textarea').val('');
    $('.counter').text('140');
    $.ajax({
      method: 'POST',
      url: '/tweets/',
      data: data,
      success: function () {
        loadTweets();
      }
    });
  }
});
});