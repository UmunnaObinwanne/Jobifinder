import { format } from "date-fns";

function JobListingCard({ job }) {
  const { title, company, location, salary, createdAt, sector } = job;

  const formattedSalary = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(salary);

  const formattedDate = createdAt
    ? format(createdAt.toDate(), "MMMM d, yyyy h:mm aa")
    : "Posted date not available";

  return (
    <div className="bg-white shadow-xl shadow-gray-100 w-full flex flex-col sm:flex-row gap-3 sm:items-center justify-between px-5 py-4 rounded-md mb-4">
      <div className="w-full">
        <span className="text-purple-800 text-sm">{sector}</span>
        <h3 className="font-bold mt-px">{`${title} at ${company}`}</h3>
        <div className="flex items-center gap-3 mt-2">
          <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">
            {formattedSalary}
          </span>
          <span className="text-slate-600 text-sm flex gap-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {location}
          </span>
        </div>
        <p className="text-gray-500 text-sm mt-2">{formattedDate}</p>
      </div>
      <div>
        <button className="bg-purple-900 text-white font-medium px-4 py-2 rounded-md flex gap-1 items-center">
          Apply Now
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default JobListingCard;

/*

            <li key={job.id} className="mb-4 p-4 border rounded-md">
              <h3 className="text-xl font-bold">{job.title}</h3>
              <p className="text-gray-700">{job.company}</p>
              <p className="text-gray-700">{job.location}</p>
              <div
                className="text-gray-700"
                dangerouslySetInnerHTML={{ __html: job.description }}
              ></div>
              {job.createdAt ? (
                <p className="text-gray-500 text-sm">
                  Posted on{" "}
                  {format(job.createdAt.toDate(), "MMMM d, yyyy h:mm aa")}
                </p>
              ) : (
                <p className="text-gray-500 text-sm">
                  Posted date not available
                </p>
              )}
            </li>

*/
