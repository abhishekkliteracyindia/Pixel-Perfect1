import { f as TSS_SERVER_FUNCTION, t as createServerFn } from "./createServerFn-DDDJMFWM.js";
import { z } from "zod";
//#region node_modules/@tanstack/start-server-core/dist/esm/createServerRpc.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
//#region src/lib/movie.functions.ts?tss-serverfn-split
var BUCKET = "movies";
var FILE = "current";
/** Returns a temporary link to the movie you uploaded, or null if none yet. */
var getMovie_createServerFn_handler = createServerRpc({
	id: "c2aefe8b7c048712c82bed9d4505824c77f1ff109fc44a2d754bc8e3ab162611",
	name: "getMovie",
	filename: "src/lib/movie.functions.ts"
}, (opts) => getMovie.__executeServer(opts));
var getMovie = createServerFn({ method: "GET" }).handler(getMovie_createServerFn_handler, async () => {
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.js");
	const { data: list } = await supabaseAdmin.storage.from(BUCKET).list("", { search: FILE });
	if (!list?.some((f) => f.name === FILE)) return { url: null };
	const { data, error } = await supabaseAdmin.storage.from(BUCKET).createSignedUrl(FILE, 43200);
	if (error) {
		console.error("movie signed url failed", error);
		return { url: null };
	}
	return { url: data.signedUrl };
});
var createMovieUpload_createServerFn_handler = createServerRpc({
	id: "2f9b27e6d6dd37ae3382aa42a1c3ca754c2f8a4fb3f1450480f0e85c26d1889b",
	name: "createMovieUpload",
	filename: "src/lib/movie.functions.ts"
}, (opts) => createMovieUpload.__executeServer(opts));
var createMovieUpload = createServerFn({ method: "POST" }).inputValidator((d) => z.object({ password: z.string().min(1).max(200) }).parse(d)).handler(createMovieUpload_createServerFn_handler, async ({ data }) => {
	const expected = process.env["MOVIE_UPLOAD_PASSWORD"];
	if (!expected || data.password !== expected) return { ok: false };
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.js");
	const { data: ticket, error } = await supabaseAdmin.storage.from(BUCKET).createSignedUploadUrl(FILE, { upsert: true });
	if (error || !ticket) {
		console.error("upload ticket failed", error);
		return { ok: false };
	}
	return {
		ok: true,
		path: ticket.path,
		token: ticket.token
	};
});
//#endregion
export { createMovieUpload_createServerFn_handler, getMovie_createServerFn_handler };
