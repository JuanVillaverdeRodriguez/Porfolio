---
version: 1
slug: "src-app-tsx"
primary_target: "src/App.tsx"
related_targets: []
---

# Surface: portfolio home (single page)

Mode: Experience. Audience: recruiters scanning Juan's profile. Action: reach out (form / email / LinkedIn).
Direction pinned by the user (2026-10-21), overriding the roll: bolder, colourful, background full of ASCII nature, cursor interacts with the background, text types itself as you scroll, famous terminal motifs, many animations, a story being built.

## Direction contract

THESIS: The portfolio is one night-to-campfire journey drawn entirely in characters; scrolling walks the visitor through a living ASCII landscape while each chapter of Juan's career types itself into terminal panes. Refuses the static green-on-black "hacker" page and the card grid.

OWN-WORLD: Famous terminal palettes (Catppuccin Mocha default, Tokyo Night, Gruvbox, Dracula, Nord, Catppuccin Latte light) recolour everything, scene included. Ground = theme base, filled edge to edge with a canvas character field: stars, aurora, moon/sun, ridge lines, pines, grass, river, fireflies, campfire. Content sits in tmux-like panes with box-drawing borders. Display type = figlet ANSI Shadow; lolcat rainbow on the name. JetBrains Mono everywhere.

STORY: Night (who he is, neofetch) → dawn (experience as git log) → forest (projects as ls + ASCII screenshots) → river (certifications as ASCII diplomas) → campfire (contact prompt). Narrator lines bridge chapters. Visitor ends at the fire with a working mail prompt.

FIRST VIEWPORT: Full-bleed starry sky with aurora over ridges; tmux status bar on top (chapters, theme, ES/EN). Centre-left a pane typing `neofetch`: ASCII portrait from Yo.jpg beside info lines, neofetch colour blocks, red-free primary action "Hey! Estoy disponible". Lolcat ANSI Shadow name above the pane.

FORM: User-pinned direction (not on the rolled list). seed:a751701f2f84171f
Signature interaction: cursor is a wind/lantern in the field — characters scatter and glow around it, grass bends away, fireflies follow, click sends a ripple through the landscape. Motion grammar: typing reveal on enter, scanline print-in for ASCII images, continuous slow wind.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
