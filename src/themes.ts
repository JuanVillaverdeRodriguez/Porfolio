// Paletas de terminal famosas. Todo el sitio (incluido el paisaje ASCII) se tiñe con ellas.
export type Theme = {
  id: string;
  name: string;
  light: boolean;
  bg: string;
  mantle: string;
  surface: string;
  fg: string;
  muted: string;
  red: string;
  orange: string;
  yellow: string;
  green: string;
  cyan: string;
  blue: string;
  magenta: string;
};

export const themes: Theme[] = [
  {
    id: "mocha", name: "catppuccin-mocha", light: false,
    bg: "#1e1e2e", mantle: "#181825", surface: "#313244", fg: "#cdd6f4", muted: "#a6adc8",
    red: "#f38ba8", orange: "#fab387", yellow: "#f9e2af", green: "#a6e3a1", cyan: "#94e2d5", blue: "#89b4fa", magenta: "#cba6f7",
  },
  {
    id: "tokyo", name: "tokyo-night", light: false,
    bg: "#1a1b26", mantle: "#16161e", surface: "#292e42", fg: "#c0caf5", muted: "#a9b1d6",
    red: "#f7768e", orange: "#ff9e64", yellow: "#e0af68", green: "#9ece6a", cyan: "#7dcfff", blue: "#7aa2f7", magenta: "#bb9af7",
  },
  {
    id: "gruvbox", name: "gruvbox-dark", light: false,
    bg: "#282828", mantle: "#1d2021", surface: "#3c3836", fg: "#ebdbb2", muted: "#bdae93",
    red: "#fb4934", orange: "#fe8019", yellow: "#fabd2f", green: "#b8bb26", cyan: "#8ec07c", blue: "#83a598", magenta: "#d3869b",
  },
  {
    id: "dracula", name: "dracula", light: false,
    bg: "#282a36", mantle: "#21222c", surface: "#44475a", fg: "#f8f8f2", muted: "#c5c8de",
    red: "#ff5555", orange: "#ffb86c", yellow: "#f1fa8c", green: "#50fa7b", cyan: "#8be9fd", blue: "#bd93f9", magenta: "#ff79c6",
  },
  {
    id: "nord", name: "nord", light: false,
    bg: "#2e3440", mantle: "#242933", surface: "#3b4252", fg: "#eceff4", muted: "#d8dee9",
    red: "#bf616a", orange: "#d08770", yellow: "#ebcb8b", green: "#a3be8c", cyan: "#88c0d0", blue: "#81a1c1", magenta: "#b48ead",
  },
  {
    id: "latte", name: "catppuccin-latte", light: true,
    bg: "#eff1f5", mantle: "#e6e9ef", surface: "#ccd0da", fg: "#4c4f69", muted: "#5c5f77",
    red: "#d20f39", orange: "#fe640b", yellow: "#df8e1d", green: "#40a02b", cyan: "#179299", blue: "#1e66f5", magenta: "#8839ef",
  },
];

export const defaultTheme = (): Theme => {
  let stored: string | null = null;
  try { stored = localStorage.getItem("theme"); } catch { /* sin storage */ }
  // Compatibilidad con los valores antiguos 'dark' / 'light'
  if (stored === "light") return themes.find(t => t.id === "latte")!;
  const found = themes.find(t => t.id === stored);
  if (found) return found;
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  return prefersLight ? themes.find(t => t.id === "latte")! : themes[0];
};

export const applyTheme = (t: Theme) => {
  const root = document.documentElement;
  const vars: Record<string, string> = {
    bg: t.bg, mantle: t.mantle, surface: t.surface, fg: t.fg, muted: t.muted,
    red: t.red, orange: t.orange, yellow: t.yellow, green: t.green, cyan: t.cyan, blue: t.blue, magenta: t.magenta,
  };
  for (const [k, v] of Object.entries(vars)) root.style.setProperty(`--${k}`, v);
  root.style.colorScheme = t.light ? "light" : "dark";
  root.dataset.theme = t.id;
  try { localStorage.setItem("theme", t.id); } catch { /* sin storage */ }
};
