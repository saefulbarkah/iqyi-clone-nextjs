import Link from "next/link";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { ImDownload3 } from "react-icons/im";
import { MdExpandMore, MdLanguage } from "react-icons/md";
import imageBox from "../public/assets/images/box.png";
import { AiOutlineHistory, AiOutlineUser } from "react-icons/ai";
import { TbCrown } from "react-icons/tb";
import { Dialog, Popover, Transition } from "@headlessui/react";
import Image from "next/image";

const Navbar = () => {
  const [searchNav, setSearchNav] = useState(false);
  const [sideNav, setSideNav] = useState(false);
  const [navBlur, setNavBlur] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchMovies = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    console.log(form.get("title"));
  };

  let sideMenuRef = useRef(null);
  // blur navbar
  useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset > 0) {
        setNavBlur(true);
      }
      if (window.pageYOffset === 0) {
        setNavBlur(false);
      }
    };
  }, [navBlur]);

  // close sidebar
  useEffect(() => {
    const closeSideBar = (e) => {
      if (!sideMenuRef.current.contains(e.target)) {
        setSideNav(false);
      }
    };
    document.body.addEventListener("mousedown", closeSideBar);
    return () => {
      document.body.removeEventListener("mousedown", closeSideBar);
    };
  });

  return (
    <>
      <header
        className={`sticky w-full top-0 py-2 right-0 left-0 md:fixed transition-all duration-300 ${
          navBlur ? `md:backdrop-blur-lg md:bg-th-drak-gray/30` : ``
        }`}
      >
        {/* mobile */}
        <nav className="flex md:hidden gap-2 md:gap-5 items-center justify-between md:container md:mx-auto">
          {/* hamburger */}
          <button
            className="text-3xl md:hidden md:mx-auto"
            id="sidebar"
            onClick={() => setSideNav(!sideNav)}
          >
            <BiMenu />
          </button>
          {/* navbar title */}
          <h2 className="text-2xl font-bold text-th-green">IQYI</h2>

          {/* navbar search mobile */}
          <div className="flex w-full relative items-center md:hidden">
            <input
              type="text"
              name=""
              id=""
              className="bg-th-gray rounded-md py-[2px] w-full px-[25px] outline-none"
              onClick={() => setSearchNav(true)}
              placeholder="One piece"
            />
            <div className="absolute right-[10px]">
              <FiSearch />
            </div>
          </div>

          {/* Navbar option */}
          <ul className="ml-[30px] hidden md:flex capitalize gap-[40px] w-full">
            <div className="flex flex-col items-center">
              <AiOutlineHistory className="text-2xl" />
              <span className="text-sm">History</span>
            </div>
            <div className="flex flex-col items-center">
              <MdLanguage className="text-2xl text-white" />
              <span className="text-sm">Language</span>
            </div>
            <div className="flex flex-col items-center">
              <AiOutlineUser className="text-2xl text-white" />
              <span className="text-sm">Me</span>
            </div>
          </ul>

          {/* navbar button desktop */}
          <div className="hidden md:flex gap-5">
            <button className="text-lg rounded-sm  text-white border py-[2px] px-[2px] flex gap-[2px] items-center">
              <ImDownload3 />
              <span>APP</span>
            </button>
            <button className="text-lg rounded-sm px-2 text-white bg-th-green flex gap-[2px] items-center">
              <ImDownload3 />
              <span>APP</span>
            </button>
          </div>
          {/* navbar button download mobile */}
          <button className="text-lg md:hidden rounded-sm px-2 text-white bg-th-green flex gap-[2px] items-center">
            <ImDownload3 />
            <span>APP</span>
          </button>
        </nav>

        {/* desktop */}
        <nav className="hidden md:flex gap-5 items-center justify-between container mx-auto relative">
          <div className="flex items-center gap-[25px]">
            {/* navbar title */}
            <h2 className="text-4xl font-bold text-th-green">IQYI</h2>
            {/* item list navbar desktop */}
            <ul className="md:flex hidden  items-center capitalize gap-[35px] w-full text-lg relative">
              <Link href="#">for you</Link>
              <Link href="#">Sweet On</Link>
              <Popover className="flex items-center relative h-full cursor-pointer">
                {({ open }) => (
                  <>
                    <Popover.Button className="outline-none">
                      More
                    </Popover.Button>
                    <MdExpandMore
                      className={`transition-all duration-300 ${
                        open ? "rotate-180" : "rotate-0"
                      }`}
                    />
                    <Transition
                      enter="transition-all duration-300"
                      enterFrom="opacity-0 top-full"
                      enterTo="opacity-100 top-[50px]"
                      leave="transition-all duration-300"
                      leaveFrom="opacity-100 top-[50px]"
                      leaveTo="opacity-0 top-full"
                      className="absolute"
                    >
                      <Popover.Panel
                        className={`absolute bg-th-drak-gray rounded-sm border border-white/10`}
                      >
                        <div className="flex flex-col">
                          {Array(5)
                            .fill(null)
                            .map((item, i) => (
                              <div
                                className={`w-full p-3 hover:bg-th-gray text-sm`}
                                key={i}
                              >
                                <a href="/analytics" className="font-thin">
                                  Analytics
                                </a>
                              </div>
                            ))}
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </ul>
          </div>
          <div className="flex gap-[10px] items-center">
            {/* navbar search desktop */}
            <div className="md:flex hidden relative items-center w-full justify-center">
              <button
                type="text"
                name=""
                id=""
                className="bg-th-gray rounded-md py-[20px] w-[230px] px-[15px] outline-none"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="absolute left-[10px] opacity-50 top-[20%]">
                  Open Piece
                </span>
                <div className="absolute right-[15px] top-[30%]">
                  <FiSearch />
                </div>
              </button>
            </div>
            <Transition appear show={isOpen} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-10"
                onClose={() => setIsOpen(false)}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed top-0 right-0 left-0 bottom-[200px] overflow-y-auto">
                  <div className="flex flex-col gap-5 min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-th-drak-gray  p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-white"
                        >
                          Search Movies
                        </Dialog.Title>
                        <div className="mt-2">
                          <form
                            className="flex relative"
                            onSubmit={() => searchMovies(event)}
                          >
                            <input
                              type="text"
                              className="w-full outline-none py-2 px-4 rounded-md bg-th-gray"
                              name="title"
                              autoFocus
                            />
                            <button
                              type="submit"
                              className="transition-all duration-300 absolute right-[10px] bg-th-gray rounded-md h-full w-[25px] hover:text-th-green"
                            >
                              <FiSearch className="font-bold" />
                            </button>
                          </form>
                        </div>
                        <div className="mt-2 px-2 flex flex-col">
                          <p className="text-sm font-thin">Popular search</p>
                          <div className="flex flex-col justify-center mt-2 font-thin">
                            {Array(5)
                              .fill(null)
                              .map((item, i) => (
                                <>
                                  <Link
                                    href="#"
                                    className={`hover:text-th-green px-2 py-[5px] ${
                                      i < 3 && "text-th-green"
                                    }`}
                                  >
                                    <span>{i + 1}. Resident Evil</span>
                                  </Link>
                                </>
                              ))}
                          </div>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
            {/* Navbar option */}
            <ul className="ml-[30px] hidden md:flex capitalize gap-[30px] mr-[25px]">
              <Popover className="relative">
                <Popover.Button className="flex flex-col items-center">
                  <AiOutlineHistory className="text-2xl" />
                  <span className="text-sm">History</span>
                </Popover.Button>

                <Transition
                  enter="transition-all duration-300"
                  enterFrom="opacity-0 top-full"
                  enterTo="opacity-100 top-[50px]"
                  leave="transition-all duration-300"
                  leaveFrom="opacity-100 top-[50px]"
                  leaveTo="opacity-0 top-full"
                  className="absolute w-full"
                >
                  <Popover.Panel
                    className={`absolute w-[300px] -left-[145px] bg-th-drak-gray rounded-sm border border-white/10`}
                  >
                    <div className="flex flex-col p-3 items-center justify-center my-2">
                      <Image src={imageBox} alt="" width={75} />
                      <span className="text-center text-sm font-thin opacity-75 my-2 px-8">
                        Login to track your watch history on multiple devices.
                      </span>
                      <button className="py-[6px] px-[30px] my-2 rounded-md bg-th-green text-sm">
                        Login
                      </button>
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
              <div className="flex flex-col items-center">
                <MdLanguage className="text-2xl text-white" />
                <span className="text-sm">Language</span>
              </div>
              <div className="flex flex-col items-center">
                <AiOutlineUser className="text-2xl text-white" />
                <span className="text-sm">Me</span>
              </div>
            </ul>
            {/* navbar button desktop */}
            <div className="hidden md:flex gap-5">
              <button className="text-lg rounded-md  text-white border py-[2px] px-[15px] flex gap-[5px] items-center">
                <ImDownload3 className="text-md" />
                <span>APP</span>
              </button>
              <button className="text-lg rounded-md py-[2px] px-[15px] text-th-dark bg-th-brown flex gap-[5px] items-center">
                <TbCrown className="text-md" />
                <span>VIP</span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* sideNav */}
      <aside
        className={`fixed md:hidden bg-th-drak-gray text-white top-0 left-0 w-[250px] h-full overflow-y-auto custom-scrollbar shadow-lg z-[999] transition-all duration-500 ${
          sideNav ? "-translate-x-0" : "-translate-x-full"
        }`}
        ref={sideMenuRef}
      >
        {/* profile */}
        <div className="w-full bg-green-700 h-[90px] flex items-center gap-2 text-white pl-3 ">
          <div className="w-[35px] h-[35px] bg-th-dark rounded-full"></div>
          <Link href="#">Login</Link>/<Link href="#">Sign Up</Link>
        </div>
        <nav className="flex flex-col gap-5 px-3 py-5  w-full">
          {Array(15)
            .fill(null)
            .map((item, index) => (
              <div
                className="flex flex-col text-lg hover:text-th-green"
                key={index}
              >
                <Link href="#">Menu</Link>
              </div>
            ))}
        </nav>
      </aside>
      {/* navbar search */}
      {searchNav === true && (
        <div className="fixed w-full top-0 py-2 right-0 left-0  h-screen z-[9999999] capitalize bg-black">
          <div className="flex justify-between items-center gap-[10px] mx-3">
            <div className="flex w-full relative items-center">
              <input
                type="text"
                name=""
                id=""
                className="bg-th-gray rounded-md py-[2px] w-full pl-[15px] pr-[30px] outline-none"
                placeholder="One piece"
                autoFocus
              />
              <div className="absolute right-[10px] hover:text-th-green">
                <FiSearch />
              </div>
            </div>
            <div
              className="text-white cursor-pointer"
              onClick={() => setSearchNav(false)}
            >
              <span>cancel</span>
            </div>
          </div>

          {/* border */}
          <div className="border-b-[1px] border-white/20 w-full mx-0 my-2"></div>
          {/* Popular search */}
          <ul className="flex flex-col gap-4 mt-5 font-thin px-[12px]">
            <span className="text-sm">Popular Search</span>
            {Array(9)
              .fill(null)
              .map((item, index) => (
                <li
                  key={index + 1}
                  className="flex gap-[10px] items-center hover:bg-th-gray/30  hover:text-th-green"
                >
                  <div
                    className={`text-md fon-bold hover:text-th-green ${
                      index + 1 > 3 ? "text-white" : " text-th-green"
                    } `}
                  >
                    {index + 1}
                  </div>
                  <Link
                    href="#"
                    className="text-white/75 hover:text-th-green py-[10px] w-full"
                  >
                    One Piece
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
