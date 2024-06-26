var Move_Bike = Move.extend({
    duration: 1000,

    activate: function () {
        this.base();

        var forceToApply = new Box2D.Common.Math.b2Vec2(4, -5.5);
        forceToApply.Multiply(Game_Manager.game.player.physics.GetMass());
        Game_Manager.game.player.physics.SetAwake(true);
        Game_Manager.game.player.physics.SetLinearVelocity(forceToApply);
    }
}, {
    // Static functions
});