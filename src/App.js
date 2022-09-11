import React from "react";
import './App.css';
import Card from "./card";
import Pagination from "./pagination";

function App() {

  const [data, setData] = React.useState([]);
  const [name, setName] = React.useState("");
  const [selectedClimate, setSelectedClimate] = React.useState();
  const [selectedTerrain, setSelectedTerrain] = React.useState();
  const [selectedSort, setSelectedSort] = React.useState();

  // console.log(selectedClimate)


  // fetch("https://api.npoint.io/270586cbeff76bfd2ea2")
  //   .then((data) => data.json())
  //   .then((data) => setData(data))
  //   .catch(e => console.error(e));


  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://api.npoint.io/270586cbeff76bfd2ea2`);
      const newData = await response.json();
      setData(newData);
    };

    fetchData();
  }, []);



  let filteredData = data;

  // console.log(filteredData)

  const climateData = [...new Set(filteredData.map((el) => el.climate))];
  const terrainData = [...new Set(filteredData.map((el) => el.terrain))];



  if (name) {
    filteredData = filteredData.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (selectedClimate) {
    if (selectedClimate === "All Climates") {
      filteredData = filteredData;
    } else {
      filteredData = filteredData.filter((el) => el.climate === selectedClimate);
    }
  }

  if (selectedTerrain) {
    if (selectedTerrain[0] === "All Terrains") {
      filteredData = filteredData;
    } else {
      let filteredTerrainData = selectedTerrain?.map((val) => filteredData.filter((el) => el.terrain === val))
      filteredData = filteredTerrainData.flat();
    }

  }


  if (selectedSort === "Name") {
    filteredData.sort(function (a, b) {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      return 0;
    })
  }
  if (selectedSort === "Population") {
    filteredData.sort((a, b) => (a.population > b.population) ? 1 : -1)
  }
  if (selectedSort === "Residents") {
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
      <div className="title">
        <h1 align="center">Star Wars</h1>
      </div>

      <div className="filters-container">
        <input className="filter-inputs" type="text" placeholder="Search by name..." value={name} onChange={(e) => setName(e.target.value)}></input>
        <select className="filter-inputs" name="climate" value={selectedClimate} onChange={(e) => setSelectedClimate(e.target.value)}>
          <option value="All Climates">All Climates</option>
          {climateData.map((el, index) => <option key={index} value={el}>{el} </option>)}
        </select>
        <select className="filter-inputs-multiselect" multiple={true} name="terrain" value={selectedTerrain} onChange={(e) => HandleChangeSelectMultiple(e)} >
          <option value="All Terrains">All Terrains</option>
          {terrainData.map((el, index) => <option key={index} value={el}>{el} </option>)}
        </select>
        <div>
          <label htmlFor="sort">Sort by:  </label>
          <select className="filter-inputs" name="sort" value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)}>
            <option>---Choose---</option>
            <option>Name</option>
            <option>Population</option>
            <option>Residents</option>
          </select>
        </div>
      </div>

      < Card filteredData={filteredData && filteredData} />
      < Pagination filteredData={filteredData && filteredData} dataLimit={6} />

    </div>
  );
}

export default App;
