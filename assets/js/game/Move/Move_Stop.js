var Move_Stop = Move.extend({
    duration: 1000,

    activate: function () {
        if (Game_Manager.game.player.blocked) {
            Game_Manager.game.player.blocked = false;
            return;
        }

        this.base();

        Game_Manager.game.player.stopped = true;
        Game_Manager.game.playerStopped = true;
        var forceToApply = new Box2D.Common.Math.b2Vec2(0, 0);
        forceToApply.Multiply(Game_Manager.game.player.physics.GetMass());
        Game_Manager.game.player.physics.SetLinearVelocity(forceToApply);
    }
}, {
    // Static functions
});