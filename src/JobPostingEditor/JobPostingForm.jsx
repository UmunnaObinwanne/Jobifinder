import { useState } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles
import { useAuth } from "./../Contexts/LoginContext";

const JobPostingForm = () => {
  const { postJob } = useAuth(); // Use postJob from context
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [qualification, setQualification] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jobData = { title, company, location, description };
    console.log("Form Submitted:", jobData);
    try {
      await postJob(jobData);
      setTitle("");
      setCompany("");
      setLocation("");
      setDescription("");
      setQualification("");
      setDeadline("");
      setSalaryRange("");
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Error posting job");
    }
  };

  return (
    <div className="container my-10 mx-auto p-6 max-w-3xl bg-white rounded-md shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Post a New Job
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Job Title
          </label>
          <input
            type="text"
            name="title"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-md p-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label
            htmlFor="company"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Company Name
          </label>
          <input
            type="text"
            name="company"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-md p-3"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>

        <div>
          <label
            htmlFor="deadline"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Deadline
          </label>
          <input
            type="text"
            name="deadline"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-md p-3"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Location
          </label>
          <input
            type="text"
            name="location"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-md p-3"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div>
          <label
            htmlFor="qualification"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Qualification
          </label>
          <input
            type="text"
            name="qualification"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-md p-3"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
            required
          />
        </div>

        <div>
          <label
            htmlFor="salaryRange"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Salary Range
          </label>
          <input
            type="number"
            name="salaryRange"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-md p-3"
            value={salaryRange}
            onChange={(e) => setSalaryRange(e.target.value)}
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Job Description
          </label>
        </div>
        <div>
          <ReactQuill
            value={description}
            onChange={setDescription} // Directly set the state
            modules={JobPostingForm.modules}
            formats={JobPostingForm.formats}
            placeholder="Enter the job description"
            className="bg-white h-64 mb-20"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

// Configure modules and formats for the editor
JobPostingForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ script: "sub" }, { script: "super" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["link", "image", "video"],
    ["clean"], // remove formatting button
  ],
};

JobPostingForm.formats = [
  "header",
  "font",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "script",
  "sub",
  "super",
  "color",
  "background",
  "align",
  "link",
  "image",
  "video",
];

export default JobPostingForm;
