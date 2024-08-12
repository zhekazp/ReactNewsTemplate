import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  fetchUserProducts,
  deleteProduct,
  updateProduct,
  IProduct,
} from "./rentSlice";
// import UserAvatar from '../../img/';
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import AnmeldeModal from "./AnmeldeModal";
import Spinner from "../mainPage/components/spinner/Spinner";
import ResponsivePagination from 'react-responsive-pagination';

const placeholderImage =
  "https://placehold.co/250x250/grey/red?text=kein+Bild+verfügbar";

  const UserAvatar = "https://www.lerned.top/imj/kurses/User1.png";

const Meins: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products, status, currentPage, totalPages } = useSelector(
    (state: RootState) => state.rentProducts
  );
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const [editFields, setEditFields] = useState({
    name: "",
    price: null as number | null,
    description: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<IProduct | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setModalMessage("Sie müssen sich anmelden, um Ihre Produkte anzuzeigen.");
      setIsLoginModalOpen(true);
    } else {
      dispatch(fetchUserProducts(0));
    }
  },[] );

  const handleEditClick = (product: IProduct) => {
    setEditingProduct(product);
    setEditFields({
      name: product.name,
      price: product.price,
      description: product.description ?? "",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (editingProduct) {
      const updatedProduct: Partial<IProduct> = {
        name: editFields.name,
        price: editFields.price ?? editingProduct.price,
        description: editFields.description,
      };

      dispatch(updateProduct({ id: editingProduct.id, updatedProduct }));
      setEditingProduct(null);
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
  };

  const openDeleteModal = (product: IProduct) => {
    setProductToDelete(product);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setProductToDelete(null);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      dispatch(deleteProduct(productToDelete.id));
      closeDeleteModal();
    }
  };

  const renderProductImages = (imageUrl: string | string[] | null) => {
    if (!imageUrl) {
      return (
        <img
          src={placeholderImage}
          alt="Placeholder"
          style={{ width: "250px", height: "250px", borderRadius: "8px" }}
        />
      );
    }

    if (Array.isArray(imageUrl)) {
      return (
        <img
          src={imageUrl[0]}
          alt="Product Image"
          style={{ width: "250px", height: "250px", borderRadius: "8px" }}
        />
      );
    }

    return (
      <img
        src={imageUrl}
        alt="Product Image"
        style={{ width: "250px", height: "250px", borderRadius: "8px" }}
      />
    );
  };

  const handlePageChange = (page: number) => {
     if (page >= 0 && page < totalPages) {
      dispatch(fetchUserProducts(page));
    }
  };

  const handleLoginRedirect = () => {
    setIsLoginModalOpen(false);
    navigate("/login");
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        minHeight: "100vh",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        productName={productToDelete?.name || ""}
      />
      <AnmeldeModal
        isOpen={isLoginModalOpen}
        onRequestClose={handleLoginRedirect}
        message={modalMessage}
        buttonLabel="Anmelden"
        onButtonClick={handleLoginRedirect}
      />

      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <img
          src={UserAvatar}
          alt="User Avatar"
          style={{
            width: "150px",
            height: "150px",
            border: "2px solid gray",
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "20px",
          }}
        />
        <h3 style={{ color: "white" }}>
          {products.length > 0 ? products[0].owner.name : "User"}
        </h3>
      </div>

      <div style={{ width: "80%", maxWidth: "1200px" }}>
        <div style={{ marginBottom: "20px" }}>
          <p
            style={{
              fontSize: "25px",
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
            }}
          >
            Meine Produkte
          </p>
          {status === "loading" ? (
            <Spinner show={true} color="red" />
          ) : products.length === 0 ? (
            <p style={{ fontSize: "16px", color: "red", textAlign: "center" }}>
              Deine Anzeigeliste ist leer
            </p>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "20px",
                    alignItems: "flex-start",
                    padding: "10px",
                    backgroundColor: "#333",
                    borderRadius: "8px",
                  }}
                >
                  <div style={{ width: "250px", height: "250px" }}>
                    {renderProductImages(product.imageUrl ?? null)}
                  </div>
                  <div style={{ flex: 1, color: "white" }}>
                    {editingProduct && editingProduct.id === product.id ? (
                      <div>
                        <input
                          type="text"
                          name="name"
                          value={editFields.name}
                          onChange={handleInputChange}
                          placeholder="Name"
                          style={{
                            width: "100%",
                            marginBottom: "10px",
                            backgroundColor: "black",
                            color: "white",
                            border: "1px solid #444",
                            borderRadius: "4px",
                            padding: "8px",
                          }}
                        />
                        <input
                          type="text"
                          name="price"
                          value={editFields.price ?? ""}
                          onChange={handleInputChange}
                          placeholder="Price"
                          style={{
                            width: "100%",
                            marginBottom: "10px",
                            backgroundColor: "black",
                            color: "white",
                            border: "1px solid #444",
                            borderRadius: "4px",
                            padding: "8px",
                          }}
                        />
                        <textarea
                          name="description"
                          value={editFields.description}
                          onChange={handleInputChange}
                          placeholder="Description"
                          rows={4}
                          style={{
                            width: "100%",
                            marginBottom: "10px",
                            backgroundColor: "black",
                            color: "white",
                            border: "1px solid #444",
                            borderRadius: "4px",
                            padding: "8px",
                          }}
                        />
                        <div style={{ marginTop: "10px" }}>
                          <button
                            type="button"
                            style={{
                              marginRight: "10px",
                              padding: "10px 20px",
                              backgroundColor: "black",
                              color: "white",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                            onClick={handleSave}
                          >
                            Speichern
                          </button>
                          <button
                            type="button"
                            style={{
                              padding: "10px 20px",
                              backgroundColor: "red",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                            onClick={handleCancel}
                          >
                            Abbrechen
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h3 style={{ marginBottom: "10px" }}>{product.name}</h3>
                        <p style={{ color: "rgb(209, 207, 207)" }}>
                          Kategorie: {product.category.name}
                        </p>
                        <p style={{ color: "rgb(209, 207, 207)" }}>
                          Preis pro Tag: {"    "}
                          <span
                            style={{
                              color: "red",
                              fontWeight: "bold",
                              fontSize: "25px",
                            }}
                          >
                            {product.price} €
                          </span>
                        </p>
                        <p style={{ color: "rgb(209, 207, 207)" }}>
                          Region: {product.region.regionName}
                        </p>
                        <div style={{ marginTop: "10px" }}>
                          <button
                            type="button"
                            style={{
                              marginRight: "10px",
                              padding: "10px 20px",
                              backgroundColor: "black",
                              color: "white",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}

                            onClick={() => handleEditClick(product)}
                          >
                            Bearbeiten
                          </button>
                          <button
                            type="button"
                            style={{
                              padding: "10px 20px",
                              backgroundColor: "red",
                              color: "white",
                              border: "none",
                              borderRadius: "5px",
                              cursor: "pointer",
                            }}

                            onClick={() => openDeleteModal(product)}
                          >
                            Löschen
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div> 
        { totalPages > 1 &&(<ResponsivePagination
                current={currentPage + 1}  
                total={totalPages}        
                onPageChange={(newPage) => handlePageChange(newPage - 1)} 
                maxWidth={10}
                 
              />)}
      </div>
    </div>
  );
};

export default Meins;