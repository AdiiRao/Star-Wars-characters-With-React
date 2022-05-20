import React, { useState } from "react";
import { useQuery } from "react-query";

import Starship from "./Starship";

import Loader from "../Loader";
import SearchBar from "../SearchBar";

////////////  async function of fetching data of starships from api  //////////

const fetchStarships = async (page) => {
  const res = await fetch(`https://swapi.dev/api/starships/?page=${page}`);
  return res.json();
};

const Starships = () => {
  const [page, setPage] = useState(1);

  //////////////   useQuery to get data of starships asynchronously by providing config (like: staleTime and cacheTime)  ////////////

  const { data, status, isPreviousData } = useQuery(
    ["starships", page],
    () => fetchStarships(page),
    { keepPreviousData: true },
    {
      onSuccess: () => console.log("Starships Data feched successfully"),
      onError: () => console.log("Error while fetching data of Starships"),
    }
  );

  const [searchValue, setSearchValue] = useState("");
  const filterNames = ({ name }) => {

    return name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
  };

  return (
    <>
      <h2>Starships</h2>

      <SearchBar onSearch={setSearchValue} value={searchValue} />

      {status === "loading" ? (
        <Loader />
      ) : status === "error" ? (
        <div> Error fetching data</div>
      ) : status === "success" ? (
        <div>
          <div>
            <div className="pagination">
              <button
                className="pagination__left"
                onClick={() => setPage((old) => Math.min(old - 1, old))}
                disabled={page === 1}
              >
                Previous
              </button>
              <span>{page}</span>
              <button
                className="pagination__right"
                onClick={() => {
                  if (!isPreviousData) {
                    setPage((old) => old + 1);
                  }
                }}
                disabled={!data.next}
              >
                Next
              </button>
            </div>
            {data.results.filter(filterNames).map((starship) => (
              <Starship key={starship.name} starship={starship} />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Starships;
