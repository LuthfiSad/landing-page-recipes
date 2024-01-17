import React from "react";

const Contact = () => {
  return (
    <div className="flex bg-slate-800 py-10 px-5 justify-center">
      <div
        className="text-white flex xs:flex-row flex-col container justify-center items-center gap-10"
        id="contact"
      >
        <div className="rounded-lg w-full lg:max-w-[400px] xs:max-w-[200px] max-w-md overflow-hidden">
          <img
            className="w-full"
            draggable="false"
            src="https://source.unsplash.com/400x300/?food"
            alt=""
          />
        </div>

        <div className="xs:w-1/2 w-full max-w-xl flex flex-col gap-3">
          <div className="">
            <h1 className="text-4xl font-bold">Contact Us</h1>
            <p className="text-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis,
              excepturi.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="bg-white rounded-lg py-2 px-4 flex-1">
              <input
                type="text"
                className="w-full focus:outline-none text-slate-900"
                placeholder="First Name"
              />
            </div>
            <div className="bg-white rounded-lg py-2 px-4 flex-1">
              <input
                type="text"
                className="w-full focus:outline-none text-slate-900"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="flex">
            <div className="bg-white rounded-lg py-2 px-4 flex-1">
              <input
                type="email"
                className="w-full focus:outline-none text-slate-900"
                placeholder="example@gmail.com"
              />
            </div>
          </div>
          <div className="flex">
            <div className="justify-center rounded-l-lg items-center number flex bg-slate-200 text-slate-900 font-semibold text-md w-14">
              <p>+62</p>
            </div>
            <div className="bg-white rounded-r-lg py-2 px-4 flex-1">
              <input
                type="number"
                className="w-full focus:outline-none text-slate-900"
                placeholder="Phone Number"
              />
            </div>
          </div>
          <div className="flex">
            <div className="bg-white rounded-lg py-2 px-4 flex-1">
              <textarea
                className="w-full focus:outline-none min-h-20 max-h-40 text-slate-900"
                placeholder="Message"
              />
            </div>
          </div>
          <button className="bg-slate-300 text-black font-medium rounded-lg py-2 px-4">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
