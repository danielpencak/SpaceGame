/* eslint-disable no-extra-parens */
/* eslint-disable max-len*/
/* eslint-disable no-use-before-define*/
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable */
'use strict';


// global variables
let cursors = {};
let ship = {};
let asteroidsGroup = {};
let spaceman = {};
let startingGate = {};
let explosion = {};
let hangerTilesGroup = {};
let spacemanAcquired = false;
let line = {};
let borderLineTop = {};
let borderLineBottom = {};
let borderLineRight = {};
let borderLineLeft = {};

let pointer = {};
let intersectPoint = {};

const mapSizeX = 1920;
const mapSizeY = 1920;

const screenSizeX = 1000;
const screenSizeY = 700;

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
  hanger: { URL: '/assets/tron.png', name: 'hanger' },
  pointer: { URL: '/assets/pointer.png', name: 'pointer' }
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
});

const create = (() => {
  // set asteroid coordinates
  const gameObjects = {
    asteroids: [[100, 200], [400, 200], [600, 200]],
    hangerTiles: [[0, 0], [50, 0], [100, 0], [450, 0], [500, 0], [550, 0],
    [0, 50], [0, 100], [0, 150], [0, 200], [0, 250], [0, 300], [0, 350],
    [550, 50], [550, 50], [550, 50], [550, 100], [550, 150], [550, 200], [550, 250], [550, 300], [550, 350],
    [50, 350], [100, 350], [150, 350], [200, 350], [250, 350], [300, 350], [350, 350], [400, 350], [450, 350], [500, 350]]
  };

  game.add.tileSprite(0, 0, 1920, 1920, 'deepSpace');


  game.world.setBounds(0, 0, mapSizeX, mapSizeY);

  game.physics.startSystem(Phaser.Physics.arcade);

  // create ship sprite, enable physics
  ship = game.add.sprite(shipProperties.startX, shipProperties.startY, 'ship');
  ship.anchor.set(0.5, 0.5);
  game.physics.arcade.enable(ship);
  ship.body.collideWorldBounds = true;

  // create pointer
  // pointer = game.add.sprite(755, 1270, 'pointer');

  const offsetX = (mapSizeX / 2) - 300;
  const offsetY = mapSizeY - 600;
  // create asteroids
  asteroidsGroup = game.add.physicsGroup();

  const addAsteroids = (() => {
    for (const elem of gameObjects.asteroids) {
      const newObject = asteroidsGroup.create(elem[0], elem[1], 'asteroid');

      newObject.body.immovable = true;
    }
  });

  hangerTilesGroup = game.add.physicsGroup();

  const addHangerTile = (() => {
    for (const elem of gameObjects.hangerTiles) {
      const newObject = hangerTilesGroup.create(offsetX + elem[0], offsetY + elem[1], 'hanger');

      newObject.body.immovable = true;
    }
  });
  addAsteroids();
  addHangerTile();

  spaceman = game.add.sprite(1000, 1000, 'spaceman');
  game.physics.arcade.enable(spaceman);

  startingGate = game.add.sprite(offsetX + 150, offsetY + 0, 'startingGate');
  game.physics.arcade.enable(startingGate);

  cursors = game.input.keyboard.createCursorKeys();

  game.camera.follow(ship);

  // line = game.add.graphics(0,0);
  // line.lineStyle(1, 0x0088FF, 1);
});

const update = (() => {
  // add collision physics
  if (game.physics.arcade.collide(ship, asteroidsGroup)) {
    console.log('boom');
    explosion = game.add.sprite(ship.body.x, ship.body.y, 'kaboom');
    explosion.animations.add('kaboom');
    explosion.anchor.setTo(0.5, 0.5);
    explosion.play('kaboom', 30, false, true);
    ship.kill();
  }

  if (game.physics.arcade.collide(ship, hangerTilesGroup)) {
    console.log('safe');
  }

  if (game.physics.arcade.overlap(ship, spaceman)) {
    spaceman.kill();
    console.log('ouch');
    spacemanAcquired = true;
    console.log(spacemanAcquired);
  }

  if (game.physics.arcade.overlap(ship, startingGate)) {
    console.log('hit starting gate');
    if (spacemanAcquired === true) {
      console.log('victory');
    }
  }

  // ship movement /////////////////////
  if (cursors.up.isDown) {
    game.physics.arcade.accelerationFromRotation(ship.rotation - 1.5708, 200, ship.body.acceleration);
  }
  else {
    ship.body.acceleration.set(0);
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
  } else {
    line = new Phaser.Line(ship.body.x, ship.body.y, spaceman.body.x, spaceman.body.y);
  }

  borderLineTop = new Phaser.Line(game.camera.x, game.camera.y, game.camera.x + screenSizeX, game.camera.y)

  borderLineBottom = new Phaser.Line(game.camera.x, game.camera.y + screenSizeY, game.camera.x + screenSizeX, game.camera.y + screenSizeY)

  borderLineRight = new Phaser.Line(game.camera.x + screenSizeX, game.camera.y, game.camera.x + screenSizeX, game.camera.y + screenSizeY)

  borderLineLeft = new Phaser.Line(game.camera.x, game.camera.y, game.camera.x, game.camera.y + screenSizeY)

  // pointer creation, alignment, deletion ///////////
  if (pointer.key) {
    pointer.destroy();
  }

  const intersectFunction = ((borderLines) => {
    for (const borderLine of borderLines) {
      intersectPoint = line.intersects(borderLine, true);

      if (intersectPoint) {
        pointer = game.add.sprite(intersectPoint.x, intersectPoint.y, 'pointer');
        pointer.anchor.set(0.5, - 1);
        pointer.angle = (line.angle * 360) / (Math.PI * 2) + 90;
      }
    }
  })
  intersectFunction([borderLineTop, borderLineBottom, borderLineLeft, borderLineRight]);
});

const render = (() => {
  // game.debug.cameraInfo(game.camera);
  // game.debug.spriteCoords(ship, 32, 500);
  // game.debug.geom(line);
  // game.debug.geom(borderLineTop);
  // game.debug.geom(borderLineBottom);
  // game.debug.geom(borderLineRight);
  // game.debug.geom(borderLineLeft);
  // game.debug.lineInfo(line, 32, 32);
});

const game = new Phaser.Game(screenSizeX, screenSizeY, Phaser.CANVAS, 'gamecontainer', { preload, create, update, render });
