import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://docs.remoet.dev'),
  title: {
    template: '%s - remoet.dev',
    default: 'remoet.dev API documentation',
  },
  description: 'remoet.dev API documentation',
  openGraph: {
    title: 'remoet.dev API documentation',
    description: 'remoet.dev API documentation',
    url: 'https://docs.remoet.dev',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@remoet_dev',
    title: 'remoet.dev API documentation',
    description: 'remoet.dev API documentation',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navbar = (
    <Navbar
      logo={<span>remoet.dev</span>}
      projectLink="https://github.com/remoet-labs/remoet-docs"
      chatLink="https://discord.gg/yxJA6cBs8U"
    />
  )
  const pageMap = await getPageMap()
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          footer={<Footer>remoet.dev © 2026</Footer>}
          docsRepositoryBase="https://github.com/remoet-labs/remoet-docs"
          pageMap={pageMap}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
