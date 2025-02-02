import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MultiStepForm from "./components/MultiStepForm";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MultiStepForm />
    </QueryClientProvider>
  );
};

export default App;
