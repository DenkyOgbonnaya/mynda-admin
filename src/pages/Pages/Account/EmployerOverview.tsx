import React, { useState } from "react";

import { useParams } from "react-router-dom";
import useUserProfile from "hooks/useUserProfile";
import IdentityVerification from "./IdentityVerification";
import Modal from "Common/Components/Modal";
import EmployerForm from "../Forms/EmployerForm";

const EmployerOverviewTabs = () => {
  const params = useParams();
  const [showUpdate, setShowUpdate] = useState(false);

  const toggleUpdate = () => {
    setShowUpdate(!showUpdate);
  };

  const { data, isLoading } = useUserProfile(params.id!);

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className=" overflow-auto">
      <div className="flex grid-cols-1 gap-x-5 2xl:grid-cols-12">
        <div className="2xl:col-span-3">
          <div className="card">
            <div className="card-body flex flex-col">
              {!data?.data?.user?.accountVerified && (
                <button
                  onClick={toggleUpdate}
                  className="text-white self-end btn my-5 bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
                >
                  Update documents
                </button>
              )}
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
                        Document Number
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.employer?.docNumber}
                      </td>
                    </tr>

                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        Document
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.employer?.document && (
                          <a
                            href={data?.data?.employer?.document?.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {data?.data?.employer?.document?.name}
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
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <IdentityVerification
          docNumber={data?.data?.employer?.docNumber!}
          docType={data?.data?.employer?.docType!}
          status={data?.data?.user?.kycStatus!}
          userId={data?.data?.user?._id!}
        />

        <Modal
          show={showUpdate}
          onHide={toggleUpdate}
          id="defaultModal"
          modal-center="true"
          className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
          dialogClassName="w-screen md:w-[30rem] bg-white shadow rounded-md dark:bg-zink-600"
        >
          <Modal.Header
            className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-zink-500"
            closeButtonClass="transition-all duration-200 ease-linear text-slate-500 hover:text-red-500"
          >
            <Modal.Title className="text-16">Update Documents</Modal.Title>
          </Modal.Header>
          <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
            <EmployerForm
              onCancel={toggleUpdate}
              data={data?.data?.employer!}
              onSubmit={toggleUpdate}
            />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default EmployerOverviewTabs;
