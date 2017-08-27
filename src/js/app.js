$(()=> {
  // test object
  const users = {
    'Goran Angelovski': {
      name: 'Goran',
      surname: 'Angelovski',
      image: 'images/goran.jpg'
    }

  };



  // variables
  let $currentTime = null;
  const $newPlayer = $('.newplayer');
  const $PlayerFace = $('.pImage');
  const $playerInformation = $('.player-info');
  const $quotes = $('.quotes');
  const quote = ['Never trust a computer you can\'t throw out a window.', 'It\'s hardware that makes a machine fast. It\'s software that makes a fast machine slow.', 'The real danger is not that computers will begin to think like men, but that men will begin to think like computers.', 'People don\'t understand computers. Computers are magical boxes that do things. People believe what computers tell them.', 'Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.', 'The trouble with programmers is that you can never tell what a programmer is doing until it’s too late.', 'Measuring programming progress by lines of code is like measuring aircraft building progress by weight.','Programming is like kicking yourself in the face, sooner or later your nose will bleed.', 'When someone says: \'I want a programming language in which I need only say what I wish done\', give him a lollipop.'];
  const random = Math.floor(Math.random()*quote.length);
  $quotes.html(`<p>${quote[random]}</p>`);

  const player = {};

  //Game variables
  let play = false;
  let livesLeft = null;
  let steps = null;
  let action = null;
  const icons =['html', 'css', 'js', 'ruby', 'facebook', 'instagram', 'twitter', 'nodejs', 'java', 'c#', 'python'];
  let $result = $('#result');
  const $lives = $('#lives');
  $('#start').on('click', function () {
    play = true;
    livesLeft = 3;
    console.log(livesLeft, play);
  });
  $('#reset').on('click', function () {
    $result = 0;
    play = false;
    console.log($result, $lives, icons);
  });


  // Right column Logic

  // Timer
  setInterval(function time() {
    $currentTime = new Date();
    var timeString = $currentTime.toString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
    $('.time').text(timeString);
  }, 1000);

  // submit login function
  function submitLogin(event){
    const $current = $(event.currentTarget);
    player.name = $current.find('input[name="name"]').val();
    player.surname = $current.find('input[name="surname"]').val();
    player.age = $current.find('input[name="age"]').val();
    var img = (users[`${player.name} ${player.surname}`]||{}).image;
    $current.hide();
    $playerInformation.show();
    $PlayerFace.css('background-image',`url(${img})`);
    $playerInformation.find('.name').text(player.name);
    $playerInformation.find('.level').text('Newbie');

  }
  // clean from function
  function cleanForm() {
    $PlayerFace.css('background-image','none');
    $playerInformation.find('.level').text('');
    $playerInformation.find('.name').text('');
    $playerInformation.find('.surname').text(' ');
    $playerInformation.find('.age').text(' ');
    $playerInformation.hide();
    $('form').show();

  }
  // buttons onclick
  $('form').bind('submit', submitLogin);
  $newPlayer.click(cleanForm);
});
