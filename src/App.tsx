import { useEffect, useState } from "react";
import HubList from "./components/HubList/HubList";
import styles from "./App.module.scss";
import Filters from "./components/Filters/Filters";
import { Hub } from "./types";
import { CircularProgress, Container } from "@mui/material";

function App() {
  const [data, setData] = useState<Hub[]>([]);
  const [loading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://marketplace-demo.cleanhub.com/api/public/hubs")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });
  }, []);

  console.log(data);

  return (
    <Container maxWidth="lg">
      <header className={styles.header}>
        <h1>CleanHub Collection Hubs</h1>
      </header>
      {loading ? (
        <CircularProgress />
      ) : (
        <main className={styles.main}>
          <Filters hubs={data} />
          <HubList hubs={data} />
        </main>
      )}
    </Container>
  );
}

export default App;
