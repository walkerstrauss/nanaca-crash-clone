AssetLoader.queueImage("../assets/img/sprites/uparrow/uparrow_0.png", "up0");
AssetLoader.queueImage("../assets/img/sprites/uparrow/uparrow_1.png", "up1");
AssetLoader.queueImage("../assets/img/sprites/uparrow/uparrow_2.png", "up2");
AssetLoader.queueImage("../assets/img/sprites/uparrow/uparrow_3.png", "up3");
AssetLoader.queueImage("../assets/img/sprites/down_arrow.png", "down");

var Aerial_Crash = Img.extend({
  player: null,
  upwardCrashesAvailable: 3,
  downwardCrashesAvailable: 1,
  available: "",
  downImg: null,
  percentCharged: 100,

  constructor: function (player) {
    this.base("up3", 20, 20);
    this.player = player;
    this.downImg = AssetLoader.getImage("down");
    document.getElementById("downward-crash-ui").style.backgroundImage = 'url(' + this.downImg.src + ')';
    this.animateDownwardCharge();
  },

  checkAvailable: function (world) {
    if (this.upwardCrashesAvailable > 0 && this.player.physics.GetLinearVelocity().y > 0) {
      var playerY = Math.round(world.toWorld(this.player.y) * 100) / 100
      if (playerY > 0 && playerY < 13 && !Game_Manager.game.playerStopped) {
        this.available = "upward";
        document.getElementById("aerial-btn").style.color = "red";
      }
    } else if (this.percentCharged >= 100 && this.player.physics.GetLinearVelocity().y < 0) {
      var playerY = Math.round(world.toWorld(this.player.y) * 100) / 100
      if (playerY > 0 && playerY < 13 && !Game_Manager.game.playerStopped) {
        this.available = "downward";
        document.getElementById("aerial-btn").style.color = "blue";
      } else {
        this.available = "none";
        document.getElementById("aerial-btn").style.color = "grey";
      }
    } else {
      this.available = "none";
      document.getElementById("aerial-btn").style.color = "grey";
    }

    // Charge if at certain height
    var playerY = Math.round(world.toWorld(this.player.y) * 100) / 100;
    if (playerY < 10 && playerY > -10 && this.percentCharged < 100) {
      this.percentCharged = this.percentCharged + 0.25;
      this.animateDownwardCharge();
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
      this.available = "none";
    } else if (this.available === "downward" && this.percentCharged >= 100) {

      // Downward crash
      var forceToApply = new Box2D.Common.Math.b2Vec2(5.5, 4);
      forceToApply.Multiply(this.player.physics.GetMass());
      this.player.physics.SetAwake(true);
      this.player.physics.SetLinearVelocity(forceToApply);

      // Reset charge
      this.percentCharged = 0;
      this.available = "none";
      this.animateDownwardCharge();
    }
  },

  showCrashUI: function () {
    document.getElementById("upward-crash-ui").style.backgroundImage = 'url(' + this.image.src + ')';
    document.getElementById("upward-crash-ui").style.display = "flex";
    document.getElementById("downward-crash-ui").style.display = "flex";
  },

  animateDownwardCharge: function () {
    var percent = Math.floor(this.percentCharged);
    document.getElementById("downward-charge").innerHTML = percent + '%';
  }
})