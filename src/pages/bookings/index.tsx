import React from "react";
import BreadCrumb from "Common/BreadCrumb";

import UiSpinners from "pages/Components/UIElement/UiSpinners";
import useBookings from "hooks/useBookings";
import { BookingCard } from "Common/Components/BookingCard";

const Bookings = () => {
  const { data, isLoading, hasNextPage, handleEndReached } = useBookings();

  return (
    <React.Fragment>
      <BreadCrumb title="Bookings" pageTitle="Bookings" />

      {isLoading ? (
        <UiSpinners />
      ) : (
        <div className="grid grid-cols-1 gap-x-5 xl:grid-cols-12">
          <div className="xl:col-span-12">
            <div className="card" id="usersTable">
              <div className="overflow-x-auto">
                {data && data?.length! > 0 ? (
                  <div className=" flex flex-col lg:flex-row justify-stretch items-center gap-4 flex-wrap">
                    {data?.map((data) => (
                      <div
                        key={data._id}
                        className="w-full lg:w-[48%] self-stretch"
                      >
                        <BookingCard booking={data} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <h5 className="mt-2 mb-1">Sorry! No Bookings Found</h5>
                )}

                <div className="flex gap-4 items-center justify-end my-4 px-4">
                  {hasNextPage && (
                    <button
                      className=" text-custom-500"
                      onClick={() => handleEndReached()}
                    >
                      Load more
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Bookings;
