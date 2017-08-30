
$(()=> {
//test
  var quiz = [

    {
      'question': 'true||false',
      'answer': 'true'
    },
    {
      'question': 'true&&false',
      'answer': 'false'
    }

  ];
  var type=null;
  var qscore = 12;

  function question(){
    var selection = quiz[Math.floor(Math.random() * 2)];
    type = selection.answer;
    $('.question').html(`${selection.question}`);
  }

  $('.quizButtons').on('click', function(){
    // console.log($(this).val());

    if($(this).val() === type){
      score += 10;
      console.log(qscore);
      $('#quizContainer').hide();
      setTimeout(start, 300);
      $('#icon1').show();
    } else {
      $('#quizContainer').hide();
      setTimeout(start, 300);
      $('#icon1').show();
    }
  });

  //end of test for today

  const myAudio = new Audio('images/audio1.mp3');
  const slice = new Audio('images/slice.mp3');
  // test object
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

  // variables
  let $currentTime = null;
  const $form = $('form');
  const $newPlayer = $('.newplayer');
  const $PlayerFace = $('.pImage');
  const $playerInformation = $('.player-info');
  const $quotes = $('.quotes');
  const quote = ['Never trust a computer you can\'t throw out a window.', 'It\'s hardware that makes a machine fast. It\'s software that makes a fast machine slow.', 'The real danger is not that computers will begin to think like men, but that men will begin to think like computers.', 'People don\'t understand computers. Computers are magical boxes that do things. People believe what computers tell them.', 'Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.', 'The trouble with programmers is that you can never tell what a programmer is doing until it’s too late.', 'Measuring programming progress by lines of code is like measuring aircraft building progress by weight.','Programming is like kicking yourself in the face, sooner or later your nose will bleed.', 'When someone says: \'I want a programming language in which I need only say what I wish done\', give him a lollipop.'];
  const random = Math.floor(Math.random()*quote.length);
  $quotes.html(`<p>${quote[random]}</p>`);

  const player = {};

  //Game variables
  let livesLeft = null;
  let step = null;
  let action = null;
  //icons
  const icons =['amazon', 'android', 'google', 'twitter', 'viber', 'whatsup', 'windows'];
  let $result = $('#result');
  const $lives = $('#lives');
  let score = null;
  let slices = 0;
  let bonusTimer = 7;
  let bonusMode = false;
  const $start = $('#start');
  const $reset = $('#reset');


  //change icon using attr src and random array number
  function chooseIcon(){
    const image = icons[Math.floor(Math.random() * 7)];
    // console.log('trying to find', image);
    $('#icon1').attr('src' , 'images/' + image +'.png').attr('data-logo', image);
  }


  //start function -> makes the icon to show up by setting the att source
  function start(){
    // console.log('inside start');
    //hide new player button user cannot use it while playing
    $newPlayer.hide();
    $('#gameOver').hide();
    $lives.show();

    //populate lives inside box and show random icon
    livesLeft = 3;
    // addHearths();
    $('#icon1').show();
    chooseIcon();

    //choose random icon start position
    $('#icon1').css({'left': Math.round(Math.random()*550) ,'top': -50});


    //randomize step to increase speed and all of the icons drop with different speed
    step = 1 + Math.round(Math.random()*4);


    //interval set to change top position every 10ms
    console.log('starting the setInterval, action:', action);
    if(!action) action = setInterval(function(){

      //changes current top position + step
      $('#icon1').css('top', $('#icon1').position().top + step);

      //condition checking what heppens when icon position is > contaier
      if($('#icon1').position().top > $('#iconsContainer').height()) {

        livesLeft--;
        $lives.find('img').slice(0, 3-livesLeft).hide();

        if(livesLeft === 0) {
          clearInterval(action);
          action = null;
          $('#gameOver').show();
          $newPlayer.show();
          return;
        }

        $('#icon1').show();
        chooseIcon();
        $('#icon1').css({'left': Math.round(Math.random()*550) ,'top': -50});
        step = 1 + Math.round(Math.random()*2);
        console.log('lost a life');
      }
    }, 10);
  }

  //mouse over function
  $('#icon1').on('mouseout', function (){
    console.log('mouseover');
    //play sound and increase and display score
    if($(this).attr('data-logo')==='android'){
      clearInterval(action);
      action = null;
      $('#quizContainer').show();
      $('#icon1').hide();
      question();
    } else if(($(this).attr('data-logo')==='viber')) {

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
            $('#slices').hide();
            setTimeout(start, 400);
          }
        }, 1000);

        bonusMode = true;
      }
    } else {
      slice.play();
      score++;
      $('.score').html(score);
      //stop interval for the explode event
      clearInterval(action);
      action = null;
      $('#icon1').hide('explode', 400);
      // console.log('hiding the icon');
      //start timer after the explode event
      setTimeout(start, 500);
    }

    if (bonusMode && bonusTimer > 0) {
      slices ++;
      $('#slices').show();
      $('#slices').text(`Slices: ${slices}`);
    }
  });

  //game buttons
  $start.on('click', start);
  $reset.on('click', function () {
    $('#gameOver').hide();
    $('.score').text(0);
    $lives.find('img').show();
    livesLeft = 3;
  });


  // Timer get and show the time
  setInterval(function time() {
    $currentTime = new Date();
    var timeString = $currentTime.toString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
    $('.time').text(timeString);
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
  const $audioPlayer = $('.player');
  $audioPlayer.on('click', playMusic);
  $audioPlayer.on('click', pulse);



  $('.logo').toggleClass('animated shake');
  $('.submit').toggleClass('animated pulse infinite');

});
