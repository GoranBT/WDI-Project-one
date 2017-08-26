$(()=> {
  const users = {
    'Goran Angelovski': {
      name: 'Goran',
      surname: 'Angelovski',
      image: 'images/goran.jpg'
    }

  };

  const $quotes = $('.quotes');
  const quote = ['Never trust a computer you can\'t throw out a window.', 'It\'s hardware that makes a machine fast. It\'s software that makes a fast machine slow.', 'The real danger is not that computers will begin to think like men, but that men will begin to think like computers.', 'People don\'t understand computers. Computers are magical boxes that do things. People believe what computers tell them.', 'Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.', 'The trouble with programmers is that you can never tell what a programmer is doing until it’s too late.', 'Measuring programming progress by lines of code is like measuring aircraft building progress by weight.','Programming is like kicking yourself in the face, sooner or later your nose will bleed.', 'When someone says: \'I want a programming language in which I need only say what I wish done\', give him a lollipop.'];
  const random = Math.floor(Math.random()*quote.length);
  $quotes.html(`<p>${quote[random]}</p>`);

  const player = {};

  function submitLogin(event){
    const $current = $(event.currentTarget);
    player.name = $current.find('input[name="name"]').val();
    player.surname = $current.find('input[name="surname"]').val();
    player.age = $current.find('input[name="age"]').val();
    console.log(player);
    var img = (users[`${player.name} ${player.surname}`]||{}).image;
    $current.hide();
    $('.player-info').show();
    $('.pImage').css('background-image',`url(${img})`);
  }
  $('form').bind('submit', submitLogin);
  console.log(player);

});
