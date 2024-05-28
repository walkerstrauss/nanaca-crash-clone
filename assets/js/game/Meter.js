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
  angleMeterValue: 0,
  powerMeterValue: 0,
  angleMeterDirection: 1,
  powerMeterDirection: 1,
  meterImg: 1,
  lineImg: null,
  player: null,

  constructor: function (player) {
    this.base("meter_1", 20, 20);
    this.player = player;
  },

  showMeter: function () {
    if (launched === false) {
      launchPhase = "angle";
      this.image = AssetLoader.getImage("meter_1");
      lineImg = Img.create(line, 20, 20);
      this.draw(GFX.ctx, x, y);
      this.lineImg.draw(GFX.ctx, x, y);
    }
  },

  animateMeter: function () {
    if (launchPhase === "angle") {
      if (angleMeterDirection === 1) {

      } else if (angleMeterDirection === 0) {

      }
    } else if (launchPhase === "power") {
      if (powerMeterDirection === 1) {

      } else if (powerMeterDirection === 0) {

      }
    }
  },

  handleMeterClick: function (e) {
    if (launchPhase === "angle") {
      launchPhase = "power";
    } else if (launchPhase === "power") {
      this.player.launch(angleMeterValue, powerMeterValue);
      launched = true;
    }
  }
})