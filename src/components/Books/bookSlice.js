import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=jDBaEY4WWsyAEvqXqe5YrpKUCqFrBGPU`;

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  const allBooks = data.results.lists.flatMap((list) => list.books);
  return allBooks;
});

const bookSlice = createSlice({
  name: "books",
  initialState: {
    items: [],
    loading: false,
    error: null,
    sortBy: "title",
    order: "asc",
  },
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    sortBooks: (state) => {
      const { sortBy, order } = state;
      state.items.sort((a, b) => {
        let fieldA = a[sortBy]?.toLowerCase() || "";
        let fieldB = b[sortBy]?.toLowerCase() || "";
        if (fieldA < fieldB) return order === "asc" ? -1 : 1;
        if (fieldA > fieldB) return order === "asc" ? 1 : -1;
        return 0;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSortBy, setOrder, sortBooks } = bookSlice.actions;
export default bookSlice.reducer;