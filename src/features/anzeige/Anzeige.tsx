import React from "react";
import { IProduct } from "./rentSlice";
import { useNavigate } from "react-router-dom";

interface AnzeigeProps {
  product: IProduct;
}

const placeholderImage =
  "https://placehold.co/250x250/grey/red?text=kein+Bild+verfügbar";

const Anzeige: React.FC<AnzeigeProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleMoreInfo = () => {
    navigate(`/anzeige/${product.id}`);
  };

  const renderImage = () => {
    if (!product.imageUrl) {
      return (
        <img
          src={placeholderImage}
          alt="Placeholder"
          style={{ width: "250px", height: "250px" }}
        />
      );
    }

    if (Array.isArray(product.imageUrl)) {
      return (
        <img
          src={product.imageUrl[0]}
          alt="Product Image"
          style={{ width: "250px", height: "250px" }}
        />
      );
    }

    return (
      <img
        src={product.imageUrl}
        alt="Product Image"
        style={{ width: "250px", height: "250px" }}
      />
    );
  };

  return (
    <div
      className="product-item"
      style={{
        width: "1400px",
        padding: "10px",
        backgroundColor: "#393838",
        color: "white",
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        alignItems: "right",
      }}
    >
      <div className="image-item">{renderImage()}</div>
      <div
        className="items-text"
        style={{ flex: 1, flexDirection: "column", justifyContent: "flex-end" }}
      >
        <h3 style={{ marginBottom: "20px" }}>{product.name}</h3>
        <p style={{ color: "rgb(209, 207, 207)" }}>
          Kategorie: {product.category.name}
        </p>
        <p style={{ color: "rgb(209, 207, 207)" }}>
          Preis pro Tag:{" "}
          <span style={{ color: "red", fontWeight: "bold", fontSize: "25px" }}>
            {" "}
            {product.price} €
          </span>
        </p>
        <p style={{ color: "rgb(209, 207, 207)" }}>
          Region: {product.region.regionName}
        </p>
        <button
          type="button"
          className="btn btn-danger"
          style={{ background: "black", border: "1px solid #ccc" }}
          onClick={handleMoreInfo}
        >
          Mehr Info
        </button>
      </div>
    </div>
  );
};

export default Anzeige;
