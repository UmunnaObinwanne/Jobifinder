import { useEffect, useState } from "react";
import JobListingCard from "./JobListingCard";
import { useAuth } from "../../Contexts/LoginContext";

const JobListings = () => {
  const { fetchJobs } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const fetchedJobs = await fetchJobs();
        setJobs(fetchedJobs);
      } catch (error) {
        console.error("Error loading jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, [fetchJobs]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-full p-6  bg-gray-50 rounded-md w-full">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Job Listings
      </h2>
      {jobs.length > 0 ? (
        <ul>
          {jobs.map((job) => (
            <li key={job.id} className="mb-4">
              <JobListingCard job={job} />
            </li>
          ))}
        </ul>
      ) : (
        <div>No job postings found.</div>
      )}
    </div>
  );
};

export default JobListings;
