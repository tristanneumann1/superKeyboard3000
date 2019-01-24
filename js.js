$( document ).ready(function($){
  setTimeout( () => location.reload(true), 60000);
  const $keyboard = $('#keyboard');
  const $screen = $('#screen');
  let delay = 0;
  
  const audioElement = document.createElement('audio');
  audioElement.setAttribute('src', './assets/multimedia_button_beep_001.mp3');
  
  audioElement.addEventListener("canplay",function(){
      $("#length").text("Duration:" + audioElement.duration + " seconds");
      $("#source").text("Source:" + audioElement.src);
      $("#status").text("Status: Ready to play").css("color","green");
  });
  
  audioElement.addEventListener("timeupdate",function(){
      $("#currentTime").text("Current second:" + audioElement.currentTime);
  });

  document.shifted = false;
  $(document).on('keyup keydown', function(e){
    const shifted = e.shiftKey
    document.shifted = shifted;
  } );

  let keys = [];

  function randomFont() {
    const fonts = [
    'Georgia, serif',
    '"Palatino Linotype", "Book Antiqua", Palatino, serif',
    '"Times New Roman", Times, serif',
    'Arial, Helvetica, sans-serif',
    'Arial Black", Gadget, sans-serif',
    '"Comic Sans MS", cursive, sans-serif',
    'Impact, Charcoal, sans-serif',
    '"Courier New", Courier, monospace',
    '"Lucida Console", Monaco, monospace'
  ];
    return fonts[Math.floor(Math.random() * fonts.length)];
  }
  function buttonClick(){
    setTimeout(audioElement.play.bind(audioElement), delay);
    delay += 100;
    $screen[0].innerText += keys[$(this).attr('index')].key(document.shifted);
    randomCase(keys);
    shuffleArray(keys);
    reRender();
  }
  function renderButton(i) {
    const $button = $(`<button> ${ this.key() } </button>`);
    $button.on('click', buttonClick);
    $button.addClass('button');
    $button.css({'fontFamily': randomFont()});
    $button.attr('index', i)
    return $button;
  }

  const populateKeys = () => {
    for(let i = 65; i < 91; i++) {
      const letter = {
        UC: String.fromCharCode(i),
        LC: String.fromCharCode(i + 32),
        shifted: Math.random > 0.5,
        key(shift) {
          return (shift? !this.shifted : this.shifted)? this.UC : this.LC;
        },
        renderButton,
      }
      keys.push(letter);
    }
  }
  populateKeys();

  var reRender = function(){
    for(let i = 0; i < keys.length; i++) {
      $('#keyboard').children()[i].innerText = keys[i].key(false);
      // $('#keyboard').children()[i].attr('data-index', i);
    }
  }


  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  function randomCase(array) {
    for(let j = 0; j < array.length; j++ ) {
      array[j].shifted=Math.random() > 0.5;
    }
  }

  shuffleArray(keys);

  for(let i = 0; i < keys.length; i++) {
    const $button = keys[i].renderButton(i);
    if(i === 0) {
      $button.addClass('activated');
    }
    $keyboard.append($button);
  }
});