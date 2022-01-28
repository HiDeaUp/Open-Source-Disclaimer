/*!
 * Author:        Pierre-Henry Soria <hi@ph7.me>
 * Copyright:     (c) 2020, Pierre-Henry Soria. All Rights Reserved.
 */

const localKeyName = 'agreed18';
const strings = {
    welcome: 'Welcome!',
    site_contains_adult_materials: 'This site contains sexually-oriented adult materials which may be offensive to some viewers.',
    acknowledge_confirm_majority: 'To continue, please acknowledge and confirm you are over <span class="underline">18</span>.',
    button_over18: 'I am over 18',
    button_under18: 'I am under 18',
    footer_imprint_paragraph: 'By entering to this website, you are agreeing to the Terms of Use and Privacy Policy.',
};

class Disclaimer {
    constructor() {
        this.backgroundElement = document.getElementById('disclaimer-background');
        this.dialogElement = document.getElementById('disclaimer-dialog');

        this.dialogStatus = 0;
    }

    loadDialog() {
        if (this.dialogStatus === 0) {
            this.backgroundElement.style.opacity = '0.95';
            this.backgroundElement.style.display = 'block';
            this.dialogElement.style.display = 'block';

            this.dialogStatus = 1;
        }
    }

    disableDialog() {
        if (this.dialogStatus === 1) {
            this.dialogElement.style.display = 'none';
            this.backgroundElement.style.display = 'none';

            this.dialogStatus = 0;
        }
    }

    centerDialog() {
        const windowHeight = document.documentElement.clientHeight;
        const windowWidth = document.documentElement.clientWidth;
        const dialogHeight = parseInt(window.getComputedStyle(this.dialogElement).height);
        const dialogWidth = parseInt(window.getComputedStyle(this.dialogElement).width);

        this.dialogElement.style.position = 'absolute';
        this.dialogElement.style.top = (windowHeight / 2 - dialogHeight / 2).toString() + 'px';
        this.dialogElement.style.left = (windowWidth / 2 - dialogWidth / 2).toString() + 'px';
        this.backgroundElement.style.height = windowHeight;
    }

    isAccepted() {
        try {
            return sessionStorage.getItem(localKeyName);
        } catch (e) {
            console.log('Cannot use sessionStorage', e);
        }

        return null;
    }

    setAccepted() {
        try {
            sessionStorage.setItem(localKeyName, '1');
        } catch (e) {
            console.log('Cannot use sessionStorage', e);
        }
    }

    static generateDialog() {
        const code = `<div id="disclaimer-dialog">
      <div class="center">
      <h1>${strings.welcome}</h1>
      <p class="italic">${strings.site_contains_adult_materials}</p>
      <p class="bold">${strings.acknowledge_confirm_majority}</p>
      <p><button id="agree-over18" class="agree">${strings.button_over18}</button>
      <button id="disagree-under18" class="disagree">${strings.button_under18}</button></p>
      <p><small>${strings.footer_imprint_paragraph}</small></p>
      </div></div>
      <div id="disclaimer-background"></div>`;

        document.write(code);
    }
}
