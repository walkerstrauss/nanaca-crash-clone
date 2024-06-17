AssetLoader.queueImage("../assets/img/sprites/miniicon/baseball_miniicon.png", "baseball");
AssetLoader.queueImage("../assets/img/sprites/miniicon/goodkyle_miniicon.png", "goodkyle");
AssetLoader.queueImage("../assets/img/sprites/miniicon/micheal_miniicon.png", "micheal");
AssetLoader.queueImage("../assets/img/sprites/miniicon/peroni_miniicon.png", "peroni");
AssetLoader.queueImage("../assets/img/sprites/miniicon/two_miniicon.png", "two");


var UI_Miniicons = Entity.extend({
  currentIcon: 1,
  iconScale: 50,
  iconY: 100,
  angleDownColor: "#663417",
  angleUpColor: "#4ce6de",
  blockColor: "#A000A0",
  kickColor: "#0000A0",
  punchColor: "#A0A000",
  stopColor: "#00A000",


  constructor: function () {
    this.setIconDisplay("miniicon-1");
    this.setIconDisplay("miniicon-2");
    this.setIconDisplay("miniicon-3");
  },

  setIconDisplay: function (id) {
    const elem = document.getElementById(id);
    elem.style.display = "flex";
    elem.style.backgroundSize = "contain";
    elem.style.backgroundRepeat = "no-repeat";
    elem.style.borderWidth = "2px";
    elem.style.borderStyle = "solid";
  },

  update: function (kickers) {
    // Make sure we are starting at first
    this.currentIcon = 1;

    for (let i = 0; i < kickers.getLength(); i++) {
      const kicker = kickers.get(i);

      if (this.currentIcon <= 3) {
        var id = "miniicon-" + this.currentIcon;
        var hex = this.getColor(kicker);
        this.animateIcon(kicker, id, hex);
        this.animateTriangle(GFX.ctx, kicker, id, hex);
        this.currentIcon++;
      } else {
        break;
      }
    }
  },

  animateIcon: function (kicker, id, hex) {
    const src = this.getKickerImg(kicker).src;
    document.getElementById(id).style.backgroundImage = 'url(' + src + ')';
    document.getElementById(id).style.borderColor = hex;
  },

  animateTriangle: function (ctx, kicker, id, hex) {
    document.getElementById("triangle-" + this.currentIcon).style.borderTopColor = this.getColor(kicker);
    var icon = document.getElementById("miniicon-" + this.currentIcon);
    var iconX = this.getIconX();
    var baseWidth = 50;

  },

  getColor: function (kicker) {
    switch (kicker.type) {
      case "angle_down": return this.angleDownColor;
      case "angle_up": return this.angleUpColor;
      case "block": return this.blockColor;
      case "kick": return this.kickColor;
      case "punch": return this.punchColor;
      case "stop": return this.stopColor;
      default: return "#FFFFFF"
    }
  },

  getKickerImg: function (kicker) {
    switch (kicker.type) {
      case "angle_down":
      case "angle_up":
        return AssetLoader.getImage("goodkyle");
      case "block":
        return AssetLoader.getImage("baseball")
      case "kick":
        return AssetLoader.getImage("two");
      case "punch":
        return AssetLoader.getImage("peroni");
      case "stop":
        return AssetLoader.getImage("micheal");
      default:
        return AssetLoader.getImage("goodkyle");
    }
  },

  isOnScreen: function (entity) {
    const x = entity.x - Game.world.x;
    const y = entity.y - Game.world.y;
    return x >= -10 && x <= GFX.width + 10 && y >= -10 && y <= GFX.height + 10;
  },

  getIconX: function () {
    switch (this.currentIcon) {
      case 1:
        return 600;
      case 2:
        return 650;
      case 3:
        return 700;
    }
  }
})