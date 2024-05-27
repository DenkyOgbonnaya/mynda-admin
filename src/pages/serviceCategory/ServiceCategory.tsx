import React, { ChangeEvent, FormEvent, useState } from "react";
import BreadCrumb from "Common/BreadCrumb";

// Icons
import { Plus, Search } from "lucide-react";
import Modal from "Common/Components/Modal";
import DeleteModal from "Common/DeleteModal";

// Formik

import { ToastContainer, toast } from "react-toastify";
import useInputChange from "hooks/useInputChange";
import { useMutation, useQueryClient } from "react-query";
import { addRole, addServiceCategories, deleteSkill } from "services/general.service";
import { Role, ServiceCategory } from "types/general.interface";
import useServiceCategories from "hooks/userServiceCategories";
import { uploadeFile } from "services/file.service";

const ServiceCategoryList = () => {

  const { data } = useServiceCategories();
  const [showAdd, setShowAdd] = useState(false);
  const { state, onChange, onChangeByNameValue } = useInputChange<ServiceCategory>({
    name: "",
    description: '',
    coverPhoto: undefined
  });
  const [record] = useState<any >(null)
  const [showDelete, setShowDelete] = useState(false);

  const queryClient = useQueryClient();

  const { isLoading: adding, mutate } = useMutation(
    async (input: ServiceCategory) => await addServiceCategories(input),
    {
      onSuccess(data) {
        toast.success(data?.message);
        queryClient.invalidateQueries();
        toggleAdd();
      },
      onError(error: any) {
        toast.error(error?.response?.data?.message);
      },
    }
  );

  const {  mutate:uploadMutate } = useMutation(
    async (file:FormData) => await uploadeFile(file),
    {
      onSuccess(data) {
        const file:ServiceCategory["coverPhoto"] = {
            name: data?.data?.fileName,
            url: data?.data?.url,
            id:data?.data.id,
            size: data?.data?.size,

        }
        onChangeByNameValue("coverPhoto",file)
        toast.success(data?.message);
     
      },
      onError(error: any) {
        toast.error(error?.response?.data?.message);
      },
    }
  );

  const toggleAdd = () => {
    setShowAdd(!showAdd);
  };
  const toggleDelete = () => {
    setShowDelete(!showDelete);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate(state);
  };

  const handleDelete = () => {
    // deleteMutate()
  }

  const handleUplaod = (e:ChangeEvent<HTMLInputElement>) => {
    if(e.target.files){
        const formData = new FormData();
        const file = e.target.files[0]

      
        formData.append("file", file);
        // console.log(file,"FILEss", formData.get("file"))

        uploadMutate(formData)
    }
  }

  return (
    <React.Fragment>
      <BreadCrumb title="Service Category" pageTitle="Users" />

      <ToastContainer closeButton={false} limit={1} />
      <div className="grid grid-cols-1 gap-x-5 xl:grid-cols-12">
        <div className="lg:col-span-3 lg:col-start-10 my-4">
          <div className="flex gap-2 lg:justify-end">
            <button
              onClick={toggleAdd}
              type="button"
              className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
            >
              <Plus className="inline-block size-4" />{" "}
              <span className="align-middle">Add Category</span>
            </button>
          </div>
        </div>

        <div className="xl:col-span-12">
          <div className="card" id="usersTable">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="ltr:text-left rtl:text-right ">
                  <tr>
                    <th className="px-3.5 py-2.5 border border-custom-500 font-semibold">
                      Name
                    </th>

                  
                    <th className="px-3.5 py-2.5 border border-custom-500 font-semibold">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {data?.data?.length! < 1 ? (
                    <div className="noresult">
                      <div className="py-6 text-center">
                        <Search className="size-6 mx-auto text-sky-500 fill-sky-100 dark:sky-500/20" />
                        <h5 className="mt-2 mb-1">Sorry! No Result Found</h5>
                        <p className="mb-0 text-slate-500 dark:text-zink-200">
                          No Records
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      {data?.data?.map((record) => (
                        <tr key={record._id}>
                          <td className="px-3.5 py-2.5 border  border-custom-500 dark:border-custom-800">
                            {record.name}
                          </td>
                        
                          <td className="px-3.5 py-2.5 border  border-custom-500 dark:border-custom-800">
                            {record.description}
                          </td>
                          {/* <td className="px-3.5 py-2.5 border  border-custom-500 dark:border-custom-800">
                            <button
                              type="reset"
                              data-modal-close="addDocuments"
                              className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-600 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10"
                              onClick={() => {
                                setRecord(record)
                                toggleDelete()
                              }}
                            >
                              Delete
                            </button>
                          </td> */}
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={showAdd}
        onHide={toggleAdd}
        id="defaultModal"
        modal-center="true"
        className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
        dialogClassName="w-screen md:w-[30rem] bg-white shadow rounded-md dark:bg-zink-600"
      >
        <Modal.Header
          className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-zink-500"
          closeButtonClass="transition-all duration-200 ease-linear text-slate-500 hover:text-red-500"
        >
          <Modal.Title className="text-16">Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
          <form  onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="inline-block mb-2 text-base font-medium">
                Name
              </label>
              <input
                type="text"
                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                placeholder=""
                name="name"
                onChange={onChange}
                value={state.name}
                required={true}
              />
            </div>

            <div className="mb-3">
              <label className="inline-block mb-2 text-base font-medium">
                Cover Photo
              </label>
              <input
                type="file"
                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                placeholder=""
                name="coverPhoto"
                onChange={handleUplaod}
                required={true}
                value={state.coverPhoto?.name}
                
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

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="reset"
                data-modal-close="addDocuments"
                className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-600 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10"
                onClick={toggleAdd}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
              >
                {adding ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <DeleteModal show={showDelete} onHide={toggleDelete} onDelete={handleDelete}/>
    </React.Fragment>
  );
};

export default ServiceCategoryList;
