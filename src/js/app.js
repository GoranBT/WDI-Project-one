
$(()=> {

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
  let livesLeft = null;
  let step = null;
  let action = null;
  const icons =['amazon', 'android', 'google', 'twitter', 'viber', 'whatsup', 'windows'];
  let $result = $('#result');
  const $lives = $('#lives');
  let score = null;



  //adds hearths to the box
  function addHearths() {
    $lives.empty();
    for(let i = 0; i<livesLeft; i++){
      $lives.append('<img src="images/hearth.ico" class="life"/>');

    }
  }

  //change icon using attr src and random array number
  function chooseIcon(){
    const image = icons[Math.floor(Math.random() * 7)];
    $('#icon1').attr('src' , 'images/' + image +'.png').attr('data-logo', image);
  }


  //start function -> makes the icon to show up by setting the att source
  function start(){
    $newPlayer.hide();
    console.log('inside start');
    $('#gameOver').hide();
    $lives.show();
    livesLeft = 3;
    addHearths();
    $('#icon1').show();
    chooseIcon();

    //choose random icon start position
    $('#icon1').css({'left': Math.round(Math.random()*550) ,'top': -50});


    //randomize step to increase speed and all of the icons drop with different speed
    step = 1 + Math.round(Math.random()*2);


    //interval set to change top position every 10ms
    action = setInterval(function(){

      //changes current top position + step
      $('#icon1').css('top', $('#icon1').position().top + step);

      //condition checking what heppens when icon position is > contaier
      if($('#icon1').position().top > $('#iconsContainer').height()) {
        if(livesLeft>1) {
          $('#icon1').show();
          chooseIcon();
          $('#icon1').css({'left': Math.round(Math.random()*550) ,'top': -50});
          step = 1 + Math.round(Math.random()*2);
          livesLeft--;
          addHearths();
          $lives.show();
          console.log('lost a life');
        }else{
          clearInterval(action);
          $('#gameOver').show();
          console.log('game over');

        }
      }
    }, 10);
  }
  $('#icon1').on('mouseover', function (){
    slice.play();
    score++;
    $('.score').html(score);
    clearInterval(action);
    // $('#icon1').hide();
    $('#icon1').hide('explode', 400);
    console.log('hiding the icon');
    setTimeout(start, 500);
  });
  //game buttons
  $('#start').on('click', start);
  $('#reset').on('click', function () {


  });


  // Timer
  setInterval(function time() {
    $currentTime = new Date();
    var timeString = $currentTime.toString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
    $('.time').text(timeString);
  }, 1000);

  // submit login function
  function submitLogin(event){
    $('#start').show();
    $('#reset').show();
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
    console.log($PlayerFace, $playerInformation, $current);
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
    $('#start').hide();
    $('#reset').hide();
  }
  // buttons onclick
  $('form').bind('submit', submitLogin);
  $newPlayer.click(cleanForm);

  //DropDown elements
  $('ul.parent > li').hover(function() {
    $(this).find('ul.child').show(400);
  }, function () {
    $(this).find('ul.child').hide(400);
  });

  //Audio Player
  $('.player').on('click', function(){
    if(myAudio.paused) {
      myAudio.play();
    } else {
      myAudio.pause();
      myAudio.currentTime = 0;
    }
    $('.player').toggleClass('pulse');
  });


  $('.logo').toggleClass('animated shake');


});
