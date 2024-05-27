import React from "react";

import { useParams } from "react-router-dom";
import useEducation from "hooks/useEducation";
import useWorkExperience from "hooks/useWorkExperience";



const WorkExperience = () => {
    const params = useParams();

const { data, isLoading } = useWorkExperience(params.id!);

if (isLoading) return <p>Loading...</p>;
  return (
    <React.Fragment>
         <div className="card" id="usersTable">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="ltr:text-left rtl:text-right ">
                  <tr>
                    <th className="px-3.5 py-2.5 font-semibold">Title</th>
                    <th className="px-3.5 py-2.5 font-semibold  border-custom-500 dark:border-custom-800">
                      Description
                    </th>
                    <th className="px-3.5 py-2.5 font-semibold  border-custom-500 dark:border-custom-800">
                      Company
                    </th>
                    <th className="px-3.5 py-2.5 font-semibold  border-custom-500 dark:border-custom-800">
                      Emloyment Type
                    </th>
                    <th className="px-3.5 py-2.5 font-semibold  border-custom-500 dark:border-custom-800">
                      State
                    </th>
                    <th className="px-3.5 py-2.5 font-semibold  border-custom-500 dark:border-custom-800">
                      Start Date
                    </th>
                    <th className="px-3.5 py-2.5 font-semibold  border-custom-500 dark:border-custom-800">
                      End Date
                    </th>
                    <th className="px-3.5 py-2.5 font-semibold  border-custom-500 dark:border-custom-800">
                      Current Work
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {data?.data?.length! < 1 ? (
                    <div className="noresult">
                      <div className="py-6 text-center">
                    
                        <h5 className="mt-2 mb-1">Sorry! No Result Found</h5>
                        <p className="mb-0 text-slate-500 dark:text-zink-200">
                          No Records
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      {data?.data?.map?.((work) => (
                        <tr key={work._id} className=" cursor-pointer" >
                          <td className="px-3.5 py-2.5  border-custom-500 dark:border-custom-800">
                            {
                                work.title
                            }
                          </td>
                          <td className="px-3.5 py-2.5  border-custom-500 dark:border-custom-800">
                            {
                                work.description
                            }
                          </td>
                          <td className="px-3.5 py-2.5  border-custom-500 dark:border-custom-800">
                            {work.companyName}
                          </td>
                          <td className="px-3.5 py-2.5  border-custom-500 dark:border-custom-800">
                            {work.employmentType}
                          </td>
                          <td className="px-3.5 py-2.5  border-custom-500 dark:border-custom-800">
                            {work.state} {work.lga}
                          </td>
                          <td className="px-3.5 py-2.5  border-custom-500 dark:border-custom-800">
                            {work?.startDate ? new Date(work?.startDate).toLocaleDateString() : ""}
                          </td>
                          <td className="px-3.5 py-2.5  border-custom-500 dark:border-custom-800">
                          {work?.endDate ? new Date(work?.endDate).toLocaleDateString() : ""}
                          </td>
                          <td className="px-3.5 py-2.5  border-custom-500 dark:border-custom-800">
                            {work?.currentWork ? "Yes" : "No"}
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>

         
          </div>
   
    </React.Fragment>
  );
};

export default WorkExperience;
