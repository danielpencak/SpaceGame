/* eslint-disable*/
'use strict';
let cursors = {};
let ship = {};
let asteroid = {};
let veggie = {};
let spaceman = {};
let spacemanAcquired = false;

var shipProperties = {
   // start coordinates
  //  startX: gameProperties.screenWidth * 0.5,
  //  startY: gameProperties.screenHeight * 0.5,
  startX: 250,
  startY: 250
};

const graphicAssets = {
 background: { URL:'/assets/deep-space.jpg', name: 'deepSpace' },
 ship: { URL: '/assets/xenon2_ship.png', name: 'ship'},
 asteroid: { URL:'/assets/factory.png', name: 'asteroid'},
 spaceman: { URL:'/assets/phaser-dude.png', name: 'spaceman' }
};

const preload = (() => {
  game.load.image(graphicAssets.background.name, graphicAssets.background.URL);
  game.load.image(graphicAssets.ship.name, graphicAssets.ship.URL);
  game.load.image(graphicAssets.asteroid.name, graphicAssets.asteroid.URL);
  game.load.image(graphicAssets.spaceman.name, graphicAssets.spaceman.URL);
});

const create = (() => {
  game.add.tileSprite(0, 0, 1920, 1920, 'deepSpace');

      game.world.setBounds(0, 0, 1920, 1920);

      game.physics.startSystem(Phaser.Physics.arcade);

      // create ship sprite, enable physics
      ship = game.add.sprite(game.world.centerX, game.world.centerY, 'ship');
      ship.anchor.set(0.5, 0.5);
      game.physics.arcade.enable(ship);

      // create asteroid sprite, enable physics
      // game.add.sprite(100, 100, 'asteroid');
      // game.physics.arcade.enable(asteroid);

      // ship.body.onCollide = new Phaser.Signal();
      // ship.body.onCollide.add(hitSprite, this);
      asteroid = game.add.physicsGroup();
      veggie = asteroid.create(100, 100, 'asteroid')
      veggie.body.immovable = true;
      ship.body.collideWorldBounds = true;

      spaceman = game.add.sprite(100, 50, 'spaceman');
      game.physics.arcade.enable(spaceman);

      cursors = game.input.keyboard.createCursorKeys();

      game.camera.follow(ship);
});

const update = (() => {
if (game.physics.arcade.collide(ship, asteroid))
{
    console.log('boom');
}

if (game.physics.arcade.overlap(ship, spaceman))
{
    spaceman.kill();
    console.log('ouch');
    spacemanAcquired = true;
    console.log(spacemanAcquired);
}
  // game.physics.arcade.collide(ship, asteroid, collisionHandler, null, this);
  if (game.physics.arcade.collide(ship, asteroid, collisionHandler, null, this))
    {
        console.log('boom');
    }

    // game.physics.arcade.overlap(sprite, group, collisionHandler, null, this);

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

    // if (veg.frame == 17)
    // {
    //     veg.kill();
    // }
    console.log('collide');
}

function render() {
  // game.debug.cameraInfo(game.camera);
  // game.debug.spriteCoords(ship, 32, 500);
}

const game = new Phaser.Game(1000, 700, Phaser.CANVAS, 'gamecontainer', { preload: preload, create: create, update: update, render: render});
