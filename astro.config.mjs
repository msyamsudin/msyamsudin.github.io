// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import { visit } from 'unist-util-visit';

// Plugin untuk membersihkan backslash escape pada kurung kurawal di blok math
// Dan mendukung penulisan rumus via ```math blocks
function remarkMathFix() {
	return (/** @type {any} */ tree) => {
		visit(tree, (node) => {
			// 1. Dukungan ```math code blocks
			if (node.type === 'code' && node.lang === 'math') {
				node.type = 'math';
				return;
			}

			// 2. Pembersihan escape pada $$ math $$ atau $ math $
			if (node.type === 'math' || node.type === 'inlineMath') {
				node.value = node.value
					.replace(/\\\{/g, '{')
					.replace(/\\\}/g, '}')
					.replace(/\\\_/g, '_');
			}
		});
	};
}

// https://astro.build/config
export default defineConfig({
	site: 'https://msyamsudin.github.io',
	integrations: [
		mdx({
			remarkPlugins: [remarkMath, remarkMathFix],
			rehypePlugins: [rehypeKatex],
		}),
		sitemap(),
	],
});
