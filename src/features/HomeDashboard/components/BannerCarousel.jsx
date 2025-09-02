import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const BannerCarousel = () => {
  const swiperRef = useRef(null);

  const banners = [
    {
      id: 1,
      image: '/banners/NCDEX Aug 2025.png',
      alt: 'NCDEX Planning to Raise ₹750 Crore'
    },
    {
      id: 2,
      image: '/banners/NSE Aug 2025.png',
      alt: 'NSE IPO Coming Soon!'
    },
    {
      id: 3,
      image: '/banners/MSE Aug 2025.png',
      alt: 'MSEI Raises ₹1,000 Crore in Equity Funding'
    }
  ];

  useEffect(() => {
    // Ensure autoplay starts after component mounts
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.start();
    }
  }, []);

  return (
    <div className="mb-4 relative">
      <div className="relative overflow-hidden rounded-2xl shadow-lg">
        <Swiper
          ref={swiperRef}
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{
            el: '.banner-pagination',
            clickable: true,
            bulletClass: 'banner-bullet',
            bulletActiveClass: 'banner-bullet-active',
            renderBullet: function (index, className) {
              return `<span class="${className}"></span>`;
            }
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            waitForTransition: true,
          }}
          loop={true}
          speed={800}
          allowTouchMove={true}
          grabCursor={true}
          touchRatio={1}
          touchAngle={45}
          className="banner-swiper"
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div className="relative w-full h-[120px] sm:h-[140px] md:h-[160px] lg:h-[180px] xl:h-[200px]">
                <img
                  src={banner.image}
                  alt={banner.alt}
                  className="w-full h-full object-contain object-center"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>

      <style jsx global>{`
        /* Swiper container */
        .banner-swiper {
          width: 100%;
          height: 100%;
        }

        /* Pagination bullets */
        .banner-bullet {
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .banner-bullet:hover {
          background: rgba(255, 255, 255, 0.7);
          transform: scale(1.1);
        }

        .banner-bullet-active {
          background: #21B546 !important;
          border-color: #21B546;
          transform: scale(1.3);
          box-shadow: 0 0 8px rgba(33, 181, 70, 0.6);
        }

        /* Responsive pagination */
        @media (max-width: 640px) {
          .banner-pagination {
            bottom: 12px;
          }
          
          .banner-bullet {
            width: 8px;
            height: 8px;
          }
        }

        /* Smooth transitions */
        .banner-swiper .swiper-slide {
          transition: opacity 0.8s ease-in-out;
        }

        /* Loading state */
        .banner-swiper img {
          transition: opacity 0.3s ease;
        }

        .banner-swiper img:not([src]) {
          opacity: 0;
        }

        /* Cursor for dragging */
        .banner-swiper {
          cursor: grab;
        }

        .banner-swiper:active {
          cursor: grabbing;
        }
      `}</style>
    </div>
  );
};

export default BannerCarousel;
