import Phaser, { Scale } from 'phaser'

import Preloader from './scenes/Preloader'
import Game from './scenes/game'
import secondmap from './scenes/secondmap'
import GameUI from './scenes/GameUI'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: innerWidth,
	height: innerHeight,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			// debug: true
		}
	},
	scene: [Preloader, Game, secondmap, GameUI],
	scale: {
		zoom: 2
	}
}

export default new Phaser.Game(config)
