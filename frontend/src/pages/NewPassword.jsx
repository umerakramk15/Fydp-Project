import { Link } from "react-router";

const NewPassword = () => {
  return (
    <>
      <section className="">
        <div className="mx-auto max-w-screen-xl px-4 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <div className="flex justify-center items-center">
              <img src="change_pass.png" className="w-48 h-48" alt="" />
            </div>
            <h1 className="text-3xl font-extrabold">Change Your Password</h1>

            <p className="mt-4">
              Enter a new password below to change your password
            </p>

            <form action="#" className="mt-8">

              <div className="text-start">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium "
                >
                  {" "}
                  Enter new Password{" "}
                </label>

                <input
                  type="password"
                  id="Password"
                  name="password"
                  className="w-full rounded border-gray-500 border-b p-2 bg-transparent outline-none text-sm shadow-sm mb-4"
                />
              </div>

              <div className="text-start">
                <label
                  htmlFor="PasswordConfirmation"
                  className="block text-sm font-medium "
                >
                 Confirm Password
                </label>

                <input
                  type="password"
                  id="PasswordConfirmation"
                  name="password_confirmation"
                  className="w-full rounded border-gray-500 border-b p-2 bg-transparent outline-none text-sm shadow-sm"
                />
              </div>
            </form>

            <div>
              <a
                className="group mt-4 relative inline-block overflow-hidden border border-indigo-600 px-8 py-3 focus:outline-none focus:ring"
                href="#"
              >
                <span className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>

                <span className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white">
                  Change Password
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewPassword;
