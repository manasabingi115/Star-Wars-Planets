import React from "react";
import './App.css';
import Card from "./card";
import Pagination from "./Pagination";

function App() {

  const [data, setData] = React.useState([]);
  const [name, setName] = React.useState("");
  const [selectedClimate, setSelectedClimate] = React.useState();
  const [selectedTerrain, setSelectedTerrain] = React.useState();
  const [selectedSort, setSelectedSort] = React.useState();


  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://api.npoint.io/270586cbeff76bfd2ea2`);
      const newData = await response.json();
      setData(newData);
    };

    fetchData();
  }, []);



  let filteredData = data;

  const climateData = [...new Set(filteredData.map((el) => el.climate.split(", ")).flat())];
  const terrainData = [...new Set(filteredData.map((el) => el.terrain.split(", ")).flat())];

  if (name) {
    filteredData = filteredData.filter((el) =>
      el.name.toLowerCase().startsWith(name.toLowerCase())
    );
  }

  if (selectedClimate) {
    if (selectedClimate === "All Climates") {
      filteredData = filteredData;
    } else {
      filteredData = filteredData.filter((el) => el.climate.includes(selectedClimate));
    }
  }

  if (selectedTerrain) {
    if (selectedTerrain[0] === "All Terrains") {
      filteredData = filteredData;
    } else {
      let filteredTerrainData = selectedTerrain?.map((val) => filteredData.filter((el) => el.terrain.includes(val)))
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

  function handleChangeSelectMultiple(e) {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setSelectedTerrain(value);
  }

const dataLimit= 9;

const pages = Math.round(filteredData?.length / dataLimit);

const [currentPage, setCurrentPage] = React.useState(1);
const pageNumbers = [];

for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
}

const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
}

const goToPreviousPage = () => {
    setCurrentPage((page) => page - 1);
}

const changePage = (number) => {
    const pageNumber = Number(number);
    setCurrentPage(pageNumber);
}

const startIndex = currentPage * dataLimit - dataLimit;
const endIndex = startIndex + dataLimit;

const paginatedData = filteredData.slice(startIndex, endIndex);

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
        <select className="filter-inputs-multiselect" multiple={true} name="terrain" value={selectedTerrain} onChange={(e) => handleChangeSelectMultiple(e)} >
          <option value="All Terrains">All Terrains</option>
          {terrainData.map((el, index) => <option key={index} value={el}>{el} </option>)}
        </select>
        <div className="sort-filter">
          <label htmlFor="sort" className="sort-label">Sort by:  </label>
          <select className="filter-inputs" name="sort" value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)}>
            <option>---Choose---</option>
            <option>Name</option>
            <option>Population</option>
            <option>Residents</option>
          </select>
        </div>
      </div>

      <Card filteredData={paginatedData} />
      <Pagination filteredData={filteredData} goToNextPage={goToNextPage} goToPreviousPage={goToPreviousPage} 
      changePage={changePage} currentPage={currentPage} pageNumbers={pageNumbers}
      />

    </div>
  );
}

export default App;
