let id = 0;
class Languages {
    constructor(name, src, hover, checked) {
        this.id = ++id;
        this.name = name;
        this.src = src;
        this.hover = hover;
        this.checked = checked;
    }
}


export const languages = [
      new Languages('English', "http://smarttv.xtream.cloud/assets/images/eng.png", true, true),
      new Languages('Português', "http://smarttv.xtream.cloud/assets/images/brazil.png", false, false),
      new Languages('Español', "http://smarttv.xtream.cloud/assets/images/spain.png", false, false),
      new Languages('Italiano', "http://smarttv.xtream.cloud/assets/images/italy.png", false, false),
      new Languages('Français', "http://smarttv.xtream.cloud/assets/images/france.png", false, false),
      new Languages('German', "http://smarttv.xtream.cloud/assets/images/germany.png", false, false),
      new Languages('Chinese', "http://smarttv.xtream.cloud/assets/images/chinese.png", false, false),
  ];