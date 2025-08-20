import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "长岗中学",
	subtitle: "广州市花都区花城街长岗初级中学",
	lang: "zh_CN", 
	themeColor: {
		hue: 250, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
		fixed: false, // Hide the theme color picker for visitors
	},
	banner: {
		enable: true,
		src: "https://cdn.jsdmirror.com/gh/AkatsukiMio/cdn1/img/3-2025/202508172242980.webp", //图片链接
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
		   src: '/favicon/icon',    // Path of the favicon, relative to the /public directory
		   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
		   sizes: '636x636',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
		 }
	],
};

//导航栏链接

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		{
			name: "支持",
			url: "https://blog.akatsukimio.top/", // Internal links should not include the base path, as it is automatically added
			external: true, // Show an external link icon and will open in a new tab
		},
	],
};

//简介

export const profileConfig: ProfileConfig = {
	avatar: "https://cdn.jsdmirror.com/gh/AkatsukiMio/cdn1/img/3-2025/202508182237369.jpg", //图片链接
	name: "长岗中学",
	bio: "努力让每一个学生得到成长",
	links: [
		//个人外链
		{
			name: "WeChat",
			icon: "fa6-brands:weixin", //图标位于https://icones.js.org/，可自行pnpm安装添加
			url: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI4ODk1OTI2OQ==&scene=124#wechat_redirect",
		},
		{
			name: "Telephone",
			icon: "hugeicons:telephone",
			url: "tel:02086845532",
		},
		{
			name: "E-mail",
			icon: "hugeicons:mail-02",
			url: "mailto:hdcgzx@163.com",
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
