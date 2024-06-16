export interface NinVerificationInput {
  nin: string;
}

export interface NinVerificationRes {
  first_name: string;
  last_name: string;
  middle_name: string;
  gender: string;
  image: string;
  phone_number: string;
  date_of_birth: string;
  nin: string;
  selfie_verification?: {
    confidence_value: number;
    match: boolean;
  };
}

export interface VoterCardVerificationRes {
  entity: {
    full_name: string;
    voter_identification_number: string;
    gender: string;
    occupation: string;
    time_of_registration: string;
    state: string;
    local_government: string;
    registration_area_ward: string;
    polling_unit: string;
    polling_unit_code: string;
    address: string;
    phone: string;
    date_of_birth: string;
  };
}

export interface DriversLicenceVerificationRes {
  entity: {
    uuid: string;
    licenseNo: string;
    firstName: string;
    lastName: string;
    middleName: string;
    gender: string;
    issuedDate: string;
    expiryDate: string;
    stateOfIssue: string;
    birthDate: string;
    photo: string;
  };
}
