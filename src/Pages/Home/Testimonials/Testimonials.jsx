import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import "./Testimonials.css";
import { FaStar, FaStarHalf } from "react-icons/fa";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);
  const [swiperSlidesPerView, setSwiperSlidesPerView] = useState(1);

  useEffect(() => {
    // Update the number of slides per view based on screen size
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        // Large screens
        setSwiperSlidesPerView(3);
      } else if (window.innerWidth >= 992) {
        // Medium screens
        setSwiperSlidesPerView(2);
      } else {
        // Small screens
        setSwiperSlidesPerView(1);
      }
    };
  
    // Initial call
    handleResize();
  
    // Add event listener to handle screen size changes
    window.addEventListener("resize", handleResize);
  
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  

  return (
    // className="border border-red-500"
    <div className="mt-[75px] mb-[98px] lg:mx-[135px]">
      <Swiper
        slidesPerView={swiperSlidesPerView}
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper mt-10"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col border border-red-500 pl-5 pt-[33px] pb-[40px] rounded">
              <h1 className="text-xl font-semibold text-left">{review.name}</h1>
              <h3 className="text-[16px] font-medium mb-4">
                {review.designation}
              </h3>
              <p className="text-[16px] review mb-4">{review.review}</p>
              <div className="mb-6 flex justify-between items-center">
                <div className="flex justify-center items-center">
                  {Array.from(
                    { length: Math.floor(review.rateus) },
                    (_, index) => (
                      <FaStar key={index} className="star-color text-lg me-2" />
                    )
                  )}
                  {review.rateus % 1 === 0.5 && (
                    <FaStarHalf className="star-color text-lg" />
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
