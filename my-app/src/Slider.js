import Flickity from "react-flickity-component";
import "./flickity.css";

const flickityOptions = {
  initialIndex: 1,
  pageDots: true,
  freeScroll: true,
  wrapAround: true,
  autoPlay: 1500,
};

function Carousel() {
  return (
    <Flickity
      className={"carousel"} // default ''
      elementType={"div"} // default 'div'
      options={flickityOptions} // takes flickity options {}
      disableImagesLoaded={false} // default false
      reloadOnUpdate // default false
      static // default false
    >
      <div className="sliderImg_wrap">
        <img src="https://cdn.tgdd.vn/2022/03/banner/Aseri-830-300-830x300-1.png" />
      </div>
      <div className="sliderImg_wrap">
        <img src="https://cdn.tgdd.vn/2022/04/banner/830-300-830x300.png" />
      </div>
      <div className="sliderImg_wrap">
        <img src="https://cdn.tgdd.vn/2022/03/banner/reno7-830-300-830x300-3.png" />
      </div>
    </Flickity>
  );
}

export default Carousel;
