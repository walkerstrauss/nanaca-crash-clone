var Move_Angle_Up = Move.extend({
  duration: 1000,

  activate: function () {
    if (Game_Manager.game.player.blocked) {
      Game_Manager.game.player.blocked = false;
      return;
    }

    this.base();

    var forceToApply = new Box2D.Common.Math.b2Vec2(1, -6.5);
    forceToApply.Multiply(Game_Manager.game.player.physics.GetMass());
    Game_Manager.game.player.physics.SetLinearVelocity(forceToApply);
  }
}, {
  // Static functions
});