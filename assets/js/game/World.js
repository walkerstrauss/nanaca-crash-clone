var World = PhysicsEntity.extend({
    _physicsScale: 20,
    physics: null,
    gravity: 30,
    speed: 1,

    constructor: function () {
        this.base("World", 0, 0);
    },

    _setUpPhysics: function () {
        this.physics = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(0, this.gravity), true);
    },

    update: function (delta) {
        this.physics.Step(this.speed * delta, 10, 10);
        this.physics.ClearForces();

        // Position the viewport where the player is
        this.x = Game_Manager.game.player.x - 200;
    },

    draw: function () {
    },

    toWorld: function (unit) {
        return unit / this._physicsScale;
    },

    toPixel: function (unit) {
        return unit * this._physicsScale;
    },

    slowDown: function () {
        this.speed = 0.05;
    },

    speedUp: function () {
        this.speed = 1;
    }
}, {
    // Static functions
});