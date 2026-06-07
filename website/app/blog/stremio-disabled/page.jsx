import Link from 'next/link'

export const metadata = {
  title: 'Stremio Addon — Disabled Indefinitely | Anime Filler Checker',
  description:
    "The hosted Anime Filler Checker Stremio addon is disabled indefinitely due to traffic costs. Here's why — and how you can self-host it locally in a few minutes.",
  alternates: { canonical: 'https://animefillerchecker.com/blog/stremio-disabled' },
}

const GITHUB_URL = 'https://github.com/nehirakbass/anime-filler-checker'

const codeBlockStyle = {
  background: 'rgba(139, 108, 255, 0.08)',
  border: '1px solid rgba(139, 108, 255, 0.25)',
  borderRadius: '8px',
  padding: '16px 18px',
  fontSize: '13px',
  lineHeight: '1.6',
  color: 'var(--text)',
  overflowX: 'auto',
  margin: '8px 0 20px',
  fontFamily: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
  whiteSpace: 'pre',
}

export default function StremioDisabled() {
  return (
    <>
      <nav>
        <div className="nav-inner">
          <Link href="/" className="nav-brand">
            <img src="/icon48.png" alt="Anime Filler Checker" />
            <span>Anime Filler Checker</span>
          </Link>
        </div>
      </nav>

      <div className="privacy-content">
        <h1>Stremio Addon — Disabled Indefinitely</h1>
        <p className="subtitle">June 7, 2026</p>

        <h2>What happened?</h2>
        <p>
          The hosted Anime Filler Checker Stremio addon is <strong>disabled indefinitely</strong>.
          If you have it installed, every stream request now returns a single &quot;🚧 ADDON DISABLED&quot;
          item instead of filler badges.
        </p>
        <p>
          The <strong>Chrome and Firefox browser extensions are not affected</strong> and continue to
          work normally on every streaming site they already supported.
        </p>

        <h2>Why?</h2>
        <p>
          Within a short period the addon received <strong>over 5 million edge requests</strong> on
          Vercel — far more than the free plan allows. The deployment was throttled and every project
          on that account got taken down with it.
        </p>
        <p>
          Most of that traffic came from Stremio clients automatically polling for every series the
          user opened, including thousands of non-anime titles (Game of Thrones, Invincible, The Boys,
          and so on) that will never be in the AnimeFillerList database. Caching, negative caching,
          and CDN headers were not enough to keep the bill survivable for a free, ad-free, one-person
          project.
        </p>
        <p>
          Until there&apos;s a sustainable hosting setup, the public addon URL stays offline. I&apos;d
          rather pull the plug honestly than silently let it eat money or degrade into a broken
          experience.
        </p>

        <h2>You can still run it yourself</h2>
        <p>
          The entire addon is open source and runs locally with two commands. If you&apos;re the only
          user, you&apos;ll basically never hit a rate limit and it&apos;s effectively free forever.
        </p>

        <h2>Option 1 — Run it on your own machine</h2>
        <p>Requires <a href="https://nodejs.org" target="_blank" rel="noopener">Node.js 18+</a> and git.</p>
        <pre style={codeBlockStyle}>{`git clone https://github.com/nehirakbass/anime-filler-checker.git
cd anime-filler-checker/stremio-addon
npm install
npm start`}</pre>
        <p>
          The server starts on port <code>7000</code>. In Stremio:
        </p>
        <ul>
          <li>Open <strong>Settings → Addons</strong></li>
          <li>
            Paste <code>http://127.0.0.1:7000/manifest.json</code> into the
            search/install field
          </li>
          <li>Click <strong>Install</strong></li>
        </ul>
        <p>
          The addon only works while the terminal is open. Close it and the badges disappear until you
          run <code>npm start</code> again. On Windows you can drop a shortcut to a one-line{' '}
          <code>.bat</code> file in your Startup folder so it launches with your PC.
        </p>

        <h2>Option 2 — Deploy your own free Vercel instance</h2>
        <p>
          If you want it to &quot;just work&quot; without keeping a terminal open, you can host your
          personal copy on Vercel&apos;s free tier. Since only you (and maybe a few friends) hit it,
          you won&apos;t come anywhere near the limits that took down the public deployment.
        </p>
        <ul>
          <li>
            Fork the repo:{' '}
            <a href={GITHUB_URL} target="_blank" rel="noopener">
              github.com/nehirakbass/anime-filler-checker
            </a>
          </li>
          <li>
            Go to <a href="https://vercel.com/new" target="_blank" rel="noopener">vercel.com/new</a>{' '}
            and import your fork
          </li>
          <li>
            Set <strong>Root Directory</strong> to <code>stremio-addon</code>
          </li>
          <li>Click <strong>Deploy</strong> — no build command, no environment variables needed</li>
          <li>
            In <code>stremio-addon/lib/addon.js</code>, set{' '}
            <code>MAINTENANCE_MODE = false</code> in your fork before deploying so your instance
            actually serves filler data
          </li>
          <li>
            Install in Stremio using{' '}
            <code>https://your-project.vercel.app/manifest.json</code>
          </li>
        </ul>

        <h2>What about the public addon coming back?</h2>
        <p>
          No promises and no ETA. It will only come back if I find a hosting setup that can handle
          public traffic without making me personally fund it. Until then, self-hosting is the
          supported path — and honestly, it&apos;s better that way: your own instance, your own
          cache, no shared rate limits.
        </p>

        <h2>Browser extension is unaffected</h2>
        <p>
          If you only used the Chrome/Firefox extension, nothing changes. The extension fetches
          filler data directly from your browser and never touched the Stremio infrastructure.
        </p>

        <p style={{ marginTop: '2rem' }}>
          — <em>Nehir</em>
        </p>
        <p>
          <Link href="/" style={{ color: 'var(--accent)' }}>← Back to home</Link>
        </p>
      </div>
    </>
  )
}
