---
name: Juan Villaverde Portfolio
description: A night-to-campfire walk through a living ASCII landscape, told in terminal panes.
colors:
  bg: "#1e1e2e"
  mantle: "#181825"
  surface: "#313244"
  fg: "#cdd6f4"
  muted: "#a6adc8"
  red: "#f38ba8"
  orange: "#fab387"
  yellow: "#f9e2af"
  green: "#a6e3a1"
  cyan: "#94e2d5"
  blue: "#89b4fa"
  magenta: "#cba6f7"
typography:
  display:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "min(17-22px, fit-to-width)"
    fontWeight: 400
    lineHeight: 1.32
    letterSpacing: "normal"
  headline:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "1.6em"
    fontWeight: 800
    lineHeight: "36px"
  title:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "1.35em"
    fontWeight: 800
    lineHeight: "36px"
  body:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: "24px"
    fontFeature: "liga 0"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: "28px"
rounded:
  none: "0px"
spacing:
  half-line: "12px"
  line: "24px"
  chapter: "48px"
  ch: "1ch"
  gutter: "2ch"
  column-gap: "3ch"
components:
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.bg}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0 1ch"
    height: "32px"
  button-primary-hover:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.bg}"
  button-primary-disabled:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
  pane:
    backgroundColor: "{colors.mantle}"
    textColor: "{colors.fg}"
    rounded: "{rounded.none}"
    padding: "24px 2ch"
  pane-title:
    backgroundColor: "{colors.mantle}"
    textColor: "{colors.fg}"
    padding: "0 1ch"
  status-bar:
    backgroundColor: "{colors.mantle}"
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    height: "28px"
  status-window-active:
    backgroundColor: "{colors.magenta}"
    textColor: "{colors.bg}"
    padding: "0 1ch"
  status-session:
    backgroundColor: "{colors.green}"
    textColor: "{colors.bg}"
    padding: "0 1ch"
  link-terminal:
    textColor: "{colors.blue}"
  link-terminal-hover:
    textColor: "{colors.cyan}"
  link-path-hover:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.bg}"
  tag:
    textColor: "{colors.cyan}"
  field:
    textColor: "{colors.fg}"
    rounded: "{rounded.none}"
    padding: "4px 0"
---

# Design System: Juan Villaverde Portfolio

## Overview

**Creative North Star: "The Night Walk in a Terminal"**

The whole page is a single terminal session drawn in characters. Behind everything, a fixed full-viewport canvas renders a living ASCII landscape (stars, aurora, moon, ridges, pines, grass, river, fireflies, campfire) that changes as the visitor scrolls from night to campfire. The cursor acts as wind and lantern in that field: characters scatter and glow around it, and a click sends a ripple through the landscape. Content sits on top in tmux-like panes framed with box-drawing characters, and text types itself in as each chapter enters view.

The system is a monospace grid. One face (JetBrains Mono) at one rhythm (24px line) carries everything, from the figlet ANSI Shadow display headings to the form fields. Colour comes from six well-known terminal palettes, and the active palette recolours every surface, including the canvas scene. The density is the density of a real terminal: generous line spacing, ch-unit gutters, no rounded corners, no card grid. The rejection is explicit. This is not the static green-on-black hacker page and not a grid of cards.

Personality never blocks scanning. Every pane is a real shell idiom (`neofetch`, `git log`, `ls`, `finger`, a mail prompt), so a recruiter reads facts in a form they already recognise.

**Key Characteristics:**
- One monospace face, one 24px line grid, sizes in ch and line multiples.
- Six swappable terminal palettes; every colour is a theme variable, nothing is fixed to one palette.
- Box-drawing frames (single `┌─┐` and double `╔═╗`) instead of borders and radii.
- A full-bleed canvas character landscape behind all content, reacting to cursor, click and scroll.
- Motion is terminal motion: typing, stepped print-in, blinking block caret, lolcat hue drift.

## Colors

A terminal 16-colour palette reduced to five neutrals and seven ANSI accents, defaulting to Catppuccin Mocha and swappable at runtime for Tokyo Night, Gruvbox Dark, Dracula, Nord, and Catppuccin Latte (light). The frontmatter records the Mocha defaults; the role names are the system, the hex values are per-theme.

### Primary
- **Prompt Green** (green): the primary action fill, the tmux session tab, the hovered or focused pane frame, the focused field underline and caret, the success heading. Green means "this is live / this is where you act".

