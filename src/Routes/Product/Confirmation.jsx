import { Link, useParams } from "react-router-dom";

const Confirmation = () => {
  const { id } = useParams();

  return (
    <div style={{color:"white",margin:"20px"}}>
      <h1>Thanks You for your order!</h1>
      <div className="order" style={{margin:"40px"}}>
        <h1>Your order number is {id}</h1>
      </div>
      <Link to={"/"}>Go back home? 😎</Link>
    </div>
  );
};

export default Confirmation;
