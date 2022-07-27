import Phaser from 'phaser'

export default class Game extends Phaser.Scene
{
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private faune!: Phaser.Physics.Arcade.Sprite
	constructor()
	{
		super('game')
	}

	preload()
    {
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    create()
    {
       const map = this.make.tilemap({ key: 'mainmap' })
       const tileset = map.addTilesetImage('Serene_Village_16x16', 'tiles', 16, 16, 1, 2)

       const water = map.createLayer('Water', tileset)
       const WaterWalk = map.createLayer('Waterwalk', tileset)
       const IslandUnder = map.createLayer('Islandunder', tileset)
       const Island1 = map.createLayer('Island1', tileset)
       const Island2 = map.createLayer('Island2', tileset)
       const Rocks = map.createLayer('Rocks', tileset)
       const Decor = map.createLayer('Decor', tileset)
       const Bushes = map.createLayer('Bushes', tileset)
       const House_under = map.createLayer('House under', tileset)
       const Housedecor = map.createLayer('House decor',tileset)
       const House = map.createLayer('House', tileset)
       const Houseontop = map.createLayer('House Ontop', tileset)
       const Tree1 = map.createLayer('Tree1', tileset)
       const Tree2 = map.createLayer('Tree2', tileset)
       const Tree3 = map.createLayer('Tree3', tileset)
       const Tree4 = map.createLayer('Tree4', tileset)

       House.setCollisionByProperty({ collides: true})
       Housedecor.setCollisionByProperty({ collides: true })
       Houseontop.setCollisionByProperty({ collides : true })
       Bushes.setCollisionByProperty({collides: true})
       Rocks.setCollisionByProperty({ collides: true })
       Island1.setCollisionByProperty({ collides: true })
       water.setCollisionByProperty({ collides: true})
       Island2.setCollisionByProperty({ collides: true})
       Bushes.setCollisionByProperty({ collides: true })
       Tree1.setCollisionByProperty({ collides: true })
       Tree2.setCollisionByProperty({ collides: true })
       Tree3.setCollisionByProperty({ collides: true })
       Tree4.setCollisionByProperty({ collides: true })


       const debugGraphics = this.add.graphics().setAlpha(0.7)
       Island1.renderDebug(debugGraphics, {
        tileColor: null,
        collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
        faceColor: new Phaser.Display.Color(40, 39, 37, 255)
       })

    this.faune = this.physics.add.sprite(480, 235, 'faune', 'walk-down-3.png')
    this.faune.body.setSize(this.faune.width * 0.5, this.faune.height * 0.7)

    this.anims.create({
        key: 'faune-idle-down',
        frames: [{ key: 'faune', frame: 'walk-down-3.png'}]
    })

    this.anims.create({
        key: 'faune-idle-up',
        frames: [{ key: 'faune', frame: 'walk-up-3.png'}]
    })

    this.anims.create({
        key: 'faune-idle-side',
        frames: [{ key: 'faune', frame: 'walk-side-3.png'}]
    })
    

    this.anims.create({ 
        key: 'faune-run-down',
        frames: this.anims.generateFrameNames('faune', {start: 1, end: 8, prefix: 'run-down-', suffix: '.png'}),
        repeat: -1,
        frameRate: 15

    })

    this.anims.create({ 
        key: 'faune-run-up',
        frames: this.anims.generateFrameNames('faune', {start: 1, end: 8, prefix: 'run-up-', suffix: '.png'}),
        repeat: -1,
        frameRate: 15

    })

    this.anims.create({ 
        key: 'faune-run-side',
        frames: this.anims.generateFrameNames('faune', {start: 1, end: 8, prefix: 'run-side-', suffix: '.png'}),
        repeat: -1,
        frameRate: 15

    })


    this.faune.anims.play('faune-idle-down')
    this.physics.add.collider(this.faune, Island1)
    this.physics.add.collider(this.faune, Rocks)
    this.physics.add.collider(this.faune, Island2)
    this.physics.add.collider(this.faune, water)
    this.physics.add.collider(this.faune, House)
    this.physics.add.collider(this.faune, Housedecor)
    this.physics.add.collider(this.faune, Tree1)
    this.physics.add.collider(this.faune, Tree2)
    this.physics.add.collider(this.faune, Tree3)
    this.physics.add.collider(this.faune, Tree4)
    this.physics.add.collider(this.faune, Houseontop)

    this.cameras.main.startFollow(this.faune, true,)
    this.cameras.main.setBounds(-436, -200.5, 1833, 887, true)
    // this.cameras.main.centerOn(innerWidth, innerHeight)

    const lizard = this.add.sprite(500, 300, 'lizard', 'lizard_m_idle_anim_f0.png')

    this.anims.create({
        key: 'lizard-idle',
        frames: this.anims.generateFrameNames('lizard', {start: 0, end: 3, prefix: 'lizard_m_idle_anim_f', suffix: '.png' }),
        repeat: -1,
        frameRate: 10
    })
    lizard.anims.play('lizard-idle')


    }
    

    update(t: number, dt: number){
        if (!this.cursors || !this.faune)
        {
            return
        }
        const speed = 100;
        if (this.cursors.left?.isDown)
        {
            this.faune.anims.play('faune-run-side', true)
            this.faune.setVelocity(-speed, 0)
            this.faune.scaleX = -1
            this.faune.body.offset.x = 24
        }
        else if (this.cursors.right?.isDown)
        {
            this.faune.anims.play('faune-run-side', true)
            this.faune.setVelocity(speed, 0)
            this.faune.scaleX = 1
            this.faune.body.offset.x = 8

        }
        else if (this.cursors.up?.isDown) {
            this.faune.anims.play('faune-run-up', true)
            this.faune.setVelocity(0, -speed)
        }

        else if (this.cursors.down?.isDown) {
            
            this.faune.anims.play('faune-run-down', true)
            this.faune.setVelocity(0, speed)
        }
        else
        {
            const parts = this.faune.anims.currentAnim.key.split('-')
            parts[1] = 'idle'
            this.faune.anims.play(parts.join('-'))
            this.faune.setVelocity(0, 0)
        }

    }
}
