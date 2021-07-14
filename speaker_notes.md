Let's get a little bit more complicated. In games, we often need objects to have their own behavior - maybe something is floating, maybe an enemy needs to walk around, maybe there's an animation that needs to fire occasionally.

By creating our own GameObject classes and adding them to our scene, we can take advantage of some of the lifecycle events built into Phaser. For instance, here we add a Goomba which tracks its target, inching closer to Mario on each update.

If you run this locally, you'll see the goomba blink a lot and snap to the Mario's current position. What gives??