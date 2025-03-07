import React, { FormEvent } from "react";
import BreadCrumb from "Common/BreadCrumb";
import useInputChange from "hooks/useInputChange";
import { InvoiceCreate } from "types/invoice.interface";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { BookingCard } from "Common/Components/BookingCard";
import { useMutation, useQueryClient } from "react-query";
import { createInvoice } from "services/invoice.service";
import { toast } from "react-toastify";

const SendInvoice = () => {
  const { state, onChange } = useInputChange<InvoiceCreate>({
    transportationFee: "",
    chargedFee: "",
    salary: "",
    labTest: "",
  });

  const searchParams = useSearchParams()[0];
  const queryClient = useQueryClient();
  const navigation = useNavigate();

  const bookingId = searchParams.get("booking");

  const { state: locationState } = useLocation();

  const { isLoading, mutate } = useMutation(
    async (input: InvoiceCreate) => await createInvoice(bookingId!, input),
    {
      onSuccess(data) {
        toast.success(data?.message || "Invoice sent");
        queryClient.invalidateQueries("bookings");
        navigation(-1);
      },
      onError(error: any) {
        toast.error(error?.response?.data?.message);
      },
    }
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const payload: InvoiceCreate = {
      ...state,
      // @ts-expect-error no error
      chargedFee: state.chargedFee ? Number(state.chargedFee) : 0,
      // @ts-ignore no error
      transportationFee: state.transportationFee
        ? Number(state.transportationFee)
        : 0,
      // @ts-ignore no error
      salary: state.salary ? Number(state.salary) : 0,
    };

    mutate(payload);
  };

  return (
    <React.Fragment>
      <BreadCrumb title="Send Invoice" pageTitle="Invoice" />

      <div className=" my-8 px-4 w-full lg:max-w-[70%] bg-white rounded-md py-8">
        {locationState && locationState.booking && (
          <BookingCard booking={locationState?.booking} showBtn={false} />
        )}
        <div className="flex flex-col my-4">
          <p>Employer Message</p>
          <p className=" text-sm font-normal text-gray-400">
            {locationState?.booking?.message ? (
              <>{locationState?.booking?.message}</>
            ) : (
              "No message"
            )}
          </p>
        </div>

        <div className="flex flex-col my-4">
          <p>Mynda Type</p>
          <p className=" text-sm font-normal text-gray-400">
            {locationState?.booking?.bookingType || "Not specified"}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className=" bg-white rounded-md p-4 flex flex-col gap-8 w-full lg:max-w-[70%] my-4"
      >
        {locationState?.booking?.bookingType === "live-in" && (
          <>
            <div className="mb-3">
              <label className="inline-block mb-2 text-base font-medium">
                Transaport Fee
              </label>
              <input
                type="text"
                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                placeholder="transportation fee"
                name="transportationFee"
                onChange={onChange}
                value={state.transportationFee}
                required
                pattern="[0-9]+"
              />
            </div>
          </>
        )}

        <div className="mb-3">
          <label className="inline-block mb-2 text-base font-medium">
            Commission Fee
          </label>
          <input
            type="text"
            className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
            placeholder="Commission fee"
            name="chargedFee"
            onChange={onChange}
            value={state.chargedFee}
            required
            pattern="[0-9]+"
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="submit"
            className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
          >
            {isLoading ? "Loading..." : "Send Voice"}
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default SendInvoice;
