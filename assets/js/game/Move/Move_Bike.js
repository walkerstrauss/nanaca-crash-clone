var Move_Bike = Move.extend({
    duration: 1000,

    activate: function () {
        this.base();

        var forceToApply = new Box2D.Common.Math.b2Vec2(4, -3.5);
        forceToApply.Multiply(Game.player.physics.GetMass());
        Game.player.physics.SetAwake(true);
        Game.player.physics.SetLinearVelocity(forceToApply);
    }
}, {
    // Static functions
});