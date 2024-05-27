import React from "react";

import { useParams } from "react-router-dom";
import useUserProfile from "hooks/useUserProfile";



const AgencyOverviewTabs = () => {
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
                        {data?.data?.agency?.address}
                      </td>
                    </tr>

                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        Office Address
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.agency?.officeAddress}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        Company Email
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.agency?.companyEmail}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        Services
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.agency?.services.toString()}
                      </td>
                    </tr>

                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        State
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.agency?.state}
                      </td>
                    </tr>

                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        L . G .A
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.agency?.lga}
                      </td>
                    </tr>

                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        C.A.C
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                       {data?.data?.agency?.cac && <a href={data?.data?.agency?.cac?.url} target="_blank">{data?.data?.agency?.cac?.name}</a>}
                      </td>
                    </tr>

                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        Utility Bill
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                       {data?.data?.agency?.utilityBill && <a href={data?.data?.agency?.utilityBill?.url} target="_blank">{data?.data?.agency?.utilityBill?.name}</a>}
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

export default AgencyOverviewTabs;
