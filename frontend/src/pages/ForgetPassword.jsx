import { MdOutlineMailLock } from "react-icons/md";
import { Link } from "react-router";

const ForgetPassword = () => {
  return (
    <>
      <section className="">
        <div className="mx-auto max-w-screen-xl px-4 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <div className="flex justify-center items-center">
              <img src="forget_password.png" alt="" />
            </div>
            <h1 className="text-3xl font-extrabold">Forgot Your Password</h1>

            <p className="mt-4">
              Enter your email or mobile and we'll help you reset your password
            </p>
            <input
              type="text"
              className="mt-4 w-full bg-gray-200 p-2 text-center outline-none"
              placeholder="Enter your Email or Mobile Number"
            />

            <div>
              <Link
                className="group mt-4 relative inline-block overflow-hidden border border-indigo-600 px-8 py-3 focus:outline-none focus:ring"
                to={"/enter-new-password"}
              >
                <span className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>

                <span className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white">
                  Continue
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgetPassword;
