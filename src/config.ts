import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "AkatsukiMioの小窝",
	subtitle: "晓城澪",
	lang: "zh_CN", 
	themeColor: {
		hue: 50, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
		fixed: true, // Hide the theme color picker for visitors
	},
	banner: {
		enable: true,
		src: "https://cdn-js.moeworld.top/gh/AkatsukiMio/cdn1/img/3-2025/202507061233026.webp", //图片链接
		position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: false, // Display the credit text of the banner image
			text: "", // Credit text to be displayed
			url: "", // (Optional) URL link to the original artwork or artist's page
		},
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 2, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [
		// Leave this array empty to use the default favicon
		 {
		   src: '/favicon/favicon.ico',    // Path of the favicon, relative to the /public directory
		   //theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
		   //sizes: '64x64',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
		 }
	],
};

//导航栏链接

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.Series,
		LinkPreset.About,
		LinkPreset.Friends,
		{
			name: "导航页",
			url: "https://www.akatsukimio.top/", // Internal links should not include the base path, as it is automatically added
			external: true, // Show an external link icon and will open in a new tab
		},
	],
};

//简介

export const profileConfig: ProfileConfig = {
	avatar: "https://cdn-js.moeworld.top/gh/AkatsukiMio/cdn1/img/3-2025/202508192246459.webp", //图片链接
	name: "AkatsukiMio",
	bio: "我希望在广阔的原野上向前行走 并能自由地思想",
	links: [
		//个人外链
		{
			name: "Bilibili",
			icon: "fa6-brands:bilibili", //图标位于https://icones.js.org/，可自行pnpm安装添加
			url: "https://space.bilibili.com/2065828566",
		},
		{
			name: "qq",
			icon: "fa6-brands:qq",
			url: "https://qm.qq.com/q/upT7WpVKMw",
		},
		{
			name: "Github",
			icon: "fa6-brands:github",
			url: "https://github.com/AkatsukiMio",
		},
		{
			name: "mail",
			icon: "hugeicons:mail-02",
			url: "mailto:admin@akatsukimio.top",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
	// Please select a dark theme, as this blog theme currently only supports dark background color
	theme: "github-dark",
};
