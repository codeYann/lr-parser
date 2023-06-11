import { Lexer } from "./lexer";
import { readFileContent } from "./utils";
import path from "path";

(() => {
	async function main() {
		const file = "./code/code.txt";
		const absFile = path.resolve(__dirname, file);
		const code = await readFileContent(absFile);
		const lexer = new Lexer(code);

		try {
			const tokens = lexer.tokenize();
			tokens.forEach((token) => {
				console.log(token);
			});

		} catch (error) {
			console.error(error);
		}
	}
	main().catch((error) => console.error(error));
})();
