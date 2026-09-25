/* eslint-disable @next/next/no-img-element */
// Assety jsou průhledné PNG fyzicky oříznuté na viditelný obsah, takže width: 100% lícuje s hranami.
export function Symbol({ size = 49 }: { size?: number }) {
  return <img src="/symbol.png" alt="" width={size} height={Math.round((size * 991) / 969)} />;
}

export function Wordmark({ className }: { className?: string }) {
  return <img className={className} src="/wordmark.png" alt="KATAFE" width={1985} height={236} />;
}
