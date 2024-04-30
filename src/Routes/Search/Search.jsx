/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { Button } from "@/components/ui/button";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams] = useSearchParams();
  console.log(searchParams.get('sort'));

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
    <div className="">
      <div className="flex justify-center items-start">
        <form onSubmit={Search} className="flex justify-start w-full  gap-3">
          <input
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="p-2 rounded-lg bg-slate-900 border border-border"
            placeholder="Search Products..."
            type="text"
          ></input>
          <Button type="submit" disabled={loading}>
          <img width="15" height="15" src="https://img.icons8.com/ios-glyphs/30/FFFFFF/search--v1.png" alt="search--v1"/>
          </Button>
        </form>
      </div>
      {/* <div className="md:hidden flex">
      <form onSubmit={Search} className="flex flex-col justify-between  gap-3 w-full mt-5">
          <input
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="p-2 rounded-lg bg-slate-900 border border-border"
            placeholder="Search Products..."
            type="text"
          ></input>
          <Button type="submit" disabled={loading}>
            Search...
          </Button>
        </form>
      </div> */}
    </div>
  );
};

export default Search;
