AssetLoader.queueImage("../assets/img/sprites/miniicon/baseball_miniicon.png", "baseball");
AssetLoader.queueImage("../assets/img/sprites/miniicon/goodkyle_miniicon.png", "goodkyle");
AssetLoader.queueImage("../assets/img/sprites/miniicon/micheal_miniicon.png", "micheal");
AssetLoader.queueImage("../assets/img/sprites/miniicon/peroni_miniicon.png", "peroni");
AssetLoader.queueImage("../assets/img/sprites/miniicon/two_miniicon.png", "two");


var UI_Miniicons = Base.extend({
  currentIcon: 1,
  iconScale: 0,
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
    this.iconScale = 50;
  },

  setIconDisplay: function (id) {
    const elem = document.getElementById(id);
    elem.style.display = "flex";
    elem.style.backgroundSize = "contain";
    elem.style.backgroundRepeat = "no-repeat";
    elem.style.borderWidth = "2px";
    elem.style.borderStyle = "solid";
  },

  update: function (ctx, kickers) {
    // Make sure we are starting at first
    this.currentIcon = 1;

    for (let i = 0; i < kickers.getLength; i++) {
      const kicker = kickers.get(i);
      const kickerVisible = this.isOnScreen(kicker);

      if (kickerVisible) {
        if (this.currentIcon < 3 && this.currentIcon >= 1) {
          var elem = document.getElementById("miniicon-" + this.currentIcon);
          var hex = this.getColor(kicker);
          this.animateIcon(kicker, elem, hex);
          this.animateTriangles(ctx, kicker, elem, hex);
          this.currentIcon++;
        } else if (this.currentIcon === 3) {
          this.currentIcon = 0;
        }
      }
    }
  },

  animateIcon: function (kicker, elem, hex) {
    var src = this.getKickerImg(kicker).src;
    elem.style.backgroundImage = 'url(' + src + ')';
    elem.style.borderColor = hex;
  },

  animateTriangle: function (ctx, kicker, elem, hex) {
    const iconX = parseFloat(elem.style.left) + this.iconScale / 2;
    const iconY = parseFloat(elem.style.top) + this.iconScale;

    // Calculate angle for drawing triangle
    const angle = Math.atan2(kicker.y - iconY, kicker.x - iconX);
    const triangleHeight = this.iconScale;
    const triangleWidth = parseFloat(elem.style.width) + 2 * parseFloat(elem.style.borderWidth);

    const offsetX = triangleHeight * Math.cos(angle);
    const offsetY = triangleHeight * Math.sin(angle);
    const halfPI = Math.PI / 2;

    ctx.fillStyle = hex;
    ctx.beginPath();
    ctx.moveTo(iconX, iconY);
    ctx.lineTo(iconX + offsetX + (triangleWidth / 2) * Math.cos(angle + halfPI),
      iconY + offsetY + (triangleWidth / 2) * Math.sin(angle + halfPI));
    ctx.lineTo(iconX + offsetX - (triangleWidth / 2) * Math.cos(angle + halfPI),
      iconY + offsetY - (triangleWidth / 2) * Math.sin(angle + halfPI));
    ctx.closePath();
    ctx.fill();
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
    return x >= 0 && x <= GFX.width && y >= 0 && y <= GFX.height;
  }
})