### Secondary
- **Window Magenta** (magenta): the active tmux window tab, emphasised phrases inside running text (bold, no background), text selection fill, form field labels.
- **Link Blue** (blue): links, `ls` directory names, the shell host, the clock tab. Path-style links invert to blue fill on hover.

### Tertiary
- **Chapter accents**: each chapter sets one accent that drives its figlet heading and its titles. Experience is orange, projects green, certifications cyan, contact red. The hero name uses the lolcat rainbow instead.
- **Yellow**: focus outline, hover fill of the primary action, commit hashes, `finger` keys, firefly glow.
- **Cyan**: tag text, link hover, shell path.
- **Red**: `git log` graph rails and form errors. Red is never the fill of a primary action.

### Neutral
- **Base** (bg): page ground and the canvas background; text halos on narrator lines use it.
- **Mantle** (mantle): pane fill (at 97% opacity, 92% on the light theme), status bar, menus, the knockout behind pane titles.
- **Surface** (surface): menu hover row, disabled button, scrollbar thumb.
- **Foreground** (fg): body text, pane titles, the caret block.
- **Muted** (muted): narrator lines, dates, meta, bracket punctuation, inactive status tabs. Pane frames use muted at 45% opacity.

### Named Rules

**The Palette-Is-a-Variable Rule.** Every colour in the UI and in the canvas scene reads from the active theme's role variables. A new surface that hardcodes a hex will break on five of the six themes.

**The Seven-Accent Rule.** Accents come only from the ANSI set (red, orange, yellow, green, cyan, blue, magenta). No tints, gradients or new hues; the lolcat rainbow on the name is the single exception and is generated per column in HSL.

## Typography

**Display Font:** JetBrains Mono rendered as figlet ANSI Shadow block letters
**Body Font:** JetBrains Mono (with ui-monospace, SFMono-Regular, Menlo, monospace)
**Label/Mono Font:** the same face; there is no second family

**Character:** Everything is monospace and every glyph sits on the character grid, so headings, art and prose align as they would in a terminal. Ligatures are switched off so code reads literally.

### Hierarchy
- **Display** (400, fitted to container width with a 17-22px ceiling, line-height 1.32): figlet ANSI Shadow chapter titles and the hero name. Hidden from assistive tech; a real heading carries the text.
- **Headline** (800, 1.6em, 36px line): project names, in the chapter accent.
- **Title** (800, 1.25-1.35em, 30-36px line): commit titles in the git log, certificate titles.
- **Body** (400, 15px, 24px line; 13.5px under 640px): all prose, capped at 62-72ch.
- **Label** (400, 13px, 28px line; 12px under 640px): status bar, hints.
- **Narrator** (body size, italic, muted, centred, 62ch): the story lines between chapters, written as shell comments.

### Named Rules

**The One Face Rule.** JetBrains Mono is the only family. Hierarchy comes from figlet, weight (400/700/800) and colour, never from a second typeface.

**The Grid Line Rule.** Vertical spacing is a multiple or half of the 24px line. Pane frames are computed in whole character cells against the same line, so anything that breaks the line rhythm breaks the frame.

## Layout

A single centred column, `min(1120px, 100% - 32px)` wide, sits above the fixed canvas, with 88px top padding under the 28px fixed status bar (64px on mobile). Chapters are separated by two lines; narrator lines take six lines above and four below (four and two on mobile), giving the landscape room to show between chapters.

Inside panes, content uses two-column grids with a 3ch gap: portrait plus neofetch info (380px / fluid), project copy plus ASCII screenshot (1.2fr / 1fr, alternating sides), certificates in two equal columns, contact info plus mail form (0.9fr / 1.1fr). Project panes are deliberately offset (92% right-aligned, 96%) so the stack reads as a path rather than a grid.

Horizontal spacing is in ch: 2ch pane padding (1.5ch on mobile), 1ch tab padding, 2-4ch gaps between inline items. Under 860px all two-column grids collapse to one column and the portrait drops below the info at 230px. Under 640px the status bar hides the session and clock tabs and shows only the active window's label.

## Elevation & Depth

Depth is layered, not lifted. The canvas landscape is the floor; panes float over it on a near-opaque mantle fill with one soft, wide ambient shadow that separates them from the busy character field. The canvas also clears its own characters behind panes, headings, narrator lines and the status bar, so text never competes with the scene. Text that sits directly on the scene (narrator, footer) carries a halo of the base colour.

