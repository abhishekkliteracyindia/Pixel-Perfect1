<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- All story content (names, text, photos, memories, movie, shayari) lives in src/config/story.ts — so it can be edited without touching scene components.
- Each story scene is its own component in src/components/scenes/, sequenced by src/lib/use-story-progress.ts — keeps the flow easy to reorder.
- The shared playful-animal layer belongs in the route shell so every story scene gets it without duplicating scene markup.
- Movie night: the movie is a single file in the private "movies" storage bucket, uploaded via the password-gated /movie-upload page and served through short-lived signed links — keeps it off public URLs.
- Watch-together sync uses ephemeral realtime broadcast channels keyed by room id (?room=), no database tables — rooms need no persistence.
