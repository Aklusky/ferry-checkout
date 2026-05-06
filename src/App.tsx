import "./App.css";
import { ThemeProvider } from "./context/theme-provider";
import FerryRateCalculator from "./components/ferryRateCalculator";
import { Layout } from "./components/ui/layout";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Layout>
        <FerryRateCalculator />
      </Layout>
    </ThemeProvider>
  );
}

export default App;