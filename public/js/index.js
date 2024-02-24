const keywordElement = document.getElementById("keyword")
const buttonElement = document.getElementById("search")
const resultsElement = document.getElementById("results")

buttonElement.addEventListener("click", async () => {
  // Guardar na variável qual palavra foi digitada | Save which word was typed in the variable
  const keyword = keywordElement.value
  // Requisição à API | API request
  const response = await fetch(`/api/scrape?keyword=${keyword}`)
  const products = await response.json()
  // Limpando da tela o que foi mostrado anteriormente | Wiping what was previously shown from the screen
  resultsElement.innerHTML = ""
  // Exibindo os resultados na tela | Displaying the results on the screen
  resultsElement.innerHTML = products.map(product => `
    <div class="product">
      <h1 class="product-title">${product.title}</h1>
      <img src="${product.image}" />
      <p class="product-information">Avaliação: ${product.rating} estrelas (${product.reviews})</p>
    </div>
  `).join('');
}) 
