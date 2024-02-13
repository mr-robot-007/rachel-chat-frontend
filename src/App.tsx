import { useEffect } from "react";
import Controller from "./components/Controller";
import axios from "axios";

const backend_url = process.env.BACKEND_URL

function App() {
  useEffect(function () {
    async function resetConv() {
      await axios
        .get(`${backend_url}/reset`)
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data);
            // setMessages([]);
          } else {
            console.error(
              "There was an error with the API request to backend : coming from line 22 Title.tsx"
            );
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    resetConv();
  }, []);
  return (
    <div className="md:w-[500px] w-[full] m-auto h-full md:h-[900px] rounded-md ">
      <Controller />
    </div>
  );
}

export default App;
