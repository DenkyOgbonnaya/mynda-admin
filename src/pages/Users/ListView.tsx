import React, { useCallback, useState } from "react";
import BreadCrumb from "Common/BreadCrumb";
import { useNavigate } from "react-router-dom";

// Icons
import { Search, CheckCircle, Loader, X } from "lucide-react";

import { ToastContainer } from "react-toastify";
import useUsers from "hooks/useUsers";
import { User } from "types/user.type";
import useUserStats from "hooks/useUserStats";

const ListView = () => {
  const { data, isLoading, onQueryChange } = useUsers();

  const { data: userStats } = useUserStats();

  const navigate = useNavigate();

  // columns
  const Status = ({ item }: any) => {
    switch (item) {
      case "Approved":
        return (
          <span className="px-2.5 py-0.5 text-xs font-medium rounded border bg-green-100 border-transparent text-green-500 dark:bg-green-500/20 dark:border-transparent inline-flex items-center status">
            <CheckCircle className="size-3 mr-1.5" />
            {item}
          </span>
        );
      case "In Review":
        return (
          <span className="px-2.5 py-0.5 inline-flex items-center text-xs font-medium rounded border bg-slate-100 border-transparent text-slate-500 dark:bg-slate-500/20 dark:text-zink-200 dark:border-transparent status">
            <Loader className="size-3 mr-1.5" />
            {item}
          </span>
        );
      case "Rejected":
        return (
          <span className="px-2.5 py-0.5 inline-flex items-center text-xs font-medium rounded border bg-red-100 border-transparent text-red-500 dark:bg-red-500/20 dark:border-transparent status">
            <X className="size-3 mr-1.5" />
            {item}
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 text-xs font-medium rounded border bg-green-100 border-transparent text-yellow-500 dark:bg-green-500/20 dark:border-transparent inline-flex items-center status">
            {/* <CheckCircle className="size-3 mr-1.5" /> */}
            {item}
          </span>
        );
    }
  };

  const viewUser = (user: User) => {
    navigate(`/pages-account/${user._id}`);
  };

  const handlePaginate = (page: number) => {
    onQueryChange("page", page);
  };

  const handleSearch = (page: string) => {
    onQueryChange("search", page);
  };

  return (
    <React.Fragment>
      <BreadCrumb title="List View" pageTitle="Users" />

      <div className=" w-full  p-4  rounded-md flex flex-wrap items-center mb-4 gap-4">
        <div className=" flex flex-col gap-3 shadow-sm rounded-md p-4  px-8 bg-white w-full lg:w-[20%]">
          <span className=" font-bold text-lg">
            {userStats?.data?.totalMyndas ?? 0}
          </span>
          <span className=" text-sm text-gray-400">Total Mynda's</span>
        </div>
        <div className=" flex flex-col gap-3 shadow-sm  p-4 w-full lg:w-[20%] px-8 bg-white rounded-md ">
          <span className=" font-bold text-lg">
            {userStats?.data?.totalEmployers ?? 0}
          </span>
          <span className=" text-sm text-gray-400">Total Employers</span>
        </div>

        <div className=" flex flex-col gap-3 shadow-sm  p-4 w-full lg:w-[20%] px-8 bg-white rounded-md">
          <span className=" font-bold text-lg">
            {userStats?.data?.approvedMyndas ?? 0}
          </span>
          <span className=" text-sm text-gray-400">Approved Mynda's</span>
        </div>
        <div className=" flex flex-col gap-3 shadow-sm  p-4 w-full lg:w-[20%] px-8 bg-white rounded-md">
          <span className=" font-bold text-lg">
            {userStats?.data?.approvedEmployers ?? 0}
          </span>
          <span className=" text-sm text-gray-400">Approved Employers</span>
        </div>

        <div className=" flex flex-col gap-3 shadow-sm  p-4 w-full lg:w-[20%] px-8 bg-white rounded-md">
          <span className=" font-bold text-lg">
            {userStats?.data?.reviewMyndas ?? 0}
          </span>
          <span className=" text-sm text-gray-400">Pending Mynda's Review</span>
        </div>
        <div className=" flex flex-col gap-3 shadow-sm  p-4 w-full lg:w-[20%] px-8 bg-white rounded-md">
          <span className=" font-bold text-lg">
            {userStats?.data?.reviewEmployers ?? 0}
          </span>
          <span className=" text-sm text-gray-400">
            Awaiting Employers Review
          </span>
        </div>

        <div className=" flex flex-col gap-3 shadow-sm  p-4 w-full lg:w-[20%] px-8 bg-white rounded-md">
          <span className=" font-bold text-lg">
            {userStats?.data?.rejectedMyndas ?? 0}
          </span>
          <span className=" text-sm text-gray-400">Rejected Mynda's</span>
        </div>
        <div className=" flex flex-col gap-3 shadow-sm  p-4 w-full lg:w-[20%] px-8 bg-white rounded-md">
          <span className=" font-bold text-lg">
            {userStats?.data?.rejectedEmployers ?? 0}
          </span>
          <span className=" text-sm text-gray-400">Rejected Employers</span>
        </div>
      </div>

      <ToastContainer closeButton={false} limit={1} />
      <div className="grid grid-cols-1 gap-x-5 xl:grid-cols-12">
        <div className="xl:col-span-12">
          <div className="card" id="usersTable">
            <input
              onChange={({ target }) => handleSearch(target.value)}
              placeholder="Search first name, last name, role, status(Pending, Approved, In Review Rejected)"
              className="w-[50%] p-3 h-[50px] border border-gray-500 rounded-md m-4"
            />
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="ltr:text-left rtl:text-right ">
                  <tr>
                    <th className="px-3.5 py-2.5 font-semibold">Name</th>
                    <th className="px-3.5 py-2.5 font-semibold  border-custom-500 dark:border-custom-800">
                      Email Address
                    </th>
                    <th className="px-3.5 py-2.5 font-semibold  border-custom-500 dark:border-custom-800">
                      Phone Number
                    </th>
                    <th className="px-3.5 py-2.5 font-semibold  border-custom-500 dark:border-custom-800">
                      Date Joined
                    </th>
                    <th className="px-3.5 py-2.5 font-semibold  border-custom-500 dark:border-custom-800">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {data?.data?.total! < 1 ? (
                    <div className="noresult">
                      <div className="py-6 text-center">
                        <Search className="size-6 mx-auto text-sky-500 fill-sky-100 dark:sky-500/20" />
                        <h5 className="mt-2 mb-1">Sorry! No Result Found</h5>
                      </div>
                    </div>
                  ) : (
                    <>
                      {data?.data?.data.map((user) => (
                        <tr
                          key={user._id}
                          className=" cursor-pointer"
                          onClick={() => viewUser(user)}
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
                                <h6 className="mb-1">
                                  {user.firstName} {user.lastName}
                                </h6>
                                <p className="text-slate-500 dark:text-zink-200">
                                  {user.role}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-3.5 py-2.5  border-custom-500 dark:border-custom-800">
                            {user.email}
                          </td>
                          <td className="px-3.5 py-2.5  border-custom-500 dark:border-custom-800">
                            {user.phoneNumber}
                          </td>
                          <td className="px-3.5 py-2.5  border-custom-500 dark:border-custom-800">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-3.5 py-2.5  border-custom-500 dark:border-custom-800">
                            <Status item={user.kycStatus} />
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
              <div className="flex gap-4 items-center justify-end my-4 px-4">
                <button
                  disabled={Number(data?.data?.page)! <= 1}
                  className="p-3 border-sm"
                  onClick={() => handlePaginate(Number(data?.data?.page!)! - 1)}
                >
                  Previous
                </button>
                <span>{data?.data?.page}</span>
                <button
                  disabled={
                    Number(data?.data?.page)! >=
                    Number(data?.data?.total) / Number(data?.data?.limit)!
                  }
                  onClick={() => handlePaginate(Number(data?.data?.page!) + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ListView;
