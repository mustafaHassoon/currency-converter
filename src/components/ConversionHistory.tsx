import React, { useContext } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { CurrencyContext } from "../context/CurrencyContext";
import { ConversionResult } from "./ConversionResult";

export const ConversionHistory: React.FC = () => {
  const { state } = useContext(CurrencyContext);
  const { history } = state;

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ mb: 3 }}>
          Recent Currency Conversions
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {history.length === 0 ? (
            <Typography>No conversion history available.</Typography>
          ) : (
            history.map((record, index) => (
              <Grid item xs={12} key={index}>
                <ConversionResult
                  amount={record.amount}
                  fromCurrency={record.fromCurrency}
                  toCurrency={record.toCurrency}
                  convertedAmount={record.convertedAmount}
                  date={record.date}
                />
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Container>
  );
};
