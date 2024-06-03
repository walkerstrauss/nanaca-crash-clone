var Move_Kick = Move.extend({
    duration: 1000,

    activate: function () {
        if (Game.player.blocked) {
            Game.player.blocked = false;
            return;
        }

        this.base();

        // Doubled force on 6/3
        var forceToApply = new Box2D.Common.Math.b2Vec2(10, -9);
        forceToApply.Multiply(Game.player.physics.GetMass());
        Game.player.physics.SetLinearVelocity(forceToApply);
    }
}, {
    // Static functions
});