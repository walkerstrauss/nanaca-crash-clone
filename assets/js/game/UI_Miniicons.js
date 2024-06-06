AssetLoader.queueImage("../assets/img/sprites/miniicon/baseball_miniicon.png", "baseball");
AssetLoader.queueImage("../assets/img/sprites/miniicon/goodkyle_miniicon.png", "goodkyle");
AssetLoader.queueImage("../assets/img/sprites/miniicon/micheal_miniicon.png", "micheal");
AssetLoader.queueImage("../assets/img/sprites/miniicon/peroni_miniicon.png", "peroni");
AssetLoader.queueImage("../assets/img/sprites/miniicon/two_miniicon.png", "two");


var UI_Miniicons = Base.extend({
  miniiconElem1: null,
  miniiconElem2: null,
  miniiconElem3: null,
  currentIcon: 0,
  iconScale: 0,
  angleDownColor: "#663417",
  angleUpColor: "#4ce6de",
  blockColor: "#A000A0",
  kickColor: "#0000A0",
  punchColor: "#A0A000",
  stopColor: "#00A000",


  constructor: function () {
    // document.getElementById("miniicon-1").style.display = "flex";
    // document.getElementById("miniicon-2").style.display = "flex";
    // document.getElementById("miniicon-3").style.display = "flex";
    iconScale = 50;
  },

  update: function () {
    // Make sure we are starting at first
    this.currentIcon = 1;

    for (let i = 0; i < Game.kickers.getLength; i++) {
      const kicker = Game.kickers.get(i);
      const kickerVisible = isOnScreen(kicker);

      if (kickerVisible) {
        if (this.currentIcon < 3 && this.currentIcon >= 1) {
          var elem = document.getElementById("miniicon-" + this.currentIcon);
          var hex = this.getColor(kicker);
          this.animateIcon(kicker, elem, hex);
          this.animateTriangles(kicker, elem, hex);
          this.currentIcon++;
        } else if (this.currentIcon === 3) {
          this.currentIcon = 0;
        }
      }
    }
  },

  animateIcon: function (kicker, elem, hex) {
    var src = AssetLoader.getImage(this.getKickerName(kicker)).src;
    elem.style.backgroundImage = 'url(' + src + ')';
    elem.style.borderColor = hex;
  },

  animateTriangle: function (kicker, elem, hex) {
    const iconX = parseFloat(elem.style.left) + this.iconScale / 2;
    const iconY = parseFloat(elem.style.top) + this.iconScale;

    // Calculate angle for drawing triangle
    const angle = Math.atan2(kicker.y - iconY, kicker.x - iconX);
    const triangleHeight = 50;
    const triangleWidth = 54;

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
    }
  },

  getKickerName: function (kicker) {
    switch (kicker.type) {
      case "angle_down":
      case "angle_up":
        return "goodkyle";
      case "block":
        return "baseball";
      case "kick":
        return "two";
      case "punch":
        return "peroni";
      case "stop":
        return "micheal";
    }
  }

})