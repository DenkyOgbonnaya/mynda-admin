import React from "react";
import BreadCrumb from "Common/BreadCrumb";

import { Search } from "lucide-react";

import useNotifications from "hooks/useNotifications";
import { INotification } from "types/notification";
import UiSpinners from "pages/Components/UIElement/UiSpinners";

const Notifications = () => {
  const { data, isLoading, hasNextPage, handleEndReached } = useNotifications();

  const handleView = (notif: INotification) => {
    // navigate(`/pages-account/${notif._id}`);
  };

  const handleSearch = (page: string) => {
    // onQueryChange("search", page);
  };

  return (
    <React.Fragment>
      <BreadCrumb title="Notifications" pageTitle="Notifications" />

      {isLoading ? (
        <UiSpinners />
      ) : (
        <div className="grid grid-cols-1 gap-x-5 xl:grid-cols-12">
          <div className="xl:col-span-12">
            <div className="card" id="usersTable">
              {/* <input
                onChange={({ target }) => handleSearch(target.value)}
                placeholder="Search first name, last name, role, status(Pending, Approved, In Review Rejected)"
                className="w-[50%] p-3 h-[50px] border border-gray-500 rounded-md m-4"
              /> */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="ltr:text-left rtl:text-right ">
                    <tr>
                      <th className="px-3.5 py-2.5 font-semibold">Title</th>
                      <th className="px-3.5 py-2.5 font-semibold  border-custom-500 dark:border-custom-800">
                        Message
                      </th>

                      <th className="px-3.5 py-2.5 font-semibold  border-custom-500 dark:border-custom-800">
                        Date Recieved
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {data?.length! < 1 ? (
                      <div className="noresult">
                        <div className="py-6 text-center">
                          <Search className="size-6 mx-auto text-sky-500 fill-sky-100 dark:sky-500/20" />
                          <h5 className="mt-2 mb-1">
                            Sorry! No Notifications Found
                          </h5>
                        </div>
                      </div>
                    ) : (
                      <>
                        {data?.map((notif) => (
                          <tr
                            key={notif._id}
                            className=" cursor-pointer"
                            onClick={() => handleView(notif)}
                          >
                            <td className="px-3.5 py-2.5  border-custom-500 dark:border-custom-800">
                              <div className="flex items-center gap-2">
                                <div className="flex items-center justify-center size-10 font-medium rounded-full shrink-0 bg-slate-200 text-slate-800 dark:text-zink-50 dark:bg-zink-600">
                                  <img
                                    src=""
                                    alt=""
                                    className="h-10 rounded-full"
                                  />
                                </div>
                                <div className="grow">
                                  <h6 className="mb-1">{notif.title}</h6>
                                </div>
                              </div>
                            </td>
                            <td className="px-3.5 py-2.5  border-custom-500 dark:border-custom-800">
                              {notif.message}
                            </td>

                            <td className="px-3.5 py-2.5  border-custom-500 dark:border-custom-800">
                              {new Date(notif.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
                <div className="flex gap-4 items-center justify-end my-4 px-4">
                  {hasNextPage && (
                    <button onClick={() => handleEndReached()}>
                      Load more
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Notifications;
