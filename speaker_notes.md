Great! We have Mario bouncing around the screen. This isn't much of a game though, we need something to do!

We can use Phaser's built-in input system to attach event handlers to our game objects. Here, we'll simply detect when the cursor is over the sprite, and change its appearance accordingly.

We'll also attach a "pointerdown" event which will update our Mario size and position. Phaser uses the concept of "pointers" as a catch-all for various devices. Mouse events and touch events are both covered by the 'pointer' nomenclature.