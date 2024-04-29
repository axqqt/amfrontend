import { Link } from "react-router-dom";
import "./Procedure.css"; // Import CSS file for styling

const Procedure = () => {
  return (
    <section className=" flex flex-col text-white justify-center items-center h-full md:p-24 p-5 gap-6 w-full">
      {" "}
      {/* Apply a class for styling */}
      <h1 className="font-bold text-4xl text-primary text-center">Procedure of Affiliate Marketing</h1>
      <div className="w-full flex flex-col justify-center  items-center gap-6">

        <div className="flex flex-col justify-center  w-full gap-6 p-10 bg-slate-900 shadow-xl shadow-primary rounded-xl border border-border">
          <h2 className="flex items-center text-3xl font-bold ">For Affiliates</h2>
          <ol className="flex flex-col justify-between gap-6">
            <li>
              <strong className="text-xl">1. Choose Your Niche:</strong>
              <p className="text-sm text-muted mt-3">
                Select a niche that aligns with your interests, expertise, and
                audience. This will help you target a specific audience
                effectively.
              </p>
            </li>
            <li>
              <strong className="text-xl">2. Find Affiliate Programs:</strong>
              <p className="text-sm text-muted mt-3">
                Research and identify affiliate programs relevant to your niche
              </p>
            </li>
            <li>
              <strong className="text-xl">3. Create Quality Content:</strong>
              <p className="text-sm text-muted mt-3">
                Develop compelling content such as blog posts, product reviews,
                videos, or social media posts that provide value to your
                audience.
              </p>
            </li>
            <li>
              <strong className="text-xl">4. Promote Products Ethically:</strong>
              <p className="text-sm text-muted mt-3">
                Focus on recommending high-quality products or services that
                genuinely benefit your audience. Build trust by avoiding overly
                promotional tactics.
              </p>
            </li>
            <li>
              <strong className="text-xl">5. Track and Optimize:</strong>
              <p className="text-sm text-muted mt-3">
                Use tracking tools and analytics to monitor the performance of
                your affiliate campaigns. Analyze data to optimize your
                strategies for better results.
              </p>
            </li>
          </ol>
        </div>

        <div className="flex justify-center flex-col w-full gap-6 p-10 mt-5 bg-slate-900  shadow-xl shadow-white rounded-xl border border-border">
          <h2 className="flex items-center text-3xl font-bold">For Companies</h2>
          <ol className="flex flex-col justify-between gap-6">
            <li>
              <strong className="text-xl">
                <Link to={"/register"}>1. Register</Link>
              </strong>
              <p className="text-sm text-muted mt-3">
                Enter in your email address and an email with a link containing
                the login credentials will be sent to your inbox (check spam
                folder)
              </p>
            </li>
            <li>
              <strong className="text-xl">
                <Link to={"/login"}>2. Login</Link>
              </strong>
              <p className="text-sm text-muted mt-3">Login with the credentials given in the email</p>
            </li>
            <li>
              <strong className="text-xl">
                <Link to={"/create"}>3. Add the listing</Link>
              </strong>
              <p className="text-sm text-muted mt-3">
                Include the category , and all the either fields. Then hit
                create!
              </p>
            </li>
            <li>
              <strong className="text-xl">
                <Link to={"/"}>4. Check your listing</Link>
              </strong>
              <p className="text-sm text-muted mt-3">
                Your listing will be mentioned in the homepage , where
                affiliates can discover your company and involve in!
              </p>
            </li>
            <li>
              <strong className="text-xl">5. Track and Optimize:</strong>
              <p className="text-sm text-muted mt-3">
                Use tracking tools and analytics to monitor the performance of
                your affiliate campaigns. Analyze data to optimize your
                strategies for better results.
              </p>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Procedure;
