AssetLoader.queueImage("../assets/img/sprites/meter/meter_1.png", "meter_1");
AssetLoader.queueImage("../assets/img/sprites/meter/meter_2.png", "meter_2");
AssetLoader.queueImage("../assets/img/sprites/meter/meter_3.png", "meter_3");
AssetLoader.queueImage("../assets/img/sprites/meter/meter_4.png", "meter_4");
AssetLoader.queueImage("../assets/img/sprites/meter/meter_5.png", "meter_5");
AssetLoader.queueImage("../assets/img/sprites/meter/meter_6.png", "meter_6");
AssetLoader.queueImage("../assets/img/sprites/meter/meter_7.png", "meter_7");
AssetLoader.queueImage("../assets/img/sprites/meter/meter_8.png", "meter_8");
AssetLoader.queueImage("../assets/img/sprites/meter/meter_9.png", "meter_9");
AssetLoader.queueImage("../assets/img/sprites/meter/meter_10.png", "meter_10");
AssetLoader.queueImage("../assets/img/sprites/meter/meter_11.png", "meter_11");
AssetLoader.queueImage("../assets/img/sprites/meter/line.png", "line");

var Meter = Img.extend({
  x: 5,
  y: 336,
  launched: false,
  launchPhase: "angle",
  angleMeterValue: 0.5,
  powerMeterValue: 0,
  angleMeterDirection: 1,
  powerMeterDirection: 1,
  meterImg: 1,
  lineImg: null,
  player: null,

  constructor: function (player) {
    this.base("meter_1", 20, 20);
    this.player = player;
    this.launched = false;
  },

  showMeter: function () {
    if (!this.launched) {
      this.launchPhase = "angle";
      this.image = AssetLoader.getImage("meter_1");
      document.getElementById("launch-ui").style.display = "flex";
      document.getElementById("meter").style.backgroundImage = 'url(' + this.image.src + ')';
    }
  },

  animateMeter: function () {
    if (this.launchPhase === "angle") {
      var changeAng = 0.025 * this.angleMeterDirection;
      this.angleMeterValue += changeAng;
      document.getElementById("line").style.transform = 'rotate(' + (18 + (this.angleMeterValue * -90)) + 'deg)';
      if (this.angleMeterValue >= 1 || this.angleMeterValue <= 0) {
        this.angleMeterDirection *= -1;
      }
    } else if (this.launchPhase === "power") {
      this.powerMeterValue += 0.025 * this.powerMeterDirection;
      if (this.powerMeterValue >= 1 || this.powerMeterValue <= 0) {
        this.powerMeterDirection *= -1;
        if (this.powerMeterValue < 0) {
          this.powerMeterValue = 0;
        }
      }
      this.changeMeterImg();
    }

  },

  changeMeterImg: function () {
    var meterImgIndex = Math.min(Math.floor(this.powerMeterValue * 11), 10) + 1;
    this.image = AssetLoader.getImage("meter_" + meterImgIndex);
    document.getElementById("meter").style.backgroundImage = 'url(' + this.image.src + ')';
  },

  handleMeterClick: function (e) {
    // Think it is switching to power too soon when restarting
    if (this.launchPhase === "angle") {
      this.launchPhase = "power";
    } else if (this.launchPhase === "power") {
      this.player.angle = 20 + (this.angleMeterValue * -90);
      this.player.power = this.powerMeterValue * 100;
      this.player.launch();
      this.launched = true;
      document.getElementById("launch-ui").style.display = "none";
      Game_Manager.startRun();
    }
  }
})