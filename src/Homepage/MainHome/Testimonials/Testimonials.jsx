import React from "react";

function Testimonials() {
  return (
    <div>
      <div className="py-16 white">
        <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
          <h2 className="mb-12 text-center text-2xl text-gray-900 font-bold md:text-4xl">
            What our customers say
          </h2>
          <div className="grid gap-8 md:grid-rows-2 lg:grid-cols-2">
            <div className="row-span-2 p-6 border border-gray-100 rounded-xl bg-gray-50 text-center sm:p-8">
              <div className="h-full flex flex-col justify-center space-y-4">
                <img
                  className="w-20 h-20 mx-auto rounded-full"
                  src="https://tailus.io/sources/blocks/grid-cards/preview/images/avatars/second_user.webp"
                  alt="user avatar"
                  height="220"
                  width="220"
                  loading="lazy"
                />
                <p className="text-gray-600 md:text-xl">
                  <span className="font-serif">&quot;</span> Jobifinder helped
                  me land my dream job in no time! The user interface is
                  intuitive and the job recommendations are spot on. I couldn't
                  be happier with the service.{" "}
                  <span className="font-serif">&quot;</span>
                </p>
                <div>
                  <h6 className="text-lg font-semibold leading-none">
                    Sarah Johnson
                  </h6>
                  <span className="text-xs text-gray-500">Lawn Mower</span>
                </div>
              </div>
            </div>

            <div className="p-6 border border-gray-100 rounded-xl bg-gray-50 sm:flex sm:space-x-8 sm:p-8">
              <img
                className="w-20 h-20 mx-auto rounded-full"
                src="https://tailus.io/sources/blocks/grid-cards/preview/images/avatars/first_user.webp"
                alt="user avatar"
                height="220"
                width="220"
                loading="lazy"
              />
              <div className="space-y-4 mt-4 text-center sm:mt-0 sm:text-left">
                <p className="text-gray-600">
                  <span className="font-serif">"</span> The notifications and
                  updates from Jobifinder kept me on top of my job search. It's
                  incredibly easy to apply for jobs and track my applications.
                  Highly recommended! <span className="font-serif">"</span>
                </p>
                <div>
                  <h6 className="text-lg font-semibold leading-none">
                    Mark Thompson
                  </h6>
                  <span className="text-xs text-gray-500">Plumber</span>
                </div>
              </div>
            </div>
            <div className="p-6 border border-gray-100 rounded-xl bg-gray-50 sm:flex sm:space-x-8 sm:p-8">
              <img
                className="w-20 h-20 mx-auto rounded-full"
                src="https://tailus.io/sources/blocks/grid-cards/preview/images/avatars/third_user.webp"
                alt="user avatar"
                height="220"
                width="220"
                loading="lazy"
              />
              <div className="space-y-4 mt-4 text-center sm:mt-0 sm:text-left">
                <p className="text-gray-600">
                  <span className="font-serif">"</span> As an employer,
                  Jobifinder has made it incredibly easy to find qualified
                  candidates. The platform is efficient and user-friendly. We
                  have filled multiple positions with great hires.{" "}
                  <span className="font-serif">"</span>
                </p>
                <div>
                  <h6 className="text-lg font-semibold leading-none">
                    Emily Davis
                  </h6>
                  <span className="text-xs text-gray-500">House Cleaner</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
