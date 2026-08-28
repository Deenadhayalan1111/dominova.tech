/**
 * useCustomCursor — DISABLED
 *
 * Custom cursor overlay has been disabled to ensure the native browser
 * cursor is always visible. The hook is kept as a no-op so that existing
 * imports in App.tsx continue to work without modification.
 *
 * To re-enable in the future, restore the cursor overlay logic here AND
 * restore the body.has-custom-cursor { cursor: none } rule in index.css.
 * Ensure you test that the native cursor remains accessible before shipping.
 */
export function useCustomCursor() {
  // No-op: custom cursor disabled. Native system cursor is always shown.
  return {};
}
