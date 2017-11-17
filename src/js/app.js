//variables

//array holding all of the quots used for the quote of the day
const quote = ['Never trust a computer you can\'t throw out a window.', 'It\'s hardware that makes a machine fast. It\'s software that makes a fast machine slow.', 'The real danger is not that computers will begin to think like men, but that men will begin to think like computers.', 'People don\'t understand computers. Computers are magical boxes that do things. People believe what computers tell them.', 'Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.', 'The trouble with programmers is that you can never tell what a programmer is doing until it’s too late.', 'Measuring programming progress by lines of code is like measuring aircraft building progress by weight.','Programming is like kicking yourself in the face, sooner or later your nose will bleed.', 'When someone says: \'I want a programming language in which I need only say what I wish done\', give him a lollipop.'];

//Audio elements
const myAudio = new Audio('public/images/audio1.mp3');
const slice = new Audio('public/images/slice.mp3');
// ------------
//Quizz section
let type=null;
const player = {};

// questions and answers
const quiz = [
  {
    'question': 'true || false',
    'answer': 'true'
  },
  {
    'question': 'true && false',
    'answer': 'false'
  },
  { 'question': 'Singing in the shower lowers your cholesterol, heart rate and risk of cancer and heart disease.',
    'answer': 'false'
  },
  {
    'question': 'In the weightlessness of space, if a frozen pea touches pepsi it will blow up.',
    'answer': 'true'
  },
  {
    'question': 'The worlds smartest pig memorized the multiplucation tabled up to 12.',
    'answer': 'True'
  },
  {
    'question': 'Monkeys are related to fish because if need be they can breathe underwater.',
    'answer': 'False'
  },
  {'question': 'An ostrich\'s eye is bigger than its brain.',
    'answer': 'true'
  },
  {
    'question': 'A jellyfish is 95 percent water.',
    'answer': 'true'
  },
  {'question': 'Camels have three sets of eyelids.',
    'answer': 'true'
  }
];

//Users
const users = {
  'Goran Angelovski': {
    name: 'Goran',
    surname: 'Angelovski',
    image: 'public/images/goran.jpg'
  },
  'Mike Hayden': {
    name: 'Mike',
    surname: 'Hayden',
    image: 'public/images/mike.png'

  },
  'William Tye': {
    name: 'William',
    surname: 'Tye',
    image: 'public/images/will.jpeg'
  }

};

//Game variables
let livesLeft = 3;
let step = null;
let action = null;
let score = null;
let slices = 0;
let bonusTimer = 7;
let bonusMode = false;
let bonus = null;
let highScore = null;
let timers = [];
//array holding all of the icon IDs
const icons =['angularjs', 'apple', 'c', 'css3', 'gulp', 'html5', 'java','nodejs', 'python', 'rails', 'react', 'ruby', 'slack', 'GA', 'meat'];

// tired of Math.floor(Math.random()*length); so i decided to make a function
function randomN(length) {
  return Math.floor(Math.random()*length);
}

//audio Player functions
function playMusic(){
  if(myAudio.paused) {
    myAudio.play();
  } else {
    myAudio.pause();
    myAudio.currentTime = 0;
  }
}

//jQuery

