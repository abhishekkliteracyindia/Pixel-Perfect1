import { t as getServerFnById } from "./__23tanstack-start-server-fn-resolver-CkGUC1d4.js";
import { f as TSS_SERVER_FUNCTION, t as createServerFn } from "./createServerFn-DDDJMFWM.js";
import * as React from "react";
import { isRedirect, useRouter } from "@tanstack/react-router";
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
//#endregion
//#region src/lib/movie.functions.ts
/** Returns a temporary link to the movie you uploaded, or null if none yet. */
var getMovie = createServerFn({ method: "GET" }).handler(createSsrRpc("c2aefe8b7c048712c82bed9d4505824c77f1ff109fc44a2d754bc8e3ab162611"));
/** Password-protected: gives the uploader a one-time upload ticket. */
var createMovieUpload = createServerFn({ method: "POST" }).inputValidator((d) => z.object({ password: z.string().min(1).max(200) }).parse(d)).handler(createSsrRpc("2f9b27e6d6dd37ae3382aa42a1c3ca754c2f8a4fb3f1450480f0e85c26d1889b"));
//#endregion
export { getMovie as n, useServerFn as r, createMovieUpload as t };
