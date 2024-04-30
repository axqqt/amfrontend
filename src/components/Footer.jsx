import { Button } from "./ui/button"
import { Link } from "react-router-dom"
function Footer() {
  return (
    <section className='w-full border-t border-border mt-5 pt-12 md:px-24 pb-5'>
        <div className="container justify-between h-full items-center">

        <div className='flex flex-col md:justify-between justify-center items-stretch w-full'>
            <div className='flex flex-col  md:justify-between justify-center items-center'>
                <div className='flex flex-col justify-center md:justify-between w-full items-center'>
                        <img src="/download.png" alt="logo" width={150}/>
                        <h1 className="text-white text-xl font-bold">Affiliated</h1>
                </div>
                <div className="flex flex-col justify-center items-center">
                   <h1 className="text-muted text-center">The place where products get viral.</h1> 
                   <Link to="/register" className="mt-5 mb-5"><Button variant={"white"}>Become a member</Button></Link>
                </div>
                
            </div>
            <div className="flex justify-between items-start gap-6">
                <div className="flex flex-col justify-between items-start">
                    <h1 className="text-white font-bold mb-5">AFFILIATED</h1>
                    <Link to="/contact" className="text-muted mt-2 hover:text-white transition-all">Contact Us</Link>
                    <Link to="/procedure" className="text-muted mt-2 hover:text-white transition-all">How to get started?</Link>
                    
                </div>
                <div className="flex flex-col justify-between items-start">
                    <h1 className="text-white font-bold mb-5">ACCOUNT</h1>
                    <Link to="/login" className="text-muted mt-2 hover:text-white transition-all">Sign in</Link>
                    <a href="#feedback" className="text-muted mt-2 hover:text-white transition-all">Feedback</a>
                    
                </div>
            </div>
        </div>
        <h1 className="text-white text-center mt-5">© Copyright 2024 Affiliated.</h1>
        </div>
     </section>
  )
}

export default Footer