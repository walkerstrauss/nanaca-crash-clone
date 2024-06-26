var Log = Entity.extend({
  type: "",

  constructor: function () {

  },

  update: function () {
    // Update best
    this.bestRecordMsg = "";
    this.bestRecordMsg += "BEST RECORD:   &nbsp &nbsp" + Math.round(Game_Manager.game.world.toWorld(Game_Manager.game.player.x) * 100) / 100 + "m";

    // Update record
    this.recordMsg = "";
    this.recordMsg += "RECORD:   &nbsp &nbsp" + Math.round(Game_Manager.game.world.toWorld(Game_Manager.game.player.x) * 100) / 100 + "m";

    // Update speed
    this.speedMsg = "";
    if (Game_Manager.game.playerStopped || Game_Manager.game.player.stopped) {
      this.speedMsg += "SPEED: 0.0m/s";
    } else {
      this.speedMsg += "SPEED: " + Math.round(Game_Manager.game.player.speed.Length() * 100) / 100 + "m/s";
    }
  },

  draw: function (ctx, x, y) {
    const textPos = this.getPosition(this.type);
    ctx = ctx || GFX.ctx;
    x = x || textPos.x;
    y = y || textPos.y;

    // Draw text onto screen
    for (var i = 1; i < 4; i++) {
      this.type = this.setType(i);
      drawText(ctx, x, y);
    }
  },

  drawText: function (ctx, x, y) {

  },

  setType: function (i) {
    switch (i) {
      case 1:
        return "best";
      case 2:
        return "record";
      case 3:
        return "speed";
    }
  },

  getPosition: function () {
    switch (this.type) {
      case "best":
        return {

        };
      case "record":
        return {

        };
      case "speed":
        return {

        };
    }
  }
})