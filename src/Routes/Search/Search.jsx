/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { Button } from "@/components/ui/button";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const { company, loading, setLoading, BASE, status, setStatus } =
    useContext(UserContext);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const navigator = useNavigate();

  async function Search(e) {
    e.preventDefault();
    navigator(`/search/${search}`); //search is item
  }

  return (
    <div>
      <div className="md:flex hidden justify-between items-center">
        <form onSubmit={Search} className="flex justify-between mx-6  gap-3">
          <input
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="p-2 rounded-lg"
            placeholder="Search Here..."
            type="text"
          ></input>
          <Button type="submit" disabled={loading}>
            Search...
          </Button>
        </form>
      </div>
      <div className="md:hidden flex">
      <form onSubmit={Search} className="flex flex-col justify-between  gap-3 w-full mt-5">
          <input
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="p-2 rounded-lg bg-slate-900 border border-border"
            placeholder="Search Here..."
            type="text"
          ></input>
          <Button type="submit" disabled={loading}>
            Search...
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Search;
