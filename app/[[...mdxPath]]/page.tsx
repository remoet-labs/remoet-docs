// Two things in here are easy to undo by accident.
//
// 1. og:image and twitter:image. Metadata objects from parent and child
//    segments are merged SHALLOWLY, and a nested field such as `openGraph` is
//    REPLACED by the last segment that defines it (Next.js docs, "Ordering and
//    merging"). `app/opengraph-image.tsx` injects its image into the ROOT
//    layout's openGraph, so this file's openGraph was wiping it out: every
//    content page shipped with no og:image, while 404s (which never reach this
//    generateMetadata) kept theirs. Setting `images` explicitly here restores
//    it. `metadataBase` in app/layout.tsx turns the relative URL absolute.
//
// 2. noindex for /anthropic-reviewers. It is hidden from the nav, carries a
//    personal contact address, and exists for connector reviewers who arrive by
//    direct link. It should not be a search result.

import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '../../mdx-components'
import type { Metadata } from 'next'

const SITE_URL = 'https://docs.remoet.dev'

const OG_IMAGE = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: 'Remoet developer documentation',
}

const NOINDEX_PATHS = new Set(['/anthropic-reviewers'])

export const generateStaticParams = generateStaticParamsFor('mdxPath')

export async function generateMetadata(props: {
  params: Promise<{ mdxPath?: string[] }>
}): Promise<Metadata> {
  const params = await props.params
  const page = await importPage(params.mdxPath)
  const mdxMeta = (page.metadata ?? {}) as { title?: string; description?: string }
  const path = params.mdxPath?.length ? `/${params.mdxPath.join('/')}` : '/'
  const url = `${SITE_URL}${path === '/' ? '' : path}`
  const title = mdxMeta.title
  const description = mdxMeta.description

  return {
    ...mdxMeta,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE.url],
    },
    ...(NOINDEX_PATHS.has(path)
      ? { robots: { index: false, follow: true } }
      : {}),
  }
}

const Wrapper = getMDXComponents().wrapper

export default async function Page(props: {
  params: Promise<{ mdxPath?: string[] }>
}) {
  const params = await props.params
  const { default: MDXContent, toc, metadata, sourceCode } = await importPage(params.mdxPath)
  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  )
}
