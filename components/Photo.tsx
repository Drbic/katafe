import type { PhotoData } from "@/lib/content";

// Bez `src` se zobrazí placeholder; alt zůstává pro pozdější dosazení fotografie.
export default function Photo({ photo, priority = false }: { photo: PhotoData; priority?: boolean }) {
  if (!photo.src) return <div className="photo photo--empty" role="img" aria-label={photo.alt} />;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="photo" src={photo.src} alt={photo.alt} loading={priority ? "eager" : "lazy"} style={{ objectPosition: photo.position }} />
  );
}
