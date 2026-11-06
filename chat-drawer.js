// The embed uses an open shadow root, so page styles cannot reach its panel.
// Apply these overrides after the asynchronous widget has mounted.
(() => {
  const host = document.querySelector('[data-chat-widget-id]');
  if (!host) return;

  function styleDrawer() {
    const root = host.shadowRoot;
    if (!host.hasAttribute('data-trestelo-chat-mounted') || !root) return false;
    if (root.querySelector('[data-chat-drawer-style]')) return true;

    const style = document.createElement('style');
    style.setAttribute('data-chat-drawer-style', '');
    style.textContent = `
      .tr-chat-panel {
        inset: 0 0 0 auto;
        width: min(440px, 100vw);
        height: 100vh;
        height: 100dvh;
        max-height: none;
        border-radius: 0;
        border-width: 0 0 0 1px;
        box-shadow: -12px 0 40px rgba(15, 23, 42, 0.18);
        transform: translateX(100%);
      }
      .tr-chat-panel--open {
        transform: translateX(0);
        animation: chat-drawer-enter 220ms ease-out;
      }
      .tr-chat-header, .tr-chat-composer, .tr-chat-notice {
        flex-shrink: 0;
      }
      .tr-chat-header {
        padding-top: max(14px, env(safe-area-inset-top));
      }
      .tr-chat-composer {
        padding-bottom: max(10px, env(safe-area-inset-bottom));
      }
      @keyframes chat-drawer-enter {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
      }
      @media (max-width: 480px) {
        .tr-chat-panel--open {
          inset: 0;
          width: 100vw;
          border: 0;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .tr-chat-panel { transition: none; }
        .tr-chat-panel--open { animation: none; }
      }
    `;
    root.appendChild(style);
    return true;
  }

  if (styleDrawer()) return;
  const observer = new MutationObserver(() => {
    if (styleDrawer()) observer.disconnect();
  });
  observer.observe(host, { attributes: true, attributeFilter: ['data-trestelo-chat-mounted'] });
})();
