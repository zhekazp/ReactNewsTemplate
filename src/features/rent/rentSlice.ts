import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import axios from "axios";

export interface ICategoryCreateRequestDto {
  name: string;
}

export interface ICategoryResponseDto {
  name: string;
}

export interface IProduct {
  id: number;
  imageUrl?: string[];
  name: string;
  category: ICategoryCreateRequestDto;
  price: number;
  description?: string;
  isInStock: boolean;
  region: IRegionJustWithNameDto;
  owner: {
    name: string;
  };
}

export interface IRegionJustWithNameDto {
  regionName: string;
}

export interface IErrorResponseDto {
  message: string;
  fieldErrors: { field: string; message: string }[];
}

export interface IOneMessageDto {
  message: string;
}

interface IProductCreateRequestDto {
  imageUrl: string;
  name: string;
  category: ICategoryCreateRequestDto;
  price: number;
  description?: string;
  isInStock: boolean;
  region: IRegionJustWithNameDto;
}

export interface ProductState {
  products: IProduct[];
  categories: ICategoryResponseDto[];
  status: "loading" | "success" | "error";
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: ProductState = {
  products: [],
  categories: [],
  status: "loading",
  error: null,
  currentPage: 0,
  totalPages: 0,
};

export const fetchProducts = createAsyncThunk<
  {
   products: IProduct[]; totalPages: number; currentPage: number 
},
  { name: string; category: string; region: string; page: number },
  { state: RootState; rejectValue: IErrorResponseDto }
>(
  "products/fetchProducts",
  async ({ name, category, region, page }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/rents`, {
        params: { name, category, region, page },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as IErrorResponseDto);
      } else {
        return rejectWithValue({
          message: "Failed to fetch products",
          fieldErrors: [],
        });
      }
    }
  }
);

export const fetchProductById = createAsyncThunk<
  IProduct,
  number,
  { state: RootState }
>("products/fetchProductById", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/api/rents/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as IErrorResponseDto);
    } else {
      return rejectWithValue(`Failed to fetch product with id ${id}`);
    }
  }
});

export const fetchCategories = createAsyncThunk<
  ICategoryResponseDto[],
  void,
  { state: RootState }
>("products/fetchCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/api/rents/categories");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue("Failed to fetch categories");
    }
  }
});

export const updateProduct = createAsyncThunk<
  IProduct,
  { id: number; updatedProduct: Partial<IProduct> },
  { state: RootState }
>(
  "products/updateProduct",
  async ({ id, updatedProduct }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/rent/${id}`, updatedProduct, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as IErrorResponseDto);
      } else {
        return rejectWithValue("Failed to update product");
      }
    }
  }
);

export const deleteProduct = createAsyncThunk<
  number,
  number,
  { state: RootState }
>("products/deleteProduct", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`/api/rent/${id}`);
    return id;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as IErrorResponseDto);
    } else {
      return rejectWithValue("Failed to delete product");
    }
  }
});

export const addNewProduct = createAsyncThunk<
  IProduct,
  IProductCreateRequestDto,
  { state: RootState }
>("products/addNewProduct", async (newProduct, { rejectWithValue }) => {
  try {
    const response = await axios.post("/api/rent", newProduct, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // Assuming the API returns the created product as IProduct
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as IErrorResponseDto);
    } else {
      return rejectWithValue("Failed to add new product");
    }
  }
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.totalPages = action.payload.totalPages;
        state.status = "success";
        state.error =  null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "error";
        state.error =
          (action.payload as IErrorResponseDto)?.message ||
          action.error.message ||
          null;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProductById.fulfilled,
        (state, action: PayloadAction<IProduct>) => {
          state.products = state.products.map((product) =>
            product.id === action.payload.id ? action.payload : product
          );
          state.status = "success";
          state.error = null;
        }
      )
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "error";
        state.error =
          (action.payload as IErrorResponseDto)?.message ||
          action.error.message ||
          null;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<ICategoryResponseDto[]>) => {
          state.categories = action.payload;
          state.status = "success";
          state.error = null;
        }
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message || null;
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateProduct.fulfilled,
        (state, action: PayloadAction<IProduct>) => {
          state.products = state.products.map((product) =>
            product.id === action.payload.id ? action.payload : product
          );
          state.status = "success";
          state.error = null;
        }
      )
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "error";
        state.error =
          (action.payload as IErrorResponseDto)?.message ||
          action.error.message ||
          null;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteProduct.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.products = state.products.filter(
            (product) => product.id !== action.payload
          );
          state.status = "success";
          state.error = null;
        }
      )
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "error";
        state.error =
          (action.payload as IErrorResponseDto)?.message ||
          action.error.message ||
          null;
      })
      .addCase(addNewProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        addNewProduct.fulfilled,
        (state, action: PayloadAction<IProduct>) => {
          state.products.push(action.payload);
          state.status = "success";
          state.error = null;
        }
      )
      .addCase(addNewProduct.rejected, (state, action) => {
        state.status = "error";
        state.error =
          (action.payload as IErrorResponseDto)?.message ||
          action.error.message ||
          null;
      });
  },
});

export default productSlice.reducer;
