var Move_Angle_Down = Move.extend({
  duration: 500,

  activate: function () {
    if (Game.player.blocked) {
      Game.player.blocked = false;
      return;
    }

    this.base();

    var forceToApply = new Box2D.Common.Math.b2Vec2(Game.player.speed.x / 10, -1.5);
    forceToApply.Multiply(Game.player.physics.GetMass());
    Game.player.physics.SetLinearVelocity(forceToApply);
  }
}, {
  // Static functions
});