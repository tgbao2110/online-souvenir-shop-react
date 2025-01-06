import React, { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Button, Typography, Grid, Box } from "@mui/material";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import CustomerLayout from "../../layout/CustomerLayout";
import fCurrency from "../../utils/FormatCurrency";

const Favourite = () => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await api.get("/Product/get-favorite");
      setFavorites(response.data);
    } catch (error) {
      console.error("Error fetching favorites", error);
      setError(error.message);
    }
  };

  const handleRemoveFavorite = async (productId) => {
    try {
      await api.post("/Product/remove-favorite", { productId });
      fetchFavorites(); // Refresh favorites after removing
    } catch (error) {
      console.error("Error removing favorite", error);
      setError(error.message);
    }
  };

  return (
    <CustomerLayout>
      <div className="container mt-5">
        <h1 className="text-primary mb-4">Favorite Products</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <Grid container direction="column" spacing={3}>
          {favorites.map((favorite) => (
            <Grid item xs={12} key={favorite.id}>
              <Card sx={{ display: "flex" }}>
                <CardMedia
                  component="img"
                  sx={{ width: 175 }}
                  image={`https://localhost:7096/${favorite.product.imageUrl}`}
                  alt={favorite.product.name}
                />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <h5 class name="text-secondary">
                      {favorite.product.name}
                    </h5>
                    <h3 className="text-primary">
                      {fCurrency(favorite.product.discountPrice)}
                    </h3>
                    <div className="text-muted">
                      <del>{fCurrency(favorite.product.basePrice)}</del>
                    </div>
                    <Link className="btn btn-primary mt-2"
                      to={`/product/${favorite.productId}`}
                    >
                      Details
                    </Link>
                    <button className="btn btn-danger mt-2 ms-2"
                      onClick={() => handleRemoveFavorite(favorite.productId)}
                    >
                      Remove
                    </button>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </CustomerLayout>
  );
};

export default Favourite;
