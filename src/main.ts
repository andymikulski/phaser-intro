import Phaser from 'phaser';

// A scene for our game!
class MyScene extends Phaser.Scene {
  init() {
    console.log('MyScene is being initialized!')
  }
  preload() {
    console.log('MyScene is preloading!')
  }
  create() {
    // This fires when the scene is 'ready', create game objects here!
    console.log('MyScene is being created and added to Phaser!')
  }
}

// Create the Game instance and start the game loop!
new Phaser.Game({
  width: 500,
  height: 500,
  scene: MyScene,
});