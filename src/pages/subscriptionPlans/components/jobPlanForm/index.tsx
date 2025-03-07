import Modal from "Common/Components/Modal";
import useInputChange from "hooks/useInputChange";
import { FormEvent, useEffect, useState } from "react";
import {
  SubscriptionPlan,
  SubscriptionPlanFeature,
} from "types/subscription.interface";
import FeatureForm from "../featureForm";
import { ModalBody } from "Common/Components/Modal/ModalContent";

interface Props {
  onSubmit: (data: SubscriptionPlan) => void;
  onCancel: () => void;
  data?: SubscriptionPlan;
  isLoading?: boolean;
}
export default function JobPlanForm({
  onSubmit,
  data,
  isLoading,
  onCancel,
}: Props) {
  const [showFeature, setShowFeature] = useState(false);
  const [feature, setFeature] = useState<SubscriptionPlanFeature | null>(null);

  const { state, onChange, setState } = useInputChange<SubscriptionPlan>({
    name: data?.name || "",
    interval: data?.interval || "",
    description: data?.description || "",
    duration: data?.duration || 7,
    role: [],
    features: [],
    // @ts-ignore
    price: data?.price || "",
  });

  useEffect(() => {
    if (data) setState(data);
  }, [data]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit(state);
  };

  const toggleFeature = () => {
    setShowFeature(!showFeature);
  };

  const handleAddFeature = (feature: SubscriptionPlanFeature) => {
    if (feature._id) {
      const updatedFeat = state.features.map((feat) =>
        feat._id === feature._id ? { ...feat, ...feature } : feat
      );
      setState({
        ...state,
        features: updatedFeat,
      });
    } else {
      setState({
        ...state,
        features: state.features.concat(feature),
      });
    }

    setShowFeature(false);
  };

  const handleEdit = (feat: SubscriptionPlanFeature) => {
    setFeature(feat);

    setShowFeature(true);
  };

  return (
    <form action="#!" onSubmit={handleSubmit} key={JSON.stringify(data)}>
      <div className="mb-3">
        <label className="inline-block mb-2 text-base font-medium">Name</label>
        <input
          type="text"
          className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
          placeholder="Premium"
          name="name"
          onChange={onChange}
          value={state.name}
        />
      </div>

      <div className="mb-3">
        <label className="inline-block mb-2 text-base font-medium">
          Interval
        </label>
        <select
          className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
          name="interval"
          onChange={onChange}
          value={state.interval}
        >
          <option value="Daily">Daily</option>
          <option value="Monthy">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="inline-block mb-2 text-base font-medium">
          Duration
        </label>
        <input
          type="number"
          className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
          placeholder="50"
          name="duration"
          onChange={onChange}
          value={state.duration}
        />
      </div>

      <div className="mb-3">
        <label className="inline-block mb-2 text-base font-medium">Price</label>
        <input
          className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
          placeholder="0.00"
          name="price"
          onChange={onChange}
          value={state.price}
          pattern="[0-9]+"
        />
      </div>

      <div className="mb-3">
        <label className="inline-block mb-2 text-base font-medium">
          Description
        </label>
        <input
          type="text"
          className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
          placeholder="Enter Description"
          name="description"
          onChange={onChange}
          value={state.description}
        />
      </div>

      <div className=" flex flex-col gap-4 my-8">
        <h5 className=" text-base ">Plan Features</h5>

        {state.features?.map((feature) => (
          <div key={feature._id} className="flex items-center  gap-2">
            {/* <p>{feature.name}</p> */}
            <p className=" text-gray-300">{feature.description}</p>
            <span>{feature.available}</span>

            <button
              className="text-[0.75rem]"
              onClick={() => handleEdit(feature)}
            >
              Edit
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={toggleFeature}
          className=" text-custom-500"
        >
          Update features
        </button>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button
          type="reset"
          data-modal-close="addDocuments"
          className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-600 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </div>

      <Modal
        show={showFeature}
        onHide={() => setShowFeature(false)}
        modal-center="true"
        className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
        dialogClassName="w-screen md:w-[30rem] bg-white shadow rounded-md dark:bg-zink-600"
      >
        <Modal.Header
          className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-zink-500"
          closeButtonClass="transition-all duration-200 ease-linear text-slate-500 hover:text-red-500"
        >
          <Modal.Title className="text-16">Update Feature</Modal.Title>
        </Modal.Header>
        <ModalBody className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
          <FeatureForm
            onSubmit={handleAddFeature}
            onCancel={() => setShowFeature(false)}
          />
        </ModalBody>
      </Modal>
    </form>
  );
}
