AssetLoader.queueImage("../assets/img/sprites/miniicon/baseball_miniicon.png", "baseball");
AssetLoader.queueImage("../assets/img/sprites/miniicon/goodkyle_miniicon.png", "goodkyle");
AssetLoader.queueImage("../assets/img/sprites/miniicon/micheal_miniicon.png", "micheal");
AssetLoader.queueImage("../assets/img/sprites/miniicon/peroni_miniicon.png", "peroni");
AssetLoader.queueImage("../assets/img/sprites/miniicon/two_miniicon.png", "two");


var UI_Miniicons = Entity.extend({
  currentIcon: 1,
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
    const icon = document.getElementById(id);
    const iconRect = icon.getBoundingClientRect();
    const canvasRect = ctx.canvas.getBoundingClientRect();

    const iconCenterX = iconRect.left + iconRect.width / 2 - canvasRect.left;
    const iconBottomY = iconRect.bottom - canvasRect.top;

    const triangleBase = iconRect.width;
    const triangleHeight = -iconRect.height;
    const kickerPos = this.getKickerPosition(kicker);

    // Calculate the angle of the line pointing from the center of the base to the tip of the triangle
    const angle = Math.atan2(kickerPos.y - triangleHeight, kickerPos.x - (triangleBase / 2));

    this.drawTriangle(ctx, iconCenterX, iconBottomY, triangleBase, triangleHeight, angle, hex);
  },

  drawTriangle: function (ctx, x, y, base, height, angle, color) {
    // Calculate the position of the tip of the triangle
    const tipX = x + height * Math.sin(angle);
    const tipY = y - height;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x - base / 2, y); // Left point of the base
    ctx.lineTo(x + base / 2, y);  // Right point of the base
    ctx.lineTo(tipX, tipY); // Tip of the triangle
    ctx.closePath();

    ctx.fillStyle = color;
    ctx.fill();

    ctx.restore();
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

  getKickerPosition: function (kicker) {
    return {
      x: kicker.x - Game.world.x,
      y: kicker.y - Game.world.y
    }
  },

  isOnScreen: function (entity) {
    const x = entity.x - Game.world.x;
    const y = entity.y - Game.world.y;
    return x >= -10 && x <= GFX.width + 10 && y >= -10 && y <= GFX.height + 10;
  }
})