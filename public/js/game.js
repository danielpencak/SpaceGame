/* eslint-disable max-lines */
/* eslint-disable no-extra-parens */
/* eslint-disable max-len*/
/* eslint-disable max-statements*/
/* eslint-disable no-use-before-define*/
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-template */
'use strict';

// global variables

// sprites
let ship = {};
let spaceman = {};
let explosion = {};
let asteroidsGroup = {};
let hangerTilesGroup = {};
let pointer = {};
let startingGate = {};
let engine = {};

// control/UI
let mute = {};
let pauseLabel = {};
let cursors = {};
let timeText = {};
let music = {};

// waypoint
let line = {};
let borderLineTop = {};
let borderLineBottom = {};
let borderLineRight = {};
let borderLineLeft = {};
let intersectPoint = {};

// level editor
let editMode = false;
// editMode = true; // !Uncomment to edit levels!

let newAsteroidArr = [];
let lastTime = 0;

// game state
const levelId = localStorage.getItem('currentLevel') || 'level01';
const levelInt = levelId.slice(-2);
let spacemanAcquired = false;
let pauseTime = 0;
let totalTimePaused = 0;
let startTime = 0;
let time = 0;
let gameStarted = false;

const mapSizeX = 1920;
const mapSizeY = 1920;

// set canvas width to window resolution
const screenSizeX = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const screenSizeY = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

const shipProperties = {
   // start coordinates
  startX: mapSizeX / 2,
  startY: mapSizeY - 300
};

const graphicAssets = {
  background: { URL: '/assets/deep-space.jpg', name: 'deepSpace' },
  ship: { URL: '/assets/xenon2_ship.png', name: 'ship' },
  asteroid: { URL: '/assets/factory.png', name: 'asteroid' },
  spaceman: { URL: '/assets/phaser-dude.png', name: 'spaceman' },
  startingGate: { URL: '/assets/bullet.png', name: 'startingGate' },
  kaboom: { URL: '/assets/explode.png', name: 'kaboom' },
  hanger: { URL: '/assets/hangerWall.png', name: 'hanger' },
  pointer: { URL: '/assets/pointer.png', name: 'pointer' },
  floor: { URL: '/assets/metal.png', name: 'floor' },
  engine: { URL: '/assets/engineBurst.png', name: 'engine' },
  music: { URL: '/assets/music.mp3', name: 'music' }
};

const WebFontConfig = {
  active: (() => { game.time.events.add(Phaser.Timer.SECOND, createText); }),

  google: {
    families: ['Allerta Stencil']
  }

};

const preload = (() => {
  game.load.image(graphicAssets.background.name, graphicAssets.background.URL);
  game.load.image(graphicAssets.ship.name, graphicAssets.ship.URL);
  game.load.image(graphicAssets.asteroid.name, graphicAssets.asteroid.URL);
  game.load.image(graphicAssets.spaceman.name, graphicAssets.spaceman.URL);
  game.load.image(graphicAssets.startingGate.name, graphicAssets.startingGate.URL);
  game.load.spritesheet(graphicAssets.kaboom.name, graphicAssets.kaboom.URL, 128, 128);
  game.load.image(graphicAssets.hanger.name, graphicAssets.hanger.URL);
  game.load.image(graphicAssets.pointer.name, graphicAssets.pointer.URL);
  game.load.image(graphicAssets.floor.name, graphicAssets.floor.URL);
  game.load.image(graphicAssets.engine.name, graphicAssets.engine.URL);
  game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
  game.load.audio(graphicAssets.music.name, graphicAssets.music.URL);
});

