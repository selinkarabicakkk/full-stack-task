const axios = require("axios");
const fs = require("fs");
const path = require("path");
const NodeCache = require("node-cache");

const cache = new NodeCache({ stdTTL: 3600 });

const getProductsData = () => {
  const productsPath = path.join(__dirname, "../data/products.json");
  const productsData = fs.readFileSync(productsPath, "utf8");
  return JSON.parse(productsData);
};

const getGoldPrice = async () => {
  const cachedPrice = cache.get("goldPrice");
  if (cachedPrice) {
    return cachedPrice;
  }

  try {
    const apiKey = "0be86c921283d992005af96a8e958b94";
    const response = await axios.get(
      `https://api.metalpriceapi.com/v1/latest?api_key=${apiKey}&base=USD&currencies=XAU`
    );

    if (response.data.success) {
      const goldPricePerOunce = response.data.rates.XAU;
      const goldPrice = 1 / goldPricePerOunce;
      const goldPricePerGram = goldPrice / 31.1035;
      cache.set("goldPrice", goldPricePerGram);
      return goldPricePerGram;
    } else {
      throw new Error("API request failed");
    }
  } catch (error) {
    console.error("Could not fetch gold price:", error.message);
    return 65.5;
  }
};

exports.getProducts = async (req, res) => {
  try {
    const goldPrice = await getGoldPrice();
    const products = getProductsData();

    let processedProducts = products.map((product) => {
      const price = (product.popularityScore + 1) * product.weight * goldPrice;
      const formattedPopularityScore = (product.popularityScore * 5).toFixed(1);
      return {
        ...product,
        price: price.toFixed(2),
        formattedPopularityScore,
      };
    });

    const { minPrice, maxPrice, minPopularity } = req.query;

    if (minPrice) {
      processedProducts = processedProducts.filter(
        (p) => parseFloat(p.price) >= parseFloat(minPrice)
      );
    }
    if (maxPrice) {
      processedProducts = processedProducts.filter(
        (p) => parseFloat(p.price) <= parseFloat(maxPrice)
      );
    }
    if (minPopularity) {
      processedProducts = processedProducts.filter(
        (p) =>
          parseFloat(p.formattedPopularityScore) >= parseFloat(minPopularity)
      );
    }

    res.json(processedProducts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
