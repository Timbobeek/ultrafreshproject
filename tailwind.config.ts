import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'rgb(0 128 0)',
  			foreground: 'rgb(255 255 0)',
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
			fontSize: {
				large: '5em',
				medium: '3em',
				small: '1.3em'
			},
			backgroundColor: { // these are not random names, but what they will be responsible for
				standard: 'rgb(60 60 60)'
			}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
