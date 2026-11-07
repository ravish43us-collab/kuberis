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
      :host {
        --tr-chat-primary: #d71920;
        --tr-chat-primary-hover: #a81219;
        --tr-chat-primary-fg: #fff;
        --tr-chat-bg: #fffdfb;
        --tr-chat-fg: #171515;
        --tr-chat-muted-fg: #6f6865;
        --tr-chat-border: #e5d9d2;
        --tr-chat-surface: #f7f3ef;
        --tr-chat-inbound-bg: #7f1116;
        --tr-chat-inbound-fg: #fff;
        --tr-chat-assistant-bg: #fffdfb;
        --tr-chat-assistant-fg: #171515;
        --tr-chat-shadow: 0 20px 65px rgba(70,25,25,.2);
        --tr-chat-font: Manrope, Arial, sans-serif;
      }
      .tr-chat-panel {
        inset: auto 24px 24px auto;
        width: min(420px, calc(100vw - 48px));
        height: min(680px, calc(100vh - 48px));
        height: min(680px, calc(100dvh - 48px));
        max-height: none;
        border-radius: 28px;
        border: 1px solid var(--tr-chat-border);
        box-shadow: var(--tr-chat-shadow);
        transform: translateY(16px);
      }
      .tr-chat-panel--open {
        transform: translateY(0);
        animation: chat-drawer-enter 220ms ease-out;
      }
      .tr-chat-header, .tr-chat-composer, .tr-chat-notice {
        flex-shrink: 0;
      }
      .tr-chat-header {
        padding: 24px;
        background: linear-gradient(125deg, #a3151d, #620e14);
        border-bottom: 1px solid rgba(255,255,255,.12);
      }
      .tr-chat-header__title {
        font-family: 'Cormorant Garamond', Georgia, serif;
        font-size: 28px;
        font-weight: 500;
        letter-spacing: -.4px;
      }
      .tr-chat-header__close {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background: rgba(255,255,255,.12);
      }
      .tr-chat-transcript {
        padding: 24px 20px;
        gap: 14px;
        background: radial-gradient(ellipse at top right, #f0e2dc, transparent 65%), #f7f3ef;
        scrollbar-width: thin;
        scrollbar-color: #d8cec7 transparent;
      }
      .tr-chat-message {
        padding: 13px 16px;
        line-height: 1.65;
        border-radius: 20px;
      }
      .tr-chat-message--assistant {
        border: 1px solid #e9dfd8;
        border-bottom-left-radius: 6px;
        box-shadow: 0 3px 10px rgba(70,25,25,.03);
      }
      .tr-chat-message--inbound { border-bottom-right-radius: 6px; }
      .tr-chat-message--greeting {
        background: #fffdfb;
        color: #4c3835;
        font-style: normal;
      }
      .tr-chat-launcher {
        width: 60px;
        height: 60px;
        border: 1px solid rgba(255,255,255,.5);
        background: linear-gradient(135deg, #d71920, #7f1116);
      }
      .tr-chat-composer {
        padding: 16px;
        gap: 10px;
        align-items: flex-end;
        padding-bottom: max(16px, env(safe-area-inset-bottom));
      }
      .tr-chat-composer__input {
        min-width: 0;
        min-height: 46px;
        border-radius: 16px;
        padding: 12px 14px;
        font: inherit;
        font-size: 13px;
        line-height: 1.5;
      }
      .tr-chat-composer__input:focus {
        outline: none;
        border-color: #d71920;
        box-shadow: 0 0 0 3px rgba(215,25,32,.1);
      }
      .tr-chat-composer__send {
        width: 46px;
        height: 46px;
        flex-shrink: 0;
        border-radius: 15px;
      }
      .tr-chat-composer__send:disabled { opacity: .45; }
      .tr-chat-launcher:focus-visible, .tr-chat-composer__send:focus-visible {
        outline: 2px solid #7f1116;
        outline-offset: 4px;
      }
      @keyframes chat-drawer-enter {
        from { transform: translateY(16px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      @media (max-width: 480px) {
        .tr-chat-panel--open {
          inset: auto 10px 10px;
          width: calc(100vw - 20px);
          height: calc(100dvh - 20px);
          border-radius: 24px;
        }
        .tr-chat-header { padding: 20px; }
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
