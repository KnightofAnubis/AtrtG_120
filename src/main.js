/*
ARTG 120 final project

*/


let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,    
    scene: [ Menu, Play ],

    physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
          debug: false,
      },
    },
  }
  
let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, keyUP;
