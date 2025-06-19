

//OpenWeather API
const API_KEY = '';  //APIキー
const units = 'metric'; // 摂氏（metric）で取得
const lang = 'ja';

const cities = [
    { name: '東京', apiName: 'Tokyo' },
    { name: 'ニューヨーク', apiName: 'New York' },
    { name: 'ロンドン', apiName: 'London' },
    { name: 'パリ', apiName: 'Paris' },
    { name: 'エルサレム', apiName: 'Jerusalem' },
    { name: 'キーウ', apiName: 'Kyiv' }
  ];

  // DOM要素取得
const weatherContainer = document.querySelector('.weather-items');

// 各都市の天気取得表示
async function fetchAllWeather() {
    
  
    for (const city of cities) {
      await fetchWeather(city);
    }
  }
  
  // 単一都市の天気取得表示
  async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city.apiName)}&appid=${API_KEY}&units=${units}&lang=${lang}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`${city.name} の天気取得に失敗しました`);
      const data = await response.json();
      displayWeather(city.name, data);
    } catch (error) {
      console.error('エラー:', error);
      weatherContainer.innerHTML += `<p>${city.name} の天気情報を取得できませんでした。</p>`;
    }
  }

// 天気情報をHTMLに表示
function displayWeather(displayName,data) {
  const temp = data.main.temp;
  const weather = data.weather[0].description;
  const icon = data.weather[0].icon;

  const html = `
    <div class="weather-item">
      <h3>${displayName}</h3>
      <p><img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${weather}"> ${weather}</p>
      <p>気温: ${temp}℃</p>
    </div>
  `;

  weatherContainer.innerHTML += html;
}

// 初期表示
fetchAllWeather();
