import React from "react";

import { useParams } from "react-router-dom";
import useUserProfile from "hooks/useUserProfile";

const EmployerOverviewTabs = () => {
  const params = useParams();

  const { data, isLoading } = useUserProfile(params.id!);

  if (isLoading) return <p>Loading...</p>;
  return (
    <React.Fragment>
      <div className="grid grid-cols-1 gap-x-5 2xl:grid-cols-12">
        <div className="2xl:col-span-9">
          <div className="card">
            <div className="card-body">
              <h6 className="mb-3 text-15">Overview</h6>
              <p className="mb-2 text-slate-500 dark:text-zink-200">
                {data?.data?.agency?.about}
              </p>
            </div>
          </div>
        </div>
        <div className="2xl:col-span-3">
          <div className="card">
            <div className="card-body">
              <h6 className="mb-4 text-15">Personal Information</h6>
              <div className="overflow-x-auto">
                <table className="w-full ltr:text-left rtl:ext-right">
                  <tbody>
                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        Address
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.employer?.address}
                      </td>
                    </tr>

                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        Date of Birth
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.employer?.dob &&
                          new Date(
                            data?.data?.employer?.dob
                          ).toLocaleDateString()}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        Gender
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.employer?.gender}
                      </td>
                    </tr>

                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        State
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.employer?.state}
                      </td>
                    </tr>

                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        L . G .A
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.employer?.lga}
                      </td>
                    </tr>

                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        Uploaded Document
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.employer?.docType}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        Document
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.employer?.docNumber}
                      </td>
                    </tr>

                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        NIN
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.employer?.nin && (
                          <a
                            href={data?.data?.employer?.nin?.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {data?.data?.employer?.nin?.name}
                          </a>
                        )}
                      </td>
                    </tr>

                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        Utility Bill
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.employer?.utilityBill && (
                          <a
                            href={data?.data?.employer?.utilityBill?.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {data?.data?.employer?.utilityBill?.name}
                          </a>
                        )}
                      </td>
                    </tr>

                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        Drivers Licence
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.employer?.driversLicence && (
                          <a
                            href={data?.data?.employer?.driversLicence?.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {data?.data?.employer?.driversLicence?.name}
                          </a>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EmployerOverviewTabs;
