const keywordElement = document.getElementById("keyword")
const buttonElement = document.getElementById("search")
const resultsElement = document.getElementById("results")

buttonElement.addEventListener("click", async () => {
  // Guardar na variável qual palavra foi digitada | Save which word was typed in the variable
  const keyword = keywordElement.value
  try {

    // Requisição à API | API request
    const response = await fetch(`http://localhost:3333/api/scrape?keyword=${keyword}`);
    
    // Verificando se a resposta foi ok | Checking that the answer was ok
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    // Guardando as informações retornadas em uma variável | Storing the information returned in a variable
    const products = await response.json();

    // Limpando da tela o que foi mostrado anteriormente | Wiping what was previously shown from the screen
    resultsElement.innerHTML = "";

    // Criando uma variável para guardar os produtos | Creating a variable to store the products
    const productsList = [];
    products.forEach(product => {
      productsList.push(`
        <div class="product-card">
          <div class="image-container">
            <img src="${product.image}" alt="Imagem do produto" />
          </div>
          <h3>${product.title}</h3>
          <p>Avaliação: 🌟 ${product.rating}</p>
          <p>Número de avaliações: ${product.reviews}</p>
        </div>
      `);
    });

    // Exibindo os resultados na tela | Displaying the results on the screen
    productsList.forEach(product => {
      const item = document.createElement('div');
      item.innerHTML = product;
      resultsElement.appendChild(item);
    });

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}) 


// Requisição à API | API request

