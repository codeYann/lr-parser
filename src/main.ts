import { Lexer } from "./lexer";
import { readFileContent } from "./utils";
import path from "path";

(() => {
	async function main() {
		const file = "./code/code.txt";
		const absFile = path.resolve(__dirname, file);
		const code = await readFileContent(absFile);
		const lexer = new Lexer(code);
		const tokens = lexer.tokenize();
		console.log(tokens);
	}
	main().catch((error) => console.error(error));
})();
