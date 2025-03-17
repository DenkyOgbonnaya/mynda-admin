import React, { FormEvent, useState } from "react";
import {
  verifyDriverLicence,
  verifyNin,
  verifyVoterCard,
} from "services/verification.service";
import { useParams } from "react-router-dom";
import useUserProfile from "hooks/useUserProfile";
import {
  NinVerificationInput,
  NinVerificationRes,
} from "types/verification.type";
import { KycStatus } from "types/user.type";
import { useMutation, useQueryClient } from "react-query";
import { verifyUser } from "services/user.service";
import Modal from "Common/Components/Modal";

interface Props {
  docType: string;
  docNumber: string;
  userId: string;
  status: KycStatus;
}
const IdentityVerification = ({
  docNumber,
  docType,
  userId,
  status,
}: Props) => {
  const [identity, setIdentity] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    phoneNumber: "",
    address: "",
    img: "",
    occupation: "",
    gender: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [userStatus, setStatus] = useState<KycStatus>("In Review");
  const [comment, setComment] = useState("");

  const queryClient = useQueryClient();

  const { isLoading: verifying, mutate } = useMutation(
    async (input: { status: string; comment: string }) =>
      await verifyUser(userId, input),
    {
      onSuccess(data) {
        queryClient.invalidateQueries();
        toggleComment();
        alert(data.message);
      },
      onError(err: any) {
        alert(err?.response?.data?.message);
      },
    }
  );

  const handleVerification = (e: FormEvent) => {
    e.preventDefault();
    mutate({ status: userStatus, comment });
  };

  const toggleComment = () => {
    setShowComment(!showComment);
  };

  const handleVoterCardVerification = async (vin: string) => {
    try {
      setLoading(true);

      const info = await verifyVoterCard(vin);
      const [firstName, _, lastName] = info.data.full_name.split(" ");

      setIdentity({
        firstName: firstName,
        lastName: lastName,
        phoneNumber: info.data?.phone,
        occupation: info?.data?.occupation,
        img: "",
        address: info?.data?.address,
        email: "",
        dob: info?.data?.date_of_birth,
        gender: info?.data?.gender,
      });
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDriverLicenceVerification = async (licenceNumber: string) => {
    try {
      setErrorMessage("");
      setLoading(true);
      const info = await verifyDriverLicence(licenceNumber);

      setIdentity({
        firstName: info?.data?.firstName,
        lastName: info?.data?.firstName,
        phoneNumber: "",
        occupation: "",
        img: info?.data?.photo,
        address: "",
        email: "",
        dob: info?.data?.birthDate,
        gender: info?.data?.gender,
      });
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNinVerification = async (nin: string) => {
    try {
      setErrorMessage("");
      setLoading(true);
      const ninPayload: NinVerificationInput = {
        nin,
      };
      const res = await verifyNin(ninPayload);
      const info = res.data as NinVerificationRes;

      setIdentity({
        firstName: info?.first_name,
        lastName: info?.last_name,
        phoneNumber: info?.phone_number,
        occupation: "",
        img: info?.image,
        // @ts-ignore
        address: info.address,
        // @ts-ignore,
        email: info.email,
        dob: info?.date_of_birth,
        gender: info?.gender,
      });
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDocVerification = async () => {
    const val = docNumber;
    console.log(docNumber, "DOC NIUM", docType);
    if (!docNumber) {
      setErrorMessage("No identity document provided");
      return;
    }
    if (docType?.toLowerCase()?.includes("nin")) {
      handleNinVerification(val);
    }
    if (docType?.toLowerCase().includes("voters card")) {
      handleVoterCardVerification(val);
    }
    if (["drivers license", "driverlicense"].includes(docType?.toLowerCase())) {
      handleDriverLicenceVerification(val);
    }
  };

  const handleReject = () => {
    setStatus("Rejected");
    toggleComment();
  };

  const handleApprove = () => {
    setStatus("Approved");
    toggleComment();
  };

  return (
    <React.Fragment>
      <div className="card flex-1">
        <div className="card-body">
          <h6 className=" text-15">Verification Information</h6>
          <p className="text-xs mb-4">
            Get verification details from user provided {docType || "document"}
          </p>

          <table className="w-full ltr:text-left rtl:ext-right">
            <tbody>
              <tr>
                <th className="py-2 font-semibold ps-0" scope="row">
                  First Name
                </th>
                <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                  {identity.firstName}
                </td>
              </tr>

              <tr>
                <th className="py-2 font-semibold ps-0" scope="row">
                  Last Name
                </th>
                <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                  {identity.lastName}
                </td>
              </tr>
              <tr>
                <th className="py-2 font-semibold ps-0" scope="row">
                  Phone Numer
                </th>
                <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                  {identity.phoneNumber}
                </td>
              </tr>
              <tr>
                <th className="py-2 font-semibold ps-0" scope="row">
                  Email
                </th>
                <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                  {identity.email}
                </td>
              </tr>
              <tr>
                <th className="py-2 font-semibold ps-0" scope="row">
                  Date of birth
                </th>
                <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                  {identity.dob}
                </td>
              </tr>
              <tr>
                <th className="py-2 font-semibold ps-0" scope="row">
                  Gender
                </th>
                <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                  {identity.gender}
                </td>
              </tr>
              <tr>
                <th className="py-2 font-semibold ps-0" scope="row">
                  Address
                </th>
                <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                  {identity.address}
                </td>
              </tr>
            </tbody>
          </table>
          {errorMessage && (
            <p className="text-xs my-4 text-red-500">{errorMessage}</p>
          )}
          <div className="flex  items-center justify-between mt-[2rem]">
            <button
              type="button"
              onClick={handleDocVerification}
              disabled={loading}
              className="text-white transition-all duration-200 ease-linear btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
            >
              {loading ? "Processing..." : "Get Verification"}
            </button>

            {status === "In Review" && (
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleApprove}
                  disabled={loading}
                  className="text-white transition-all duration-200 ease-linear btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
                >
                  Approve
                </button>

                <button
                  type="button"
                  onClick={handleReject}
                  disabled={verifying}
                  className="text-white transition-all duration-200 ease-linear btn bg-red-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        show={showComment}
        onHide={toggleComment}
        id="defaultModal"
        modal-center="true"
        className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
        dialogClassName="w-screen md:w-[30rem] bg-white shadow rounded-md dark:bg-zink-600"
      >
        <Modal.Header
          className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-zink-500"
          closeButtonClass="transition-all duration-200 ease-linear text-slate-500 hover:text-red-500"
        >
          <Modal.Title className="text-16">Verify user</Modal.Title>
        </Modal.Header>
        <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
          <form action="#!" onSubmit={handleVerification}>
            <div className="mb-3">
              <label className="inline-block mb-2 text-base font-medium">
                Additional Comment
              </label>
              <input
                type="text"
                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                placeholder="Enter Comment"
                name="comment"
                onChange={({ target }) => setComment(target.value)}
                value={comment}
                required
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="reset"
                data-modal-close="addDocuments"
                className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-600 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10"
                onClick={toggleComment}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
              >
                {verifying ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default IdentityVerification;
