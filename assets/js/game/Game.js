AssetLoader.queueImage("../assets/img/sprites/bg/logo.png", "logo");

class Game {
    constructor() {
        this.running = true;
        this.oldTime = Date.now();
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
        this.gameOverDelay = 1000;
        this.playerStopped = false;
    }

    _init() {
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
        this.kickers.newKicker = function (game) {
            game.kickers.lastPosition += game.kickers.spacing;

            var rnd = Math.random();
            if (rnd > 0.92) {
                var kicker = game.kickers.createItem(Kicker_Stop, 70, 120);
            } else if (rnd > 0.8) {
                var kicker = game.kickers.createItem(Kicker_Angle_Up, 90, 120);
            } else if (rnd > 0.68) {
                var kicker = game.kickers.createItem(Kicker_Angle_Down, 90, 120);
            } else if (rnd > 0.5) {
                var kicker = game.kickers.createItem(Kicker_Kick, 110, 100);
            } else if (rnd > 0.3) {
                var kicker = game.kickers.createItem(Kicker_Punch, 110, 100);
            } else if (rnd >= 0) {
                var kicker = game.kickers.createItem(Kicker_Block, 110, 100);
            }

            kicker.setPosition(game.kickers.lastPosition, kicker.y);
        };

        this.player = Player.create(82, 73);
        this.entities.push(this.player);

        // Create the kickers
        for (var i = 0; i < 10; i++) {
            this.kickers.newKicker(this);
        }

        // Collisions
        this.contactListener = new Box2D.Dynamics.b2ContactListener();
        this.contactListener.BeginContact = function (contact) {
            var userDataA = contact.GetFixtureA().GetBody().GetUserData();

            if (userDataA && userDataA.floor) {
                Game_Manager.game.player.physics.SetLinearDamping(2);
            } else if (userDataA && userDataA.kicker) {
                userDataA.entity.move.activate();

                userDataA.kicker = false;
                contact.GetFixtureA().GetBody().SetUserData(userDataA);
            }
        };

        this.contactListener.EndContact = function (contact) {
            var userData = contact.GetFixtureA().GetBody().GetUserData();
            if (userData && userData.floor) {
                // How to edit floor and player collisions
                Game_Manager.game.player.physics.SetLinearDamping(0.15);
            }
        };

        this.contactListener.PostSolve = function (contact, impulse) {

        };

        this.contactListener.PreSolve = function (contact, oldManifold) {

        };

        this.world.physics.SetContactListener(this.contactListener);

        this.meter = new Meter(this.player); // Changed from create to meter
        this.meter.showMeter();

        this.aerialCrash = Aerial_Crash.create(this.player);
        this.aerialCrash.showCrashUI();
        document.getElementById("aerial-btn").addEventListener("click", this.handleAerialClick.bind(this));

        // User input
        Event.observe(document, "click", this.click.bind(this));
    }

    click(e) {
        e.preventDefault();

        // Old code below
        // Game.player.bike.move.activate();

        if (this.meter.launched) {
            return false;
        }
        if (!this.gameOver && this.running) {
            this.meter.handleMeterClick(e);
        }
        //Handle launch UI click event

        return false;
    }

    initForeground() {
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
    }

    handleAerialClick() {
        if (this.running && this.meter.launched) {
            this.aerialCrash.crash();
        }
    }

    checkGameOver() {
        var playerSpeed = Math.round(this.player.speed.Length() * 100) / 100;
        if (playerSpeed < 0.0001 && this.meter.launched) {
            if (!this.playerStopped) {
                this.playerStopped = true;
                this.gameOverTimer = setTimeout(function () {
                    this.gameOver = true;
                    Game_Manager.gameOver();
                }, this.gameOverDelay)
            }
        } else {
            if (this.playerStopped) {
                this.playerStopped = false;
                clearTimeout(this.gameOverTimer);
            }

        }

    }

    run() {
        if (!GFX.canvas) {
            GFX.initialise(document.getElementById("stage"), 768, 435);
        }
        AssetLoader.load(function () {
            Game_Manager.game._init();
            Game_Manager.game.loop();
        });

    }

