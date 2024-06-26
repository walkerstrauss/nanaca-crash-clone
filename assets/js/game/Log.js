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
    ctx = ctx || GFX.ctx;

    // Draw text onto screen
    this.drawMessage(ctx, this.bestRecordMsg, this.getPosition("best"));
    this.drawMessage(ctx, this.recordMsg, this.getPosition("record"));
    this.drawMessage(ctx, this.speedMsg, this.getPosition("speed"));
  },

  drawMessage: function (ctx, message, position) {
    ctx.fillStyle = "#ffff00"; // yellow
    ctx.font = "14px Arial";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(message, position.x, position.y);
  },

  getPosition: function () {
    switch (this.type) {
      case "best":
        return { x: 650, y: 10 };
      case "record":
        return { x: 650, y: 50 };
      case "speed":
        return { x: 680, y: 100 };
    }
  }
})