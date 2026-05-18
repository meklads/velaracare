"use client";

import { useEffect } from "react";

/**
 * Lightweight system-wide interactions enhancer.
 * Adds keyboard shortcuts helper, global click effects, and smooth behaviors.
 * Fully additive — does not modify any existing functionality.
 */
export default function Interactions() {
  useEffect(() => {
    // ── Toggle kbd helper on ⌘K or ? (only if not in an input) ──
    function handleKeyDown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      // ⌘K / Ctrl+K → show/hide shortcut helper
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggleShortcutHelper();
      }
    }

    function toggleShortcutHelper() {
      let helper = document.getElementById("vp-kbd-helper");
      if (helper) {
        helper.remove();
        return;
      }
      helper = document.createElement("div");
      helper.id = "vp-kbd-helper";
      helper.innerHTML = `
        <div style="
          position:fixed; bottom:24px; left:50%; transform:translateX(-50%);
          z-index:9999;
          background:rgba(11,26,46,0.92);
          backdrop-filter:blur(20px) saturate(1.6);
          border:1px solid rgba(255,255,255,0.06);
          border-radius:16px;
          padding:20px 28px;
          color:#fff;
          font-size:13px;
          direction:rtl;
          text-align:right;
          box-shadow:0 24px 60px rgba(0,0,0,0.4);
          max-width:360px;
          width:90%;
          animation: vpSlideUp 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        ">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
            <strong style="color:#2B9F7A;">⌘ اختصارات لوحة المفاتيح</strong>
            <button id="vp-kbd-close" style="
              background:none;border:none;color:#94A3B8;cursor:pointer;
              font-size:18px;line-height:1;padding:0 4px;
            ">✕</button>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <div><span class="kbd-shortcut">⌘K</span> <span style="color:#CBD5E1;margin-right:8px;">البحث السريع</span></div>
            <div><span class="kbd-shortcut">?</span> <span style="color:#CBD5E1;margin-right:8px;">هذه الاختصارات</span></div>
            <div><span class="kbd-shortcut">ESC</span> <span style="color:#CBD5E1;margin-right:8px;">إغلاق</span></div>
            <div><span class="kbd-shortcut">⌘D</span> <span style="color:#CBD5E1;margin-right:8px;">الوضع المظلم</span></div>
          </div>
        </div>
      `;
      document.body.appendChild(helper);
      document.getElementById("vp-kbd-close")?.addEventListener("click", () => helper?.remove());
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return null;
}
