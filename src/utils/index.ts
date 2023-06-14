import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";

const promisedPipeline = promisify(pipeline);

export async function readFileContent(path: string): Promise<string> {
	try {
		const chunks: string[] = [];
		await promisedPipeline(
			fs.createReadStream(path, { encoding: "utf-8" }),
			async function* (source) {
				for await (const chunk of source) {
					chunks.push(chunk);
					yield chunk;
				}
			}
		);
		return chunks.join("");
	} catch (error) {
		throw new Error(`Error reading file ${error}`);
	}
}
