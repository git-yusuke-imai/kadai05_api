

const OPENCAGE_API_KEY = ""; // OpenCageAPI
const NEWSAPI_KEY = ""; // NewsAPIAPI


function get48HoursAgoISO() {
    const date = new Date();
    date.setHours(date.getHours() - 48);
    return date.toISOString();
  }

async function fetchRecentNews() {

  const from = get48HoursAgoISO();
  const keywords = ["アメリカ", "東京", "ウクライナ", "イスラエル" ]; //地名
  const query = keywords.join(" OR "); // OR検索
  const url = `https://newsapi.org/v2/everything?q=${query}&from=${from}&sortBy=publishedAt&apiKey=${NEWSAPI_KEY}&pageSize=10`;


  //console.log("fetch URL:", url);


  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.status !== "ok") throw new Error(data.message);
    //console.log("取得したニュース:", data.articles);

    return data.articles;
  } catch (e) {
    //console.error("ニュース取得エラー:", e);
    return [];
  }
}

//地名リスト
const cityList = ["Tokyo",  "Jerusalem", 
    "Tel Aviv", "New York", "Paris", "London",  "東京", 
    "イスラエル", "イラン", "テヘラン", "エルサレム", "テルアビブ", "ウクライナ", "アメリカ", "ワシントン", "ロサンゼルス" ];


function extractCity(text) {
  for (const city of cityList) {
    if (text.includes(city)) {
        //console.log(`都市名検出: ${city}`);
        return city;
    }
  }
  //console.log("都市名が見つかりませんでした:", text);
  return null;
}

// 地名から緯度経度取得
async function geocodeCity(city) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=${OPENCAGE_API_KEY}&language=ja`;

  
    try {
      const res = await fetch(url);
      const data = await res.json();
  
      if (!data.results || data.results.length === 0) {
        console.warn("ジオコーディング結果なし:", city);
        return null;
      }
  
      const { lat, lng } = data.results[0].geometry;
      return [lat, lng];
    } catch (err) {
      console.error("ジオコーディング失敗:", err);
      return null;
    }
  }
  
  

// ニュースを地図にマッピング
async function loadNewsAndAddMarkers() {
    const articles = await fetchRecentNews("日本");
  
    for (const article of articles) {
      const city = extractCity(article.title + " " + article.description);
      if (!city) continue;
  
      const latlng = await geocodeCity(city);
      if (!latlng) continue;
  
      //console.log("マーカー追加:", latlng, article.title);
  
      L.marker(latlng)
        .addTo(map)
        .bindPopup(`<b>${city}</b><br>${article.title}<br><a href="${article.url}" target="_blank">記事へ</a>`);
    }
  }
   

  
