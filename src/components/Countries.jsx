import { useEffect, useState } from "react";
import Article from "./Article";
import { regions } from "../db/data";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const getAllCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        setCountries(data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllCountries();
  }, []);

  useEffect(() => {
    document.title = `All Countries`;
  }, []);

  const searchCountry = async () => {
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${searchText}`
      );
      const data = await res.json();
      setCountries(data);
    } catch (error) {
      console.log("Error while Searching country:", error);
    }
  };

  const filterByRegion = async (region) => {
    if (region === "Search by Select")
      try {
        const res = await fetch(`https://restcountries.com/v3.1/all`);
        const data = await res.json();
        return setCountries(data);
      } catch (error) {
        return console.log("Error while filtering Region:", error);
      }

    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/region/${region}`
      );
      const data = await res.json();
      setCountries(data);
    } catch (error) {
      console.log("Error while filtering Region:", error);
    }
  };

  const handleSearchCountry = (e) => {
    e.preventDefault();
    searchCountry();
  };

  const handleFilterByRegion = (e) => {
    e.preventDefault();
    filterByRegion();
  };
  return (
    <>
      {!countries ? (
        <h1 className="text-gray-900 font-bold uppercase tracking-wide flex items-center justify-center text-center h-screen text-4xl dark:text-white">
          Loading...
        </h1>
      ) : (
        <section className="container mx-auto p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <form
              onSubmit={handleSearchCountry}
              autoComplete="off"
              className="max-w-4xl md:flex-1"
            >
              <input
                className="py-3 px-4 text-gray-600 placeholder-gray-600 w-full outline-none shadow rounded dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-800 dark:focus:bg-gray-700 transition-all duration-200"
                type="text"
                name="search"
                id="search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search for a country by its name"
                required
              />
            </form>

            <form onSubmit={handleFilterByRegion}>
              <select
                name="filter-by-region"
                className="w-52 py-3 px-4 outline-none shadow rounded text-gray-600 dark:text-gray-400 dark:bg-gray-800 dark:focus:bg-gray-700"
                id="filter-by-region"
                value={regions.name}
                onChange={(e) => filterByRegion(e.target.value)}
              >
                {regions?.map((region, index) => (
                  <option key={index} id={region.id} value={region.name}>
                    {region.name}
                  </option>
                ))}
              </select>
            </form>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3  2xl:grid-cols-4">
            {countries &&
              countries.map((country) => (
                <Article key={country.name.common} {...country} />
              ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Countries;
