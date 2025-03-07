import React from "react";
import { Dropdown } from "./Components/Dropdown";
import { BellRing, Clock, MoveRight } from "lucide-react";
import SimpleBar from "simplebar-react";
import { Link, useNavigate } from "react-router-dom";

import useNotifications from "hooks/useNotifications";
import { INotification } from "types/notification";

const NotificationDropdown = () => {
  const { data } = useNotifications(5);
  const navigation = useNavigate();

  const [filter, setFilter] = React.useState<string>("all");

  const handleView = (notification: INotification) => {
    switch (notification.reference) {
      case "Booking":
        navigation("/bookings");

        break;

      default:
        navigation("/notifications");
    }
  };
  return (
    <>
      <Dropdown className="relative flex items-center h-header">
        <Dropdown.Trigger
          type="button"
          className="inline-flex justify-center relative items-center p-0 text-topbar-item transition-all size-[37.5px] duration-200 ease-linear bg-topbar rounded-md dropdown-toggle btn hover:bg-topbar-item-bg-hover hover:text-topbar-item-hover group-data-[topbar=dark]:bg-topbar-dark group-data-[topbar=dark]:hover:bg-topbar-item-bg-hover-dark group-data-[topbar=dark]:hover:text-topbar-item-hover-dark group-data-[topbar=brand]:bg-topbar-brand group-data-[topbar=brand]:hover:bg-topbar-item-bg-hover-brand group-data-[topbar=brand]:hover:text-topbar-item-hover-brand group-data-[topbar=dark]:dark:bg-zink-700 group-data-[topbar=dark]:dark:hover:bg-zink-600 group-data-[topbar=brand]:text-topbar-item-brand group-data-[topbar=dark]:dark:hover:text-zink-50 group-data-[topbar=dark]:dark:text-zink-200 group-data-[topbar=dark]:text-topbar-item-dark"
          id="notificationDropdown"
          data-bs-toggle="dropdown"
        >
          <BellRing className="inline-block size-5 stroke-1 fill-slate-100 group-data-[topbar=dark]:fill-topbar-item-bg-hover-dark group-data-[topbar=brand]:fill-topbar-item-bg-hover-brand"></BellRing>
          <span className="absolute top-0 right-0 flex w-1.5 h-1.5">
            <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-sky-400"></span>
            <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-sky-500"></span>
          </span>
        </Dropdown.Trigger>
        <Dropdown.Content
          placement="right-end"
          className="absolute z-50 ltr:text-left rtl:text-right bg-white rounded-md shadow-md !top-4 dropdown-menu min-w-[20rem] lg:min-w-[26rem] dark:bg-zink-600"
          aria-labelledby="notificationDropdown"
        >
          <div className="p-4">
            <h6 className="mb-4 text-16">
              Notifications{" "}
              <span className="inline-flex items-center justify-center size-5 ml-1 text-[11px] font-medium border rounded-full text-white bg-orange-500 border-orange-500">
                {data?.length}
              </span>
            </h6>
            <ul className="flex flex-wrap w-full p-1 mb-2 text-sm font-medium text-center rounded-md filter-btns text-slate-500 bg-slate-100 nav-tabs dark:bg-zink-500 dark:text-zink-200">
              <li
                className={`group grow ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                <Link
                  to="#"
                  data-filter="all"
                  className="inline-block nav-link px-1.5 w-full py-1 text-xs transition-all duration-300 ease-linear rounded-md text-slate-500 border border-transparent group-[.active]:bg-white group-[.active]:text-custom-500 hover:text-custom-500 active:text-custom-500 dark:text-zink-200 dark:hover:text-custom-500 dark:group-[.active]:bg-zink-600 -mb-[1px]"
                >
                  View All
                </Link>
              </li>
              <li
                className={`group grow ${filter === "mention" ? "active" : ""}`}
                onClick={() => setFilter("mention")}
              >
                <Link
                  to="#"
                  data-filter="mention"
                  className="inline-block nav-link px-1.5 w-full py-1 text-xs transition-all duration-300 ease-linear rounded-md text-slate-500 border border-transparent group-[.active]:bg-white group-[.active]:text-custom-500 hover:text-custom-500 active:text-custom-500 dark:text-zink-200 dark:hover:text-custom-500 dark:group-[.active]:bg-zink-600 -mb-[1px]"
                >
                  Mentions
                </Link>
              </li>
              <li
                className={`group grow ${
                  filter === "follower" ? "active" : ""
                }`}
                onClick={() => setFilter("follower")}
              >
                <Link
                  to="#"
                  data-filter="follower"
                  className="inline-block nav-link px-1.5 w-full py-1 text-xs transition-all duration-300 ease-linear rounded-md text-slate-500 border border-transparent group-[.active]:bg-white group-[.active]:text-custom-500 hover:text-custom-500 active:text-custom-500 dark:text-zink-200 dark:hover:text-custom-500 dark:group-[.active]:bg-zink-600 -mb-[1px]"
                >
                  Followers
                </Link>
              </li>
              <li
                className={`group grow ${filter === "invite" ? "active" : ""}`}
                onClick={() => setFilter("invite")}
              >
                <Link
                  to="#"
                  data-filter="invite"
                  className="inline-block nav-link px-1.5 w-full py-1 text-xs transition-all duration-300 ease-linear rounded-md text-slate-500 border border-transparent group-[.active]:bg-white group-[.active]:text-custom-500 hover:text-custom-500 active:text-custom-500 dark:text-zink-200 dark:hover:text-custom-500 dark:group-[.active]:bg-zink-600 -mb-[1px]"
                >
                  Invites
                </Link>
              </li>
            </ul>
          </div>

          <SimpleBar className="max-h-[350px]">
            <div className="flex flex-col gap-1">
              {(data || []).map((item: INotification, index: number) => (
                <button
                  key={index}
                  onClick={() => handleView(item)}
                  className="flex gap-3 p-4 product-item hover:bg-slate-50 dark:hover:bg-zink-500"
                >
                  {index === data?.length! - 1 ? (
                    <div className="relative shrink-0">
                      <div className="size-10 bg-pink-100 rounded-full w-10 h-10"></div>
                      <div className="absolute text-orange-500 -bottom-0.5 -right-0.5 text-16">
                        <i className="ri-heart-fill"></i>
                      </div>
                    </div>
                  ) : item ? (
                    <div className="size-10 bg-pink-100 rounded-full w-10 h-10"></div>
                  ) : (
                    <div className="size-10 bg-pink-100 rounded-full w-10 h-10"></div>
                  )}
                  <div className="grow">
                    <h6 className="mb-1 font-medium">{item.title}</h6>
                    <p
                      className={`text-sm text-slate-500 dark:text-zink-300 ${
                        index === data?.length! - 3 ? "mb-3" : "mb-0"
                      }`}
                    >
                      <Clock className="inline-block size-3 mr-1"></Clock>{" "}
                      <span className="align-middle">
                        {new Date(item.createdAt).toLocaleTimeString()}
                      </span>
                    </p>
                    {item.message && (
                      <div className="p-2 rounded bg-slate-100 text-slate-500 dark:bg-zink-500 dark:text-zink-300">
                        {item.message}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center self-start gap-2 text-xs text-slate-500 shrink-0 dark:text-zink-300">
                    <div className="w-1.5 h-1.5 bg-custom-500 rounded-full"></div>{" "}
                    {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                </button>
              ))}
            </div>
          </SimpleBar>
          <div className="flex items-center gap-2 p-4 border-t border-slate-200 dark:border-zink-500">
            <div className="grow">
              <a href="#!">Manage Notification</a>
            </div>
            <div className="shrink-0">
              <Link
                to="/notifications"
                className="px-2 py-1.5 text-xs text-white transition-all duration-200 ease-linear btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100"
              >
                View All Notification
                <MoveRight className="inline-block size-3 ml-1"></MoveRight>
              </Link>
            </div>
          </div>
        </Dropdown.Content>
      </Dropdown>
    </>
  );
};

export default NotificationDropdown;
