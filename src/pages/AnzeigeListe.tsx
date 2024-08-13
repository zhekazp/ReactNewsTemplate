import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchCategories, fetchProducts } from "../features/anzeige/rentSlice";
import { IProduct } from "../features/anzeige/rentSlice";
import Anzeige from "../features/anzeige/Anzeige";
import { useNavigate, useSearchParams } from "react-router-dom";
import Spinner from "../features/mainPage/components/spinner/Spinner";
import ResponsivePagination from "react-responsive-pagination";

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

const PAGE_SIZE = 10;

const AnzeigeList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products, categories, status, totalPages, currentPage, error } =
    useSelector((state: RootState) => state.rentProducts);

  const [searchParams, setSearchParams] = useSearchParams();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [region, setRegion] = useState("");

  const [searchName, setSearchName] = useState(searchParams.get("name") || "");
  const [searchCategory, setSearchCategory] = useState(
    searchParams.get("category") || ""
  );
  const [searchRegion, setSearchRegion] = useState(
    searchParams.get("region") || ""
  );

  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [filteredPage, setFilteredPage] = useState(0);
  const [isFiltering, setIsFiltering] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1", 10) - 1;
    dispatch(
      fetchProducts({
        name: searchName,
        category: searchCategory,
        region: searchRegion,
        page,
      })
    );
  }, [dispatch, searchName, searchCategory, searchRegion, searchParams]);

  useEffect(() => {
    if (isFiltering) {
      const filtered = products.filter(
        (product) =>
          (!searchName ||
            product.name.toLowerCase().includes(searchName.toLowerCase())) &&
          (!searchCategory || product.category.name === searchCategory) &&
          (!searchRegion || product.region.regionName === searchRegion)
      );
      setFilteredProducts(filtered);
      setFilteredPage(0); // сброс фильтров
    }
  }, [products, isFiltering, searchName, searchCategory, searchRegion]);

  useEffect(() => {
    if (isFiltering) {
      setSearchParams({
        name: searchName,
        category: searchCategory,
        region: searchRegion,
        page: (filteredPage + 1).toString(), // меняет номер страницы с 0 на 1 в url
      });
    }
  }, [
    searchName,
    searchCategory,
    searchRegion,
    filteredPage,
    isFiltering,
    setSearchParams,
  ]);

  const handleFilterChange = (
    filterType: "name" | "category" | "region",
    value: string
  ) => {
    if (filterType === "name") {
      setName(value);
    } else if (filterType === "category") {
      setCategory(value);
    } else if (filterType === "region") {
      setRegion(value);
    }
  };

  const handleSearch = () => {
    setIsFiltering(false);
    setFilteredPage(0);

    if (!name && !category && !region) {
      setSearchName("");
      setSearchCategory("");
      setSearchRegion("");
    } else {
      setSearchName(name);
      setSearchCategory(category);
      setSearchRegion(region);
    }

    dispatch(
      fetchProducts({
        name: name || "",
        category: category || "",
        region: region || "",
        page: 0,
      })
    );
  };

  const handlePageChange = (newPage: number) => {
    // setSearchParams({
    //   name: searchName,
    //   category: searchCategory,
    //   region: searchRegion,
    //   page: (newPage).toString(), // меняет номер страницы с 0 на 1 в url
    // });
    dispatch(
      fetchProducts({
        name: searchName,
        category: searchCategory,
        region: searchRegion,
        page: newPage,
      })
    );
  };

  // логика расчета страниц для отображения
  const totalFilteredPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const totalPagesToDisplay = isFiltering ? totalFilteredPages : totalPages;
  const currentPageToDisplay = isFiltering ? filteredPage : currentPage;

  return (
    <div style={{ padding: "20px" }}>
      <div
        className="search-panel"
        style={{
          maxWidth: "1400px",
          margin: "15px auto 10px",
          padding: "15px",
          backgroundColor: "#393838",
        }}
      >
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Was suchst du?"
            style={{
              backgroundColor: "black",
              border: "black",
              color: "white",
            }}
            value={name}
            onChange={(e) => handleFilterChange("name", e.target.value)}
          />
          <style>{`
                  .form-control::placeholder {
                    color: white;
                  }
                `}</style>
          <select
            className="form-select"
            style={{
              backgroundColor: "black",
              border: "black",
              color: "white",
            }}
            value={category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
          >
            <option value="">Alle Kategorien</option>
            {categories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            className="form-select"
            style={{
              backgroundColor: "black",
              border: "black",
              color: "white",
            }}
            value={region}
            onChange={(e) => handleFilterChange("region", e.target.value)}
          >
            <option value="">Alle Bundesländer</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="btn btn-danger"
            style={{ background: "red", marginRight: "10px" }}
            onClick={handleSearch}
          >
            Suchen <i className="fas fa-search"></i>
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            style={{ background: "#393838", borderColor: "#393838" }}
            onClick={() => navigate("/anzeigeAufgeben")}
          >
            <i className="fa-solid fa-file-circle-plus"></i> Anzeige aufgeben
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            style={{ background: "#393838", borderColor: "#393838" }}
            onClick={() => navigate("/meins")}
          >
            Meins <i className="fa-solid fa-user"></i>
          </button>
        </div>
      </div>

      {status === "loading" ? (
        <Spinner show={true} color="red" />
      ) : status === "error" ? (
        <p style={{ color: "red", textAlign: "center" }}>
          Keine Produkte für die angegebenen Kriterien gefunden
        </p>
      ) : status === "success" ? (
        <div
          className="products-list"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          {products.map((product) => (
            <Anzeige key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p style={{ color: "red" }}>Keine Produkte gefunden</p>
      )}

      {status !== "error" && products.length > 0 && totalPages > 1 && (
        <ResponsivePagination
          current={currentPage + 1}
          total={totalPages}
          onPageChange={(newPage) => handlePageChange(newPage - 1)}
          maxWidth={10}
        />
      )}
    </div>
  );
};

export default AnzeigeList;
