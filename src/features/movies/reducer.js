import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMoviesFromApi } from '../../api/movieApi';


export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (searchTerm) => {
    const movies = await fetchMoviesFromApi(searchTerm);
    return movies;
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    clearMovies: (state) => {
      state.movies = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload || [];
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
