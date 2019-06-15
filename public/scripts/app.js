// Whatever code you write inside the $(document ).ready() method will run once the page DOM is ready to execute
// JavaScript code
$(document).ready(function() {

// function that prevent Cross-Site Scripting
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
return div.innerHTML;
}

//Converts milliseconds to appropriate time for user readability
const convertTime = (milsec) => {
  const sec = (Date.now() - milsec ) / 1000;
  const min = sec / 60;
  const hour = min / 60;
  const day = hour / 24;

  if ( min < 60 ) {
      return `${Math.floor(min)}m ago`;
  }
  else if ( min > 60 ) {
      return `${Math.floor(hour)}h ago`;
  }
  else if ( hour > 24 ) {
      return `${Math.floor(day)}days ago`;
  }
};

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
          <h5>${convertTime(tweetObj.created_at)}</h5>
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
    if ($(".error")) {
      $(".error").slideUp(true);
    }
    if (input.length === 0) {
      return $(".error").text("Error: Your tweet content is not present").slideDown(true);
    } else if (input.length > 140) {
      return $(".error").text("Error: Your tweet content is too long").slideDown(true);
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