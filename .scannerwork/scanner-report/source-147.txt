const colors: any = {
  white: "#fff",
  reds: ["#bf2600", "#de350b", "#ff5630", "#ffbdad", "#ffebe5"],
  oranges: ["#ff8b00", "#ffab00", "#fff0b3", "#fffae6"],
  blues: ["#262a34", "#172b4d", "#42526d", "#6b778b", "#7a8699", "#172B4D"],
  new_blues: ["#E0F4FF", "#7F7FB5", "#4C4A96", "#3399FF", "#000066", "#172B4D"],
  yellow: ["#FFCC00"],
  greens: ["#36b37e6e", "#00875a", "#36b37e", "#abf5d1", "#e2ffee"],
  grays: [
    "#262626",
    "#c1c7d0",
    "#ebecf0",
    "#eff0f2",
    "#f4f5f7",
    "#6B778C",
    "#F4F5F7"
  ],
  black: ["#000", "#7A869A", "#172B4D"]
};

colors.highlight = colors.greens[0];

colors.default = colors.grays[0];
colors.primary = colors.new_blues[4];
colors.secondary = colors.yellow[0];
colors.success = colors.greens[1];
colors.danger = colors.reds[1];
colors.warning = colors.oranges[0];

colors.light = {
  default: colors.grays[2],
  primary: colors.new_blues[2],
  success: colors.greens[2],
  danger: colors.reds[2],
  warning: colors.oranges[1]
};

colors.lighter = {
  default: colors.grays[3],
  primary: colors.new_blues[1],
  success: colors.greens[3],
  danger: colors.reds[3],
  warning: colors.oranges[2]
};

colors.lightest = {
  default: colors.grays[4],
  primary: colors.new_blues[0],
  success: colors.greens[4],
  danger: colors.reds[4],
  warning: colors.oranges[3]
};

colors.bg = colors.new_blues[0];

export default colors;
