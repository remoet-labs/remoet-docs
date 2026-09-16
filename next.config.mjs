import nextra from 'nextra'

const withNextra = nextra({
  contentDirBasePath: '/',
})

export default withNextra({
  async redirects() {
    return [
      // /tiers described Free, Pro and Max plans that never existed after
      // 2026-08-02. The page is now /limits. Keep this permanently: /tiers is
      // indexed and linked from old blog posts and directory listings.
      { source: '/tiers', destination: '/limits', permanent: true },
    ]
  },
})
