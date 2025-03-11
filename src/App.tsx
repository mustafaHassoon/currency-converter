import { Container, Box, Tabs, Tab } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { CurrencyConverter } from "./components/CurrencyConverter";
import { ConversionHistory } from "./components/ConversionHistory";
import { CurrencyProvider } from "./context/CurrencyContext";
import { useState } from "react";

export const App: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (even: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  return (
    <CurrencyProvider>
      <Router>
        <Container>
          <Box sx={{ width: "100%", marginTop: 2 }}>
            <Tabs
              centered
              value={tabIndex}
              onChange={handleTabChange}
              textColor="secondary"
              indicatorColor="secondary"
            >
              <Tab label="Exchange" component={Link} to="/exchange" />
              <Tab label="History" component={Link} to="/history" />
            </Tabs>
          </Box>
          <Routes>
            <Route path="/exchange" element={<CurrencyConverter />} />
            <Route path="/history" element={<ConversionHistory />} />
            <Route path="/" element={<Navigate replace to="/exchange" />} />
          </Routes>
        </Container>
      </Router>
    </CurrencyProvider>
  );
};

export default App;
