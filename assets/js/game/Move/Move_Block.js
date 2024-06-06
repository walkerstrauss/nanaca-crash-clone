var Move_Block = Move.extend({
    duration: 100,

    activate: function () {
        if (Game.player.blocked) {
            Game.player.blocked = false;
            return;
        }

        this.base();

        Game.player.blocked = true;
    }
}, {
    // Static functions
});