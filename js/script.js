

let map; // グローバル変数

document.addEventListener("DOMContentLoaded", () => {
    // 地図を初期化
    map = L.map("map").setView([35.681236, 139.767125], 2); // 東京中心ズームレベル
  
    // OpenStreetMapのタイルレイヤーを追加
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  
    // サンプルマーカー
    L.marker([35.6693, 139.7020])
      .addTo(map)
      .bindPopup("原宿")
      .openPopup();

    // ニュース処理を呼び出す（news.jsの関数）
  loadNewsAndAddMarkers();
  });
  


