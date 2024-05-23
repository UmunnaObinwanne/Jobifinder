function Hero() {
  return (
    <>
      <div className="relative my-20 flex w-full flex-col items-center sm:mt-14 bg-base-100 shadow-md">
        <a
          target="_blank"
          rel="noreferrer"
          href="#"
          className="mx-auto flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-all hover:bg-blue-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 248 204"
            className="h-5 w-5 text-[#1d9bf0]"
          >
            <path
              fill="currentColor"
              d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07 7.57 1.46 15.37 1.16 22.8-.87-23.56-4.76-40.51-25.46-40.51-49.5v-.64c7.02 3.91 14.88 6.08 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71c25.64 31.55 63.47 50.73 104.08 52.76-4.07-17.54 1.49-35.92 14.61-48.25 20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26-3.77 11.69-11.66 21.62-22.2 27.93 10.01-1.18 19.79-3.86 29-7.95-6.78 10.16-15.32 19.01-25.20 26.16z"
            ></path>
          </svg>
          <p className="text-sm font-semibold text-[#1d9bf0]">
            New Job Listings Available!
          </p>
        </a>
        <h1 className="mt-8 max-w-sm bg-gradient-to-br from-gray-500 via-teal-500 to-gray-500 bg-clip-text text-center text-4xl font-extrabold text-transparent sm:max-w-4xl sm:text-6xl">
          Find Your Next Blue-Collar Job
        </h1>
        <span className="mt-8 max-w-lg text-center text-xl leading-relaxed text-gray-800">
          Explore top job listings tailored for skilled blue-collar workers.
          Connect with employers and secure your future today.
        </span>
        <p className="mt-3 rounded border px-3 py-1 shadow">
          🎁 <span className="text-accent font-semibold">Special Offer</span>:
          Get premium access for{" "}
          <span className="text-accent font-semibold">$10</span> for the first
          month!
        </p>
        <div className="mt-12 my-12  grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-0 sm:gap-x-4">
          <a
            href="https://example.com/new-feature"
            className="btn flex flex-row items-center justify-center gap-x-2 rounded-lg text-white px-10 py-3 bg-teal-500"
          >
            <svg
              className="h-[30px] text-white"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              strokeWidth="3"
              stroke="#000000"
              fill="none"
            >
              <path d="M14,39.87,24.59,50.51s33-14,31.23-42.29C55.82,8.22,29.64,4.28,14,39.87Z"></path>
              <path d="M44.69,9.09a12.3,12.3,0,0,0,3.48,6.73,12.31,12.31,0,0,0,7,3.52"></path>
              <circle cx="39.46" cy="24.56" r="6.2"></circle>
              <path d="M14.89,37.82l-5.3.68a.27.27,0,0,1-.28-.37l3.93-9a2.65,2.65,0,0,1,1.88-1.53l6.59-1.38"></path>
              <path d="M26.55,49.4l-.69,5.3a.27.27,0,0,0,.37.28l9-3.92a2.69,2.69,0,0,0,1.53-1.89l1.38-6.59"></path>
              <path d="M22.21,48.13c-2.37,7.41-14.1,7.78-14.1,7.78S8,44.51,15.76,41.67"></path>
            </svg>
            Explore Jobs
          </a>
          <a
            href="#demo"
            className="btn flex flex-row items-center justify-center gap-x-2 rounded-lg border border-teal-500 px-10 py-3 text-teal-500"
          >
            Learn More →
          </a>
        </div>
      </div>
    </>
  );
}

export default Hero;