const create = (() => {
  // set asteroid coordinates
  const gameObjects = { level01: {
    worldDimensions: [1920, 1920],
    asteroids: [[630, 550], [674, 686], [690, 770], [769, 510], [835, 660], [535, 730], [1005, 619], [999, 675], [885, 835], [456, 547], [346, 634], [451, 289], [346, 634], [366, 434], [833, 387], [705, 207], [960, 273], [702, 994], [569, 938], [409, 867], [451, 1082], [1185, 882], [1272, 846], [1418, 871], [1588,895], [451, 289], [346, 634], [366, 434]],
    hangerTiles: [[0, 0], [50, 0], [100, 0], [450, 0], [500, 0], [550, 0],
    [0, 50], [0, 100], [0, 150], [0, 200], [0, 250], [0, 300], [0, 350],
    [550, 50], [550, 50], [550, 50], [550, 100], [550, 150], [550, 200], [550, 250], [550, 300], [550, 350], [50, 350], [100, 350], [150, 350], [200, 350], [250, 350], [300, 350], [350, 350], [400, 350], [450, 350], [500, 350]],
    spaceman: [600, 400]
  }, level02: {
    worldDimensions: [1920, 1920],
    asteroids: [],
    hangerTiles: [[0, 0], [50, 0], [100, 0], [450, 0], [500, 0], [550, 0],
    [0, 50], [0, 100], [0, 150], [0, 200], [0, 250], [0, 300], [0, 350],
    [550, 50], [550, 50], [550, 50], [550, 100], [550, 150], [550, 200], [550, 250], [550, 300], [550, 350], [50, 350], [100, 350], [150, 350], [200, 350], [250, 350], [300, 350], [350, 350], [400, 350], [450, 350], [500, 350]],
    spaceman: [600, 1000]
  }, level03: {
    worldDimensions: [1920, 1920],
    asteroids: [[1429, 454], [1423, 380], [1273, 412], [1275, 503], [1459, 525], [1235, 570], [1285, 639], [1492, 618], [1485, 686], [1254, 703], [1209, 774], [1536, 776], [1617, 693], [1571, 625], [1657, 612], [1581, 569], [1661, 545], [1687, 465], [1626, 499], [1541, 518], [1545, 440], [1610, 419], [1565, 363], [1496, 324], [1355, 279], [1542, 218], [1664, 320], [1739, 427], [1816, 387], [1752, 617], [1758, 725], [1237, 313], [1122, 416], [1204, 495], [966, 532], [1083, 604], [1169, 668], [1087, 765], [907, 702], [993, 783], [1528, 866], [1456, 962], [1374, 1043], [1278, 1096], [1122, 1135], [1002, 1077], [925, 1049], [1205, 1094], [1080, 1073], [1531, 948], [1445, 1037], [1289, 1016], [1277, 836], [1072, 851], [867, 1029], [724, 1135], [672, 1141], [568, 1199], [580, 1105], [499, 1050], [490, 1163], [414, 1090], [472, 983], [595, 857], [592, 980], [660, 1049], [867, 786], [790, 759], [736, 761], [684, 801], [630, 933], [463, 846], [570, 737], [765, 624], [979, 645], [664, 709], [535, 645], [456, 747], [547, 855], [389, 959], [293, 937], [381, 790], [375, 631], [485, 545], [666, 633], [814, 538], [1275, 1187], [1393, 1163], [1483, 1118], [1549, 1051], [1617, 1162], [1510, 1233], [1650, 1265], [1724, 1149], [1659, 1027], [1650, 948], [1777, 1035], [1763, 928], [1630, 867], [1734, 824], [1650, 770], [1766, 538]],
    hangerTiles: [[0, 0], [50, 0], [100, 0], [450, 0], [500, 0], [550, 0],
    [0, 50], [0, 100], [0, 150], [0, 200], [0, 250], [0, 300], [0, 350],
    [550, 50], [550, 50], [550, 50], [550, 100], [550, 150], [550, 200], [550, 250], [550, 300], [550, 350], [50, 350], [100, 350], [150, 350], [200, 350], [250, 350], [300, 350], [350, 350], [400, 350], [450, 350], [500, 350]],
    spaceman: [1369, 354]
  }, level04: {
    worldDimensions: [1920, 1920],
    asteroids: [[630, 550]],
    hangerTiles: [[0, 0], [50, 0], [100, 0], [450, 0], [500, 0], [550, 0],
    [0, 50], [0, 100], [0, 150], [0, 200], [0, 250], [0, 300], [0, 350],
    [550, 50], [550, 50], [550, 50], [550, 100], [550, 150], [550, 200], [550, 250], [550, 300], [550, 350], [50, 350], [100, 350], [150, 350], [200, 350], [250, 350], [300, 350], [350, 350], [400, 350], [450, 350], [500, 350]],
    spaceman: [600, 400]
  }, level05: {
    worldDimensions: [1920, 1920],
    asteroids: [[630, 550]],
    hangerTiles: [[0, 0], [50, 0], [100, 0], [450, 0], [500, 0], [550, 0],
    [0, 50], [0, 100], [0, 150], [0, 200], [0, 250], [0, 300], [0, 350],
    [550, 50], [550, 50], [550, 50], [550, 100], [550, 150], [550, 200], [550, 250], [550, 300], [550, 350], [50, 350], [100, 350], [150, 350], [200, 350], [250, 350], [300, 350], [350, 350], [400, 350], [450, 350], [500, 350]],
    spaceman: [600, 400]
  }, level06: {
    worldDimensions: [1920, 1920],
    asteroids: [[630, 550]],
    hangerTiles: [[0, 0], [50, 0], [100, 0], [450, 0], [500, 0], [550, 0],
    [0, 50], [0, 100], [0, 150], [0, 200], [0, 250], [0, 300], [0, 350],
    [550, 50], [550, 50], [550, 50], [550, 100], [550, 150], [550, 200], [550, 250], [550, 300], [550, 350], [50, 350], [100, 350], [150, 350], [200, 350], [250, 350], [300, 350], [350, 350], [400, 350], [450, 350], [500, 350]],
    spaceman: [600, 400]
  }};

  game.add.tileSprite(0, 0, 1920, 1920, 'deepSpace');

  game.world.setBounds(0, 0, mapSizeX, mapSizeY);

  game.physics.startSystem(Phaser.Physics.arcade);

  // create ship sprite, enable physics

  const offsetX = (mapSizeX / 2) - 300;
  const offsetY = mapSizeY - 600;

  // create asteroids
  asteroidsGroup = game.add.physicsGroup();

  const addAsteroids = (() => {
    for (const elem of gameObjects[levelId].asteroids) {
      const newObject = asteroidsGroup.create(elem[0], elem[1], 'asteroid');

      newObject.body.immovable = true;
    }
  });

  hangerTilesGroup = game.add.physicsGroup();

  const addHangerTile = (() => {
    for (const elem of gameObjects[levelId].hangerTiles) {
      const newObject = hangerTilesGroup.create(offsetX + elem[0], offsetY + elem[1], 'hanger');

      newObject.body.immovable = true;
    }
  });

  game.add.tileSprite(offsetX + 50, offsetY + 50, 500, 300, 'floor');

  addAsteroids();
  addHangerTile();

  game.add.text(offsetX + 100, offsetY + 70, levelId.toUpperCase(), { font: '35px Allerta Stencil', fill: 'black' });

  game.add.text(offsetX + 100, offsetY + 120, '\u2343\u2353\u2344', { font: '35px Allerta Stencil', fill: 'black' });

  game.add.text(offsetX + 170, offsetY + 130, 'To move the ship', { font: '24px Allerta Stencil', fill: 'black' });

  game.add.text(offsetX + 100, offsetY + 190, 'Avoid the mines', { font: '24px Allerta Stencil', fill: 'black' });

  game.add.text(offsetX + 100, offsetY + 260, 'Rescue the spaceman', { font: '24px Allerta Stencil', fill: 'black' });

  game.add.text(offsetX + 100, offsetY + 290, 'and bring him back to the hangar', { font: '24px Allerta Stencil', fill: 'black' });

  ship = game.add.sprite(shipProperties.startX, shipProperties.startY, 'ship');
  ship.anchor.set(0.5, 0.5);
  ship.bringToTop();
  game.physics.arcade.enable(ship);
  ship.body.collideWorldBounds = true;

  spaceman = game.add.sprite(gameObjects[levelId].spaceman[0], gameObjects[levelId].spaceman[1], 'spaceman');
  game.physics.arcade.enable(spaceman);

  startingGate = game.add.sprite(offsetX + 150, offsetY + 40, 'startingGate');
  game.physics.arcade.enable(startingGate);

  cursors = game.input.keyboard.createCursorKeys();

  game.camera.follow(ship);

  if (!music.paused && !music.key) {
    music = game.add.audio('music');
    music.loop = true;
    music.play();
  }
});

