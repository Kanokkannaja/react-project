import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { fetchMovieById } from "../api/movieApi";
import { addFavorite } from "../features/favorites/favoritesSlice";

const Wrapper = styled.div`
  max-width: 1100px;
  margin: 40px auto;
  padding: 0 20px;
`;

const DetailBox = styled.div`
  display: flex;
  gap: 30px;
  align-items: flex-start;
  flex-wrap: wrap;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.06);
  padding: 25px;
`;

const Poster = styled.img`
  width: 280px;
  border-radius: 12px;
  object-fit: cover;
  background: #f1f1f1;
`;

const Info = styled.div`
  flex: 1;
  min-width: 260px;
`;

const Title = styled.h1`
  font-size: 1.9rem;
  margin-bottom: 10px;
`;

const Meta = styled.p`
  margin: 4px 0;
  line-height: 1.4;
  strong {
    display: inline-block;
    width: 85px;
  }
`;

const Plot = styled.p`
  margin-top: 14px;
  line-height: 1.6;
`;

const FavButton = styled.button`
  margin-top: 18px;
  padding: 10px 16px;
  background: #ffcc00;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: filter 0.15s;
  &:hover {
    filter: brightness(0.95);
  }
`;

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  // ดึงข้อมูลหนังจาก imdbID
  useEffect(() => {
    const loadMovie = async () => {
      setLoading(true);
      const data = await fetchMovieById(id);
      setMovie(data);
      setLoading(false);
    };
    loadMovie();
  }, [id]);

  const handleAddFavorite = () => {
    if (!movie) return;
    dispatch(
      addFavorite({
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster,
      })
    );
  };

  if (loading) {
    return (
      <Wrapper>
        <p>Loading...</p>
      </Wrapper>
    );
  }

  if (!movie || movie.Response === "False") {
    return (
      <Wrapper>
        <p>Movie not found.</p>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <DetailBox>
        <Poster
          src={
            movie.Poster && movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.Title}
        />
        <Info>
          <Title>
            {movie.Title} {movie.Year ? `(${movie.Year})` : ""}
          </Title>
          <Meta>
            <strong>Genre:</strong> {movie.Genre || "-"}
          </Meta>
          <Meta>
            <strong>Actors:</strong> {movie.Actors || "-"}
          </Meta>
          <Meta>
            <strong>Director:</strong> {movie.Director || "-"}
          </Meta>
          <Meta>
            <strong>IMDB:</strong> ⭐ {movie.imdbRating || "-"}
          </Meta>
          <Plot>
            <strong>Plot:</strong> {movie.Plot || "No plot"}
          </Plot>
          <FavButton onClick={handleAddFavorite}>
            + Add to favorites
          </FavButton>
        </Info>
      </DetailBox>
    </Wrapper>
  );
}
