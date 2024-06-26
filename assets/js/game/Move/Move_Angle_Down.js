var Move_Angle_Down = Move.extend({
  duration: 500,

  activate: function () {
    if (Game_Manager.game.player.blocked) {
      Game_Manager.game.player.blocked = false;
      return;
    }

    this.base();

    var forceToApply = new Box2D.Common.Math.b2Vec2(Game_Manager.game.player.speed.x / 10, -1.5);
    forceToApply.Multiply(Game_Manager.game.player.physics.GetMass());
    Game_Manager.game.player.physics.SetLinearVelocity(forceToApply);
  }
}, {
  // Static functions
});