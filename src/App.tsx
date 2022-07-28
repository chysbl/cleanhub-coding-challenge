import { useEffect, useState } from "react";
import HubList from "./components/HubList/HubList";
import styles from "./App.module.scss";
import Filters from "./components/Filters/Filters";
import { Hub } from "./types";
import { CircularProgress, Container } from "@mui/material";

function App() {
  const [data, setData] = useState<Hub[]>([]);
  const [loading, setIsLoading] = useState<boolean>(true);
  const [filteredData, setFilteredData] = useState<Hub[]>([]);

  useEffect(() => {
    fetch("https://marketplace-demo.cleanhub.com/api/public/hubs")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
        setFilteredData(data);
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
          <Filters hubs={data} setFilteredData={setFilteredData} />
          <HubList hubs={filteredData} />
        </main>
      )}
    </Container>
  );
}

export default App;
