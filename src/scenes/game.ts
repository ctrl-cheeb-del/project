import Phaser from 'phaser'

export default class Game extends Phaser.Scene
{
	constructor()
	{
		super('game')
	}

	preload()
    {
    }

    create()
    {
       const map = this.make.tilemap({ key: 'mainmap' })
       const tileset = map.addTilesetImage('Serene_Village_16x16', 'tiles')

       const Island1 = map.createLayer('Island1', tileset)
       const Rocks = map.createLayer('Rocks', tileset)

    //    Rocks.setCollisionByProperty({ collides: true })

    //    const debugGraphics = this.add.graphics().setAlpha(0.7)
    //    Rocks.renderDebug(debugGraphics, {
    //     tileColor: null,
    //     collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
    //     faceColor: new Phaser.Display.Color(40, 39, 37, 255)
    //    })

    const faune = this.add.sprite(128, 128, 'faune', 'walk-down-3.png')

    this.anims.create({
        key: 'faune-idle-down',
        frames: [{ key: 'faune', frame: 'walk-down-3.png'}]
    })
    
    this.anims.create({ 
        key: 'faune-run-down',
        frames: this.anims.generateFrameNames('faune', {start: 1, end: 8, prefix: 'run-down-', suffix: '.png'})
    })

    faune.anims.play('faune-run-down')
    }
}
