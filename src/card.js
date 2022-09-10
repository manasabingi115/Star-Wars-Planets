import React from "react";

export default function Card({ filteredData }) {
    return (
        <div className="cards-parent-div columns is-multiline">
            {filteredData?.map((el, index) => <div key={index} className="card-parent column is-one-third">
                <div class="card">
                    <div class="card-content ">
                        <div class="content ">
                            <p>Name: {el.name}</p>
                            <p>Terrain: {el.terrain}</p>
                            <p>Climate: {el.climate}</p>
                            <p>Population: {el.population}</p>
                            <p>Residents: {el.residents.length}</p>
                        </div>
                    </div>
                </div>
            </div>)}
        </div>
    )
}