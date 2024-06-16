import React, { useState } from "react";

import { useParams } from "react-router-dom";
import useUserProfile from "hooks/useUserProfile";
import useGuarantor from "hooks/useGuarantor";
import {
  NinVerificationInput,
  NinVerificationRes,
} from "types/verification.type";
import {
  verifyDriverLicence,
  verifyNin,
  verifyVoterCard,
} from "services/verification.service";

const Guarantor = () => {
  const params = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { data, isLoading } = useGuarantor(params.id!);

  const handleDocVerification = async (val: string) => {
    if (data?.data?.guarantorConsent?.docType?.toLowerCase()?.includes("nin")) {
      handleNinVerification(val);
    }
    if (
      data?.data?.guarantorConsent?.docType
        ?.toLowerCase()
        .includes("voters card")
    ) {
      handleVoterCardVerification(val);
    }
    if (
      data?.data?.guarantorConsent?.docType
        ?.toLowerCase()
        .includes("driverlicense")
    ) {
      handleDriverLicenceVerification(val);
    }
  };

  const handleNinVerification = async (nin: string) => {
    const firstName = data?.data?.guarantorConsent?.firstName;
    const lastName = data?.data?.guarantorConsent?.lastName;
    try {
      setErrorMessage("");
      setLoading(true);
      const ninPayload: NinVerificationInput = {
        nin,
      };
      const res = await verifyNin(ninPayload);
      const info = res.data as NinVerificationRes;

      if (
        info.first_name?.toLowerCase() !== firstName?.toLowerCase() &&
        info.last_name.toLowerCase() !== lastName?.toLowerCase()
      ) {
        setErrorMessage(
          "first and last name does not match with provided Identity"
        );

        return;
      }

      if (info.first_name.toLowerCase() !== firstName?.toLowerCase()) {
        setErrorMessage(" first name does not match with provided Identity");

        return;
      }
      if (info.last_name?.toLowerCase() !== lastName?.toLowerCase()) {
        setErrorMessage("last name does not match with provided Identity");

        return;
      }
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVoterCardVerification = async (vin: string) => {
    try {
      setErrorMessage("");

      setLoading(true);
      const gfirstName = data?.data?.guarantorConsent?.firstName;
      const glastName = data?.data?.guarantorConsent?.lastName;

      const info = await verifyVoterCard(vin);
      const [firstName, _, lastName] = info.data.full_name.split(" ");

      if (
        firstName?.toLowerCase() !== gfirstName?.toLowerCase() &&
        lastName.toLowerCase() !== glastName?.toLowerCase()
      ) {
        setErrorMessage(
          "first and last name does not match with provided Identity"
        );

        return;
      }

      if (firstName.toLowerCase() !== gfirstName?.toLowerCase()) {
        setErrorMessage("first name does not match with provided Identity");

        return;
      }
      if (lastName?.toLowerCase() !== glastName?.toLowerCase()) {
        setErrorMessage("last name does not match with provided Identity");

        return;
      }
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

      const gfirstName = data?.data?.guarantorConsent?.firstName;
      const glastName = data?.data?.guarantorConsent?.lastName;

      const info = await verifyDriverLicence(licenceNumber);
      const firstName = info.data.firstName;
      const lastName = info.data.lastName;

      if (
        firstName?.toLowerCase() !== gfirstName?.toLowerCase() &&
        lastName.toLowerCase() !== glastName?.toLowerCase()
      ) {
        setErrorMessage(
          "first and last name does not match with provided Identity"
        );

        return;
      }

      if (firstName.toLowerCase() !== gfirstName?.toLowerCase()) {
        setErrorMessage("irst name does not match with provided Identity");

        return;
      }
      if (lastName?.toLowerCase() !== glastName?.toLowerCase()) {
        setErrorMessage("last name does not match with provided Identity");

        return;
      }
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  return (
    <React.Fragment>
      <div className="grid grid-cols-1 gap-x-5 2xl:grid-cols-12">
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
                        {data?.data?.fullName}
                      </td>
                    </tr>

                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        Email
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.email}
                      </td>
                    </tr>

                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        Phone
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.phone}
                      </td>
                    </tr>

                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        Address
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.address}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card-body">
              <h6 className="mb-4 text-15">Gurantor Consent Information</h6>
              <div className="overflow-x-auto">
                <table className="w-full ltr:text-left rtl:ext-right">
                  <tbody>
                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        Name
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.guarantorConsent?.firstName}{" "}
                        {data?.data?.guarantorConsent?.lastName}
                      </td>
                    </tr>

                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        Relationship
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.guarantorConsent?.relationship}
                      </td>
                    </tr>

                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        Email
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.guarantorConsent?.email}
                      </td>
                    </tr>

                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        Phone
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.guarantorConsent?.phone}
                      </td>
                    </tr>

                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        Address
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.guarantorConsent?.address}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        Ducument Provided
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.guarantorConsent?.docType}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        Ducument Number
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.guarantorConsent?.docNumber}
                      </td>
                    </tr>

                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        Occupation
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.guarantorConsent?.occupation}
                      </td>
                    </tr>

                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        Identity Document
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.guarantorConsent?.identity && (
                          <a
                            href={data?.data?.guarantorConsent?.identity?.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {data?.data?.guarantorConsent?.identity?.name ||
                              "View Document"}
                          </a>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-2 font-semibold ps-0" scope="row">
                        Guarantor Consent
                      </th>
                      <td className="py-2 text-right text-slate-500 dark:text-zink-200">
                        {data?.data?.consent}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                {data?.data?.consent?.toLowerCase() === "approved" && (
                  <button
                    type="button"
                    onClick={() =>
                      handleDocVerification(
                        data?.data.guarantorConsent?.docNumber!
                      )
                    }
                    // disabled={data?.data?.user?.accountVerified}
                    className="text-white transition-all duration-200 ease-linear btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20 mt-12"
                  >
                    {loading ? "Processing..." : "  Verify Guarantor Document"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Guarantor;
