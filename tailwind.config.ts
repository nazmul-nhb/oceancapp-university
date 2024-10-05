import { Config } from "tailwindcss";

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"oceancapp-primary": "#002140",
				"oceancapp-secondary": "#003c75",
			},
			fontFamily: {
				kreonSerif: '"Kreon", serif;',
				sourceSans: '"Source Sans 3", sans-serif;',
				hallelujah: '"Gloria Hallelujah", cursive;',
			},
			backgroundImage: {
				bannerBG: 'url("/src/assets/banner.png")',
			},
			animation: {
				"ping-slow": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
			},
		},
	},
	plugins: [],
} as Config;
