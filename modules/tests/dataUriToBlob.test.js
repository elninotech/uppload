import dataUriToBlob from "../dataUriToBlob";

test("empty data URI is equal to new blob", () => {
	expect(dataUriToBlob("data:text/plain;base64,SGVsbG8sIHdvcmxkIQ==")).toEqual(
		new Blob(["Hello, world!"], { type: "text/plain" })
	);
});
