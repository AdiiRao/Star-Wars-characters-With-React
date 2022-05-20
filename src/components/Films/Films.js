import React, { useState } from "react";
import { useQuery } from "react-query";

import Film from "./Film";

import Loader from "../Loader";
import SearchBar from "../SearchBar";


////////////  async function of fetching data of films from api  //////////

const fetchFilms = async () => {
  const res = await fetch(`https://swapi.dev/api/films/`);
  return res.json();
};

const Films = () => {


  //////////////   useQuery to get data of films asynchronously by providing config (like: staleTime and cacheTime)  ////////////

  const { data, status } = useQuery("films", fetchFilms, {
    onSuccess: () => console.log("Films Data feched successfully"),
    onError: () => console.log("Error while fetching data of films"),
  });

  const [searchValue, setSearchValue] = useState("");
  const filterNames = ({ title }) => {

    return title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
  };


  return (
    <>
      <h2>Films</h2>

      <SearchBar onSearch={setSearchValue} value={searchValue} />

      {status === "loading" ? (
        <Loader />
      ) : status === "error" ? (
        <div> Error fetching data</div>
      ) : status === "success" ? (

        data.results.filter(filterNames).map((film) => <Film key={film.title} film={film} />)

      ) : null}




    </>
  );
};

export default Films;
