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
    meter: null,
    miniIcons: null,
    gameOver: false,
    aerialCrash: null,
    gameOverTimer: null,
    gameOverDelay: 1000,
    playerStopped: false,

    _init: function () {
        this.miniIcons = UI_Miniicons.create();
        this.camera = new Camera();
        this.world = World.create();
        this.entities.push(this.world);

        this.background = Background.create(768, 435);
        this.entities.push(this.background);

        this.initForeground();

        this.floor = Floor.create(768, 20);
        this.entities.push(this.floor);

        this.kickers = Collection.create();
        this.kickers.spacing = GFX.width * 1.5;
        this.kickers.lastPosition = 0;
        this.entities.push(this.kickers);
        this.kickers.newKicker = function () {
            Game.kickers.lastPosition += Game.kickers.spacing;

            var rnd = Math.random();
            if (rnd > 0.92) {
                var kicker = Game.kickers.createItem(Kicker_Stop, 70, 120);
            } else if (rnd > 0.8) {
                var kicker = Game.kickers.createItem(Kicker_Angle_Up, 90, 120);
            } else if (rnd > 0.68) {
                var kicker = Game.kickers.createItem(Kicker_Angle_Down, 90, 120);
            } else if (rnd > 0.5) {
                var kicker = Game.kickers.createItem(Kicker_Kick, 110, 100);
            } else if (rnd > 0.3) {
                var kicker = Game.kickers.createItem(Kicker_Punch, 110, 100);
            } else if (rnd >= 0) {
                var kicker = Game.kickers.createItem(Kicker_Block, 110, 100);
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

        this.meter = Meter.create(this.player);
        this.meter.showMeter();

        this.aerialCrash = Aerial_Crash.create(this.player);
        this.aerialCrash.showCrashUI();
        document.getElementById("aerial-btn").addEventListener("click", this.handleAerialClick.bind(this));

        // User input
        Event.observe(document, "click", Game.click);
    },

    click: function (e) {
        e.preventDefault();

        // Old code below
        // Game.player.bike.move.activate();

        if (Game.meter.launched) {
            return false;
        }
        if (!Game.gameOver && Game.running) {
            Game.meter.handleMeterClick(e);
        }
        //Handle launch UI click event

        return false;
    },

    initForeground: function () {
        this.clouds = new Foreground_Collection("cloud", 10, 200, 80, 0.25, 0, 20, 1);
        this.entities.push(this.clouds);

        this.trees = new Foreground_Collection("tree", 375, 64, 126, 0.25, 0, 30, 1);
        this.entities.push(this.trees);

        this.mountains = new Foreground_Collection("mountains", 380, 756, 134, 0.25, 0, 10, 1);
        this.entities.push(this.mountains);

        this.guardrails = new Foreground_Collection("guardrail", 354, 279, 144, 0.75, 0, 15, 1);
        this.entities.push(this.guardrails);

        this.roads = new Foreground_Collection("road", 420, 868, 40, 1, 0, 15, 1);
        this.entities.push(this.roads);
    },

    handleAerialClick: function () {
        if (this.running && this.meter.launched) {
            this.aerialCrash.crash();
        }
    },

    checkGameOver: function () {
        var playerSpeed = Math.round(Game.player.speed.Length() * 100) / 100;
        if (playerSpeed < 0.0001 && Game.meter.launched) {
            if (!Game.playerStopped) {
                Game.playerStopped = true;
                Game.gameOverTimer = setTimeout(function () {
                    Game.gameOver = true;
                    Game_Manager.gameOver();
                }, Game.gameOverDelay)
            }
        } else {
            if (Game.playerStopped) {
                Game.playerStopped = false;
                clearTimeout(Game.gameOverTimer);
            }

        }

    },

    run: function () {
        if (!GFX.canvas) {
            GFX.initialise(document.getElementById("stage"), 768, 435);
        }
        AssetLoader.load(function () {
            Game._init();
            Game.loop();
        });
    },

    loop: function () {
        var newTime = Date.now();
        var delta = ((newTime - Game.oldTime) / 1000);

        Game._physics(delta);

        if (Game.meter.launched) {
            Game.aerialCrash.checkAvailable(Game.world);
        }
        Game.checkGameOver();

        // Code for scaling
        Game.camera.update(Game.player)
        Game._graphics();
        Game.miniIcons.update(Game.kickers);

        // Clean up any entities marked for being destroyed
        for (var i = 0, j = Game.entities.length; i < j; i++) {
            if (Game.entities[i].destroy) {
                var entity = Game.entities.splice(i, 1);

                if (entity.physics) {
                    this.world.DestroyBody(entity.physics);
                }
            }
        }

        var record = document.getElementById("record");
        var recordMsg = "";
        recordMsg += "RECORD:   &nbsp &nbsp" + Math.round(Game.world.toWorld(Game.player.x) * 100) / 100 + "m";
        record.innerHTML = recordMsg;
        // var log = document.getElementById("log");
        // var logMsg = "";
        // logMsg += "<p>Distance: " + Math.round(Game.world.toWorld(Game.player.x) * 100) / 100 + "m</p>";
        // logMsg += "<p>Height: " + Math.round(Game.world.toWorld(Game.player.y) * 100) / 100 + "m</p>";
        // logMsg += "<p>Speed: " + Math.round(Game.player.speed.Length() * 100) / 100 + "m/s</p>";
        // logMsg += "<p>Blocked: " + Game.player.blocked + "</p>";
        // log.innerHTML = logMsg;

        Game.oldTime = newTime;
        if (Game.running) {
            if (!Game.meter.launched) {
                Game.meter.animateMeter();
            }
            requestAnimFrame(Game.loop);
        }

    },

    _physics: function (delta) {
        for (var i = 0, j = Game.entities.length; i < j; i++) {
            Game.entities[i].update(delta);
        }

        // Update kicker physics
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
        GFX.ctx.clearRect(0, 0, GFX.width, GFX.height);

        for (var i = 0, j = Game.entities.length; i < j; i++) {
            Game.entities[i].draw();
        }
    },

    resetGame: function () {
        this.entities = [];
        this.player = null;
        this.world = null;
        this.background = null;
        this.floor = null;
        this.contactListener = null;
        this.kickers = [];
        this.meter = null;
        this.miniIcons = null;
        this.gameOver = false;
        this.aerialCrash = null;
        this.gameOverTimer = null;
        this.playerStopped = false;

        this.initialiseCanvas();
    },

    removeCanvas: function () {
        const canvas = document.getElementById("canvas");
        if (canvas) {
            canvas.parentElement.removeChild(canvas);
        }
    },

    initialiseCanvas: function () {
        this.removeCanvas();
        const canvas = document.createElement("canvas");
        canvas.id = "canvas";
        canvas.width = 768;
        canvas.height = 435;
        document.getElementById("stage").parentElement.appendChild(canvas);
    }
};