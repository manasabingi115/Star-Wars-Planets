import React from "react";

export default function Card({ filteredData }) {
    return (
        <div className="cards-parent-div columns is-multiline">
            {filteredData?.map((el, index) => <div key={index} className="card-parent column is-one-third">
                <div className="card">
                    <div className="card-content ">
                        <div className="content ">
                            <p><strong>Name:  </strong> {el.name}</p>
                            <p><strong>Terrain:  </strong> {el.terrain}</p>
                            <p><strong>Climate:  </strong> {el.climate}</p>
                            <p><strong>Population:  </strong> {el.population}</p>
                            <p><strong>Residents:  </strong> {el.residents.length}</p>
                        </div>
                    </div>
                </div>
            </div>)}
        </div>
    )
}