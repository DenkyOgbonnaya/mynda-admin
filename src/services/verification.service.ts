import {
  NinVerificationInput,
  NinVerificationRes,
  DriversLicenceVerificationRes,
  VoterCardVerificationRes,
} from "types/verification.type";
import { handlePostRequest } from "./http.service";

export const verifyNin = async (input: NinVerificationInput) => {
  return await handlePostRequest<NinVerificationInput, NinVerificationRes>(
    "/verifications/verify-nin",
    input
  );
};

export const verifyDriverLicence = async (licenceNumber: string) => {
  return await handlePostRequest<
    { licenceNumber: string },
    DriversLicenceVerificationRes["entity"]
  >("/verifications/verify-driver-license", {
    licenceNumber,
  });
};

export const verifyVoterCard = async (vin: string) => {
  return await handlePostRequest<
    { vin: string },
    VoterCardVerificationRes["entity"]
  >("/verifications/verify-voter-card", { vin });
};
