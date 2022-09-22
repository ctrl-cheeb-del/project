import Phaser, { Scene } from 'phaser'
import { createLizardAnims } from '../anims/EnemyAnims'
import { createCharacterAnims } from '../anims/CharacterAnims'
import Lizard from '../enemies/Lizard'
import secondmap from './secondmap'
import '../characters/Faune'
import Faune from '../characters/Faune'
import { sceneEvents } from '~/events/EventCenter'

let keyA;
let keyS;
let keyD;
let keyW;

export default class Game extends Phaser.Scene
{
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private faune!: Faune
    private playerLizardCollider?: Phaser.Physics.Arcade.Collider
    private knives!: Phaser.Physics.Arcade.Group
    private lizards!: Phaser.Physics.Arcade.Group

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

        this.scene.run('game-ui')
        // this.scene.start('secondmap')

        createCharacterAnims(this.anims)
        createLizardAnims(this.anims)

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
       const Next1 = map.createLayer('Next', tileset)

       keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
       keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
       keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
       keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

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
       Next1.setCollisionByProperty({ collides: true })


    //    const debugGraphics = this.add.graphics().setAlpha(0.7)
    //    water.renderDebug(debugGraphics, {
    //     tileColor: null,
    //     collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
    //     faceColor: new Phaser.Display.Color(40, 39, 37, 255)
    //    })

    this.knives = this.physics.add.group({
        classType: Phaser.Physics.Arcade.Image,
        maxSize: 3
    })

    this.faune = this.add.faune(480, 235, 'faune')
    this.faune.setKnives(this.knives)
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
    this.physics.add.collider(this.faune, Next1)

    this.cameras.main.startFollow(this.faune, true,)
    this.cameras.main.setBounds(-436, -200.5, 1833, 887, true)
    // this.cameras.main.centerOn(innerWidth, innerHeight)

    this.lizards = this.physics.add.group({
        classType: Lizard,
        createCallback: (go) => {
            const lizGo = go as Lizard
            lizGo.body.onCollide = true
        }
    })

    this.lizards.get(500, 300, 'lizard')
    this.lizards.get(800, 300, 'lizard')
    this.physics.add.collider(this.lizards, Island1)
    this.physics.add.collider(this.lizards, Rocks)
    this.physics.add.collider(this.lizards, Island2)
    this.physics.add.collider(this.lizards, water)
    this.physics.add.collider(this.lizards, House)
    this.physics.add.collider(this.lizards, Housedecor)
    this.physics.add.collider(this.lizards, Tree1)
    this.physics.add.collider(this.lizards, Tree2)
    this.physics.add.collider(this.lizards, Tree3)
    this.physics.add.collider(this.lizards, Tree4)
    this.physics.add.collider(this.lizards, Houseontop)
    this.physics.add.collider(this.knives, this.lizards, this.handleKnifeLizardCollision, undefined, this)
    this.physics.add.collider(this.knives, Island1, this.handleKnifeWallCollision, undefined, this)
    this.physics.add.collider(this.knives, Rocks, this.handleKnifeWallCollision, undefined, this)
    this.physics.add.collider(this.knives, House, this.handleKnifeWallCollision, undefined, this)
    this.playerLizardCollider = this.physics.add.collider(this.lizards, this.faune, this.handlePlayerLizardCollision, undefined, this)
    
    }

    private handleKnifeWallCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject)
	{
		this.knives.killAndHide(obj1)
	}

	private handleKnifeLizardCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject)
	{
		this.knives.killAndHide(obj1)
		this.lizards.killAndHide(obj2)
        // this.playerLizardCollider?.destroy()

	}

    private handlePlayerLizardCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject){
        
        const lizard = obj2 as Lizard
        const dx = this.faune.x - lizard.x
        const dy = this.faune.y - lizard.y

		const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200)
        this.faune.handleDamage(dir)

        sceneEvents.emit('player-health-changed', this.faune.health)

        if (this.faune.health <= 0){
            this.playerLizardCollider?.destroy()
        }
    }

    update(t: number, dt: number){                

        // console.log(this.faune.x, this.faune.y)
        if (this.faune.y > 450 && this.faune.x < 90){
            this.scene.stop()
            this.scene.start('secondmap')
        }

        if (this.faune)
        {
            this.faune.update(this.cursors)
        }
    }

}