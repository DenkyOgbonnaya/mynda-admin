import React, { useCallback, useEffect, useState } from "react";
import BreadCrumb from "Common/BreadCrumb";
import { useNavigate } from "react-router-dom";

// Icons
import { Search, CheckCircle, Loader, X } from "lucide-react";

// react-redux
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

import {
  getUserList as onGetUserList,
  addUserList as onAddUserList,
  updateUserList as onUpdateUserList,
  deleteUserList as onDeleteUserList,
} from "slices/thunk";
import { ToastContainer } from "react-toastify";
import filterDataBySearch from "Common/filterDataBySearch";
import useUsers from "hooks/useUsers";
import { User } from "types/user.type";

const ListView = () => {
  const dispatch = useDispatch<any>();
  const { data, isLoading, onQueryChange } = useUsers();

  const selectDataList = createSelector(
    (state: any) => state.Users,
    (user) => ({
      userList: user.userList,
    })
  );

  const { userList } = useSelector(selectDataList);
  const [user, setUser] = useState<any>([]);
  const [eventData, setEventData] = useState<any>();

  const [show, setShow] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const navigate = useNavigate();

  // Get Data
  useEffect(() => {
    dispatch(onGetUserList());
  }, [dispatch]);

  useEffect(() => {
    setUser(userList);
  }, [userList]);

  // validation
  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      img: (eventData && eventData.img) || "",
      userId: (eventData && eventData.userId) || "",
      name: (eventData && eventData.name) || "",
      designation: (eventData && eventData.designation) || "",
      location: (eventData && eventData.location) || "",
      email: (eventData && eventData.email) || "",
      phoneNumber: (eventData && eventData.phoneNumber) || "",
      joiningDate: (eventData && eventData.joiningDate) || "",
      status: (eventData && eventData.status) || "",
    },
    validationSchema: Yup.object({
      img: Yup.string().required("Please Add Image"),
      name: Yup.string().required("Please Enter Name"),
      designation: Yup.string().required("Please Enter Designation"),
      location: Yup.string().required("Please Enter Location"),
      email: Yup.string().required("Please Enter Email"),
      phoneNumber: Yup.string().required("Please Enter Phone Number"),
      joiningDate: Yup.string().required("Please Enter Joining Date"),
      status: Yup.string().required("Please Enter Status"),
    }),

    onSubmit: (values) => {
      if (isEdit) {
        const updateUser = {
          id: eventData ? eventData.id : 0,
          ...values,
        };
        // update user
        dispatch(onUpdateUserList(updateUser));
      } else {
        const newUser = {
          ...values,
          id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
          userId:
            "#TW15000" +
            (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
        };
        // save new user
        dispatch(onAddUserList(newUser));
      }
      toggle();
    },
  });

  // Image
  const [selectedImage, setSelectedImage] = useState<any>();

  const toggle = useCallback(() => {
    if (show) {
      setShow(false);
      setEventData("");
      setIsEdit(false);
      setSelectedImage("");
    } else {
      setShow(true);
      setEventData("");
      setSelectedImage("");
      validation.resetForm();
    }
  }, [show, validation]);

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
