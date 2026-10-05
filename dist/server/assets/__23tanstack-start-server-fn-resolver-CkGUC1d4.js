//#region \0%23tanstack-start-server-fn-resolver
var manifest = {
	"2f9b27e6d6dd37ae3382aa42a1c3ca754c2f8a4fb3f1450480f0e85c26d1889b": {
		functionName: "createMovieUpload_createServerFn_handler",
		importer: () => import("./movie.functions-D3UjD3KE.js")
	},
	"c2aefe8b7c048712c82bed9d4505824c77f1ff109fc44a2d754bc8e3ab162611": {
		functionName: "getMovie_createServerFn_handler",
		importer: () => import("./movie.functions-D3UjD3KE.js")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ??= await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
