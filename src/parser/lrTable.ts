export type Actions = {
	[key: string]: number;
};

export class ParsingTable {
	public actionTable: Actions[][];
	public productionTable: number[][];

	constructor() {
		this.actionTable = new Array(9)
			.fill([])
			.map(() => new Array(5).fill({}));

		this.productionTable = new Array(9)
			.fill([])
			.map(() => new Array(3).fill(0));

		this.fillActionTable();
		this.fillProductionTable();
	}

	public fillActionTable(): void {
		this.actionTable[0][0] = { shift: 2 };
		this.actionTable[0][3] = { shift: 4 };
		this.actionTable[1][4] = { accept: 0 };
		this.actionTable[2][1] = { shift: 6 };
		this.actionTable[3][4] = { reduce: 2 };
		this.actionTable[4][4] = { reduce: 4 };
		this.actionTable[5][2] = { shift: 7 };
		this.actionTable[6][2] = { reduce: 3 };
		this.actionTable[7][3] = { shift: 4 };
		this.actionTable[8][4] = { reduce: 1 };
	}

	public fillProductionTable(): void {
		this.productionTable[0][0] = 1;
		this.productionTable[0][1] = 3;
		this.productionTable[2][2] = 5;
		this.productionTable[7][1] = 8;
	}
}
