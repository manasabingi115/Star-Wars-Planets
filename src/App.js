import React from "react";
import './App.css';
import data from "./Data.js";
import Card from "./card";
import Pagination from "./pagination";

function App() {

  const [name, setName] = React.useState("");
  const [selectedClimate, setSelectedClimate] = React.useState();
  const [selectedTerrain, setSelectedTerrain] = React.useState();
  const [selectedSort, setSelectedSort] = React.useState();

  // console.log(selectedTerrain);

  let filteredData = data.results;

  const climateData = [...new Set(filteredData.map((el) => el.climate))];
  const terrainData = [...new Set(filteredData.map((el) => el.terrain))];
  // const residenceData = [...new Set(filteredData.map((el) => el.residents.length))];

  // console.log(residenceData);

  if (name) {
    filteredData = filteredData.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (selectedClimate) {
    filteredData = filteredData.filter((el) => el.climate == selectedClimate);
  }

  if (selectedTerrain) {
    let filteredTerrainData = selectedTerrain?.map((val) => filteredData.filter((el) => el.terrain == val))
    filteredData = filteredTerrainData.flat();
    console.log(filteredData);
  }


  if (selectedSort == "Name") {
    filteredData.sort(function (a, b) {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      return 0;
    })
  }
  if (selectedSort == "Population") {
    filteredData.sort((a, b) => (a.population > b.population) ? 1 : -1)
  }
  if (selectedSort == "Residents") {
    filteredData.sort((a, b) => (a.residents.length > b.residents.length) ? 1 : -1)
  }


  function HandleChangeSelectMultiple(e) {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setSelectedTerrain(value);
  }

  return (
    <div className="App">
      <h1 align="center">Star Wars</h1>

      <div className="filters-container">
        <input type="text" placeholder="Search by name..." value={name} onChange={(e) => setName(e.target.value)}></input>
        <select name="climate" value={selectedClimate} onChange={(e) => setSelectedClimate(e.target.value)}>
          {climateData.map((el, index) => <option key={index} value={el}>{el} </option>)}
        </select>
        <select multiple={true} name="terrain" value={selectedTerrain} onChange={(e) => HandleChangeSelectMultiple(e)} >
          {terrainData.map((el, index) => <option key={index} value={el}>{el} </option>)}
        </select>
        <div>
          <label htmlFor="sort">Sort by:</label>
          <select name="sort" value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)}>
            <option>---Choose---</option>
            <option>Name</option>
            <option>Population</option>
            <option>Residents</option>
          </select>
        </div>
      </div>

      < Card filteredData={filteredData}/>
      {/* <Pagination filteredData={filteredData} dataLimit={6}/> */}
    </div>
  );
}

export default App;
