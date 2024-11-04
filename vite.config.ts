import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		rollupOptions: {
			output: {
				entryFileNames: "react-single-model-viewer.js",
				assetFileNames: (assetInfo) => {
					if (assetInfo.names && assetInfo.names.some((name) => name.endsWith(".css"))) {
						return "react-single-model-viewer.css";
					}
					return "assets/[name].[hash][extname]";
				},
			},
		},
	},
});