    loop() {
        var newTime = Date.now();
        var delta = ((newTime - Game_Manager.game.oldTime) / 1000);

        Game_Manager.game._physics(delta);

        if (Game_Manager.game.meter.launched) {
            Game_Manager.game.aerialCrash.checkAvailable(Game_Manager.game.world);
        }
        Game_Manager.game.checkGameOver();

        // Code for scaling
        Game_Manager.game.camera.update(Game_Manager.game.player)
        Game_Manager.game._graphics();
        Game_Manager.game.miniIcons.update(Game_Manager.game.kickers);

        // Clean up any entities marked for being destroyed
        for (var i = 0, j = Game_Manager.game.entities.length; i < j; i++) {
            if (Game_Manager.game.entities[i].destroy) {
                var entity = Game_Manager.game.entities.splice(i, 1);

                if (entity.physics) {
                    Game_Manager.game.world.DestroyBody(entity.physics);
                }
            }
        }

        Game_Manager.game.updateLog();

        // var log = document.getElementById("log");
        // var logMsg = "";
        // logMsg += "<p>Distance: " + Math.round(Game.world.toWorld(Game.player.x) * 100) / 100 + "m</p>";
        // logMsg += "<p>Height: " + Math.round(Game.world.toWorld(Game.player.y) * 100) / 100 + "m</p>";
        // logMsg += "<p>Speed: " + Math.round(Game.player.speed.Length() * 100) / 100 + "m/s</p>";
        // logMsg += "<p>Blocked: " + Game.player.blocked + "</p>";
        // log.innerHTML = logMsg;

        Game_Manager.game.oldTime = newTime;
        if (Game_Manager.game.running) {
            if (!Game_Manager.game.meter.launched) {
                Game_Manager.game.meter.animateMeter();
            }
            requestAnimFrame(Game_Manager.game.loop);
        }

    }

    updateLog() {
        var record = document.getElementById("record");
        var recordMsg = "";
        recordMsg += "RECORD:   &nbsp &nbsp" + Math.round(this.world.toWorld(this.player.x) * 100) / 100 + "m";
        record.innerHTML = recordMsg;

        var best_record = document.getElementById("best-record");
        var bestRecordMsg = "";
        bestRecordMsg += "BEST RECORD:   &nbsp &nbsp" + Math.round(this.world.toWorld(this.player.x) * 100) / 100 + "m";
        best_record.innerHTML = bestRecordMsg;

        var speed = document.getElementById("speed");
        var speedMsg = "";
        if (this.playerStopped || this.player.stopped) {
            speedMsg += "SPEED: 0.0m/s";
        } else {
            speedMsg += "SPEED: " + Math.round(this.player.speed.Length() * 100) / 100 + "m/s";
        }
        speed.innerHTML = speedMsg;

        // Need to un-comment for HTML special icon

        // var specialBtn = document.getElementById("special-text-btn");
        // if (this.player.blocked) {
        //     specialBtn.innerHTML = "BLOCK";
        //     specialBtn.style.color = "purple";
        // } else {
        //     specialBtn.innerHTML = "SPECIAL";
        //     specialBtn.style.color = "red";
        // }

    }

    _physics(delta) {
        for (var i = 0, j = Game_Manager.game.entities.length; i < j; i++) {
            Game_Manager.game.entities[i].update(delta);
        }

        // Update kicker physics
        var v = Game_Manager.game.player.x;
        var removeCount = 0;
        for (var n = 0, m = Game_Manager.game.kickers.getLength(); n < m; n++) {
            var kicker = Game_Manager.game.kickers.get(n);

            // Check if a kicker goes off screen
            if (kicker.x - v < -300) {
                removeCount++;
            }
        }

        while (removeCount) {
            removeCount--;
            Game_Manager.game.world.physics.DestroyBody(Game_Manager.game.kickers.get(removeCount).physics);
            Game_Manager.game.kickers.shift();

            Game_Manager.game.kickers.newKicker(Game_Manager.game);
        }
    }

    _graphics() {
        GFX.ctx.clearRect(0, 0, GFX.width, GFX.height);

        for (var i = 0, j = Game_Manager.game.entities.length; i < j; i++) {
            Game_Manager.game.entities[i].draw();
        }
    }

    resetGame() {
        this.running = true;
        this.oldTime = Date.now();
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
        this.gameOverDelay = 1000;
        this.playerStopped = false;
        this.camera = null;

        this.removeCanvas();
        this.run();
    }

    removeCanvas() {
        const canvas = document.getElementById("canvas");
        if (canvas) {
            canvas.parentElement.removeChild(canvas);
        }
    }

    initialiseCanvas() {
        this.removeCanvas();
        const canvas = document.createElement("canvas");
        canvas.id = "canvas";
        canvas.width = 768;
        canvas.height = 435;
        document.getElementById("stage").parentElement.appendChild(canvas);
    }
};