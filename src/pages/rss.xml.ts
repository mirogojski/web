import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: import('astro').APIContext) {
  const blog = await getCollection('blog');
  const sortedPosts = blog.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'Mirogoj — zapisi',
    description: 'Zapisi o zagrebačkom Mirogoju, o groblju i o ljudima koji tu počivaju.',
    site: context.site ?? 'https://mirogoj.com',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      author: post.data.author ?? 'Nikola Pejdo',
      link: `/blog/${post.id}/`,
    })),
    customData: `<language>hr</language>
<managingEditor>kontakt@mirogoj.com (Nikola Pejdo)</managingEditor>
<webMaster>kontakt@mirogoj.com (Nikola Pejdo)</webMaster>`,
  });
}