const update = (() => {
  // pause / play

  if (pauseLabel.text) {
    pauseLabel.kill();
  }
  pauseLabel = game.add.text(0, 0, '\u23F8', { font: '24px Arial', fill: 'white' });
  pauseLabel.inputEnabled = true;
  pauseLabel.fixedToCamera = true;
  pauseLabel.events.onInputUp.add(() => {
    game.paused = true;
    $('#pauseModal').css('display', 'block');
    pauseLabel.kill();
    timeText.kill();
    pauseTime = Date.now() - startTime;
  });

  const unpause = (() => {
    if (game.paused) {
      $('#pauseModal').css('display', 'none');
      game.paused = false;
      totalTimePaused += Date.now() - startTime - pauseTime;
    }
  });

  $('#playButton').on('click', () => {
    unpause();
  });
  game.input.onDown.add(unpause, self);

  // music pause/ play
  if (mute.text) {
    mute.kill();
  }
  mute = game.add.text(50, 0, 'Mute', { fontSize: '24px', fill: 'white' });
  mute.fixedToCamera = true;
  mute.inputEnabled = true;
  mute.events.onInputUp.add(() => {
    if (music.paused === false) {
      music.pause();
    }
    else {
      music.resume();
    }
  });

  // time counter text
  if (timeText.text) {
    timeText.kill();
  }

  if (gameStarted) {
    time = (((Date.now() - startTime) - totalTimePaused) / 1000).toFixed(2);

    timeText = game.add.text(screenSizeX - 180, 0, `Time: ${time}`, { fontSize: '32px', fill: 'white' });
    timeText.fixedToCamera = true;
  }

  // add collision physics
  if (game.physics.arcade.collide(ship, asteroidsGroup) && editMode === false) {
    explosion = game.add.sprite(ship.body.x, ship.body.y, 'kaboom');
    explosion.animations.add('kaboom');
    explosion.anchor.setTo(0.5, 0.5);
    explosion.play('kaboom', 30, false, true);
    ship.kill();
    spacemanAcquired = false;

    setTimeout(restart, 600);

    // reset time
    startTime = Date.now();
    gameStarted = false;
  }

  game.physics.arcade.collide(ship, hangerTilesGroup);

  if (game.physics.arcade.overlap(ship, spaceman)) {
    spaceman.kill();
    spacemanAcquired = true;
  }

  if (game.physics.arcade.overlap(ship, startingGate)) {
    gameStarted = true;
    if (spacemanAcquired === true) {
      // stop game
      gameStarted = false;
      game.paused = true;
      $('#endModal').css('display', 'block');
      $('#finishTime').text(`Time: ${time}`);
      pauseLabel.kill();
      timeText.kill();
      const username = localStorage.getItem('username');

      sendResults(username);
    }
    startTime = Date.now() - totalTimePaused;
  }

  // ship movement /////////////////////
  if (cursors.up.isDown) {
    if (engine.key) {
      engine.kill();
    }
    game.physics.arcade.accelerationFromRotation(ship.rotation - 1.5708, 200, ship.body.acceleration);

    engine = game.add.sprite(0, 0, 'engine');
    engine.anchor.set(0.5, -1.2);
    ship.addChild(engine);
  }
  else {
    ship.body.acceleration.set(0);
    if (engine.key) {
      engine.kill();
    }
  }
  if (cursors.left.isDown) {
    ship.body.angularVelocity = -300;
  }
  else if (cursors.right.isDown) {
    ship.body.angularVelocity = 300;
  }
  else {
    ship.body.angularVelocity = 0;
  }

  // border lines //////////////////////
  if (spacemanAcquired) {
    line = new Phaser.Line(ship.body.x, ship.body.y, shipProperties.startX, shipProperties.startY);
  }
  else {
    line = new Phaser.Line(ship.body.x, ship.body.y, spaceman.body.x, spaceman.body.y);
  }

  borderLineTop = new Phaser.Line(game.camera.x, game.camera.y, game.camera.x + screenSizeX, game.camera.y);

  borderLineBottom = new Phaser.Line(game.camera.x, game.camera.y + screenSizeY, game.camera.x + screenSizeX, game.camera.y + screenSizeY);

  borderLineRight = new Phaser.Line(game.camera.x + screenSizeX, game.camera.y, game.camera.x + screenSizeX, game.camera.y + screenSizeY);

  borderLineLeft = new Phaser.Line(game.camera.x - 10, game.camera.y, game.camera.x - 10, game.camera.y + screenSizeY);

  // pointer creation, alignment, deletion ///////////
  if (pointer.key) {
    pointer.destroy();
  }

  const intersectFunction = ((borderLines) => {
    for (const borderLine of borderLines) {
      intersectPoint = line.intersects(borderLine, true);

      if (intersectPoint) {
        pointer = game.add.sprite(intersectPoint.x, intersectPoint.y, 'pointer');
        pointer.anchor.set(0.5, -1);
        pointer.angle = (line.angle * 360) / (Math.PI * 2) + 90;
      }
    }
  });

  intersectFunction([borderLineTop, borderLineBottom, borderLineLeft, borderLineRight]);

  ///////// level edit
  function builderAsteroid(){
    if (Date.now() - lastTime > 200) {
      lastTime = Date.now();
      const coordinates = [game.camera.x + game.input.mousePointer.x, game.camera.y +  game.input.mousePointer.y];
      console.log(coordinates);
      newAsteroidArr.push(coordinates);
      console.log(JSON.stringify(newAsteroidArr));

      const newObject = asteroidsGroup.create(game.camera.x + game.input.mousePointer.x, game.camera.y +  game.input.mousePointer.y, 'asteroid')

      newObject.body.immovable = true;
    }
  }
  if (editMode === true) {
    let logButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    logButton.onDown.add(builderAsteroid, this)
  }
});

