import React, { ChangeEvent } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useCurrencyContext } from "../context/CurrencyContext";
import { ConversionResult } from "./ConversionResult";
import { CurrencySelect } from "./CurrencySelect";
import { ValueInput } from "./ValueInput";

export const CurrencyConverter: React.FC = () => {
  const { state, dispatch } = useCurrencyContext();

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newAmount = event.target.value;
    dispatch({ type: "SET_AMOUNT_FROM", payload: newAmount });
  };

  const handleConvertedAmountChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newConvertedAmount = event.target.value;
    dispatch({ type: "SET_AMOUNT_TO", payload: newConvertedAmount });

    const newRecord = {
      fromCurrency: state.fromCurrency,
      toCurrency: state.toCurrency,
      amount: state.amount,
      convertedAmount: newConvertedAmount,
      date: new Date().toISOString(),
    };
    dispatch({ type: "ADD_EXCHANGE_RECORD", payload: newRecord });
  };

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
          Währungsumtausch
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ConversionResult
              amount={state.amount}
              fromCurrency={state.fromCurrency}
              toCurrency={state.toCurrency}
              convertedAmount={state.convertedAmount}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ValueInput
              label="Amount"
              value={state.amount}
              onChange={handleAmountChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ValueInput
              label="Converted Amount"
              value={state.convertedAmount}
              onChange={handleConvertedAmountChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CurrencySelect
              label="From"
              value={state.fromCurrency}
              onChange={(e) =>
                dispatch({ type: "SET_FROM_CURRENCY", payload: e.target.value })
              }
              currencyNames={state.currencyNames}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CurrencySelect
              label="To"
              value={state.toCurrency}
              onChange={(e) =>
                dispatch({ type: "SET_TO_CURRENCY", payload: e.target.value })
              }
              currencyNames={state.currencyNames}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
