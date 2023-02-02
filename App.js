import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "./src/context/ThemeContext";
import { AppNavigator } from "./src/navigation/AppNavigator";

const client = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <ThemeProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
