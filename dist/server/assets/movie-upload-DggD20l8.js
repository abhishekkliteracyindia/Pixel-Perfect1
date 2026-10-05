import { r as useServerFn, t as createMovieUpload } from "./movie.functions-BCKk6Esn.js";
import { t as supabase } from "./client-C4TnLwRR.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
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
