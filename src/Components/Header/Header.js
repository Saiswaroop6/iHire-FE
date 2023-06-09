import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import MenuIcon from "@mui/icons-material/Menu";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import UserProfile from "../UserProfile/UserProfile";
import logoBlue from "../../Assets/Images/logo-blue.png";

const navigation = [
  { name: "Skill Tests", id: 1 },
  { name: "Verifications", id: 2 },
  { name: "About Us", id: 3 },
];

//Navy blue (#001F54), light blue (#9BC4E2), and white (#FFFFFF):
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const Navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [selectedTab, setSelectedTab] = useState();

  const setActiveTab = (id) => {
    setSelectedTab(id);
    if (id === 3) {
      Navigate("/about-us");
    }
  };
  return (
    <Disclosure as="nav" className="bg-white shadow-lg">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl">
            <div className="relative flex items-center justify-between h-20">
              <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                <div className="flex items-center flex-shrink-0">
                  <MenuIcon
                    fontSize="large"
                    className="hover:text-white hover:bg-[#0B1547] rounded-md P-1 cursor-pointer"
                    onClick={() => {
                      setShowProfile(true);
                    }}
                  />
                  <SwipeableDrawer
                    open={showProfile}
                    anchor="left"
                    onClose={() => {
                      setShowProfile(false);
                    }}
                  >
                    <UserProfile />
                  </SwipeableDrawer>
                  <button
                    className="text-3xl font-bold text-[#0B1547] ml-3"
                    onClick={() => {
                      Navigate("/home");
                    }}
                  >
                    <img src={logoBlue} className="h-10" alt="logo" />
                  </button>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <button
                      onClick={() => {
                        setActiveTab(item?.id);
                      }}
                      type="button"
                      key={item.name}
                      className={`rounded-md px-3 py-2 font-medium
                        ${
                          selectedTab === item?.id
                            ? "bg-[#0b1547] text-white"
                            : "text-[#0B1547] hover:bg-[#0B1547] hover:text-white font-semibold text-xl"
                        }
                      `}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="flex p-1 rounded-full group hover:bg-[#0B1547] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-7 w-7 text-[#0B1547] group-hover:text-white" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0B1547]">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="w-12 h-12 rounded-full "
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="button"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm font-semibold text-[#0B1547]"
                            )}
                          >
                            Your Profile
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="button"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm font-semibold text-[#0B1547]"
                            )}
                          >
                            Settings
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              Navigate("/");
                            }}
                            type="button"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm font-semibold text-[#0B1547]"
                            )}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
