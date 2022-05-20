import React, { useState } from "react";
import { useQuery } from "react-query";

import Planet from "./Planet";

import Loader from "../Loader";
import SearchBar from "../SearchBar";

////////////  async function of fetching data of planets from api  //////////

const fetchPlanets = async (page) => {
  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  console.log(res);
  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);

  //////////////   useQuery to get data of planets asynchronously by providing config (like: staleTime and cacheTime)  ////////////

  const { data, status, isPreviousData } = useQuery(
    ["planets", page],
    () => fetchPlanets(page),
    { keepPreviousData: true },
    {
      onSuccess: () => console.log("Planets Data feched successfully"),
      onError: () => console.log("Error while fetching data of Planets"),
    }
  );
  console.log(data);

  const [searchValue, setSearchValue] = useState("");
  const filterNames = ({ name }) => {

    return name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
  };


  return (
    <>
      <h2>Planets</h2>

      {status === "loading" ? (
        <Loader />
      ) : status === "error" ? (
        <div> Error fetching data</div>
      ) : status === "success" ? (
        <div>


      <SearchBar onSearch={setSearchValue} value={searchValue} />

      <div className="pagination">
            <button
              className="pagination__prev"
              onClick={() => setPage((old) => Math.min(old - 1, old))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>{page}</span>
            <button
              className="pagination__next"
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

      <ul>
        {data.results.filter(filterNames).map((user) => {
          return <Planet key={user.name} planet={user} />
        })}
      </ul>
        </div>
      ) : null}
    </>
  );
};

export default Planets;
