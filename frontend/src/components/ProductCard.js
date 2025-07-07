import React, { useState, useEffect } from "react";
import "../styles/ProductCard.css";

const ProductCard = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState("yellow");

  useEffect(() => {
    Object.values(product.images).forEach((imageUrl) => {
      const img = new Image();
      img.src = imageUrl;
    });
  }, [product.images]);

  const colorOptions = [
    { id: "yellow", name: "Yellow Gold", code: "#F6CA97" },
    { id: "white", name: "White Gold", code: "#D9D9D9" },
    { id: "rose", name: "Rose Gold", code: "#E1A4A9" },
  ];

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const formatPrice = (price) => {
    const priceNum = parseFloat(price);
    const decimal = priceNum % 1;

    if (decimal > 0.5) {
      return `${Math.floor(priceNum) + 1},00`;
    } else {
      return `${Math.floor(priceNum)},00`;
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="star full">
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="star half">
          ★
        </span>
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="star empty">
          ★
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.images[selectedColor]} alt={product.name} />
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">${formatPrice(product.price)} USD</p>

        <div className="color-options">
          {colorOptions.map((color) => (
            <button
              key={color.id}
              className={`color-option ${
                selectedColor === color.id ? "selected" : ""
              }`}
              style={{ backgroundColor: color.code }}
              onClick={() => handleColorChange(color.id)}
              title={color.name}
            />
          ))}
        </div>

        <div className="color-name">
          {colorOptions.find((c) => c.id === selectedColor)?.name}
        </div>

        <div className="product-rating">
          <div className="stars">
            {renderStars(parseFloat(product.formattedPopularityScore))}
          </div>
          <span className="rating-text">
            {product.formattedPopularityScore}/5
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
