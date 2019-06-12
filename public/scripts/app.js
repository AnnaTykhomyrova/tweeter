$(document).ready(function() {
  function createTweetElement (tweetObj) {
    var $tweetArticle = `
      <article class="tweets-container">
          <header>
            <div class="logo2"><img src='${tweetObj.user.avatars.small}'></div>
            <span class="header">${tweetObj.user.name}</span>
            <span class="header_el">${tweetObj.user.handle}</span>
          </header>
          <section>
            <h3>${tweetObj.content.text}</h3>
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

function renderTweets (tweetData) {
  for (tweet of tweetData) {
    var $tweet = createTweetElement(tweet);
    $('.tweets').prepend($tweet);
  }
}

function loadTweets () {
 $.ajax({
  method: 'GET',
  url: '/tweets/',
  success: function (dataTweets) {
    console.log('Success!');
    renderTweets(dataTweets);
  }
});
}

loadTweets();

var $form = $('#new-tweet-form');
$form.on('submit',function (ev) {
  ev.preventDefault();
  const data = $form.serialize();

  if (data === ""|| data === null) {
    alert("Your tweet content is not present!");
  } else if (data.length > 140) {
    alert("Your tweet content is too long!");
  } else {
    $.ajax({
    method: 'POST',
    url: '/tweets/',
    data: data,
    success: function () {
      // console.log('Success!');
      loadTweets();
    }
  });
}
});





})