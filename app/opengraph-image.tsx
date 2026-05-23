import { ImageResponse } from 'next/og'

export const alt = 'remoet.dev developer documentation'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: 'linear-gradient(135deg, #0f0f10 0%, #1a1a1f 60%, #2a1f3a 100%)',
          color: '#fff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 36,
            opacity: 0.7,
            letterSpacing: '0.02em',
          }}
        >
          docs.remoet.dev
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Developer documentation
          </div>
          <div
            style={{
              fontSize: 36,
              opacity: 0.8,
              lineHeight: 1.3,
              maxWidth: 900,
            }}
          >
            MCP server and REST API for AI agents and external tooling
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontSize: 28,
            opacity: 0.6,
          }}
        >
          <span>remoet.dev</span>
          <span>MCP · REST · Free tier</span>
        </div>
      </div>
    ),
    size
  )
}
