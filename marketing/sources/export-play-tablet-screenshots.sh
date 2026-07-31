#!/usr/bin/env sh
# Re-exports every PapaFix_PLAY_Tablet_*.html in this folder to a 1920x1080 PNG in
# ../play-store/. Run it after `node build-play-tablet-screenshots.js`.
#
# Chrome needs absolute paths for both --screenshot and the page, so this resolves
# them; a relative path silently writes nothing.
set -e

CHROME="${CHROME:-/c/Program Files/Google/Chrome/Application/chrome.exe}"
SRC="$(cd "$(dirname "$0")" && pwd)"
OUT="$(cd "$SRC/../play-store" && pwd)"

winpath() { printf '%s' "$1" | sed 's|^/\([a-zA-Z]\)/|\1:/|'; }

for f in "$SRC"/PapaFix_PLAY_Tablet_*.html; do
  n=$(basename "$f" .html)
  "$CHROME" --headless --disable-gpu --hide-scrollbars \
    --force-device-scale-factor=1 --window-size=1920,1080 \
    --screenshot="$(winpath "$OUT/$n.png")" "$(winpath "$f")" >/dev/null 2>&1
  echo "  $n.png"
done
echo "done -> $OUT"
