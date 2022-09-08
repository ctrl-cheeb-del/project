import Phaser from 'phaser'
import { createLizardAnims } from '../anims/EnemyAnims'
import { createCharacterAnims } from '../anims/CharacterAnims'
import Lizard from '../enemies/Lizard'

export default class secondmap extends Phaser.Scene
{
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private faune!: Phaser.Physics.Arcade.Sprite
	constructor()
	{
		super('secondmap')
	}

	preload()
    {
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    create()
    {
        createCharacterAnims(this.anims)
        createLizardAnims(this.anims)

       const map = this.make.tilemap({ key: 'map2' })
       const tileset = map.addTilesetImage('Serene_Village_16x16', 'tiles2')

       const water = map.createLayer('Water', tileset)
       const island1 = map.createLayer('Island 1', tileset)
       island1.setCollisionByProperty({ collides: true})
    //    this.physics.add.collider(this.faune, island1)
       


       const debugGraphics = this.add.graphics().setAlpha(0.7)
       island1.renderDebug(debugGraphics, {
        tileColor: null,
        collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
        faceColor: new Phaser.Display.Color(40, 39, 37, 255)
       })

    this.faune = this.physics.add.sprite(480, 235, 'faune', 'walk-down-3.png')
    this.faune.body.setSize(this.faune.width * 0.5, this.faune.height * 0.7)

    this.faune.anims.play('faune-idle-down')
    this.cameras.main.startFollow(this.faune, true,)
    this.cameras.main.setBounds(-436, -200.5, 1833, 887, true)
    // this.cameras.main.centerOn(innerWidth, innerHeight)

    const lizards = this.physics.add.group({
        classType: Lizard,
        createCallback: (go) => {
            const lizGo = go as Lizard
            lizGo.body.onCollide = true
        }
    })

    lizards.get(500, 300, 'lizard')
    this.physics.add.collider(lizards, island1)

    this.physics.add.collider(lizards, this.faune)


    // const lizard = this.physics.add.sprite(500, 300, 'lizard', 'lizard_m_idle_anim_f0.png')
    // lizard.anims.play('lizard-run')

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
