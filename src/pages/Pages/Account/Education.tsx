import React from "react";

import { useParams } from "react-router-dom";
import useUserProfile from "hooks/useUserProfile";
import useGuarantor from "hooks/useGuarantor";
import useEducation from "hooks/useEducation";



const Education = () => {
    const params = useParams();

const { data, isLoading } = useEducation(params.id!);

if (isLoading) return <p>Loading...</p>;
  return (
    <React.Fragment>
         <div className="card" id="usersTable">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="ltr:text-left rtl:text-right ">
                  <tr>
                    <th className="px-3.5 py-2.5 font-semibold">School</th>
                    <th className="px-3.5 py-2.5 font-semibold  border-custom-500 dark:border-custom-800">
                      Level
                    </th>
                    <th className="px-3.5 py-2.5 font-semibold  border-custom-500 dark:border-custom-800">
                      Start Date
                    </th>
                    <th className="px-3.5 py-2.5 font-semibold  border-custom-500 dark:border-custom-800">
                      End Date
                    </th>
                    <th className="px-3.5 py-2.5 font-semibold  border-custom-500 dark:border-custom-800">
                      Current School
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
                      {data?.data?.map?.((education) => (
                        <tr key={education._id} className=" cursor-pointer" >
                          <td className="px-3.5 py-2.5  border-custom-500 dark:border-custom-800">
                            {
                                education.school
                            }
                          </td>
                          <td className="px-3.5 py-2.5  border-custom-500 dark:border-custom-800">
                            {education.level}
                          </td>
                          <td className="px-3.5 py-2.5  border-custom-500 dark:border-custom-800">
                            {education?.startDate ? new Date(education?.startDate).toLocaleDateString() : ""}
                          </td>
                          <td className="px-3.5 py-2.5  border-custom-500 dark:border-custom-800">
                          {education?.endDate ? new Date(education?.endDate).toLocaleDateString() : ""}
                          </td>
                          <td className="px-3.5 py-2.5  border-custom-500 dark:border-custom-800">
                            {education?.currentSchool ? "Yes" : "No"}
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

export default Education;
