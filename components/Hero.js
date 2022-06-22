import { useState } from "react"
import Image from "next/image"
import { Button, IconButton } from "./Button"
import { Transition } from "@headlessui/react"
// import corporate from "public/static/images/corporate.jpg"

export const Hero = ({ user }) => {
  let [showBanner, setShowBanner] = useState(true)

  let isNotCompany = !user?.company
  return (
    <>
      {isNotCompany && (
        <>
          <div className="relative bg-red-500/20 h-[640px] w-full sm:h-[55vh] md:h-[440px]">
            <Image
              src="/static/images/corporate-md.jpg"
              layout="fill"
              alt="corporate"
              objectFit="cover"
              priority={true}
              objectPosition="center"
            />
            <div className="absolute inset-0 bg-neutral-900/70">
              <div className="mx-auto max-w-screen-lg">
                <div className="m-6 min-h-[60px]">
                  {
                    <HeroInnerBanner
                      show={showBanner}
                      onClose={() => setShowBanner(false)}
                    />
                  }
                </div>
              </div>

              <div className="mx-4 mt-16 text-center flex flex-col items-center">
                <h1 className="text-white text-3xl font-extrabold uppercase tracking-wide sm:text-4xl md:text-5xl lg:text-6xl">
                  FIND YOUR JOB… easy!
                </h1>
                <span className=" text-xl text-white sm:text-2xl">
                  find your next job
                </span>
                <div className="mt-8">
                  <SearchForm />
                </div>
              </div>
            </div>
          </div>
          <HeroBottomCard />
        </>
      )}
    </>
  )
}

const HeroInnerBanner = ({ show, onClose }) => {
  return (
    <Transition show={show}>
      <div className="relative rounded bg-gradient-to-r from-purple-500 to-indigo-800 text-white py-3 px-8 shadow-lg md:rounded-full ">
        <p>
          Welcome to <span className="font-bold">Flavio | Jobcamp</span>. An
          easier and faster job discovery platform.
        </p>
        <span className="absolute top-1 right-1 sm:top-2 sm:right-2">
          <IconButton
            onClick={onClose}
            aria-label="close banner"
            variant="ghost"
            size="sm"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </span>
      </div>
    </Transition>
  )
}

const SearchForm = () => {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="group">
      <div className="flex items-center overflow-hidden rounded-full bg-white shadow-md group-focus-within:ring-2 group-focus-within:ring-indigo-400 group-focus-within:ring-offset-2 group-focus-within:ring-offset-transparent">
        <span className="pointer-events-none block px-2 text-slate-400 group-focus-within:text-indigo-800 ">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <input
          className="w-full appearance-none border-transparent p-2 text-xl leading-6 text-slate-900 placeholder-slate-400 focus:border-transparent focus:right-0 "
          type="text"
          aria-label="search"
          placeholder="Job title..."
        />
        <button
          className="hidden sm:block h-11 shrink-0 bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors duration-500 ease-in-out pl-4 pr-4"
          type="submit"
        >
          Discover now
        </button>
      </div>
      <Button size="lg" type="submit" className="mt-8 sm:hidden">
        Discover Now
      </Button>
    </form>
  )
}

function HeroBottomCard() {
  return (
    <div className="bg-neutral-900 p-4">
      <span className="block text-center text-lg text-white">
        No time to look for jobs? Drop your resume with{" "}
        <span className="bg-gradient-to-r from-fuchsia-700 via-purple-500 to-indigo-500 bg-clip-text text-2xl font-black tracking-widest text-transparent ">
          Flavio Jobcamp
        </span>{" "}
        headhunters here.
      </span>
    </div>
  )
}
