const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

app.get("/api/scrape", async (req, res) => {
  const keyword = req.query.keyword;
  // Requisição à Amazon | Amazon request
  const response = await axios.get(`https://www.amazon.com.br/s?k=${keyword}`);
  // Extração dos dados | Data extraction
  const $ = cheerio.load(response.data);
  const products = $(".s-result-item");
  // Formatação dos dados | Data formatting
  const formattedProducts = products.map((product) => ({
    title: $(product).find(".a-size-medium.a-color-base.a-text-normal").text(),
    rating: $(product).find(".a-icon-alt").text().replace(/[^0-9.]/g, ""),
    reviews: $(product).find(".a-size-small.a-color-secondary").text().replace(/[^0-9]/g, ""),
    image: $(product).find(".s-image").attr("src"),
  }));
  // Resposta da API | API response
  res.json(formattedProducts);
});

app.listen(3333, () => {
  console.log("server running on port 3333 🚀");
});
