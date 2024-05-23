import DownloadAppPage from "./DownloadAppPage";
import Footer from "./Footer/Footer";
import Hero from "./Hero";
import Testimonials from "./Testimonials/Testimonials";
import UserChoice from "./UserChoice";

function ParentHomeLayout() {
  return (
    <>
      <div>
        <Hero />
        <div className=" mt-5">
          <UserChoice />
        </div>
        <DownloadAppPage />
      </div>
      <div>
        <Testimonials />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default ParentHomeLayout;
