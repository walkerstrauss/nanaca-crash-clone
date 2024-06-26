var PhysicsEntity = Entity.extend({
    physics: null,

    constructor: function (name, width, height) {
        this.base(name, width, height);

        this._setUpPhysics();
    },

    _setUpPhysics: function () {

    },

    setPosition: function (x, y) {
        this.base(x, y);

        if (this.physics) {
            this.physics.SetPosition(new Box2D.Common.Math.b2Vec2(Game_Manager.game.world.toWorld(x + (this.width * 0.5)), Game_Manager.game.world.toWorld(y + (this.height * 0.5))));
        }
    },

    update: function (delta) {
        if (this.physics) {
            var physicsPos = this.physics.GetWorldPoint(new Box2D.Common.Math.b2Vec2(0, 0));

            this.x = Game_Manager.game.world.toPixel(physicsPos.x) - (this.width * 0.5);
            this.y = Game_Manager.game.world.toPixel(physicsPos.y) - (this.height * 0.5);
        }
    }
}, {
    // Static functions
});