import { Injectable } from '@angular/core';
import { SCRIPTS } from '../../constants/scripts-constants';
interface Scripts {
  name: string;
  src: string;
  wait?: string;
}
export const ScriptStore: Scripts[] = [
  { name: SCRIPTS.THEME_HELPERS, src: '../assets/theme/assets/vendor/js/helpers.js' },
  { name: SCRIPTS.THEME_CONFIG, src: '../assets/theme/assets/js/config.js' },
  { name: SCRIPTS.JQUERY, src: '../assets/theme/assets/vendor/libs/jquery/jquery.js' },
  { name: SCRIPTS.POPPER, src: '../assets/theme/assets/vendor/libs/popper/popper.js' },
  { name: SCRIPTS.BOOTSTRAP, src: '../assets/theme/assets/vendor/js/bootstrap.js' },
  { name: SCRIPTS.PERFECT_SCROOL_BAR, src: '../assets/theme/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js' },
  { name: SCRIPTS.THEME_MENU, src: '../assets/theme/assets/vendor/js/menu.js' },
  { name: SCRIPTS.THEME_MAIN, src: '../assets/theme/assets/js/main.js', wait: SCRIPTS.THEME_MENU},
  { name: SCRIPTS.THEME_BUTTON, src: 'https://buttons.github.io/buttons.js' },
];

@Injectable({
  providedIn: 'root'
})
export class ScriptsService {

  private scripts: any = {};

  public constructor() {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        wait: script.wait,
        src: script.src
      };
    });
  }

  public async load(...scripts: string[]) {
    const promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return await Promise.all(promises);
  }

  public loadScript(name: string) {
    return new Promise((resolve, reject) => {
      // resolve if already loaded
      if (this.scripts[name].loaded) {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      } else {
        // load script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        script.onload = () => {
          this.scripts[name].loaded = true;
          //console.log(`${name} Loaded.`);
          resolve({ script: name, loaded: true, status: 'Loaded' });
        };
        script.onerror = (error: any) => resolve({ script: name, loaded: false, status: 'Loaded' });
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    });
  }

  public async loadMenuScripts() {
    return await Promise.all([
      this.loadScript(SCRIPTS.THEME_HELPERS),
      this.loadScript(SCRIPTS.THEME_CONFIG),
      this.loadScript(SCRIPTS.JQUERY),
      this.loadScript(SCRIPTS.POPPER),
      this.loadScript(SCRIPTS.BOOTSTRAP),
      this.loadScript(SCRIPTS.PERFECT_SCROOL_BAR),
      await this.loadScript(SCRIPTS.THEME_MENU),
      this.loadScript(SCRIPTS.THEME_MAIN),
      this.loadScript(SCRIPTS.THEME_BUTTON),
    ]);
  }
}
