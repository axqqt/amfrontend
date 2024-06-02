/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";

export function Logout() {
  localStorage.removeItem("company");
  localStorage.removeItem("user");
  window.location.reload();
}

const Nav = () => {
  const { company, user } = useContext(UserContext);
  const location = useLocation();

  const isBaseRoute = location.pathname === "/";

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
            {company && company.gmail && (
              <>
                <Link to="/create" className="flex w-auto">
                  <Button className="flex justify-between gap-2 items-center text-white">
                    <img
                      width="24"
                      height="24"
                      src="https://img.icons8.com/windows/32/FFFFFF/add--v1.png"
                      alt="add--v1"
                    />
                    Add Listing
                  </Button>
                </Link>
                <Link to="/companydashboard">
                  <Button variant={"whiteMobile"}>Dashboard</Button>
                </Link>
              </>
            )}
            {user && user.gmail && (
              <>
                <Link to="/dashboard">
                  <Button variant={"whiteMobile"}>Dashboard</Button>
                </Link>
                <Link to="/mybasket">
                  <Button variant={"whiteMobile"}>My Basket</Button>
                </Link>
              </>
            )}
            {!company && !user && (
              <>
                <Link to="/register" className="flex w-full">
                  <Button variant={"whiteMobile"}>Become a member</Button>
                </Link>
                <Link to="/login">
                  <Button variant={"outline"}>Sign in</Button>
                </Link>
                <Link to="/company">
                  <Button variant={"whiteMobile"}>Company Registration</Button>
                </Link>
              </>
            )}
            {(company && company.gmail) || (user && user.gmail) ? (
              <button
                onClick={Logout}
                className={buttonVariants({ variant: "outline" })}
              >
                Sign out
              </button>
            ) : null}
            {isBaseRoute && (
              <a href="#feedback">
                <Button variant={"whiteMobile"}>Feedback</Button>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="container md:hidden flex">
        <div className="flex justify-between gap-6 items-center w-full">
          <div className="flex gap-6 w-full justify-between items-center">
            <Link to="/">
              <div>
                <img
                  width="50"
                  height="50"
                  src="/download.png"
                  alt="menu--v6"
                />
              </div>
            </Link>
            <div className="flex justify-between gap-3">
              {company && company.gmail && (
                <>
                  <Link to="/create" className="flex w-auto">
                    <Button className="flex justify-between gap-2 items-center text-white">
                      <img
                        width="32"
                        height="32"
                        src="https://img.icons8.com/windows/32/FFFFFF/add--v1.png"
                        alt="add--v1"
                      />
                      Add Listing
                    </Button>
                  </Link>
                  <Link to="/companydashboard">
                    <Button variant={"whiteMobile"}>Dashboard</Button>
                  </Link>
                </>
              )}
              {user && user.gmail && (
                <>
                  <Link to="/dashboard">
                    <Button variant={"whiteMobile"}>Dashboard</Button>
                  </Link>
                  <Link to="/mybasket">
                    <Button variant={"whiteMobile"}>My Basket</Button>
                  </Link>
                </>
              )}
              {!company && !user && (
                <>
                  <Link to="/register" className="flex w-full">
                    <Button variant={"whiteMobile"}>Become a member</Button>
                  </Link>
                  <Link to="/login">
                    <Button variant={"outline"}>Sign in</Button>
                  </Link>
                  <Link to="/company">
                    <Button variant={"whiteMobile"}>Company Registration</Button>
                  </Link>
                </>
              )}
              {(company && company.gmail) || (user && user.gmail) ? (
                <button
                  onClick={Logout}
                  className={buttonVariants({ variant: "outline" })}
                >
                  Sign out
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
