import React from "react";

import { useParams } from "react-router-dom";
import useUserProfile from "hooks/useUserProfile";



const LaboratoryOverviewTabs = () => {
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
                {data?.data?.laboratory?.about}
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
                        Name
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.laboratory?.name}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        Office Address
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.laboratory?.officeAddress}
                      </td>
                    </tr>

                
                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        Email
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.laboratory?.email}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        Phone Number
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.laboratory.phoneNumber}
                      </td>
                    </tr>

                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        State
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.laboratory?.state}
                      </td>
                    </tr>

                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        L . G .A
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.laboratory?.lga}
                      </td>
                    </tr>

                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        C.A.C
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                       {data?.data?.laboratory?.cac && <a href={data?.data?.laboratory?.cac?.url} target="_blank">{data?.data?.laboratory?.cac?.name}</a>}
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

export default LaboratoryOverviewTabs;
