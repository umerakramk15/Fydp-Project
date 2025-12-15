import { MdOutlineMailLock } from "react-icons/md";

const ConfirmationCode = () => {
  return (
    <>
      <section className="">
        <div className="mx-auto max-w-screen-xl px-4 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <div className="flex justify-center items-center">
              <MdOutlineMailLock className="text-9xl text-gray-700" />
            </div>
            <h1 className="text-3xl font-extrabold">
              Verify Your Email Address
            </h1>

            <p className="mt-4 sm:text-sm/relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
              illo tenetur fuga ducimus numquam ea!
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <input
                type="text"
                name=""
                id=""
                className="bg-gray-300 outline-none w-10 h-10 sm:w-14 sm:h-14 p-2 text-center text-lg font-bold"
              />
              <input
                type="text"
                name=""
                id=""
                className="bg-gray-300 outline-none w-10 h-10 sm:w-14 sm:h-14  p-2 text-center text-lg font-bold"
              />
              <input
                type="text"
                name=""
                id=""
                className="bg-gray-300 outline-none w-10 h-10 sm:w-14 sm:h-14 p-2 text-center text-lg font-bold"
              />
              <input
                type="text"
                name=""
                id=""
                className="bg-gray-300 outline-none w-10 h-10 sm:w-14 sm:h-14 p-2 text-center text-lg font-bold"
              />
              <input
                type="text"
                name=""
                id=""
                className="bg-gray-300 outline-none w-10 h-10 sm:w-14 sm:h-14  p-2 text-center text-lg font-bold"
              />
              <input
                type="text"
                name=""
                id=""
                className="bg-gray-300 outline-none w-10 h-10 sm:w-14 sm:h-14  p-2 text-center text-lg font-bold"
              />
            </div>

            <a
              className="group mt-4 relative inline-block overflow-hidden border border-indigo-600 px-8 py-3 focus:outline-none focus:ring"
              href="#"
            >
              <span className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>

              <span className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white">
                Verify Email
              </span>
            </a>

            <a href="" className="mt-2 block text-sm underline">Resend Code</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default ConfirmationCode;
