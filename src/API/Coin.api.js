import axios from "axios";
export default axios.create({
    baseURL:
    // 'https://api.coingecko.com/api/v3/coins/'
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false'
});