class ThemeManager {
  constructor(config) {
    this.themes = config.themes;
    this.theme = localStorage.getItem("theme") || config.theme;
    this.switch = () => {
      if (this.theme == "light") {
        localStorage.setItem("theme", "dark");
        this.theme = "dark";
      } else {
        localStorage.setItem("theme", "light");
        this.theme = "light";
      }
      this.apply();
    };
    this.apply = () => {
      var properties = Object.keys(this.themes[this.theme]);
      properties.forEach(property => {
        document
          .querySelector(":root")
          .style.setProperty(
            `--${property}`,
            this.themes[this.theme][property]
          );
      });
      let root = document.head.querySelector("meta[name='theme-color']");
      setInterval(() => {
        let viewportWidth = Math.max(
          document.documentElement.clientWidth,
          window.innerWidth || 0
        );
        if (viewportWidth > 600) {
          root.setAttribute("content", this.themes[this.theme]["primary"]);
        } else {
          root.setAttribute("content", this.themes[this.theme]["secondary"]);
        }
      }, 100);
    };
  }
}

export default ThemeManager;