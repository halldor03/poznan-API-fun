export default function GeoportalAPI() {
  const dummy = [
    [6433366.54999848, 5809794.57977469],
    [6433379.31999848, 5809615.68977469],
    [6433380.92999848, 5809612.23977469],
    [6433383.61220873, 5809610.45163452],
    [6433384.37999848, 5809609.93977469],
    [6433390.72999848, 5809604.9497747],
    [6433414.31999848, 5809605.1697747],
    [6433462.23856299, 5809620.05608502],
    [6433487.96999848, 5809628.0497747],
  ];

  function initMap() {
    ILITEAPI?.init({
      divId: "iapi",
      width: 800,
      height: 600,
      activeGpMapId: "gp0",
      activeGpMaps: ["gp0", "gp1"],
      activeGpActions: ["pan", "fullExtent"],
      scale: 2000,
      marker: {
        x: 591920,
        y: 259048,
        scale: 2000,
        opts: {
          title: "tytu³ dymka",
          content: "dowolna treœæ",
        },
      },
    });
  }

  initMap();

  return (
    <>
      GeoportalAPI
      <div id="iapi"></div>
    </>
  );
}

// https://www.geoportal.gov.pl/documents/10179/13127/Dokumentacja+us%C5%82ugi+API++wersja+1.06/6d3dec44-935c-4822-a399-b5b5dae89abe

// http://mapy.geoportal.gov.pl/iMapLite/doc/

// https://egov.psnc.pl/node/29#biletomaty
