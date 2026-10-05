import { t as getServerFnById } from "./__23tanstack-start-server-fn-resolver-CkGUC1d4.js";
import { f as TSS_SERVER_FUNCTION, t as createServerFn } from "./createServerFn-DDDJMFWM.js";
import { t as supabase } from "./client-C4TnLwRR.js";
import * as React from "react";
import { useState } from "react";
import { isRedirect, useRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { z } from "zod";
//#region node_modules/@tanstack/react-start/dist/esm/useServerFn.js
function useServerFn(serverFn) {
	const router = useRouter();
	return React.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
//#endregion
//#region node_modules/@tanstack/start-server-core/dist/esm/createSsrRpc.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
createServerFn({ method: "GET" }).handler(createSsrRpc("c2aefe8b7c048712c82bed9d4505824c77f1ff109fc44a2d754bc8e3ab162611"));
/** Password-protected: gives the uploader a one-time upload ticket. */
var createMovieUpload = createServerFn({ method: "POST" }).inputValidator((d) => z.object({ password: z.string().min(1).max(200) }).parse(d)).handler(createSsrRpc("2f9b27e6d6dd37ae3382aa42a1c3ca754c2f8a4fb3f1450480f0e85c26d1889b"));
//#endregion
//#region src/routes/movie-upload.tsx?tsr-split=component
function MovieUpload() {
	const ticketFn = useServerFn(createMovieUpload);
	const [password, setPassword] = useState("");
	const [file, setFile] = useState(null);
	const [status, setStatus] = useState("idle");
	const [msg, setMsg] = useState("");
	const submit = async (e) => {
		e.preventDefault();
		if (!file) return setMsg("Pick a movie file first.");
		if (!file.type.startsWith("video/")) return setMsg("That isn't a video file. Try .mp4 or .webm.");
		setStatus("busy");
		setMsg("Uploading… keep this page open, big movies take a while.");
		try {
			const t = await ticketFn({ data: { password } });
			if (!t.ok) {
				setStatus("error");
				return setMsg("Wrong password.");
			}
			const { error } = await supabase.storage.from("movies").uploadToSignedUrl(t.path, t.token, file, {
				contentType: file.type,
				upsert: true
			});
			if (error) throw error;
			setStatus("done");
			setMsg("Done! The movie is ready for movie night 🍿❤️");
		} catch (err) {
			console.error(err);
			setStatus("error");
			setMsg("Upload failed. Check your connection and try again.");
		}
	};
	return /* @__PURE__ */ jsx("main", {
		className: "flex min-h-[100svh] items-center justify-center bg-background px-5",
		children: /* @__PURE__ */ jsxs("form", {
			onSubmit: submit,
			className: "paper w-full max-w-md space-y-4 rounded-3xl p-6",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "font-display text-3xl text-wine",
					children: "Movie night upload 🎬"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-sm text-muted-foreground",
					children: "Only for you. The movie you upload here plays automatically on movie night."
				}),
				/* @__PURE__ */ jsx("input", {
					type: "password",
					placeholder: "Password",
					value: password,
					onChange: (e) => setPassword(e.target.value),
					className: "w-full rounded-xl border border-blush bg-ivory px-4 py-3"
				}),
				/* @__PURE__ */ jsx("input", {
					type: "file",
					accept: "video/*",
					onChange: (e) => setFile(e.target.files?.[0] ?? null),
					className: "w-full text-sm"
				}),
				/* @__PURE__ */ jsx("button", {
					disabled: status === "busy",
					className: "min-h-12 w-full rounded-full bg-wine px-6 text-ivory disabled:opacity-60",
					children: status === "busy" ? "Uploading…" : "Upload movie"
				}),
				msg && /* @__PURE__ */ jsx("p", {
					className: "text-sm text-wine",
					children: msg
				})
			]
		})
	});
}
//#endregion
export { MovieUpload as component };
