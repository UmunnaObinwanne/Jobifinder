import { Link } from "react-router-dom";
import EmployerSVG from "../../assets/undraw_updated_resume_re_7r9j.svg";
import CandidateSVG from "../../assets/undraw_working_remotely_re_6b3a.svg";
import "./UserChoice.css"; // Import CSS file for styling

function UserChoice() {
  return (
    <div className="flex flex-row justify-evenly flex-wrap gap-5 bg-green-100">
      <div>
        <div className="card card-side bg-base-100 shadow-xl">
          <figure>
            <img className="svg-img" src={EmployerSVG} alt="Employer" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">For Employers</h2>
            <p>
              Find professionals from around the world and across all skills.
            </p>
            <div className="card-actions justify-end">
              <Link to="/post-job">
                <button className="btn  bg-teal-500 text-white-800">
                  Post jobs for Free
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="card card-side bg-base-100 shadow-xl">
          <figure>
            <img className="svg-img" src={CandidateSVG} alt="Candidate" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">For Candidate</h2>
            <p className="text-teal-800">
              Build your professional profile, find new job opportunities.
            </p>
            <div className="card-actions justify-end">
              <Link to="/job-listings">
                <button className="btn  text-teal-800 bg-white-500">
                  Browse Jobs
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserChoice;
