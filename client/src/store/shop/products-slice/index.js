const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  isLoading: false,
  productList: [],
};



const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});
