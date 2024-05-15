/* eslint-disable no-empty-pattern */
import { UserContext } from "@/App";
import { useContext } from "react";

/* eslint-disable no-unused-vars */
const Affiliates = () => {
  const {} = useContext(UserContext);

  async function Affiliates() {}

  return (
    <div>
      <h1>Affiliates</h1>
      <div className="container"></div>
    </div>
  );
};

export default Affiliates;
