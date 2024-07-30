import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [freeBlocks, setFreeBlocks] = useState(1);
  const [wheatFarmersPerWheatField, setWheatFarmersPerWheatField] = useState(1);
  const [farmersPerFarm, setFarmersPerFarm] = useState(1);
  const [doubleFarm, setDoubleFarm] = useState(true);
  const [dom, setDom] = useState([]);

  useEffect(() => {
    const newDom = [];
    for (let i = 1; i <= freeBlocks; i++) {
      let domObject = {};
      let wheatFieldsCount = parseInt(i);
      let farmCount = parseInt(freeBlocks - i);
      domObject["wheat-fields-count"] = i;
      domObject["farms-count"] = freeBlocks - i;

      let multiplierForFarms = 1;
      if (doubleFarm) {
        multiplierForFarms = 2;
      }
      // 1 + 1 * 2  * 1
      let gainsByWorker;
      if (farmCount * farmersPerFarm === 0) {
        gainsByWorker = wheatFarmersPerWheatField;
      } else
        gainsByWorker =
          +wheatFarmersPerWheatField *
            (+farmersPerFarm * +farmCount * +multiplierForFarms) +
          +wheatFarmersPerWheatField;

      domObject["gainsByWorker"] = gainsByWorker;
      domObject["gainsByAllWorkers"] = gainsByWorker * wheatFieldsCount;

      console.log(gainsByWorker);
      // console.log(domObject);
      newDom.push(domObject);
    }
    newDom.sort((a, b) => b["gainsByAllWorkers"] - a["gainsByAllWorkers"]);
    setDom(newDom);
    // console.log(newDom);
  }, [freeBlocks, wheatFarmersPerWheatField, farmersPerFarm, doubleFarm]);
  const formatWithCommas = (num) => {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    });
  };
  return (
    <>
      <div>
        <div className="flex flex-col">
          <div className="p-2">
            <label htmlFor="free-blocks" className="w-36 inline-block">
              free-blocks
            </label>
            <input
              type="number"
              id="free-blocks"
              onChange={(e) => setFreeBlocks(e.target.value)}
            />
          </div>
          <div className="p-2">
            <label htmlFor="wheat-field-level" className="w-36 inline-block">
              Wheat field level
            </label>
            <input
              type="number"
              id="wheat-field-level"
              onChange={(e) => setWheatFarmersPerWheatField(e.target.value)}
            />
          </div>
          <div className="p-2">
            <label htmlFor="farm-level " className="w-36 inline-block">
              Farm level
            </label>
            <input
              type="number"
              id="farm-level"
              onChange={(e) => setFarmersPerFarm(e.target.value)}
            />
          </div>
          <div className="p-2">
            <label htmlFor="double-farm " className="w-36 inline-block">
              double farm
            </label>
            <input
              type="checkbox"
              id="double-farm"
              onChange={(e) => setDoubleFarm(e.target.checked)}
            />
          </div>
        </div>
        <div>
          <table className="table-auto w-full border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">
                  Wheat Fields Count
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Farms Count
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Gains by Worker
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Gains by All Workers
                </th>
              </tr>
            </thead>
            <tbody>
              {dom.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {item["wheat-fields-count"]}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item["farms-count"]}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item["gainsByWorker"]}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item["gainsByAllWorkers"]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
