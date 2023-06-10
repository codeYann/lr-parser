import { Lexer } from "./lexer";
import { readFileContent } from "./utils";
import { buildLR0Items, Production } from "./parser";
import path from "path";

/**
 * grammar:
 * S -> if E then C | C
 * E -> a
 * C -> b
 *
 */

(() => {
	async function main() {
		const file = "./code/code.txt";
		const absFile = path.resolve(__dirname, file);
		const code = await readFileContent(absFile);
		const lexer = new Lexer(code);
		const tokens = lexer.tokenize();
		console.log(tokens);

		const grammar: Production[] = [
			{ left: "S", right: ["if", "E", "then", "C"] },
			{ left: "S", right: ["C"] },
			{ left: "E", right: ["a"] },
			{ left: "C", right: ["b"] },
		];

		const it = buildLR0Items(grammar);
		console.log(it);
	}
	main().catch((error) => console.error(error));
})();
