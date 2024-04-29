import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { Button } from "@/components/ui/button";

const Nav = () => {
  const { company } = useContext(UserContext);

  function Logout() {
    localStorage.removeItem("company");
    window.location.reload();
  }

  return (
    <nav className="py-5 w-full lg:px-24">
      <div className="container hidden md:flex">
        <div className="flex justify-between gap-6 items-center w-full">
          <Link to="/">
            <div className="flex justify-between items-center">
              <div>
                <img src="/download.png" alt="logo" width={50} className="" />
              </div>
              <div>
                <h1 className="text-white font-bold">Affiliated</h1>
              </div>
            </div>
          </Link>

          <div className="flex justify-between items-center gap-6">
            <Link
              className="text-white bg-transparent hover:text-muted"
              to="/procedure"
            >
              How to get started?
            </Link>
            <Link to="/register" className="flex w-auto">
              <Button variant={"white"}>Become a member</Button>
            </Link>
            <Link to="/login">
              <Button variant={"outline"}>Sign in</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="container md:hidden flex">
        <div className="flex justify-between gap-6 items-center w-full">
          
            <div className="flex gap-6 w-full justify-between items-center">
              <Link to={"/"}>
              <div>
                <img width="50" height="50" src="/download.png" alt="menu--v6"/>
              </div>
              </Link>
              <div>
                <Link to="/register" className="flex w-full">
                  <Button variant={"whiteMobile"}>Become a member</Button>
                </Link>
              </div>
            </div>
       
        </div>
      </div>

      
    </nav>
  );
};

export default Nav;
