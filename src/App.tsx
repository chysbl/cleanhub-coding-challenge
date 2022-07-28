import { useEffect, useState } from "react";
import HubList from "./components/HubList/HubList";
import styles from "./App.module.scss";
import Filters from "./components/Filters/Filters";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://marketplace-demo.cleanhub.com/api/public/hubs")
      .then((res) => {
        return res.json();
      })
      .then((data) => setData(data));
  }, []);

  console.log(data);

  return (
    <>
      <header className={styles.header}>
        <h1>CleanHub Collection Hubs</h1>
      </header>
      {data && (
        <main>
          <Filters hubs={data} />
          <HubList hubs={data} />
        </main>
      )}
    </>
  );
}

export default App;
