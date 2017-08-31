
$(()=> {
//test
  const quote = ['Never trust a computer you can\'t throw out a window.', 'It\'s hardware that makes a machine fast. It\'s software that makes a fast machine slow.', 'The real danger is not that computers will begin to think like men, but that men will begin to think like computers.', 'People don\'t understand computers. Computers are magical boxes that do things. People believe what computers tell them.', 'Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.', 'The trouble with programmers is that you can never tell what a programmer is doing until it’s too late.', 'Measuring programming progress by lines of code is like measuring aircraft building progress by weight.','Programming is like kicking yourself in the face, sooner or later your nose will bleed.', 'When someone says: \'I want a programming language in which I need only say what I wish done\', give him a lollipop.'];
  const myAudio = new Audio('images/audio1.mp3');
  const slice = new Audio('images/slice.mp3');
  let type=null;
  const player = {};
  const quiz = [
    {
      'question': 'true||false',
      'answer': 'true'
    },
    {
      'question': 'true&&false',
      'answer': 'false'
    }
  ];
  const users = {
    'Goran Angelovski': {
      name: 'Goran',
      surname: 'Angelovski',
      image: 'images/goran.jpg'
    },
    'Mike Hayden': {
      name: 'Mike',
      surname: 'Hayden',
      image: 'images/mike.png'

    },
    'William Tye': {
      name: 'William',
      surname: 'Tye',
      image: 'images/will.jpeg'
    }

  };
  let livesLeft = 3;
  let step = null;
  let action = null;
  let score = null;
  let slices = 0;
  let bonusTimer = 7;
  let bonusMode = false;
  const icons =['amazon', 'android', 'google', 'twitter', 'viber', 'whatsup', 'windows'];

  //jquery var
  const $quizQuestion = $('.question');
  const $quizButton = $('.quizButtons');
  const $audioPlayer = $('.player');
  let $currentTime = null;
  const $form = $('form');
  const $newPlayer = $('.newplayer');
  const $PlayerFace = $('.pImage');
  const $playerInformation = $('.player-info');
  const $quotes = $('.quotes');
  const $lives = $('#lives');
  const $start = $('#start');
  const $reset = $('#reset');
  const $timeWindow = $('.time');
  const $slicesWin = $('#slices');
  const $quizContainer = $('#quizContainer');
  const $icon = $('#icon1');
  const $gameOverWin = $('#gameOver');
  const $iconContainer = $('#iconsContainer');
  const $scoreBox = $('.score');
  const $logo = $('.logo');
  const $submit = $('.submit');


  // tired of Math.floor(Math.random()*length); so i decided to make a function
  function randomN(length) {
    return Math.floor(Math.random()*length);
  }
  //functions
  function displayScore(){
    $scoreBox.html(score);
  }

  function question(){
    var selection = quiz[randomN(quiz.length)];
    type = selection.answer;
    $quizQuestion.html(`${selection.question}`);
  }

  $quizButton.on('click', quizLogic);

  function quizLogic() {
    if($(this).val() === type){
      score += 10;
      $quizContainer.hide();
      setTimeout(start, 300);
      $icon.show();
    } else {
      $quizContainer.hide();
      setTimeout(start, 300);
      $icon.show();
    }
  }

  $quotes.html(`<p>${quote[randomN(quote.length)]}</p>`);

  //change icon using attr src and random array number
  function chooseIcon(){
    const image = icons[randomN(icons.length)];
    $icon.attr('src' , 'images/' + image +'.png').attr('data-logo', image);
  }


  function randomIcon(){

    chooseIcon();
    $icon.show();
    $icon.css({'left': randomN($iconContainer.width()-50) ,'top': -50});
    step = 1 + randomN(4);
  }

  //start function -> makes the icon to show up by setting the att source
  function start(){
    $start.attr('disabled', true);
    $reset.attr('disabled', true);
    $newPlayer.hide();
    randomIcon();

    function makingMove(){
      $icon.css('top', $($icon).position().top + step);
    }
    //interval set to change top position every 10ms
    function checkPosition(){
      if($($icon).position().top > $iconContainer.height()) {

        livesLeft--;
        console.log(livesLeft);
        $lives.find('img').slice(0, 3-livesLeft).hide();

        if(livesLeft === 0) {
          gameOver();
        }
        randomIcon();
      }
    }



    if(!action) action = setInterval(function(){

      makingMove();

      checkPosition();

    }, 10);
  }

  function gameOver(){
    clearInterval(action);
    action = null;
    $gameOverWin.show();
    $newPlayer.show();
    $reset.attr('disabled', false);
    $start.attr('disabled', true);
  }

  $icon.on('mouseout', checkID);

  function android() {
    clearInterval(action);
    action = null;
    $quizContainer.show();
    $icon.hide();
    question();
    displayScore();
  }

  function viber(){
    clearInterval(action);
    action = null;
    if(!bonusMode) {
      const bonus = setInterval(function(){

        bonusTimer --;
        if(bonusTimer===0) {
          clearInterval(bonus);
          score = parseInt(slices)+parseInt(score);
          slices = 0;
          bonusMode = false;
          bonusTimer = 7;
          $slicesWin.hide();
          setTimeout(start, 400);
          displayScore();
        }
      }, 1000);

      bonusMode = true;
    }
  }

  function defaultCase(){
    slice.play();
    score++;
    displayScore();
    //stop interval for the explode event
    clearInterval(action);
    action = null;
    $icon.hide('explode', 400);
    // console.log('hiding the icon');
    //start timer after the explode event
    setTimeout(start, 500);
  }

  function bonusCheck(){
    if (bonusMode && bonusTimer > 0) {
      slices ++;
      $slicesWin.show();
      $slicesWin.text(`Slices: ${slices}`);
      displayScore();
    }
  }

  function checkID(){
    switch ($(this).attr('data-logo')) {
      case 'android':
        android();
        break;
      case 'viber':
        viber();
        break;
      default:
        defaultCase();
    }
    bonusCheck();
  }

  function resetButton() {
    $gameOverWin.hide();
    $scoreBox.text(0);
    $lives.find('img').show();
    livesLeft = 3;
    $start.attr('disabled', false);

  }

  //game buttons
  $start.on('click', start);

  $reset.on('click', resetButton);


  // Timer get and show the time
  setInterval(function time() {
    $currentTime = new Date();
    const timeString = $currentTime.toString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
    $timeWindow.text(timeString);
  }, 1000);

  // submit login function
  function submitLogin(event){
    $start.show();
    $reset.show();
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
    // console.log($PlayerFace, $playerInformation, $current);
  }
  // clean from function
  function cleanForm() {
    $PlayerFace.css('background-image','none');
    $playerInformation.find('.level').text('');
    $playerInformation.find('.name').text('');
    $playerInformation.find('.surname').text(' ');
    $playerInformation.find('.age').text(' ');
    $playerInformation.hide();
    $form.show();
    $start.hide();
    $reset.hide();
  }

  // buttons onclick

  $form.bind('submit', submitLogin);
  $newPlayer.on('click', cleanForm);

  //DropDown elements

  $('ul.parent > li').hover(function() {
    $(this).find('ul.child').show(400);
  }, function () {
    $(this).find('ul.child').hide(400);
  });


  //audio Player functions
  function playMusic(){
    if(myAudio.paused) {
      myAudio.play();
    } else {
      myAudio.pause();
      myAudio.currentTime = 0;
    }
  }

  function pulse(){
    $audioPlayer.toggleClass('pulse');
  }
  //Audio Player
  $audioPlayer.on('click', playMusic);
  $audioPlayer.on('click', pulse);
  //shake logo on page load
  $logo.toggleClass('animated shake');
  //pulsing submit button
  $submit.toggleClass('animated pulse infinite');

});
