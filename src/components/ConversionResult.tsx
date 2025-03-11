import { Typography } from "@mui/material";

interface ConversionResultProps {
  amount?: string;
  fromCurrency: string;
  toCurrency: string;
  convertedAmount?: string;
  date?: string; // Ensure this is declared
}

export const ConversionResult: React.FC<ConversionResultProps> = ({
  amount,
  fromCurrency,
  toCurrency,
  convertedAmount,
  date,
}) => {
  return (
    <>
      <Typography variant="body1" sx={{ fontSize: "0.875rem" }}>
        {amount} {fromCurrency} umgewandelt in
      </Typography>
      <Typography variant="h6" sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        {convertedAmount} {toCurrency}
      </Typography>
      {date && (
        <Typography variant="caption" sx={{ mt: 1 }}>
          {new Date(date).toLocaleString()}
        </Typography>
      )}
    </>
  );
};
