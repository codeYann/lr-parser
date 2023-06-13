import { ParsingTable } from "./lrTable";
import { Token } from "../lexer";

export type Node = {
	value: string;
	children: Node[];
};

export class Parser extends ParsingTable {
	private statesStack: number[];
	private nodesStack: Node[];
	private tokens: Token[];
	private childNodes: Node[];

	constructor(tokens: Token[]) {
		super();
		super.fillActionTable();
		super.fillProductionTable();
		this.statesStack = [];
		this.nodesStack = [];
		this.childNodes = [];
		this.tokens = tokens;
	}

	public reduce(rule: number): void {
		switch (rule) {
			case 1: {
				let newNode: Node = { value: "S", children: [] };
				for (let i = 0; i < 4; i++) {
					let value = this.nodesStack.pop();
					this.statesStack.pop();
					if (value) {
						this.childNodes.push(value);
					}
				}

				this.nodesStack.push(newNode);

				break;
			}
			case 2: {
				let newNode: Node = { value: "S", children: [] };
				let value = this.nodesStack.pop();
				this.statesStack.pop();
				if (value) {
					this.childNodes.push(value);
				}
				this.nodesStack.push(newNode);
				break;
			}
			case 3: {
				let newNode: Node = { value: "E", children: [] };
				let value = this.nodesStack.pop();
				this.statesStack.pop();
				if (value) {
					this.childNodes.push(value);
				}
				this.nodesStack.push(newNode);
				break;
			}
			case 4: {
				let newNode: Node = { value: "C", children: [] };
				let value = this.nodesStack.pop();
				this.statesStack.pop();
				if (value) {
					this.childNodes.push(value);
				}
				this.nodesStack.push(newNode);
				break;
			}
			default:
				break;
		}
	}
}
