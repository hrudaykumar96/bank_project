import Carousel from "./Carousel";
import Services from "./Services";

const Section = () => {
  return (
    <div className="section">
      <Carousel/>
      <Services/>
      <div className="warning">
        <img src="/assets/carousel.webp" alt="" />
      </div>
    </div>
  );
};

export default Section;