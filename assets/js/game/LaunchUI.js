var LaunchUI = {
  angleElement: null,
  powerElement: null,
  indicatorElement: null,
  angle: 0,
  power: 0,
  maxPower: 10,
  increasing: true,
  active: false,

  init: function () {
    this.angleElement = document.getElementById('launch-angle');
    this.powerElement = document.getElementById('launch-power');
    this.indicatorElement = document.getElementById('launch-indicator')

    this.angleElement.addEventListener('mousedown', this.startLaunch.bind(this));
    window.addEventListener('mouseup', this.stopLaunch.bind(this));
    window.addEventListener('mousedown', this.updateLaunch.bind(this));
  },

  startLaunch: function (event) {
    if (!this.active) {
      this.active = true;
      this.angle = 0;
      this.power = 0;
      this.increasing = true;
      this.updateIndicator();
    }
  },

  stopLaunch: function (event) {
    if (this.active) {
      this.active = false;
      Game.player.launch(this.angle, this.power * this.maxPower)
    }
  },

  updateLaunch: function (event) {
    if (this.active) {
      var rect = this.angleElement.getBoundingClientRect();
      var x = event.clienX - rect.left;
      this.angle(x / rect.width) * 360;

      if (this.increasing) {
        this.power += 0.1;
        if (this.power >= 1) {
          this.increasing = false;
        }
      } else {
        this.power -= 0.1;
        if (this.power <= 0) {
          this.increasing = true
        }
      }

      this.updateIndicator();
    }
  },

  updateIndicator: function () {
    var rect = this.angleElement.getBoundingClientRect();
    this.indicatorElement.style.left = (this.angle / 360 * rect.width) + 'px'
  }
};

LaunchUI, init();