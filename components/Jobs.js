import { FreeMode, Mousewheel, Navigation, Scrollbar } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { Button } from "./Button"
import { Chip } from "./Chip"

import Job from "./Job"
import { LatestJobs } from "components/LatestJobs"

const featuredJobsCategories = [
  "Sales (Corporate, Real Estate, Telesales, etc.)",
  "Customer Service",
  "Other",
  "Creative Writing",
  "Project Management",
  "Marketing - Digital",
  "IT - Software Development",
  "Human Resources",
  "Accounting & Finance",
]

function Jobs({ jobs, isDashboard }) {
  if (!jobs) return null
  return (
    <section id="featured-jobs">
      {!isDashboard && (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Featured Jobs!</h2>
            <Button variant="outline" className="hidden xs:inline-flex">
              Show All
            </Button>
          </div>
          <div id="featured-jobs__categories" className="">
            <Swiper
              modules={[FreeMode, Scrollbar, Mousewheel]}
              scrollbar={{ draggable: true, hide: true }}
              direction="horizontal"
              freeMode={true}
              mousewheel={true}
              slidesPerView="auto"
              spaceBetween={8}
              id="featured-jobs__categories__slider"
              className="!py-4"
            >
              <SwiperSlide className="!w-auto">
                <Chip label="all" active />
              </SwiperSlide>
              {featuredJobsCategories.map((category, i) => (
                <SwiperSlide key={i} className="!w-auto">
                  <Chip label={category} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}

      {/* !-m-4 to fix boxshadow cropping */}
      <div id="featured-jobs__items" className="!-m-4">
        <Swiper
          className="!p-4" // to fix boxshadow cropping due to overflow hidden
          modules={[Navigation]}
          // navigation
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            475: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {jobs.map((job, index) => (
            <SwiperSlide key={index}>
              <Job key={index} job={job} isDashboard={isDashboard} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Jobs
