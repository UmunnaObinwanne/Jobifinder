import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../FirebaseUtilities/FirebaseConfig";

const IndividualJobDetailPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobDoc = await getDoc(doc(db, "jobPostings", id));
        if (jobDoc.exists()) {
          setJob(jobDoc.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!job) {
    return <div>No job found</div>;
  }

  const formattedDate = job.createdAt
    ? new Date(job.createdAt.seconds * 1000).toLocaleDateString()
    : "Posted date not available";

  return (
    <div className="max-w-screen-xl mx-auto">
      <main className="mt-10">
        <div
          className="mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative"
          style={{ height: "24em" }}
        >
          <div
            className="absolute left-0 bottom-0 w-full h-full z-10"
            style={{
              backgroundImage:
                "linear-gradient(180deg,transparent,rgba(0,0,0,.7))",
            }}
          ></div>
          <Link
            to="/job-listings"
            className="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2"
          >
            Go Back
          </Link>
          <h2 className="text-4xl font-semibold text-gray-100 leading-tight">
            {job.title}
          </h2>
          <div className="flex mt-3">
            <img
              src="https://randomuser.me/api/portraits/men/97.jpg"
              className="h-10 w-10 rounded-full mr-2 object-cover"
              alt="Author"
            />
            <div>
              <p className="font-semibold text-gray-200 text-sm">
                {job.company}
              </p>
              <p className="font-semibold text-gray-400 text-xs">
                {formattedDate}
              </p>
            </div>
          </div>
        </div>
      </main>
      <div className="px-4 lg:px-0 mt-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed">
        <div
          className="pb-6"
          dangerouslySetInnerHTML={{ __html: job.description }}
        ></div>
        <p className="pb-6">
          <strong>Location:</strong> {job.location}
        </p>
        <p className="pb-6">
          <strong>Sector:</strong> {job.sector}
        </p>
        <p className="pb-6">
          <strong>Salary:</strong> {job.salary}
        </p>
        <p className="pb-6">
          <strong>Deadline:</strong> {job.deadline}
        </p>
      </div>
    </div>
  );
};

export default IndividualJobDetailPage;
