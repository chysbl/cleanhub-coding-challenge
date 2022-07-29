import { useEffect, useState } from "react";
import HubList from "./components/HubList/HubList";
import styles from "./App.module.scss";
import Filters from "./components/Filters/Filters";
import { Hub } from "./types";
import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import useFilters from "./services/useFilter";

function App() {
  const [data, setData] = useState<Hub[]>([]);
  const [loading, setIsLoading] = useState<boolean>(true);

  const { filteredData, filterConfig } = useFilters(data);

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

  return (
    <Container maxWidth="lg">
      <header className={styles.header}>
        <Typography align="center" variant="h3" component="h1">
          CleanHub Collection Hubs
        </Typography>
      </header>
      {loading ? (
        <CircularProgress />
      ) : (
        <main>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Filters
                initialData={data}
                filteredData={filteredData}
                filterConfig={filterConfig}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <HubList hubs={filteredData} />
            </Grid>
          </Grid>
        </main>
      )}
    </Container>
  );
}

export default App;
