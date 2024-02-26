const keywordElement = document.getElementById("keyword")
const buttonElement = document.getElementById("search")
const resultsElement = document.getElementById("results")

buttonElement.addEventListener("click", async () => {
  // Guardar na variável qual palavra foi digitada | Save which word was typed in the variable
  const keyword = keywordElement.value
  // Requisição à API | API request
  const response = await fetch(`http://localhost:3333/api/scrape?keyword=${keyword}`)
  const products = await response.json()
  // Limpando da tela o que foi mostrado anteriormente | Wiping what was previously shown from the screen
  resultsElement.innerHTML = ""
  const producstList = []
  // Exibindo os resultados na tela | Displaying the results on the screen
  products.forEach(product => {
    producstList.push( `
      <div class="product-card">
        <div class="image-container">
          <img src="${product.image}" alt="Imagem do produto" />
        </div>
        <h3>${product.title}</h3>
        <p>Avaliação: 🌟 ${product.rating}</p>
        <p>Número de avaliações: ${product.reviews}</p>
      </div>
    `)
  });

  list.forEach(product => {
    const item = document.createElement(product);
    resultsElement.appendChild(item);
  });
}) 
