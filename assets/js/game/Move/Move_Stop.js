var Move_Stop = Move.extend({
    duration: 1000,

    activate: function () {
        if (Game.player.blocked) {
            Game.player.blocked = false;
            return;
        }

        this.base();

        Game.player.stopped = true;
        Game.playerStopped = true;
        var forceToApply = new Box2D.Common.Math.b2Vec2(0, 0);
        forceToApply.Multiply(Game.player.physics.GetMass());
        Game.player.physics.SetLinearVelocity(forceToApply);
    }
}, {
    // Static functions
});