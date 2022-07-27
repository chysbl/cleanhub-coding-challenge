import { useEffect, useState } from "react";
import HubList from "./components/HubList/HubList";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://marketplace-demo.cleanhub.com/api/public/hubs")
      .then((res) => {
        return res.json();
      })
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      <header>
        <h1>CleanHub Collection Hubs</h1>
      </header>
      <main>
        <HubList hubs={data} />
      </main>
    </div>
  );
}

export default App;
