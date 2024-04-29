import React from "react";

function Contact() {
  return (
    <section className="h-screen flex flex-col justify-center items-center w-full p-24">
      <div className="container">
        <div className="flex flex-col justify-between items-center gap-6 h-full">
            <div className="flex flex-col gap-5 items-center">
                <h1 className="text-5xl text-white text-center font-bold">We are here to help <br /> you level up.</h1>
                <p className="text-muted">Contact us for any queries or feedback.</p>
            </div>
            <div className="mx-auto items-center justify-center text-center">
                <h1 className="text-xl text-white">Contact us using these Emails:</h1>
                <a href="mailto:imveloxal@gmail.com" className="text-lg text-primary underline hover:text-muted transition-all">imveloxal@gmail.com</a> <br />
                <a href="mailto:hello@binukads.me" className="text-lg text-primary underline  hover:text-muted transition-all">hello@binukads.me</a>
            </div>
        </div>  
        </div>
      
    </section>
  );
}

export default Contact;
