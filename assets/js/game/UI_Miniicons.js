AssetLoader.queueImage("../assets/img/sprites/miniicon/baseball_miniicon.png", "baseball_icon");
AssetLoader.queueImage("../assets/img/sprites/miniicon/goodkyle_miniicon.png", "goodkyle_icon");
AssetLoader.queueImage("../assets/img/sprites/miniicon/micheal_miniicon.png", "micheal_icon");
AssetLoader.queueImage("../assets/img/sprites/miniicon/peroni_miniicon.png", "peroni_icon");
AssetLoader.queueImage("../assets/img/sprites/miniicon/two_miniicon.png", "two_icon");


var UI_Miniicons = Entity.extend({
  currentIcon: 1,
  angleDownColor: "#663417",
  angleUpColor: "#4ce6de",
  blockColor: "#A000A0",
  kickColor: "#0000A0",
  punchColor: "#A0A000",
  stopColor: "#00A000",

  constructor: function () {
    // this.setIconDisplay("miniicon-1");
    // this.setIconDisplay("miniicon-2");
    // this.setIconDisplay("miniicon-3");
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
        // this.animateIcon(kicker, id, hex);
        this.drawIcon(GFX.ctx, kicker, hex);
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
    const kickerPos = this.getKickerPosition(kicker);
    const img = this.getKickerImg(kicker);
    const iconPos = this.getIconPosition();
    const iconCenterX = iconPos.x + img.width / 2;
    const iconBottomY = iconPos.y + img.height;

    const base = 20; // Adjusted base size
    const height = 50;

    // Calculate the angle between the icon and the kicker
    const angle = Math.atan2(kickerPos.y - iconBottomY, kickerPos.x - iconCenterX);

    this.drawTriangle(ctx, iconCenterX, iconBottomY, base, height, angle, hex);
  },

  drawTriangle: function (ctx, x, y, base, height, angle, color) {
    // Calculate the position of the tip of the triangle
    const tipX = x + height * Math.cos(angle);
    const tipY = y + height * Math.sin(angle);

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x - base / 2, y); // Left point of the base
    ctx.lineTo(x + base / 2, y); // Right point of the base
    ctx.lineTo(tipX, tipY); // Tip of the triangle
    ctx.closePath();

    ctx.fillStyle = color;
    ctx.fill();

    ctx.restore();
  },

  drawIcon: function (ctx, kicker, hex) {
    const iconPos = this.getIconPosition();
    const img = this.getKickerImg(kicker);
    ctx.save();
    ctx.beginPath();
    ctx.translate(iconPos.x - 3, iconPos.y - 3);
    ctx.moveTo(0, 0)
    ctx.lineTo(0, img.height + 3);
    ctx.lineTo(img.width + 3, img.height + 3);
    ctx.lineTo(img.width + 3, 0);
    ctx.closePath();

    ctx.fillStyle = hex;
    ctx.fill();

    ctx.drawImage(img, 1.5, 1.5, img.width, img.height);
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
        return AssetLoader.getImage("goodkyle_icon");
      case "block":
        return AssetLoader.getImage("baseball_icon")
      case "kick":
        return AssetLoader.getImage("two_icon");
      case "punch":
        return AssetLoader.getImage("peroni_icon");
      case "stop":
        return AssetLoader.getImage("micheal_icon");
      default:
        return AssetLoader.getImage("goodkyle_icon");
    }
  },

  getKickerPosition: function (kicker) {
    return {
      x: kicker.x - Game_Manager.game.world.x,
      y: kicker.y - Game_Manager.game.world.y
    }
  },

  getIconPosition: function () {
    switch (this.currentIcon) {
      case 1:
        return { x: 607, y: 155 };
      case 2:
        return { x: 646, y: 155 };
      case 3:
        return { x: 684, y: 155 };

    }
  },

  isOnScreen: function (entity) {
    const x = entity.x - Game_Manager.game.world.x;
    const y = entity.y - Game_Manager.game.world.y;
    return x >= -10 && x <= GFX.width + 10 && y >= -10 && y <= GFX.height + 10;
  }
})