const restart = (() => { game.state.start(game.state.current); });

const render = (() => {
  if (editMode) {
    game.debug.spriteCoords(ship, 5, 50);
  }
  // game.debug.cameraInfo(game.camera, 5, 50);
  // game.debug.pointer(game.input.activePointer);
  // game.debug.geom(line);
  // game.debug.geom(borderLineTop);
  // game.debug.geom(borderLineBottom);
  // game.debug.geom(borderLineRight);
  // game.debug.geom(borderLineLeft);
  // game.debug.lineInfo(line, 32, 32);
});

const game = new Phaser.Game(screenSizeX, screenSizeY, Phaser.CANVAS, 'canvas', { preload, create, update, render });

const sendResults = ((username) => {
  if (!username) {
    return;
  }
  time *= 1000;

  const options = {
    contentType: 'application/json',
    data: JSON.stringify({ username, time, levelInt }),
    dataType: 'json',
    type: 'POST',
    url: '/games'
  };

  $.ajax(options)
    .done((body) => {
      if (body === false) {
        Materialize.toast('Login to save your score', 3000);
      }
    })
    .fail(($xhr) => {
      Materialize.toast($xhr.responseText, 3000);
    });
});

const nextLevel = 'level0' + (parseInt(levelInt) + 1).toString();

if (nextLevel === 'level07') {
  $('#nextButton').addClass('disabled');
}
$('#nextButton').on('click', () => {
  localStorage.setItem('currentLevel', nextLevel);
});
