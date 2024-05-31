AssetLoader.queueImage("../assets/img/sprites/uparrow/uparrow_0.png", "up0");
AssetLoader.queueImage("../assets/img/sprites/uparrow/uparrow_1.png", "up1");
AssetLoader.queueImage("../assets/img/sprites/uparrow/uparrow_2.png", "up2");
AssetLoader.queueImage("../assets/img/sprites/uparrow/uparrow_3.png", "up3");

var Aerial_Crash = Img.extend({
  player: null,
  upwardCrashesAvailable: 3,
  downwardCrashesAvailable: 0,
  available: "",

  constructor: function (player) {
    this.base("up3", 20, 20);
    this.player = player;
  },

  checkAvailable: function (world) {
    if (this.upwardCrashesAvailable > 0 && this.player.physics.GetLinearVelocity().y > 0) {
      var playerY = Math.round(world.toWorld(this.player.y) * 100) / 100
      if (playerY > 0 && playerY < 16.85) {
        this.available = "upward";
        document.getElementById("aerial-btn").style.color = "red";
      }
    } else if (this.downwardCrashesAvailable > 0) {
      this.available = "downward";
      document.getElementById("aerial-btn").style.color = "blue";
    } else {
      this.available = "none";
      document.getElementById("aerial-btn").style.color = "grey";
    }
  },

  crash: function () {
    if (this.available === "none") {
      return;
    } else if (this.available === "upward" && this.upwardCrashesAvailable > 0) {
      this.player.bike.move.activate();
      this.upwardCrashesAvailable--;
      this.image = AssetLoader.getImage("up" + this.upwardCrashesAvailable);
      document.getElementById("upward-crash-ui").style.backgroundImage = 'url(' + this.image.src + ')'
      bike.active = false;
    } else if (this.available === "downward") {
      return;
    }
  },

  showCrashUI: function () {
    document.getElementById("upward-crash-ui").style.backgroundImage = 'url(' + this.image.src + ')';
    document.getElementById("upward-crash-ui").style.display = "flex";
  }
})