function init(){

  // ----------
  //jquery var

  // quotes
  const $quotes = $('.quotes');

  // quiz
  const $quizContainer = $('#quizContainer');
  const $quizQuestion = $('.question');
  const $quizButton = $('.quizButtons');

  //audio
  const $audioPlayer = $('.player');

  // time
  let $currentTime = null;
  const $timeWindow = $('.time');

  //game variables
  const $form = $('form');
  const $newPlayer = $('.newplayer');
  const $PlayerFace = $('.pImage');
  const $playerInformation = $('.player-info');
  const $lives = $('#lives');
  const $start = $('#start');
  const $reset = $('#reset');
  const $slicesWin = $('#slices');
  const $icon = $('#icon1');
  const $gameOverWin = $('#gameOver');
  const $iconContainer = $('#iconsContainer');
  const $scoreBox = $('.score');
  const $level = $('.level');

  //used for logo shaking
  const $logo = $('.logo');

  //used for pulsing button
  const $submit = $('.submit');

  // ----------
  //Functions
  function timerResets(){
    for (var i = 0; i < timers.length; i++) {
      console.log(timers);
      clearTimeout(timers[i]);
      timers = [];
    }
  }

  function timerReset(){
    var highestTimeoutId = setTimeout('');
    for (var i = 0 ; i < highestTimeoutId ; i++) {
      clearTimeout(i);
    }
  }
  //makes audio player to pulse
  function pulse(){
    $audioPlayer.toggleClass('pulse');
  }

  //display Score
  function displayScore(){
    $scoreBox.html(score);
  }

  //generate random question
  function question(){
    timerResets();
    bonusMode = false;
    clearInterval(action);
    var selection = quiz[randomN(quiz.length)];
    type = selection.answer;
    $quizQuestion.html(`${selection.question}`);
  }

  //quiz logic
  function quizLogic() {
    if($(this).val() === type){
      score += 10;
      $quizContainer.addClass('hidden');
      timers.push(setTimeout(start, 400));
      $icon.show();
      displayScore();
    } else {
      $quizContainer.addClass('hidden');
      timers.push(setTimeout(start, 400));
      $icon.show();
    }
  }

  //change icon using attr src and random array number
  function chooseIcon(){
    const image = icons[randomN(icons.length)];
    $icon.attr('src' , 'public/images/' + image +'.svg').attr('data-logo', image);
  }

  // setting the position and random step
  function randomIcon(){
    chooseIcon();
    $icon.show();
    $icon.css({'left': randomN($iconContainer.width()-50) ,'top': -50});
    step = 1 + randomN(5);
  }

  //define the speed of icon
  function makingMove(){
    $icon.css('top', $($icon).position().top + step);
  }

  //checking lifes
  function lifes(){
    $lives.find('img').slice(0, 3-livesLeft).hide();
    if(livesLeft === 0) {
      gameOver();
    }else{
      randomIcon();
    }
  }

  //logic what happens when icon drops under line
  function checkPosition(){
    if($icon.position().top > $iconContainer.height()) {

      livesLeft--;
      lifes();

    }

  }

  // changes leveles based on highScore
  function levelNames(){

    if(highScore<20){
      $level.html('Novice');

    }else if (highScore<50){
      $level.html('Rookie');

    }else if (highScore<75){
      $level.html('Beginner');


    }else if (highScore<100){
      $level.html('Talented');


    }else if  (highScore<150){
      $level.html('Skilled');


    }else if (highScore<200){
      $level.html('Intermediate');


    }else if (highScore<250){
      $level.html('Skillful');


    }else if (highScore<300){
      $level.html('Proficient');


    }else if (highScore<400){
      $level.html('Advanced');
    }else if (highScore<1000){
      $level.html('Senior');
    }else{
      $level.html('Expert');

    }

  }

  //start function
  function start(){
    $start.attr('disabled', true);
    $reset.attr('disabled', true);
    $newPlayer.hide();
    randomIcon();
    levelNames();
    if(score>highScore){
      highScore=score;
    }
    if(!action) action = setInterval(function(){

      makingMove();

      checkPosition();

    }, 10);
  }

  //Game over
  function gameOver(){
    timerResets();
    console.log(timers);
    clearInterval(action);
    action = null;
    $gameOverWin.show();
    $newPlayer.show();
    $reset.attr('disabled', false);
    $start.attr('disabled', true);
  }



  //bonus question
  function ga() {
    timerResets();
    bonusMode = false;
    clearInterval(action);
    action = null;
    $quizContainer.removeClass('hidden');
    $icon.hide();
    question();
    displayScore();
  }

  //bonus slicing icon
  function meat(){
    slice.play();
    timerResets();
    clearInterval(action);
    action = null;
    if(!bonusMode) {
      bonus = setInterval(function(){

        bonusTimer --;
        if(bonusTimer===0) {
          clearInterval(bonus);
          timerResets();
          score = parseInt(slices)+parseInt(score);
          slices = 0;
          bonusMode = false;
          bonusTimer = 7;
          $slicesWin.hide();
          timers.push(setTimeout(start, 400));
          displayScore();
        }
      }, 500);

      bonusMode = true;
    }
  }

  //normal card procesing
  function defaultCase(){
    slice.play();
    score++;
    displayScore();
    timerResets();
    //stop interval for the explode event
    clearInterval(action);
    action = null;
    $icon.hide('explode', 400);
    // console.log('hiding the icon');
    //start timer after the explode event
    timers.push(setTimeout(start, 400));
  }

  //checking if we are in bonus mode
  function bonusCheck(){
    if (bonusMode && bonusTimer > 0) {
      slices ++;
      $slicesWin.show();
      $slicesWin.text(`Slices: ${slices}`);
      displayScore();
    }
  }

  //function that check the ID of the icons
  function checkID(){
    switch ($(this).attr('data-logo')) {
      case 'GA':
        ga();
        break;
      case 'meat':
        meat();
        break;
      default:
        defaultCase();
    }
    bonusCheck();
  }

  //Reset Button function
  function resetButton() {
    $gameOverWin.hide();
    score = 0;
    displayScore();
    $lives.find('img').show();
    livesLeft = 3;
    $start.attr('disabled', false);
    timerResets();
    clearInterval(action);

  }

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
    highScore = 0;
    $level.html('Newbie');
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

  //-----------------
  //event listeners


  //quiz logic event listener
  $quizButton.on('click', quizLogic);

  //generetas quote of the day
  $quotes.html(`<p>${quote[randomN(quote.length)]}</p>`);

  console.log($.event.special.swipe);

  $.event.special.swipe.start = function(event) {
    var data = event.originalEvent.touches ?
      event.originalEvent.touches[ 0 ] : event;

    return {
      time: ( new Date() ).getTime(),
      coords: [ data.pageX, data.pageY ],
      origin: $( event.target ),
      clientX: data.clientX,
      clientY: data.clientY
    };
  };

  $.event.special.swipe.stop = function(event) {
    var data = event.originalEvent.touches ?
      event.originalEvent.touches[ 0 ] : event;

    return {
      time: ( new Date() ).getTime(),
      coords: [ data.pageX, data.pageY ],
      origin: $( event.target ),
      clientX: data.clientX,
      clientY: data.clientY
    };
  };

  //mouse out listener
  $icon.on('mouseout', checkID);
  $icon.on('swipeleft', checkID);
  $icon.on('swiperight', checkID);

  //DropDown elements
  $('ul.parent > li')
    .hover(function() {
      $(this).find('ul.child').show(400);
    }, function () {
      $(this).find('ul.child').hide(400);
    });

  //Form and new player buttons
  $form.bind('submit', submitLogin);
  $newPlayer.on('click', cleanForm);

  //game buttons
  $start.on('click', start);
  $reset.on('click', resetButton);

  //Audio Player
  $audioPlayer.on('click', playMusic);
  $audioPlayer.on('click', pulse);

  //shake logo on page load
  $logo.toggleClass('animated shake');

  //pulsing submit button
  $submit.toggleClass('animated pulse infinite');

}

$(init);
