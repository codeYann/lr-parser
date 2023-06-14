/**
 * Grammar:
 * S -> if E then C | C
 * E -> a
 * C -> b
 */

/**
 * Token types:
 * IF: if
 * THEN: then
 * IDENTIFIER: a
 * IDENTIFIER: b
 * FINISH: $
 * EOF: null
 */

export type Token = {
	type: string;
	value: string;
};

export class Lexer {
	private input: string;
	private position: number;
	private currentChar: string | null;

	constructor(input: string) {
		this.input = input;
		this.position = 0;
		this.currentChar = this.input[this.position] || null;
	}

	private advance(): void {
		if (this.position < this.input.length - 1) {
			this.position += 1;
			this.currentChar = this.input[this.position];
		} else {
			this.currentChar = null;
		}
	}

	private skipWhitespace(): void {
		while (this.currentChar === " ") {
			this.advance();
		}
	}

	private getNextToken(): Token | null {
		while (this.currentChar !== null) {
			// skip whitespaces
			if (this.currentChar === " ") {
				this.skipWhitespace();
				continue;
			}

			// looking for identifiers
			if (this.currentChar === "a" || this.currentChar === "b") {
				const value = this.currentChar;
				this.advance();
				return { type: "IDENTIFIER", value };
			}

			// looking for keywords
			if (
				this.currentChar === "i" &&
				this.input[this.position + 1] === "f"
			) {
				this.advance();
				this.advance();
				return { type: "IF", value: "if" };
			}

			if (
				this.currentChar === "t" &&
				this.input.substring(this.position, this.position + 4) ===
					"then"
			) {
				this.advance();
				this.advance();
				this.advance();
				this.advance();
				return { type: "THEN", value: "then" };
			}

			throw new Error("Invalid character " + this.currentChar);
		}

		return null;
	}

	private tokenizeFunc(): Token[] {
		const tokens: Token[] = [];
		let token = this.getNextToken();
		while (token !== null) {
			tokens.push(token);
			token = this.getNextToken();
		}
		return tokens;
	}
	public tokenize(): Token[] {
		// Adding a $ sign to the end of the input
		let tokens = this.tokenizeFunc();
		return [...tokens, { type: "FINISH", value: "$" }];
	}
}
