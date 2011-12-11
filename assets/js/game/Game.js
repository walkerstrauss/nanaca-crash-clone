var Game = {
    running: true,
    oldTime: Date.now(),
    entities: [],
    player: null,
    world: null,
    background: null,
    floor: null,
    contactListener: null,
    kickers: [],

    _init: function () {
        this.world = World.create();
        this.entities.push(this.world);

        this.background = Background.create(768, 435);
        this.entities.push(this.background);

        this.floor = Floor.create(768, 20);
        this.entities.push(this.floor);

        this.kickers = Collection.create();
        this.kickers.spacing = GFX.width * 1.5;
        this.kickers.lastPosition = 0;
        this.entities.push(this.kickers);
        this.kickers.newKicker = function () {
            Game.kickers.lastPosition += Game.kickers.spacing;

            var rnd = Math.random();
            if (rnd > 0.9) {
                var kicker = Game.kickers.createItem(Kicker_Stop, 50, 130);
            } else if (rnd > 0.5) {
                var kicker = Game.kickers.createItem(Kicker_Kick, 50, 130);
            } else if (rnd > 0.3) {
                var kicker = Game.kickers.createItem(Kicker_Punch, 50, 130);
            } else if (rnd >= 0) {
                var kicker = Game.kickers.createItem(Kicker_Block, 50, 130);
            }

            kicker.setPosition(Game.kickers.lastPosition, kicker.y);
        };

        this.player = Player.create(82, 73);
        this.entities.push(this.player);

        // Create the kickers
        for (var i = 0; i < 10; i++) {
            this.kickers.newKicker();
        }

        // Collisions
        this.contactListener = new Box2D.Dynamics.b2ContactListener();
        this.contactListener.BeginContact = function (contact) {
            var userDataA = contact.GetFixtureA().GetBody().GetUserData();

            if (userDataA && userDataA.floor) {
                Game.player.physics.SetLinearDamping(2);
            } else if (userDataA && userDataA.kicker) {
                userDataA.entity.move.activate();
                /*
                 if (userDataA.type == "block") {
                 Game.player.blocked = true;
                 }
                 */
                userDataA.kicker = false;
                contact.GetFixtureA().GetBody().SetUserData(userDataA);
            }
        };

        this.contactListener.EndContact = function (contact) {
            var userData = contact.GetFixtureA().GetBody().GetUserData();
            if (userData && userData.floor) {
                Game.player.physics.SetLinearDamping(0.1);
            }
        };

        this.contactListener.PostSolve = function (contact, impulse) {

        };

        this.contactListener.PreSolve = function (contact, oldManifold) {

        };

        this.world.physics.SetContactListener(this.contactListener);

        // User input
        Event.observe(document, "click", Game.click);
    },

    click: function (e) {
        e.preventDefault();

        Game.player.bike.move.activate();

        return false;
    },

    run: function () {
        GFX.init(768, 435);

        AssetLoader.load(function () {
            Game._init();
            Game.loop();
        });
    },

    loop: function () {
        var newTime = Date.now();
        var delta = ((newTime - Game.oldTime) / 1000);

        Game._physics(delta);
        Game._graphics();

        // Clean up any entities marked for being destroyed
        for (var i = 0, j = Game.entities.length; i < j; i++) {
            if (Game.entities[i].destroy) {
                var entity = Game.entities.splice(i, 1);

                if (entity.physics) {
                    this.world.DestroyBody(entity.physics);
                }
            }
        }

        var log = document.getElementById("log");
        var logMsg = "";
        logMsg += "<p>Player: " + Math.floor(Game.player.x) + "," + Math.floor(Game.player.y) + "</p>";
        logMsg += "<p>Speed: " + Game.player.speed.Length() + "</p>";
        logMsg += "<p>Blocked: " + Game.player.blocked + "</p>";
        log.innerHTML = logMsg;

        Game.oldTime = newTime;

        if (Game.running) {
            requestAnimFrame(Game.loop);
        }
    },

    _physics: function (delta) {
        for (var i = 0, j = Game.entities.length; i < j; i++) {
            Game.entities[i].update(delta);
        }

        var v = this.player.x;
        var removeCount = 0;
        for (var n = 0, m = this.kickers.getLength(); n < m; n++) {
            var kicker = this.kickers.get(n);

            // Check if a kicker goes off screen
            if (kicker.x - v < -300) {
                removeCount++;
            }
        }

        while (removeCount) {
            removeCount--;
            this.world.physics.DestroyBody(this.kickers.get(removeCount).physics);
            this.kickers.shift();

            this.kickers.newKicker();
        }
    },

    _graphics: function () {
        for (var i = 0, j = Game.entities.length; i < j; i++) {
            Game.entities[i].draw();
        }
    }
};