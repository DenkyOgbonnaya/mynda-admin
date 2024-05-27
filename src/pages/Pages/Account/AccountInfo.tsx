import React, { ChangeEvent } from "react";
import {
  BadgeCheck,
  Dribbble,
  Facebook,
  Github,
  Globe,
  ImagePlus,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MoreHorizontal,
  UserCircle,
} from "lucide-react";
import { Dropdown } from "Common/Components/Dropdown";
import { useParams } from "react-router-dom";

// IMage
import avatar1 from "assets/images/users/avatar-1.png";
import useUserProfile from "hooks/useUserProfile";
import { useMutation, useQueryClient } from "react-query";
import { verifyUser } from "services/user.service";

const AccountInfo = ({ className }: any) => {
  const params = useParams();
  const { data, isLoading } = useUserProfile(params.id!);

  const queryClient = useQueryClient()

  const { isLoading: verifying, mutate } = useMutation(
    async () => await verifyUser(params.id!),
    {
      onSuccess(data) {
        queryClient.invalidateQueries()
      },
      onError(err: any) {},
    }
  );

  const handleVerification = () => {
    mutate()
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <React.Fragment>
      <div className={className}>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 2xl:grid-cols-12">
          <div className="lg:col-span-2 2xl:col-span-1">
            <div className="relative inline-block size-20 rounded-full shadow-md bg-slate-100 profile-user xl:size-28">
              <img
                src={data?.data?.profilePicture?.url ?? avatar1}
                alt=""
                className="object-cover border-0 rounded-full img-thumbnail user-profile-image h-full w-full"
              />
            </div>
          </div>
          <div className="lg:col-span-10 2xl:col-span-9">
            <h5 className="mb-1">
              {data?.data?.user?.firstName} {data?.data?.user?.lastName}
              {data?.data?.user?.accountVerified && (
                <BadgeCheck className="inline-block size-4 text-sky-500 fill-sky-100 dark:fill-custom-500/20">
                  {" "}
                </BadgeCheck>
              )}
            </h5>
            <div className="flex gap-3 mb-4">
              <p className="text-slate-500 dark:text-zink-200">
                <UserCircle className="inline-block size-4 ltr:mr-1 rtl:ml-1 text-slate-500 dark:text-zink-200 fill-slate-100 dark:fill-zink-500"></UserCircle>{" "}
                {data?.data?.user?.role}
              </p>
              <p className="text-slate-500 dark:text-zink-200">
                <MapPin className="inline-block size-4 ltr:mr-1 rtl:ml-1 text-slate-500 dark:text-zink-200 fill-slate-100 dark:fill-zink-500"></MapPin>{" "}
                {data?.data?.mynda?.state}, {data?.data?.mynda?.lga}
              </p>
            </div>
            <ul className="flex flex-wrap gap-3 mt-4 text-center divide-x divide-slate-200 dark:divide-zink-500 rtl:divide-x-reverse">
              <li className="px-5">
                <p className="text-slate-500 dark:text-zink-200">
                  {data?.data?.user?.email}
                </p>
              </li>
              <li className="px-5">
                <p className="text-slate-500 dark:text-zink-200">
                  {data?.data?.user?.phoneNumber}
                </p>
              </li>
            </ul>
            {/* <p className="mt-4 text-slate-500 dark:text-zink-200">
              {data?.data?.mynda?.about}
            </p> */}
          </div>
          <div className="lg:col-span-12 2xl:col-span-2">
            <div className="flex gap-2 2xl:justify-end">
             
                <button
                  type="button"
                  onClick={handleVerification}
                  disabled={data?.data?.user?.accountVerified}
                  className="text-white transition-all duration-200 ease-linear btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
                >
                  {verifying ? "Processing..." : data?.data?.user?.accountVerified ? "Verified" : "Approve Account"}
                </button>
            
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AccountInfo;
