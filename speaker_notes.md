As we can see, there's nothing here. `Game`s require that we put all of our game objects (like sprites) into their own special containers called `Scene`s. Scenes come with a lot of things out of the box: a camera, a loading mechanism, an event dispatcher, a game object factory, etc. There are also some functions we can define for handling the initialization or preloading of a scene.

Let's create a scene and add some debug logs to show when these events fire. We'll also tell the Game that this is the scene to run when the game starts up by changing our `Game` configuration.

Running this in the browser will show you the setup order for a scene is `init -> preload -> create`.