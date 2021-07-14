import Phaser from 'phaser';

// Normalized random distribution
const rand = () => (Math.random() + Math.random() + Math.random()) / 3

// Our enemy! A goomba that chases Mario.
class ChasingGoomba extends Phaser.GameObjects.Image {
  private speed:number;

  constructor(scene: Phaser.Scene, x: number, y: number, private target: Phaser.GameObjects.Image){
    super(scene, x, y, 'goomba');

    this.displayWidth = 64;
    this.displayHeight = 64;

    this.speed = 10 + (rand()*25);
  }

  // Automatically invoked by Phaser when necessary.
  preUpdate = (timeElapsed: number, deltaTime: number) => {
    // Slow down the deltaTime a bit
    const adjustedTime = (deltaTime / 100);

    if (this.x < this.target.x) {
      this.x += this.speed * adjustedTime;
    } else if (this.x > this.target.x) {
      this.x -= this.speed * adjustedTime;
    }

    if (this.y < this.target.y) {
      this.y += this.speed * adjustedTime;
    } else if (this.y > this.target.y) {
      this.y -= this.speed * adjustedTime;
    }
  }
}

// A scene for our game!
class MyScene extends Phaser.Scene {
  marioImage: Phaser.GameObjects.Image;

  preload() {
    this.load.image('mario', 'https://i.imgur.com/nKgMvuj.png');
    this.load.image('goomba', 'https://i.imgur.com/qqdvBdS.png');
    this.load.image('background', 'https://i.imgur.com/dzpw15B.jpg');
  }

  create() {
    // Add an instance of Mario positioned at (10, 25)
    this.marioImage = this.add.image(
      1440 * rand(), // x
      960 * rand(), // y
      'mario',
    );
    this.marioImage.displayWidth = 32;
    this.marioImage.displayHeight = 32;
    this.marioImage.setDepth(10);

    // Mark this object as interactive.
    this.marioImage.setInteractive({ useHandCursor: true });

    // Bind over/out event handlers.
    this.marioImage.on('pointerover', () => {
      this.marioImage.setTint(0xff0000);
    });
    this.marioImage.on('pointerout', () => {
      this.marioImage.setTint(0xffffff);
    });

    this.marioImage.on('pointerdown', () => {
      this.updateMario();
    });
    

    // Create the enemy instance
    const goomba = new ChasingGoomba(this, 50, 50, this.marioImage);
    this.add.existing(goomba);

    // Create a background, and set it behind everything.
    const bg = this.add.image(0, 0, 'background');
    bg.setOrigin(0, 0);
    bg.setDepth(-1);


    // Tell the camera to start following Mario, with a lerp factor of 0.1
    // Setting the lerp to 1 will lock onto the target, below 1 will ease towards the target.
    this.cameras.main.startFollow(this.marioImage, false, 0.1, 0.1);
    // Setting bounds prevents the camera from showing 'the void'
    // Basically, the camera will not allow itself to show anything outside of the rect (0,0,1440,960).
    this.cameras.main.setBounds(0, 0, 1440, 960);

    // Camera zooms can be adjusted through `setZoom` or through tweens.
    // this.cameras.main.setZoom(2); // Try me!
  }

  updateMario = () => {
    // Tween to random position
    this.tweens.add({
      targets: this.marioImage,
      duration: 500,
      ease: 'Cubic',
      props: {
        x: rand() * 1440,
        y: rand() * 960,
      }
    });

    // Tween to random width/height
    this.tweens.add({
      targets: this.marioImage,
      duration: 500,
      ease: 'Bounce',
      props: {
        // Note that `image`s use displayWidth/Height instead of just `width/height`
        displayWidth: rand() * 250,
        displayHeight: rand() * 250,
      }
    });
  }
}

// Create the Game instance and start the game loop!
new Phaser.Game({
  width: 500,
  height: 500,
  scene: MyScene,
});