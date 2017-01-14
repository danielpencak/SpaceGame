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
let asteroids = {};
let spaceman = {};
let startingGate = {};
let explosion = {};
let spacemanAcquired = false;

const shipProperties = {
   // start coordinates
  startX: 250,
  startY: 250
};

const graphicAssets = {
  background: { URL: '/assets/deep-space.jpg', name: 'deepSpace' },
  ship: { URL: '/assets/xenon2_ship.png', name: 'ship' },
  asteroid: { URL: '/assets/factory.png', name: 'asteroid' },
  spaceman: { URL: '/assets/phaser-dude.png', name: 'spaceman' },
  startingGate: { URL: '/assets/bullet.png', name: 'startingGate' },
  kaboom: { URL: '/assets/explode.png', name: 'kaboom' }
};

const preload = (() => {
  game.load.image(graphicAssets.background.name, graphicAssets.background.URL);
  game.load.image(graphicAssets.ship.name, graphicAssets.ship.URL);
  game.load.image(graphicAssets.asteroid.name, graphicAssets.asteroid.URL);
  game.load.image(graphicAssets.spaceman.name, graphicAssets.spaceman.URL);
  game.load.image(graphicAssets.startingGate.name, graphicAssets.startingGate.URL);
  game.load.spritesheet(graphicAssets.kaboom.name, graphicAssets.kaboom.URL, 128, 128);
});

const create = (() => {
  // set asteroid coordinates
  const gameObjects = {
    asteroid: [[100, 200], [400, 200], [600, 200]]
  };

  game.add.tileSprite(0, 0, 1920, 1920, 'deepSpace');

  game.world.setBounds(0, 0, 1920, 1920);

  game.physics.startSystem(Phaser.Physics.arcade);

  // create ship sprite, enable physics
  ship = game.add.sprite(shipProperties.startX, shipProperties.startY, 'ship');
  ship.anchor.set(0.5, 0.5);
  game.physics.arcade.enable(ship);
  ship.body.collideWorldBounds = true;

  // create asteroids
  asteroids = game.add.physicsGroup();

  const addAsteroids = (() => {
    for (const elem of gameObjects.asteroid) {
      const newAsteroid = asteroids.create(elem[0], elem[1], 'asteroid');

      newAsteroid.body.immovable = true;
    }
  });

  addAsteroids(gameObjects);

  spaceman = game.add.sprite(100, 100, 'spaceman');
  game.physics.arcade.enable(spaceman);

  startingGate = game.add.sprite(600, 100, 'startingGate');
  game.physics.arcade.enable(startingGate);

  cursors = game.input.keyboard.createCursorKeys();

  game.camera.follow(ship);
});

const update = (() => {
  // add collision physics to asteroids and ship
  if (game.physics.arcade.collide(ship, asteroids)) {
    console.log('boom');
    explosion = game.add.sprite(ship.body.x, ship.body.y, 'kaboom');
    explosion.animations.add('kaboom');
    explosion.anchor.setTo(0.5, 0.5);
    explosion.play('kaboom', 30, false, true);
    ship.kill();
  }

  // add overlap phyisics to pick up spaceman
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

  // ship movement
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
});

const render = (() => {
  // game.debug.cameraInfo(game.camera);
  // game.debug.spriteCoords(ship, 32, 500);
});

const game = new Phaser.Game(1000, 700, Phaser.CANVAS, 'gamecontainer', { preload, create, update, render });
