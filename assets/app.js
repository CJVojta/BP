'use strict';
document.addEventListener('submit', (event) => {
    const form = event.target;
    if (form.dataset.confirm && !window.confirm(form.dataset.confirm)) {
        event.preventDefault();
        return;
    }
    // Ochrana proti dvojkliku; hlavní validace a kontrola kapacity probíhá na serveru.
    for (const button of form.querySelectorAll('button[type="submit"], button:not([type])')) {
        button.disabled = true;
    }
});

// The navigation remains visible without JavaScript.
document.documentElement.classList.add('js');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#main-nav');
if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        const open = menuToggle.getAttribute('aria-expanded') !== 'true';
        menuToggle.setAttribute('aria-expanded', String(open));
        menuToggle.querySelector('.sr-only').textContent = open ? 'Zavřít navigaci' : 'Otevřít navigaci';
        mainNav.classList.toggle('is-open', open);
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.querySelector('.sr-only').textContent = 'Otevřít navigaci';
            mainNav.classList.remove('is-open');
            menuToggle.focus();
        }
    });
}
