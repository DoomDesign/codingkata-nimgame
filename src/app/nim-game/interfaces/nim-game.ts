export enum Player {
	Player = 'PLAYER',
	Computer = 'COMPUTER'
}

export interface NimGamePlayerStats {
	drawnMatches: number
}

export enum NimGameDifficulty {
	Normal = 'NORMAL',
	Hard = 'HARD'
}

export enum NimGameState {
	Start = 'START',
	Running = 'RUNNING',
	Ended = 'ENDED'
}

export interface NimGameRules {
	numTotalMatches: number,
	minSelectableMatches: number,
	maxSelectableMatches: number,
}

export interface NimGame {
	gameRules: NimGameRules,
	computerDifficulty: NimGameDifficulty,
	currentGameState: NimGameState,
	currentRound: number,
	currentPlayer: Player,
	lastAmountTaken: number,
	winner: Player|null,
	numMatchesLeft: number,
	playerStats: {[p in Player]: NimGamePlayerStats}
}
