---
title: 勘误：AULyPcのBlog中“给你的Fuwari添加一个友链页面”的错误
published: 2025-08-21
description: '修正AULyPcのBlog中“给你的Fuwari添加一个友链页面”的错误'
image: ''
tags: [勘误]
category: '勘误'
draft: false 
lang: 'zh_CN'
---
> 原文链接：[AULyPcのBlog](https://aulypc1.github.io/posts/website/add_friendspage_in_fuwari/#%E5%88%9B%E5%BB%BA%E5%8D%A1%E7%89%87%E6%95%88%E6%9E%9C%E5%8F%8B%E9%93%BE "原文链接（现已修改）")
:::important[注意]
每个人的代码有所出入，请根据自身需求修改。
:::
### 错误内容
在原文章中的：
```js wrap=false ps frame="code" title="src\pages\friends.astro" ins={3-11, 16-45}
const friendsPost = await getEntry('spec', 'friends')
const { Content } = await friendsPost.render()
const items = [
  {
    title: 'Astro',
    imgurl: 'https://avatars.githubusercontent.com/u/44914786?s=48&v=4',
    desc: 'The web framework for content-driven websites. ⭐️ Star to support our work!',
    siteurl: 'https://github.com/withastro/astro',
    tags: ['框架'],
  },
]
---
<MainGridLayout title={i18n(I18nKey.friends)} description={i18n(I18nKey.friends)}>
    <div class="flex w-full rounded-[var(--radius-large)] overflow-hidden relative min-h-32">
        <div class="card-base z-10 px-9 py-6 relative w-full ">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 my-4">
                {shuffledItems.map((item) => (
                    <div class="flex flex-nowrap items-stretch h-28 gap-4 rounded-[var(--radius-large)]">
                        <div class="w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-zinc-200 dark:bg-zinc-900">
                            <img src={item.imgurl} alt="站点头像" class="w-full h-full object-cover">
                        </div>
                        <div class="grow w-full">
                            <div class="font-bold transition text-lg text-neutral-900 dark:text-neutral-100 mb-1">{item.title}</div>
                            <div class="text-50 text-sm font-medium">{item.desc}</div>
                            <div class:list={["items-center", {"flex": true, "hidden md:flex" : false}]}>
                                <div class="flex flex-row flex-nowrap items-center">
                                    {(item.tags && item.tags.length > 0) && item.tags.map((tag,i) => (
                                    <div class:list={[{"hidden": i==0}, "mx-1.5 text-[var(--meta-divider)] text-sm" ]}>
                                        /
                                    </div>
                                    <span class="transition text-50 text-sm font-medium">
                                        {tag}
                                    </span>))}
                                    {!(item.tags && item.tags.length > 0) && <div class="transition text-50 text-sm font-medium">{i18n(I18nKey.noTags)}</div>}
                                </div>
                            </div>
                        </div>
                        <a href={item.siteurl} target="_blank" rel="noopener noreferrer"class="flex btn-regular w-[3.25rem] rounded-lg bg-[var(--enter-btn-bg)] hover:bg-[var(--enter-btn-bg-hover)] active:bg-[var(--enter-btn-bg-active)] active:scale-95">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="transition text-[var(--primary)] text-4xl mx-auto iconify iconify--material-symbols" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12.6 12L8.7 8.1q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-4.6 4.6q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7z"></path>
                            </svg>
                        </a>
                    </div>
                ))}
            </div>
            <Markdown class="mt-2">
                <Content />
            </Markdown>
        </div>
    </div>
</MainGridLayout>
```
第3行与第17行的代码中： \
虽然`items`已定义，但模板中却使用了未定义的`shuffledItems`
### 解决方法：
(如果你希望友链固定排序)修改第17行的代码为：
```diff lang="js" js showLineNumbers=false
-   {shuffledItems.map((item) => (
+   {items.map((item) => (
```
(如果你希望友链随机排序)在11行后面添加：
```diff lang="js" js showLineNumbers=false
+   const shuffledItems = [...items]
+     .sort(() => Math.random() - 0.5);
```
> 以上就是全部内容了 \
> 看了这么久 \
> 喝点水吧( •̀ ω •́ )🥤