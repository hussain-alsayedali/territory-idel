import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";

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
      <div className="bg-gray-900 text-gray-300 min-h-screen flex items-center justify-center py-12">
        <div className="container mx-auto px-4">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="flex flex-col">
                <label
                  htmlFor="free-blocks"
                  className="w-36 inline-block text-orange-300 mb-2"
                >
                  Free Blocks
                </label>
                <input
                  type="number"
                  id="free-blocks"
                  onChange={(e) => setFreeBlocks(e.target.value)}
                  className="p-2 border rounded border-orange-500 bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="wheat-field-level"
                  className="w-36 inline-block text-orange-300 mb-2"
                >
                  Wheat Field Level
                </label>
                <input
                  type="number"
                  id="wheat-field-level"
                  onChange={(e) => setWheatFarmersPerWheatField(e.target.value)}
                  className="p-2 border rounded border-orange-500 bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="farm-level"
                  className="w-36 inline-block text-orange-300 mb-2"
                >
                  Farm Level
                </label>
                <input
                  type="number"
                  id="farm-level"
                  onChange={(e) => setFarmersPerFarm(e.target.value)}
                  className="p-2 border rounded border-orange-500 bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="double-farm"
                  className="w-36 inline-block text-orange-300 mb-2"
                >
                  Double Farm
                </label>
                <input
                  type="checkbox"
                  id="double-farm"
                  onChange={(e) => setDoubleFarm(e.target.checked)}
                  className="ml-2 transform scale-125 text-orange-500 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-teal-700">
                <thead>
                  <tr>
                    <th className="border border-teal-600 px-4 py-2 bg-teal-900 text-teal-300">
                      Wheat Fields Count
                    </th>
                    <th className="border border-teal-600 px-4 py-2 bg-teal-900 text-teal-300">
                      Farms Count
                    </th>
                    <th className="border border-teal-600 px-4 py-2 bg-teal-900 text-teal-300">
                      Gains by Worker
                    </th>
                    <th className="border border-teal-600 px-4 py-2 bg-teal-900 text-teal-300">
                      Gains by All Workers
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dom.map((item, index) => (
                    <tr key={index} className="hover:bg-teal-800">
                      <td className="border border-teal-600 px-4 py-2 text-teal-300">
                        {item["wheat-fields-count"]}
                      </td>
                      <td className="border border-teal-600 px-4 py-2 text-teal-300">
                        {item["farms-count"]}
                      </td>
                      <td className="border border-teal-600 px-4 py-2 text-teal-300">
                        {item["gainsByWorker"]}
                      </td>
                      <td className="border border-teal-600 px-4 py-2 text-teal-300">
                        {item["gainsByAllWorkers"]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
