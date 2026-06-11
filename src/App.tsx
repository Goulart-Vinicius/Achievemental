import { useQuery } from "@tanstack/react-query";
import { XboxFacade } from "./service/xbox/facade/XboxFacade";

const App = () => {
  const xboxFacade = new XboxFacade();

  const query = useQuery({
    queryKey: ["getPlayerAchievements", "2535456055478122"],
    queryFn: async () => {
      return xboxFacade.getPlayerAchievements("2535456055478122");
    },
  });

  if (query.isLoading) {
    return <p>Loading...</p>;
  }

  if (query.isError) {
    return (
      <p>
        Error:{" "}
        {query.error instanceof Error ? query.error.message : "Unknown error"}
      </p>
    );
  }

  return (
    <>
      <h1>{query.data}</h1>
    </>
  );
};

export default App;
