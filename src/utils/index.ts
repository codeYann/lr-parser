import fs from "fs";
import { Stream, pipeline } from "stream";
import { promisify } from "util";

const promisedPipeline = promisify(pipeline);

export async function readFileContent(path: string): Promise<string> {
	try {
		const chunks: string[] = [];
		const writableStream = new Stream.Writable({
			write(chunk, _, cb) {
				chunks.push(chunk);
				cb();
			},
		});
		await promisedPipeline(
			fs.createReadStream(path, { encoding: "utf-8" }),
			writableStream
		);
		return chunks.join("");
	} catch (error) {
		throw new Error(`Error reading file ${error}`);
	}
}
