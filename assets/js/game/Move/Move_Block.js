var Move_Block = Move.extend({
    duration: 100,

    activate: function () {
        if (Game_Manager.game.player.blocked) {
            Game_Manager.game.player.blocked = false;
            return;
        }

        this.base();

        Game_Manager.game.player.blocked = true;
    }
}, {
    // Static functions
});