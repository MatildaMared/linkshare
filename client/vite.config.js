import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			// "url-prefix": "the url to proxy the fetch"
			"/api": "http://localhost:8000", //server address
		},
	},
});
