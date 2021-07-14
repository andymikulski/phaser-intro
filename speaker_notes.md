Okay! We have a rectangle zooming around. Cool. Let's try displaying something a little different.

We're going to leverage the Scene's `preload` function, load an asset, and then figure out how to display that in the world.

Phaser offers a `LoadManager` which allows us to queue assets (of many types) for loading, and emits events upon load progress or completion. As a bonus, using the `preload` method means the scene will not start until its assets are ready.

In this example we've replaced our redtangle with an instace of Mario. Notice that we now create an instance of `Phaser.GameObjects.Image` instead of `..Rectangle`, too.

(We'll also remove the `setOrigin(0,0)` since the animations look better.)