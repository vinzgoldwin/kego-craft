npx --no-install hyperframes render --fps 30 --quality high --workers 3 --video-frame-format png --output renders/kego-portfolio-mobile-v2.mp4
status=$?
printf '%s\n' "$status" > render.exit
exit "$status"
