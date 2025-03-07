import useUserProfile from "hooks/useUserProfile";
import {
  Clock12Icon,
  Contact2Icon,
  DollarSign,
  LocateIcon,
  MessageCircleIcon,
  PhoneCallIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Booking } from "types/booking.interface";

interface Props {
  booking: Booking;
  showBtn?: boolean;
}
export function BookingCard({ booking, showBtn = true }: Props) {
  const { data: employer } = useUserProfile(booking?.bookedBy?._id);
  // @ts-expect-error error
  const { data: mynda } = useUserProfile(booking?.mynda?.user);
  return (
    <div className=" bg-white shadow-sm flex flex-col gap-2 p-3 rounded-md h-[100%]">
      <div className=" flex  gap-4 p-2">
        <img
          src={booking?.mynda?.profilePicture?.url}
          className=" w-[80px] h-[131px] object-cover rounded-md"
        />
        <div className="flex flex-col gap-3">
          <div>
            <p>{booking?.mynda?.title}</p>
            <Link
              className=" text-custom-500"
              to={`/pages-account/${mynda?.data?.user._id}`}
            >
              {mynda?.data?.user?.firstName} {mynda?.data?.user?.lastName}
            </Link>
          </div>
          <div className="flex items-center gap-8">
            <div className=" flex items-center gap-2 text-gray-400">
              <DollarSign />
              <p>{mynda?.data?.mynda?.salaryExpectations}</p>
            </div>
            <div className=" flex items-center gap-2 text-gray-400">
              <PhoneCallIcon />
              <span>{mynda?.data?.user?.phoneNumber},</span>
            </div>
          </div>

          <div className=" flex items-center gap-8 text-gray-400">
            <div className=" flex items-center gap-2 text-gray-400">
              <MessageCircleIcon />
              <a href={`mailto:${mynda?.data?.user?.email}`}>
                {mynda?.data?.user?.email},
              </a>
            </div>

            <div className=" flex items-center gap-2 text-gray-400">
              <LocateIcon />
              <span>
                {booking?.mynda?.state}, {booking?.mynda?.lga}
              </span>
            </div>
          </div>

          <div className=" flex items-center gap-2 text-gray-400">
            <Clock12Icon />
            <span>Booked: {new Date(booking?.createdAt).toDateString()}</span>
          </div>
        </div>
      </div>

      <div className=" flex gap-4 mt-3 bg-[#F2FFFA] p-2">
        <div>
          <img
            src={employer?.data?.profilePicture?.url}
            className=" w-[50px] h-[50px] rounded-full object-cover"
          />
          <p className="text-sm font-medium text-center">
            {booking?.bookedBy?.status}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className=" text-gray-400">Employer Details</p>
          <Link
            className=" text-custom-500"
            to={`/pages-account/${booking?.bookedBy._id}`}
          >
            {booking?.bookedBy?.firstName} {booking?.bookedBy?.lastName}
          </Link>

          <div className="flex items-center gap-8">
            <div className=" flex items-center gap-2 text-gray-400">
              <PhoneCallIcon />
              <span>{booking?.bookedBy?.phoneNumber},</span>
            </div>
            <div className=" flex items-center gap-2 text-gray-400">
              <MessageCircleIcon />
              <a href={`mailto:${booking?.bookedBy?.email}`}>
                {booking?.bookedBy?.email},
              </a>
            </div>
          </div>

          <div className=" flex items-center gap-2 text-gray-400">
            <Contact2Icon />
            <span>
              Registered: {new Date(booking?.bookedBy.createdAt).toDateString()}
            </span>
          </div>
        </div>
      </div>

      {booking.job && (
        <div className=" flex gap-4 mt-3 bg-[#F2FFFA] p-2">
          <div>
            <img
              src={booking?.job?.coverPhoto?.url}
              className=" w-[50px] h-[110px] rounded-md object-cover"
            />
          </div>

          <div className="flex flex-col gap-3">
            <p className=" text-gray-400">Job Details</p>
            <p className=" text-custom-500">{booking?.job?.title}</p>

            <div className=" flex items-center gap-2 text-gray-400">
              <PhoneCallIcon />
              <span>{booking?.bookedBy?.phoneNumber},</span>
            </div>
            <div className=" flex items-center gap-2 text-gray-400">
              <MessageCircleIcon />
              <a href={`mailto:${booking?.bookedBy?.email}`}>
                {booking?.bookedBy?.email},
              </a>
            </div>

            <div className=" flex items-center gap-8">
              <div className=" flex items-center gap-2 text-gray-400">
                <LocateIcon />
                <span>
                  {booking?.job?.area}, {booking?.job?.location}
                </span>
              </div>
              <div className=" flex items-center gap-2 text-gray-400">
                <DollarSign />
                <p>{booking?.job?.salary},</p>
              </div>
            </div>

            <div className=" flex items-center gap-2 text-gray-400">
              <Contact2Icon />
              <span>
                Posted: {new Date(booking?.job?.createdAt!).toDateString()}
              </span>
            </div>
          </div>
        </div>
      )}

      {showBtn && (
        <div className=" flex-1 flex flex-col justify-end">
          {booking?.invoiced ? (
            <button
              disabled
              className="  bg-[#204ECF] disabled:opacity-55 w-full text-white font-medium text-base p-3 rounded-md mt-6"
            >
              Invoice Sent
            </button>
          ) : (
            <Link
              to={`/send-invoice?booking=${booking?._id}&user=${mynda?.data?.user?._id}`}
              state={{ booking: booking }}
            >
              <button className=" bg-[#204ECF] w-full text-white font-medium text-base p-3 rounded-md mt-6">
                Send Invoice
              </button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
