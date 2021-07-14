import Phaser from 'phaser';

type Position = { x: number; y: number; };

// Normalized random distribution
const rand = () => (Math.random() + Math.random() + Math.random()) / 3;

//#region Fake Server
const FakeServerUpdates = (function () {
  const listeners: Function[] = [];
  const ents: { [id: string]: Position } = {};
  const getRandomId = () => Math.random().toString(32).slice(2);
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

class MyScene extends Phaser.Scene {
  marioImage: Phaser.GameObjects.Image;

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
  currentlyTrackedEnts: { [id: string]: Phaser.GameObjects.Image } = {};

  // The server will send information such as a player's position, name, current avatar, etc.
  onServerUpdate = (ents: { [id: string]: Position }) => {
    const current = this.currentlyTrackedEnts;
    // Check the existence of the objects we're tracking in Phaser to determine if someone has left.
    for (const id in current) {
      if (!ents[id]) {
        // Fade out the object, ...
        this.tweens.add({
          targets: current[id],
          props: {
            alpha: 0,
          },
          duration: 300,
          onComplete: () => {
            // ..and then destroy it!
            current[id].destroy(true);
            // ..and stop tracking it in memory!
            delete current[id];
          }
        });
      }
    }

    // For each entity the server tells us about, we will check if it exists locally or not.
    // If not, we will create a new Image object. If so, we will update the existing image with new data.
    for (const id in ents) {
      const ent = ents[id];
      if (!current[id]) {
        // Player does NOT exist, create it!
        const player = this.add.image(ent.x, ent.y, 'mario');
        player.displayWidth = 64;
        player.displayHeight = 64;
        // Apply a random color tint to distinguish different Mario images!
        player.setTint(0xFFFFFF * Math.random());

        // Save this object we just created so it can be updated later.
        current[id] = player;

        // Fade in the player!
        player.setAlpha(0);
        this.tweens.add({
          targets: player,
          props: {
            alpha: 1,
          },
          duration: 300
        });
      } else {
        // Player already exists, update the position from the server update
        this.tweens.add({
          targets: current[id],
          props: {
            x: ent.x,
            y: ent.y,
          },
          duration: 1000 / 2,
          ease: 'Cubic',
        });
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