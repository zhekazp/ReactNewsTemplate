import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState, AppDispatch } from "../../store";
import { fetchProductById, IProduct } from "../rent/rentSlice";



const placeholderImage = "https://placehold.co/200x200/grey/red?text=kein+Bild+verfügbar";

const AnzeigeDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  
  const { products, status, error } = useSelector(
    (state: RootState) => state.rentProducts
  );
  const product: IProduct | undefined = products.find(p => p.id === Number(id));

  useEffect(() => {
    if (!product) {
      dispatch(fetchProductById(Number(id)));
    }
  }, [dispatch, id, product]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "error") {
    return <p>Fehler: {error}</p>;
  }

  if (!product) {
    return <p>keine Produkte gefunden</p>;
  }

  
  const renderImages = () => {
    if (!product.imageUrl) {
      return (
        <img
          src={placeholderImage}
          alt="Placeholder"
          style={{ width: "100%", marginBottom: "10px", borderRadius: "8px" }}
        />
      );
    }
    
    if (Array.isArray(product.imageUrl)) {
      return product.imageUrl.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Product Image ${index + 1}`}
          style={{ width: "100%", marginBottom: "10px", borderRadius: "8px" }}
        />
      ));
    }
    
    return (
      <img
        src={product.imageUrl}
        alt="Product Image"
        style={{ width: "100%", marginBottom: "10px", borderRadius: "8px" }}
      />
    );
  };

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div
        className="card mb-3"
        style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)", width: "400px", backgroundColor: "#393838", color:'white', marginTop: '100px'}}
      >
        <div className="card-body text-center">
          <h1 className="text-center mb-4">{product.name}</h1>
          <div  style={{color:'rgb(209, 207, 207)'}}>
            
            <div className="image-gallery d-flex justify-content-center align-item-center " style={{height:'300px', width:'250px', marginBottom:'25px',  margin: "0 auto"}}>
              {renderImages()}
            </div>
          <p>
            <strong>Kategorie:</strong> {product.category.name}
          </p>
          <p>
            <strong>Preis:</strong><span style={{ color: "red", fontWeight: "bold", fontSize: "20px"}}> {product.price} €</span>
          </p>
          {product.description && (
            <p>
              <strong>Beschreibung:</strong> {product.description}
            </p>
          )}
          <p>
            <strong>Region:</strong> {product.region.regionName}
          </p>
          <p>
            <strong>Besitzer:</strong> {product.owner.name}
          </p>
          
          </div>
          <button
            onClick={() => navigate(-1)}
            className="btn btn-danger mt-3"
            style={{ background: "red", marginRight: "10px" }}
          >
            Schließen 
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnzeigeDetails;
