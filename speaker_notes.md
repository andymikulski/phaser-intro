Right now, on each `preUpdate`, we adjust the `x/y` properties by `speed`, each frame. If you're running on a 60fps monitor (which you probably are), this means that this function fires about every 16ms. 

What happens, though, if a user's monitor is faster than 60fps? Let's say a user has a gaming monitor which runs at 144fps. Suddenly this function fires about every _6ms_. Users on faster monitors will see their goombas zip around, since the function is firing faster.

The solution is to leverage the `deltaTime` provided in `preUpdate`. This basically says "this is the duration of time that has passed since the last time this function was ran."

If we adjust our speed by `deltaTime`, we're able to ensure that the objects move at the same rate for all users, regardless of frame rate. If a function fires 3ms after the last, we should only move the object `3ms * speed`.