import Phaser from 'phaser';

type Position = { x: number; y: number; };

// Normalized random distribution
const rand = () => (Math.random() + Math.random() + Math.random()) / 3;

//#region Fake Server
const FakeServerUpdates = (function () {
  const listeners: Function[] = [];
  const ents: { [id: string]: Position } = {};
  const getRandomId = () => Math.random().toString(32).slice(2).slice(-4);
  const destroyRandomEnt = () => {
    const id = Object.keys(ents)
      .sort(() => Math.random() > 0.5 ? 1 : -1)
      .sort(() => Math.random() > 0.5 ? 1 : -1)
      .sort(() => Math.random() > 0.5 ? 1 : -1)[0];
    delete ents[id];
  };
  const makeEnt = () => {
    ents[getRandomId()] = {
      x: rand() * 1440,
      y: rand() * 900,
    };
  };
  const updateEnts = () => {
    for (const id in ents) {
      if (Math.random() > 0.75) { continue; }
      ents[id].x += rand() * 10 * (Math.random() > 0.5 ? 1 : -1);
      ents[id].y += rand() * 10 * (Math.random() > 0.5 ? 1 : -1);
    }
  };

  const subscribe = (func: Function) => listeners.push(func);
  const broadcast = () => listeners.forEach(handler => handler(ents));

  const tick = () => {
    // Some users leave
    for (let i = 0; i < Math.floor(Math.random() * 2); i++) {
      destroyRandomEnt();
    }
    // Some users join
    for (let i = 0; i < Math.floor(Math.random() * 5); i++) {
      makeEnt();
    }
    // Some users move around
    updateEnts();

    // Broadcast the updates to any listening clients
    broadcast();

    // Queue next update
    setTimeout(tick, 1000 / 2);
  };
  tick();
  return { subscribe };
})();
//#endregion

//#region PlayerEntity class definition
class PlayerEntity extends Phaser.GameObjects.Container {
  private characterImage: Phaser.GameObjects.Image;
  private nameText: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    this.characterImage = new Phaser.GameObjects.Image(scene, 0, 0, 'mario');
    this.characterImage.displayWidth = 32;
    this.characterImage.displayHeight = 32;

    this.nameText = new Phaser.GameObjects.Text(scene, 0, 0, 'Mario', { color: '#fff', stroke: '#000', strokeThickness: 4 });

    this.add(this.characterImage);
    this.add(this.nameText);

    this.width = 64;
    this.height = 64;
  }

  public setPlayerColor(hexColor: number) {
    this.characterImage.setTint(hexColor);
  }

  public setPlayerName(name: string) {
    this.nameText.setText(name);
  }

  public moveToPosition(pos: Position) {
    this.scene.tweens.add({
      targets: this,
      props: {
        x: pos.x,
        y: pos.y,
      },
      duration: 1000 / 2,
      ease: 'Cubic',
    });
  }

  public async fadeIn() {
    return new Promise<void>((res) => {
      this.setAlpha(0);
      this.scene.tweens.add({
        targets: this,
        props: {
          alpha: 1,
        },
        duration: 300,
        onComplete: () => {
          res();
        }
      });
    });
  }

  public async fadeOut() {
    return new Promise<void>((res) => {
      this.scene.tweens.add({
        targets: this,
        props: {
          alpha: 0,
        },
        duration: 300,
        onComplete: () => {
          res();
        }
      });
    });
  }
}
//#endregion



class MyScene extends Phaser.Scene {
  preload() {
    this.load.image('mario', 'https://i.imgur.com/nKgMvuj.png');
    this.load.image('background', 'https://i.imgur.com/dzpw15B.jpg');
  }

  create() {
    // Create a background, and set it behind everything.
    const bg = this.add.image(0, 0, 'background');
    bg.setOrigin(0, 0);
    bg.setDepth(-1);

    // Begin listening to 'server' updates
    FakeServerUpdates.subscribe(this.onServerUpdate);
  }

  // This is used to track the existence of entities within Phaser
  currentlyTrackedEnts: { [id: string]: PlayerEntity } = {};

  // The server will send information such as a player's position, name, current avatar, etc.
  onServerUpdate = (ents: { [id: string]: Position }) => {
    const current = this.currentlyTrackedEnts;
    // Check the existence of the objects we're tracking in Phaser to determine if someone has left.
    for (const id in current) {
      if (!ents[id]) {
        // Fade out the object, ...
        current[id].fadeOut().then(() => {
          // ..and then destroy it!
          current[id].destroy(true);
          // ..and stop tracking it in memory!
          delete current[id];
        });
      }
    }

    // For each entity the server tells us about, we will check if it exists locally or not.
    // If not, we will create a new Image object. If so, we will update the existing image with new data.
    for (const id in ents) {
      const ent = ents[id];
      let player = current[id];

      if (!player) {
        // Player does NOT exist, create it!
        player = new PlayerEntity(this, ent.x, ent.y);
        this.add.existing(player);
        player.setPlayerColor(0xFFFFFF * Math.random());
        player.setPlayerName(id);

        // Save this object we just created so it can be updated later.
        current[id] = player;

        // Fade in the player!
        player.fadeIn();
      } else {
        // Player already exists, update the position from the server update
        player.moveToPosition(ent);
      }
    }
  }
}

// Create the Game instance and start the game loop!
new Phaser.Game({
  scene: MyScene,
  scale: {
    mode: Phaser.Scale.FIT,
  }
});