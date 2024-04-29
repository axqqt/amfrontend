import { Button } from "./ui/button";
import { Link } from "react-router-dom";
function HeroSection() {
  return (
    <section className="w-full px-24 border-b border-border">
      <div className="container py-5">
        <div className="flex justify-center items-center w-full gap-6 bg-[url('/bg.jpg')] bg-cover p-12 rounded-2xl">
          <div className="flex flex-col justify-between items-center gap-3 ">
            <p className="text-muted">WELCOME TO AFFILIATED!</p>
            <h1 className="text-white text-5xl font-bold">
              Get Your Products Viral! 💸
            </h1>
            <h2 className="text-muted text-center text-3xl">
              Sell your affiliate products through <br /> affiliated and get
              Sales!
            </h2>
            <div className="flex justify-center items-center gap-6 mt-5">
              <Link to="/procedure"><Button>Get Started</Button></Link>
              <a href="#products" className="transition-all"><Button variant="outline">Explore Products</Button></a>
            </div>
          </div>
          {/* <div>
            <img
              src="/bg.jpg"
              alt="background"
              width={400}
              className="rounded-2xl"
            />
          </div> */}
        </div>
        HeroSection
      </div>
    </section>
  );
}

export default HeroSection;
