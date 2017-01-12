/* eslint-disable*/
// 'use strict';
let cursors = {};
let ship = {};
let asteroid = {};

var gameProperties = {
   screenWidth: 800,
   screenHeight: 480,
};

var shipProperties = {
   // start coordinates
   startX: gameProperties.screenWidth * 0.5,
   startY: gameProperties.screenHeight * 0.5,
};

const graphicAssets = {
 background: { URL:'/assets/deep-space.jpg', name: 'deepSpace' },
 ship: { URL: '/assets/xenon2_ship.png', name: 'ship'},
 asteroid: { URL:'/assets/asteroid.png', name: 'asteroid'}
};


const preload = (() => {
  game.load.image(graphicAssets.background.name, graphicAssets.background.URL);
  game.load.image(graphicAssets.ship.name, graphicAssets.ship.URL);
  game.load.image(graphicAssets.asteroid.name, graphicAssets.asteroid.URL);
});

const create = (() => {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  // game.renderer.clearBeforeRender = false;
  // game.renderer.roundPixels = true;

  game.add.tileSprite(0, 0, game.width, game.height, 'deepSpace');

  // deepSpace.anchor.setTo(.5, .5);
  ship = game.add.sprite(shipProperties.startX, shipProperties.startY, 'ship');
  ship.anchor.set(0.5);

  game.add.sprite(100, 100, 'asteroid');

  game.physics.enable([ship, asteroid], Phaser.Physics.ARCADE);

  ship.body.maxVelocity.set(200);

  // Game input
  cursors = game.input.keyboard.createCursorKeys();

  ship.body.onCollide = new Phaser.Signal();
  // ship.body.onCollide.add(hitSprite, this);
  ship.body.collideWorldBounds = true;
});

const update = (() => {

  game.physics.arcade.collide(ship, asteroid, collisionHandler, null, this);

  if (cursors.up.isDown)
  {
    game.physics.arcade.accelerationFromRotation(ship.rotation- 1.5708, 200, ship.body.acceleration);
    // console.log(ship);
  }
  else
  {
    ship.body.acceleration.set(0);
  }
  if (cursors.left.isDown)
  {
    ship.body.angularVelocity = -300;
  }
  else if (cursors.right.isDown)
  {
    ship.body.angularVelocity = 300;
  }
  else
  {
    ship.body.angularVelocity = 0;
  }


});

function collisionHandler (ship, asteroid) {
    console.log('collide!!!!!');
}

function render() {
}

const game = new Phaser.Game(gameProperties.screenWidth, gameProperties.screenHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render});
