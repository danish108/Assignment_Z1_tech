import React, { useState, useEffect } from "react";

const API_URL = "https://api.thecatapi.com/v1/images/search";
const BREEDS_URL = "https://api.thecatapi.com/v1/breeds";
const API_KEY =
  "live_ormwh7yyVBEkHx3pxAjeYmqKqsI2Tu8B6hLuHmnEYxqkkusYyS4TRjdWKvT7YfLe";

export default function CatGallery() {
  const [cats, setCats] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");

  // Fetch cat images
  const fetchCats = async () => {
    let url = `${API_URL}?limit=9&api_key=${API_KEY}`;
    if (selectedBreed) url += `&breed_ids=${selectedBreed}`;
    const res = await fetch(url);
    const data = await res.json();
    setCats(data); // Corrected to update state properly
  };

  // Fetch cat breeds
  useEffect(() => {
    const fetchBreeds = async () => {
      const res = await fetch(`${BREEDS_URL}?api_key=${API_KEY}`);
      const data = await res.json();
      setBreeds(data);
    };
    fetchBreeds();
  }, []);

  // Fetch cats when selectedBreed changes
  useEffect(() => {
    fetchCats();
  }, [selectedBreed]);

  return (
    <div style={{ padding: "20px" }}>
      <select onChange={(e) => setSelectedBreed(e.target.value)}>
        <option value="">All Breeds</option>
        {breeds.map((breed) => (
          <option key={breed.id} value={breed.id}>
            {breed.name}
          </option>
        ))}
      </select>
      <button onClick={fetchCats} style={{ marginLeft: "10px" }}>
        Load More
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {cats.map((cat) => (
          <img
            key={cat.id}
            src={cat.url}
            alt="Cat"
            style={{ width: "100%", borderRadius: "10px" }}
          />
        ))}
      </div>
    </div>
  );
}
