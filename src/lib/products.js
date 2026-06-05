import products from "@/data/products.json";

export function getProducts() {
  return products;
}

export function getPopularProducts() {
  return products.slice(0, 3);
}

export function getProductById(id) {
  return products.find((product) => product.id === id);
}

export function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}
