function Star(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'star');

    this.game = game;
    this.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);

}
Star.prototype = Object.create(Phaser.Sprite.prototype);
Star.constructor = Star;

module.exports = Star;