### Shadow Vocabulary
- **Pane float** (`box-shadow: 0 18px 48px -18px rgb(0 0 0 / 0.5)`): every pane.
- **Menu drop** (`box-shadow: 0 12px 32px -8px rgb(0 0 0 / 0.45)`): the theme menu under the status bar.
- **Screen inset** (`box-shadow: inset 0 0 0 1px color-mix(muted 30%), 0 10px 30px -12px rgb(0 0 0 / 0.5)`): the ASCII screenshot well inside project panes.
- **Base halo** (`text-shadow: 0 0 12px bg, 0 0 4px bg`): text set directly on the canvas.

### Named Rules

**The Clear-the-Field Rule.** Anything readable sits on mantle or on a cleared region of the canvas. Never place body text over live landscape characters.

## Shapes

Square everywhere (0px). Form is drawn with characters: panes are framed with single-line box drawing, certificates with double-line box drawing, and the frame is recomputed in whole cells so corners always meet. Pane titles knock out the top rule on a mantle chip; a right-aligned meta title does the same. Tags are wrapped in muted square brackets, the primary action in `[ ]`, inputs are a single dashed underline. Images never appear as images; photos and screenshots are converted to ASCII and printed in.

## Components

### Buttons
Blocky and terminal-literal: a filled cell of text, like a selected menu line.
- **Shape:** square (0px), 32px tall, 1ch horizontal padding, bold.
- **Primary:** green fill, base-colour text, label wrapped in `[ ]` with a trailing `⏎`.
- **Hover / Focus:** fill shifts to yellow, the arrow nudges 3px right; active presses down 1px. Focus is the global 2px dashed yellow outline at 3px offset.
- **Disabled:** surface fill, muted text, progress cursor; a rotating `| / - \` spinner sits beside it while sending.

### Links
- **Text links:** blue with a dotted underline at 4px offset; hover turns cyan with a solid underline. Long URLs wrap anywhere.
- **Path links** (`~/github`, `ls` entries, hero links): blue, no underline; hover inverts to a blue fill with base text.

### Tags
- **Style:** cyan text in muted `[ ]` brackets, no fill, 1.5ch apart.

### Panes (signature)
A tmux pane. Mantle fill at 97%, box-drawing frame in muted at 45%, which turns green on hover or focus-within. Title chip top-left in bold fg, optional meta chip top-right in muted (`80×24`, the stack, `main`). Content usually opens with a typed shell prompt: `juan` green bold, `@` muted, host blue bold, path cyan, command typed in.

### Inputs / Fields
- **Style:** transparent, no box, a 1px dashed underline in the frame colour; label in bold magenta in a 10ch column (stacked under 640px). Caret is green.
- **Focus:** underline turns solid green, label turns green.
- **Error:** red text below the form.

### Navigation
A fixed tmux status bar, 28px, mantle with a faint muted rule. Left: green session tab `[juan]`, then numbered window tabs (`0:perfil`) in muted, active tab filled magenta with bold base text and a `*`. Right: theme picker (yellow square dot plus theme name, opening a menu with swatch strips), ES/EN toggle with a green underline on the active language, blue clock tab. Window tabs scroll horizontally on small screens.

### Figlet heading (signature)
Chapter titles in ANSI Shadow, fitted to the container width, coloured by the chapter accent and printed in left to right with a stepped clip reveal. The hero name uses lolcat: each column takes its own hue and the rainbow drifts slowly.

### ASCII image (signature)
Photos and screenshots converted to coloured characters on a crosshair cursor, printed in with a scanline reveal. Screenshots sit in a dark inset well.

### Typewriter text
Prose and commands type in when they scroll into view, with a full-height blinking block caret. Space is reserved by the hidden full text, so layout never shifts while typing. Reduced motion shows the full text at once.

## Do's and Don'ts

### Do:
- **Do** read every colour from the theme role variables so all six palettes, and the canvas scene, recolour together.
- **Do** keep spacing on the 24px line and in ch units; size new panes so the box-drawing frame lands on whole cells.
- **Do** express a new section as a real shell idiom inside a pane, opened by a typed prompt.
- **Do** give each chapter one ANSI accent and use it for its figlet heading and titles.
- **Do** honour reduced motion: typing completes instantly, print-in is skipped, the lolcat drift and the canvas wind stop.
- **Do** convert any new photo or screenshot to ASCII rather than showing the raster.

### Don't:
- **Don't** add a second typeface, rounded corners, or CSS borders where a box-drawing frame belongs.
- **Don't** put body text directly over live canvas characters; it goes on a pane or a cleared region with the base halo.
- **Don't** use red as the fill of a primary action.
- **Don't** build card grids; content belongs in panes that read as terminal output.
- **Don't** fall back to static green-on-black; the world is the full themed palette.
