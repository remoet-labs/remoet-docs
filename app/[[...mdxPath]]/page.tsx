import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '../../mdx-components'
import type { Metadata } from 'next'

const SITE_URL = 'https://docs.remoet.dev'

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

  // Layer SEO defaults on top of the MDX-supplied metadata. We don't drop
  // anything Nextra puts there (the spread keeps title/description for the
  // <title> tag), but we own canonical, OG URL, and Twitter card per route.
  return {
    ...mdxMeta,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
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
