import { Node } from "./types";
import { Token } from "../lexer";
import { ParsingTable } from "./lrTable";

export class Parser {
	private parsingTable: ParsingTable;
	private statesStack: number[];
	private nodesStack: Node[];
	private tokens: Token[];
	private tokenIndex: number;
	private currentToken: Token;

	constructor(tokens: Token[]) {
		this.parsingTable = new ParsingTable();
		this.statesStack = [];
		this.nodesStack = [];
		this.tokens = tokens;
		this.tokenIndex = 0;
		this.currentToken = tokens[0];
	}

	public getNextToken(): Token {
		if (this.tokenIndex < this.tokens.length) {
			this.tokenIndex++;
			let value = this.tokenIndex;
			return this.tokens[value];
		}
		return { type: "EOF", value: "" };
	}

	public reduce(rule: number): void {
		let childNodes: Node[] = [];

		switch (rule) {
			case 1: {
				let newNode: Node = { value: "S", children: [] };

				for (let i = 0; i < 4; i++) {
					let value = this.nodesStack.pop();
					this.statesStack.pop();
					if (value) {
						childNodes.push(value);
					}
				}
				let childNodesReverse = [...childNodes].reverse();
				newNode.children = childNodesReverse;
				this.nodesStack.push(newNode);

				break;
			}
			case 2: {
				let newNode: Node = { value: "S", children: [] };
				let value = this.nodesStack.pop();
				this.statesStack.pop();
				this.nodesStack.push(newNode);

				if (value) {
					childNodes.push(value);
				}

				let childNodesReverse = [...childNodes].reverse();
				newNode.children = childNodesReverse;
				break;
			}
			case 3: {
				let newNode: Node = { value: "E", children: [] };
				let value = this.nodesStack.pop();
				this.statesStack.pop();

				if (value) {
					childNodes.push(value);
				}

				let childNodesReverse = [...childNodes].reverse();
				newNode.children = childNodesReverse;
				this.nodesStack.push(newNode);
				break;
			}
			case 4: {
				let newNode: Node = { value: "C", children: [] };
				let value = this.nodesStack.pop();
				this.statesStack.pop();

				if (value) {
					childNodes.push(value);
				}

				let childNodesReverse = [...childNodes].reverse();
				newNode.children = childNodesReverse;
				this.nodesStack.push(newNode);
				break;
			}
			default:
				break;
		}
	}

	public shift(rule: number): void {
		this.tokenIndex += 1;
		this.statesStack.push(rule);
		this.nodesStack.push({
			value: this.currentToken.value,
			children: [],
		});
		this.currentToken = this.tokens[this.tokenIndex];
	}

	public parser(): void {
		let actionsTable = this.parsingTable.actionTable;
		let transtionsTable = this.parsingTable.productionTable;

		let mapping = new Map<string, number>();
		mapping.set("if", 0);
		mapping.set("a", 1);
		mapping.set("then", 2);
		mapping.set("b", 3);
		mapping.set("$", 4);
		mapping.set("S", 0);
		mapping.set("C", 1);
		mapping.set("E", 2);

		this.statesStack.push(0);

		while (true) {
			let currentToken = this.currentToken;

			let s = this.statesStack[this.statesStack.length - 1];

			const tableStructure = [
				{ stack: this.statesStack },
				{ chain: currentToken.value },
				{
					rule: actionsTable[s][
						mapping.get(currentToken.value) as number
					],
				},
			];

			console.table(tableStructure);

			if (
				actionsTable[s][mapping.get(currentToken.value) as number]
					?.shift
			) {
				this.shift(
					actionsTable[s][mapping.get(currentToken.value) as number]
						?.shift
				);
			} else if (
				actionsTable[s][mapping.get(currentToken.value) as number]
					?.reduce
			) {
				this.reduce(
					actionsTable[s][mapping.get(currentToken.value) as number]
						?.reduce
				);

				let t = this.statesStack[this.statesStack.length - 1];
				let node = this.nodesStack[this.nodesStack.length - 1];
				let value =
					transtionsTable[t][mapping.get(node.value) as number];
				this.statesStack.push(value);
			} else if (
				actionsTable[s][mapping.get(currentToken.value) as number]
					?.accept === 0
			) {
				break;
			} else {
				throw new Error(`Syntax error: ${currentToken.value}`);
			}
		}
	}
}
