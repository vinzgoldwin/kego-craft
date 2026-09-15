# KEGO portfolio video

24 seconds, 1080 × 1920, 30 fps. Built and rendered with HyperFrames 0.8.40.

The opening is an actual browser capture of the website’s K–E–G–O animation. The hero and portfolio carousel are also real site footage. The services and contact are adapted from existing website assets for vertical-video readability. No narration. The soundtrack is original procedural audio.

## Preview and render

Requires Node.js 22 or newer, Chrome/Chromium and FFmpeg.

```sh
npm install
npm run dev
npm run check
npm run render
```

The output is `renders/kego-portfolio-mobile.mp4`. `index.html` is the editable HyperFrames timeline; `assets/website.mp4` is the captured website footage. The website’s application code is unchanged.

Source website commit: `0040158b409314bef1685f1bba6b6fa28c86f1a6`.
