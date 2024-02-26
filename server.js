const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();

// Permitir solicitações de origens diferentes usando CORS | Allow requests from different sources using CORS
app.use(cors());

app.get("/api/scrape", async (req, res) => {
  // Guardando na variável a keyword que foi enviada como requisição | Storing the keyword that was sent in the variable 
  const keyword = req.query.keyword;
  
  // Requisição à Amazon | Amazon request
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Referer': 'https://www.amazon.com.br/',
    'Connection': 'keep-alive'
  }
  const response = await axios.get(`https://www.amazon.com.br/s?k=${keyword}`, { headers });

  // Extração dos dados | Data extraction
  const $ = cheerio.load(response.data);
  const products = $(".s-result-item");

  // Formatação dos dados | Data formatting
  let formattedProducts = [];
  products.each((index, product) => {
    const title = $(product).find("h2 a span").text().trim();
    const rating = $(product).find(".a-icon-alt").text().replace(/[^0-9.]/g, "").trim();
    const reviews = $(product).find(".a-link-normal  .a-size-base").text().replace(/[^0-9]/g, "").trim();
    const image = $(product).find(".s-image").attr("src");
    if(title){
      formattedProducts.push({ title, rating, reviews, image });
    }
  });

  // Resposta da API | API response
  res.json({metadata:{
    link: `https://www.amazon.com.br/s?k=${keyword}`,
  }, formattedProducts});
});

app.listen(3333, () => {
  console.log("server running on port 3333 🚀");
});
