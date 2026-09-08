// Both viewports preserve the original approved artwork without redrawing it.
export default function BeaverArtwork({ pose = "standing" }: { pose?: "standing" | "celebrating" }) {
  const standing = pose === "standing";
  return (
    <svg
      className="beaver-scene"
      viewBox={standing ? "736 624 374 410" : "1108 726 340 296"}
      width={standing ? 374 : 340}
      height={standing ? 410 : 296}
      role="img"
      aria-label={standing ? "The lilac beaver holding a website with a friendly, open-eyed expression" : "The lilac beaver smiling beside a completed website"}
    >
      <image
        href="/mascot/beaver-approved-source.png"
        width="1448"
        height="1086"
      />
    </svg>
  );
}
