/* eslint-disable*/
// 'use strict';

var gameProperties = {
   screenWidth: 800,
   screenHeight: 480,
};

var shipProperties = {
   // start coordinates
   // testing testing
   startX: gameProperties.screenWidth * 0.5,
   startY: gameProperties.screenHeight * 0.5,
};

const graphicAssets = {
 background: { URL:'/assets/deep-space.jpg', name: 'deepSpace' },
 ship: { URL: '/assets/xenon2_ship.png', name: 'ship'}
}

window.onload = (() => {
  const preload = (() => {
    game.load.image(graphicAssets.background.name, graphicAssets.background.URL);
    game.load.image(graphicAssets.ship.name, graphicAssets.ship.URL);
  });

  const create = (() => {
    const deepSpace = game.add.sprite(0, 0, 'deepSpace');

    // deepSpace.anchor.setTo(.5, .5);
    const ship = game.add.sprite(shipProperties.startX, shipProperties.startY, 'ship');
  });
  const game = new Phaser.Game(gameProperties.screenWidth, gameProperties.screenHeight, Phaser.AUTO, '', { preload: preload, create: create });
});
