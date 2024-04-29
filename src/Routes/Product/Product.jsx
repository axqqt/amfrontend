import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Product = () => {
  const { id } = useParams();
  const [Data, setData] = useState([])

  useEffect(() => {
    axios.get(async (req, res) => {

        if (!id) return res.status(400).json({ Alert: "ID Required" });
    
        const theItem = await mainModel.findById(id);
        if (!theItem) {
          return res.status(404).json({ Alert: "Item doesn't exist!" });
        } else {
          return res.status(200).json(theItem);
        }
      });
  })
  

  return (
    <section className="h-screen">
      <div className="container">
            <div className="text-white">
                <h1>{Data.title}</h1>
                <p>{Data.description}</p>
            </div>
      </div>
    </section>
  );
};

export default Product;