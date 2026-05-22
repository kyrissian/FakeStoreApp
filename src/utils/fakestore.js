import axios from "axios";

const API_BASE_URL = "https://fakestoreapi.com/products";
const PRODUCTS_CACHE_KEY = "fakestore-products-cache";
const PRODUCT_CACHE_PREFIX = "fakestore-product-";
const CACHE_TTL_MS = 5 * 60 * 1000;

export const CATEGORY_OPTIONS = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

export const formatPrice = (value) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value));

export const toTwoDecimalPrice = (value) => {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return "";
  }

  return numericValue.toFixed(2);
};

const canUseSessionStorage = () =>
  typeof window !== "undefined" && "sessionStorage" in window;

const readCache = (key) => {
  if (!canUseSessionStorage()) {
    return null;
  }

  const rawValue = window.sessionStorage.getItem(key);

  if (!rawValue) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(rawValue);
    if (Date.now() - parsedValue.timestamp > CACHE_TTL_MS) {
      window.sessionStorage.removeItem(key);
      return null;
    }

    return parsedValue.data;
  } catch {
    window.sessionStorage.removeItem(key);
    return null;
  }
};

const writeCache = (key, data) => {
  if (!canUseSessionStorage()) {
    return;
  }

  window.sessionStorage.setItem(
    key,
    JSON.stringify({
      timestamp: Date.now(),
      data,
    }),
  );
};

export const clearFakeStoreCache = () => {
  if (!canUseSessionStorage()) {
    return;
  }

  window.sessionStorage.removeItem(PRODUCTS_CACHE_KEY);

  Object.keys(window.sessionStorage)
    .filter((key) => key.startsWith(PRODUCT_CACHE_PREFIX))
    .forEach((key) => window.sessionStorage.removeItem(key));
};

export const fetchProducts = async () => {
  const cachedProducts = readCache(PRODUCTS_CACHE_KEY);

  if (cachedProducts) {
    return cachedProducts;
  }

  const response = await axios.get(API_BASE_URL);
  writeCache(PRODUCTS_CACHE_KEY, response.data);
  return response.data;
};

export const fetchProductById = async (id) => {
  const cacheKey = `${PRODUCT_CACHE_PREFIX}${id}`;
  const cachedProduct = readCache(cacheKey);

  if (cachedProduct) {
    return cachedProduct;
  }

  const response = await axios.get(`${API_BASE_URL}/${id}`);
  writeCache(cacheKey, response.data);
  return response.data;
};
