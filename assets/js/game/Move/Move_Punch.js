var Move_Punch = Move.extend({
    duration: 1000,

    activate: function () {
        if (Game.player.blocked) {
            Game.player.blocked = false;
            return;
        }

        this.base();

        var forceToApply = new Box2D.Common.Math.b2Vec2(4.5, -4.5);
        forceToApply.Multiply(Game.player.physics.GetMass());
        Game.player.physics.SetLinearVelocity(forceToApply);
    }
}, {
    // Static functions
});