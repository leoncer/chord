var period = 12000;
var timeOfSound = 3000
level = -1
a = ''
var sound = new Howl({
  urls: ['sound/major.wav'],
  sprite: {
    a: [0, timeOfSound],
    b: [period, timeOfSound],
    c: [2 * period, timeOfSound],
    d: [3 * period, timeOfSound],
    e: [4 * period, timeOfSound],
    f: [5 * period, timeOfSound],
    g: [6 * period, timeOfSound],
  }
});
games = {
  accords: [
    ['a', 'c'],
    ['a', 'c', 'e'],
    ['a', 'c', 'd', 'e'],
    ['a', 'c', 'd', 'e', 'f'],
    ['a', 'c', 'd', 'e', 'f', 'g'],
    ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  ],
  accordsEtal: [
    ['a', 'c'],
    ['a', 'c', 'e'],
    ['a', 'c', 'd', 'e'],
    ['a', 'c', 'd', 'e', 'f'],
    ['a', 'c', 'd', 'e', 'f', 'g'],
    ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  ],
  gameLength: [
    4, 6, 8, 10, 12, 14
  ]
};
accords = []
accordsEtal = []
gameLength = 0
for (var i = 0; i < games.accords.length; i++) {
  $('ul#sideBar').append('<li id ="menuLvl'+i+'"> <a onclick="changeLvl('+ i +')">'+ i +'</a> </li>')
};

function init(aList, bList, gL) {
  accords = bList
  accordsEtal = aList
  a = ''
  gameLength = gL
  isFirst = true
  score = 0
  wrongeAnswer = 0
  $('div#accordEtal').empty();
  for (var i = 0; i < accordsEtal.length; i++) {
    $('div#accordEtal').append('<div class="col-sm-2"><input type="button" class="chord-var btn btn-lg btn-default" onclick="checkAnswer(' + i + ')" value="' + accordsEtal[i] + '"/></div>');
  };
  newAccord();
};

function repeatAccord() {
  sound.play(a)
}

function newAccord() {
  a = accords[Math.floor(Math.random() * accords.length)];
  setTimeout(function() {
    sound.play(a)
  }, 1500)
  // $('div#accord').replaceWith('<div id="accord">' + a + '</div>');
  isFirst = true
};

function checkAnswer(i) {
  console.log(i + accordsEtal[i] + ' ' + a)
  if (a.replace(/[^a-z]/g, '') == accordsEtal[i]) {
    if (isFirst) {
      score++;
    }
    $('button.chord').css('background', '#5cb85c')
    setTimeout(function() {
      $('button.chord').css('background', '#f0ad4e')
    }, 1000)
    newAccord()
  } else {
    $('button.chord').css('background', '#d9534f')
    setTimeout(function() {
      $('button.chord').css('background', '#f0ad4e')
    }, 1000)
    if (isFirst) {
      isFirst = false;
      wrongeAnswer++;
    }
  }
  if (wrongeAnswer + score == gameLength) {
    if (wrongeAnswer / gameLength > 0.2) {
      changeLvl(level)
    } else {
      changeLvl(level + 1)
    }
  }
  changeScore()
};

function changeScore(){
  $('div#score').replaceWith('<div id="score">' + score + ':' + wrongeAnswer + '</div>');
  $('div.progress-bar-success').css('width', score * 100 / gameLength + '%')
  $('div.progress-bar-danger').css('width', wrongeAnswer * 100 / gameLength + '%')
}

function changeLvl(lvl) {
  $('li#menuLvl'+level).toggleClass('active')
  level = lvl;
  init(games.accordsEtal[level], games.accords[level], games.gameLength[level])
  $('li#menuLvl'+lvl).toggleClass('active')
  changeScore()
};
changeLvl(0)