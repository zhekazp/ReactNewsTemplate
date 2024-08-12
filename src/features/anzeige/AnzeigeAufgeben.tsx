import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import AnmeldeModal from "./AnmeldeModal";
import axios from "axios";

const regions = [
  "Baden-Württemberg",
  "Bayern",
  "Berlin",
  "Brandenburg",
  "Bremen",
  "Hamburg",
  "Hessen",
  "Mecklenburg-Vorpommern",
  "Niedersachsen",
  "Nordrhein-Westfalen",
  "Rheinland-Pfalz",
  "Saarland",
  "Sachsen",
  "Sachsen-Anhalt",
  "Schleswig-Holstein",
  "Thüringen",
];

const AnzeigeAufgeben: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state: RootState) => state.rentProducts);

  const [name, setName] = useState<string>("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setModalMessage("Sie müssen sich anmelden, um diese Aktion auszuführen.");
      setIsModalOpen(true);
    }
  }, [navigate]);

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    
    if (!token) {
      setModalMessage("Sie müssen sich anmelden, um ein Produkt hinzuzufügen.");
      setIsModalOpen(true);
      return;
    }

    const formData = new FormData();
    const newProduct = {
      name,
      category: { name: category },
      price,
      description,
      isInStock: true,
      region: { regionName: region },
    };

    formData.append('product',JSON.stringify(newProduct));


    imageFiles.forEach((file) => {
      formData.append("image", file);
    });

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'content-type': 'multipart/form-data',
      },
    };

    axios.post("/api/rent", formData, config)
      .then((response) => {
      })
      .catch((error) => {
        console.error("Error uploading files: ", error);
      });
      navigate("/anzeige");  
    } 
  const handleClose = () => {
    navigate("/anzeige"); 
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImageFiles(filesArray);
    }
  };

  return (
    <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
      <div
        style={{
          backgroundColor: "#393838",
          padding: "20px",
          borderRadius: "8px",
          color: "white",
          width: "1000px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Anzeige aufgeben</h2>

        {error && (
          <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        )}

        {successMessage && (
          <p style={{ color: "red", textAlign: "center" }}>{successMessage}</p>
        )}


<form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Produkt</label>
            <input
              type="text"
              className="form-control"
              style={{
                backgroundColor: "black",
                border: "black",
                color: "white",
              }}
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <style>{`
              .form-control::placeholder {
                color: white;
              }
            `}</style>
          </div>

          <div className="mb-3">
            <label htmlFor="imageFiles" className="form-label">Bilder hinzufügen</label>
            <input
              type="file"
              className="form-control"
              style={{ backgroundColor: "black", border: "black", color: "white" }}
              id="imageFiles"
              onChange={handleImageChange}
              accept="image/*"
              required
            />
          </div>

          {imageFiles.length > 0 && (
            <div className="mb-3">
              {imageFiles.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  style={{ maxWidth: "20%", marginBottom: "10px" }}
                />
              ))}
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="category" className="form-label">Kategorie</label>
            <select
              id="category"
              className="form-select"
              style={{
                backgroundColor: "black",
                border: "black",
                color: "white",
              }}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Kategorie auswählen</option>
              {categories.map((cat) => (
                <option key={cat.name} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="price" className="form-label">Preis</label>
            <input
              type="number"
              className="form-control"
              style={{
                backgroundColor: "black",
                border: "black",
                color: "white",
              }}
              id="price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Beschreibung</label>
            <textarea
              className="form-control"
              style={{
                backgroundColor: "black",
                border: "black",
                color: "white",
              }}
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="region" className="form-label">Region</label>
            <select
              id="region"
              className="form-select"
              style={{
                backgroundColor: "black",
                border: "black",
                color: "white",
              }}
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              required
            >
              <option value="">Bundesland auswählen</option>
              {regions.map((region) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>


<div className="d-flex flex-column align-items-center">
            <button
              type="submit"
              className="btn btn-danger mt-3"
              style={{
                background: "red",
                padding: "10px 20px",
                fontSize: "16px",
                marginBottom: "10px",
              }}
            >
              Produkt hinzufügen <i className="fa-solid fa-file-circle-plus"></i>
            </button>

            <button
              type="button"
              className="btn btn-secondary mt-2"
              style={{
                background: 'black',
                border: '1px solid #ccc',
                padding: "10px 20px",
                fontSize: "16px",
              }}
              onClick={handleClose}
            >
              Schließen
            </button>
          </div>
        </form>
      </div>

      <AnmeldeModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        message={modalMessage}
        buttonLabel="Anmelden"
        onButtonClick={closeModal}
      />
    </div>
  );
};

export default AnzeigeAufgeben;


