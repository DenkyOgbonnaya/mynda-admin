import React, { useState } from "react";

import { useParams } from "react-router-dom";
import useUserProfile from "hooks/useUserProfile";

import IdentityVerification from "./IdentityVerification";
import Modal from "Common/Components/Modal";
import MyndaForm from "../Forms/MyndaForm";

const OverviewTabs = () => {
  const [showUpdateMynda, setShowUpdateMynda] = useState(false);
  const params = useParams();
  const { data, isLoading } = useUserProfile(params.id!);

  const toggleUpdateMynda = () => {
    setShowUpdateMynda(!showUpdateMynda);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className=" overflow-auto">
      <div className="flex flex-col">
        <div className="2xl:col-span-9">
          <div className="card">
            <div className="card-body">
              <h6 className="mb-3 text-15">Overview</h6>
              <p className="mb-2 text-slate-500 dark:text-zink-200">
                {data?.data?.mynda?.about}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="card">
            <div className="card-body flex flex-col">
              {!data?.data?.user?.accountVerified && (
                <button
                  onClick={toggleUpdateMynda}
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
                        Residential Address
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.mynda?.address}
                      </td>
                    </tr>

                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        State of Origin
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.mynda?.state}
                      </td>
                    </tr>

                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        L . G .A
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.mynda?.lga}
                      </td>
                    </tr>

                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        Sex
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.mynda?.gender}
                      </td>
                    </tr>

                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        Height
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.mynda?.height}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        Category
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.mynda?.occupation}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        Date of birth
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.mynda?.dob
                          ? new Date(
                              data?.data?.mynda?.dob
                            ).toLocaleDateString()
                          : ""}
                      </td>
                    </tr>

                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        Religion
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.mynda?.religion}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        State willing to relocate to
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.mynda?.stateCoverage?.toString()}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        Disabilities
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.mynda?.disabilities?.toString()}
                      </td>
                    </tr>

                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        Allergies
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.mynda?.allegies?.toString()}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        Uploaded Document
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.mynda?.docType}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        Document Number
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.mynda?.docNumber}
                      </td>
                    </tr>

                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        Document
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.mynda?.document && (
                          <a
                            href={data?.data?.mynda?.document?.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            View {data?.data?.mynda?.docType}
                          </a>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        {data?.data?.mynda?.docType}
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.mynda?.document && (
                          <a
                            href={data?.data?.mynda?.document?.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {data?.data?.mynda?.docType}
                          </a>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <IdentityVerification
            docNumber={data?.data?.mynda?.docNumber!}
            docType={data?.data?.mynda?.docType!}
            userId={data?.data?.user?._id!}
            status={data?.data?.user?.kycStatus!}
          />
        </div>
      </div>

      <Modal
        show={showUpdateMynda}
        onHide={toggleUpdateMynda}
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
          <MyndaForm
            onCancel={toggleUpdateMynda}
            data={data?.data?.mynda!}
            onSubmit={toggleUpdateMynda}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OverviewTabs;
