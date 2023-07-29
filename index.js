const url =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en";

async function getCoinData() {
  const data = await fetch(url);
  const result = await data.json();
  return result;
}

gridView();

async function gridView() {
  const g_toggle = document.getElementById("grid_toggle");
  g_toggle.className = "underline grid_view";

  const l_toggle = document.getElementById("list_toggle");
  l_toggle.className = "list_view";

  const container = document.getElementById("container");
  container.innerHTML = "";

  const grid_div = document.createElement("div");
  grid_div.className = "grid_container";

  result = await getCoinData();

  for (let i = 0; i < 10; i++) {
    const {
      id,
      name,
      image,
      current_price,
      market_cap,
      price_change_percentage_24h,
      total_volume,
    } = result[i];

    const crypto_card = document.createElement("div");
    crypto_card.className = "card";

    crypto_card.innerHTML = `
      <div class="card_top">
        <div class="image">
          <img
            src=${image}
            width="70px"
            height="70px"
          />
        </div>
        <div class="name">
          <p class="name1">${id}</p>
          <p class="name2">${name}</p>
        </div>
      </div>
      <div class="percent">${price_change_percentage_24h}</div>
      <div class="value">${current_price}</div>
      <div class="details">
        <p class="volume">Total Volume: ${total_volume}</p>
        <p class="cap">Market Cap: ${market_cap}</p>
      </div>`;

    grid_div.appendChild(crypto_card);
  }

  container.appendChild(grid_div);
}

async function getListView() {
  const container = document.getElementById("container");
  container.innerHTML = "";

  const l_toggle = document.getElementById("list_toggle");
  l_toggle.className = "underline list_view";

  const g_toggle = document.getElementById("grid_toggle");
  g_toggle.className = "grid_view";

  const list_div = document.createElement("TABLE");
  list_div.className = "list_container";

  //   console.log(grid_div);

  result = await getCoinData();

  for (let i = 0; i < 10; i++) {
    const {
      id,
      name,
      image,
      current_price,
      market_cap,
      price_change_percentage_24h,
      total_volume,
    } = result[i];

    const crypto_row = document.createElement("tr");
    crypto_row.className = "crypto_row";

    crypto_row.innerHTML = `
    <td style="width: 15%">
    <div class="card_left">
      <div class="image">
        <img src="${image}" width="70px" height="70px" />
      </div>
      <div class="list_name">
        <p class="list_name1">${id}</p>
        <p class="list_name2">${name}</p>
      </div>
    </div>
  </td>
  <td style="width: 15%">
    <div class="list_percent">${price_change_percentage_24h}</div>
  </td>
  <td style="width: 15%">
    <div class="list_value">${current_price}</div>
  </td>
  <td style="width: 20%">
    <div class="list_details">Total Volume: ${total_volume}</div>
  </td>
  <td style="width: 20%"><div>Market Cap: ${market_cap}</div></td>`;

    list_div.appendChild(crypto_row);
  }

  container.appendChild(list_div);
}

const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");

image1.addEventListener("click", () => {
  image1.style.opacity = "0";
  image2.style.opacity = "1";
});

image2.addEventListener("click", () => {
  image1.style.opacity = "1";
  image2.style.opacity = "0";
});
