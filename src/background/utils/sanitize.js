// Minimal escaping and sanitization helpers for the extension.
// Use textContent instead of innerHTML where possible.

/**
 * Escape a string for safe insertion into the DOM where innerHTML would be used.
 * This is a minimal utility and not a replacement for a full sanitizer like DOMPurify.
 * Use when you must insert HTML, otherwise prefer `textContent`.
 * @param {string} str
 * @returns {string}
 */
export function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Sanitize text by stripping control characters and trimming.
 * This is safe for user-facing text that should be shown raw.
 * @param {string} text
 * @returns {string}
 */
export function sanitizeText(text) {
  if (text == null) return '';
  return String(text).replace(/[\u0000-\u001f\u007f-\u009f]/g, ' ').trim();
}
