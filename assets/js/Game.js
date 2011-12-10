var Game = {
    running: true,
    oldTime: Date.now(),
    entities: [],

    run: function () {
        GFX.init(768, 435);

        AssetLoader.load(function () {
            var background = Background.create(768, 435);
            Game.entities.push(background);

            var player = Player.create(80, 80);
            Game.entities.push(player);

            Game.loop();
        });
    },

    loop: function () {
        var newTime = Date.now();
        var delta = ((newTime - Game.oldTime) / 1000);

        Game.physics(delta);
        Game.graphics();

        // Clean up any entities marked for being destroyed
        for (var i = 0, j = Game.entities.length; i < j; i++) {
            if (Game.entities[i].destroy) {
                var entity = Game.entities.splice(i, 1);
            }
        }

        Game.oldTime = newTime;

        if (Game.running) {
            requestAnimFrame(Game.loop);
        }
    },

    physics: function (delta) {
        for (var i = 0, j = Game.entities.length; i < j; i++) {
            //Game.entities[i].update();
        }
    },

    graphics: function () {
        for (var i = 0, j = Game.entities.length; i < j; i++) {
            Game.entities[i].draw();
        }
    }
};