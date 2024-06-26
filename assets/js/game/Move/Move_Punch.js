var Move_Punch = Move.extend({
    duration: 1000,

    activate: function () {
        if (Game_Manager.game.player.blocked) {
            Game_Manager.game.player.blocked = false;
            return;
        }

        this.base();

        // Doubled force on 6/3
        var forceToApply = new Box2D.Common.Math.b2Vec2(9, -9);
        forceToApply.Multiply(Game_Manager.game.player.physics.GetMass());
        Game_Manager.game.player.physics.SetLinearVelocity(forceToApply);
    }
}, {
    // Static functions
});