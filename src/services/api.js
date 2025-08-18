export async function getCategories() {
  const request = await fetch("https://dummyjson.com/products/categories");
  const requestJson = await request.json();

  return requestJson;
}

export async function getProductsByCategory(category) {
  const request = await fetch(
    `https://dummyjson.com/products/category/${category}`
  );
  const requestJson = await request.json();

  return requestJson;
}

export async function getProductsById(id) {
  const request = await fetch(`https://dummyjson.com/products/${id}`);
  const requestJson = await request.json();

  return requestJson;
}

export async function getProductsByQuery(query) {
  const request = await fetch(
    `https://dummyjson.com/products/search?q=${query}`
  );
  const requestJson = await request.json();

  return requestJson;
}

export async function getDetailsProductById(itemId) {
  const request = await fetch(`https://api.mercadolibre.com/items/${itemId}`);
  const requestJson = await request.json();

  return requestJson;
}
