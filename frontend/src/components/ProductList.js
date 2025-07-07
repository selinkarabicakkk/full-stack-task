import React, { useState, useEffect, useCallback, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/ProductList.css";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../services/api";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const debounceTimer = useRef(null);

  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    minPopularity: "",
  });

  const getProducts = useCallback(async (currentFilters) => {
    try {
      setLoading(true);
      const data = await fetchProducts(currentFilters);
      setProducts(data);
      setError(null);
    } catch (err) {
      setError("Error loading products. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      getProducts(filters);
    }, 500);
  }, [filters, getProducts]);

  useEffect(() => {
    getProducts(filters);
  }, [getProducts]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide: true,
    draggable: true,
    arrows: true,
    centerMode: false,
    centerPadding: "0px",
    className: "product-slider",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    const clearedFilters = {
      minPrice: "",
      maxPrice: "",
      minPopularity: "",
    };
    setFilters(clearedFilters);
    getProducts(clearedFilters);
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="product-list-container">
      <div className="filter-section">
        <h3>Filter Products</h3>
        <div className="filter-controls">
          <div className="filter-group">
            <label>Min. Price ($):</label>
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              min="0"
              placeholder="Min $"
            />
          </div>
          <div className="filter-group">
            <label>Max. Price ($):</label>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              min="0"
              placeholder="Max $"
            />
          </div>
          <div className="filter-group">
            <label>Min. Popularity:</label>
            <input
              type="number"
              name="minPopularity"
              value={filters.minPopularity}
              onChange={handleFilterChange}
              min="0"
              max="5"
              step="0.1"
              placeholder="0-5"
            />
          </div>
          <button className="clear-filters" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="no-products">
          <p>No products found matching your criteria.</p>
        </div>
      ) : (
        <div className="product-slider-container">
          <Slider {...settings}>
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default ProductList;
