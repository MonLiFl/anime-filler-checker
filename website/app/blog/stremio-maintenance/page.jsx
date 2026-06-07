import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Stremio Addon — Disabled Indefinitely | Anime Filler Checker',
  description:
    'This post has been superseded. The Anime Filler Checker Stremio addon is now disabled indefinitely. See the latest post for context and self-hosting instructions.',
  alternates: { canonical: 'https://animefillerchecker.com/blog/stremio-disabled' },
  robots: { index: false, follow: true },
}

export default function StremioMaintenance() {
  // The original "temporary maintenance" post has been superseded.
  // The hosted addon is now disabled indefinitely; redirect to the up-to-date post.
  redirect('/blog/stremio-disabled')
}
