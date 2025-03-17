import React, { FormEvent, useState } from "react";
import BreadCrumb from "Common/BreadCrumb";

// Icons
import { Plus, Search } from "lucide-react";
import Modal from "Common/Components/Modal";
import DeleteModal from "Common/DeleteModal";

// Formik

import { ToastContainer, toast } from "react-toastify";
import { useMutation, useQueryClient } from "react-query";
import { addRole, deleteRole, editRole } from "services/general.service";
import { Role } from "types/general.interface";
import useRoles from "hooks/useRoles";
import RoleForm from "./RoleForm";

const Roles = () => {
  const { data } = useRoles();
  const [showAdd, setShowAdd] = useState(false);
  const [record, setRecord] = useState<Role | null>(null);

  const [showDelete, setShowDelete] = useState(false);

  const queryClient = useQueryClient();

  const { isLoading: adding, mutate } = useMutation(
    async (input: Role) => await addRole(input),
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

  const { mutate: deleteMutate } = useMutation(
    async (id: string) => await deleteRole(id),
    {
      onSuccess(data) {
        toast.success(data?.message);
        queryClient.invalidateQueries();
        toggleDelete();
      },
      onError(error: any) {
        toast.error(error?.response?.data?.message);
      },
    }
  );

  const { isLoading: editing, mutate: editMutate } = useMutation(
    async (input: Role) => await editRole(record?._id!, input),
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

  const toggleAdd = () => {
    setShowAdd(!showAdd);
  };
  const toggleDelete = () => {
    setShowDelete(!showDelete);
  };

  const handleSubmit = (data: Role) => {
    if (record) {
      const payload: Role = {
        ...data,
      };
      editMutate(payload);
    } else {
      const payload: Role = {
        ...data,
      };
      mutate(payload);
    }
  };

  const handleDelete = () => {
    if (record) deleteMutate(record._id!);
  };

  const onEdit = (role: Role) => {
    setRecord(role);
    toggleAdd();
  };

  const handleAdd = () => {
    setRecord(null);
    toggleAdd();
  };

  return (
    <React.Fragment>
      <BreadCrumb title="Roles" pageTitle="Users" />

      <ToastContainer closeButton={false} limit={1} />
      <div className="grid grid-cols-1 gap-x-5 xl:grid-cols-12">
        <div className="lg:col-span-3 lg:col-start-10 my-4">
          <div className="flex gap-2 lg:justify-end">
            <button
              onClick={handleAdd}
              type="button"
              className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
            >
              <Plus className="inline-block size-4" />{" "}
              <span className="align-middle">Add Role</span>
            </button>
          </div>
        </div>

        <div className="xl:col-span-12">
          <div className="card" id="usersTable">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="ltr:text-left rtl:text-right ">
                  <tr>
                    <th className="px-3.5 py-2.5 border border-gray-200 font-semibold">
                      Name
                    </th>

                    <th className="px-3.5 py-2.5 border border-gray-200 font-semibold">
                      Title
                    </th>
                    <th className="px-3.5 py-2.5 border border-gray-200 font-semibold">
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
                          <td className="px-3.5 py-2.5 border  border-gray-200">
                            {record.name}
                          </td>
                          <td className="px-3.5 py-2.5 border  border-gray-200">
                            {record.title}
                          </td>
                          <td className="px-3.5 py-2.5 border  border-gray-200">
                            {record.description}
                          </td>
                          <td className="px-3.5 py-2.5 border  border-gray-200">
                            <button
                              type="reset"
                              data-modal-close="addDocuments"
                              className="text-custom-500 bg-white btn hover:text-custom-500 hover:bg-custom-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-600 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10"
                              onClick={() => {
                                onEdit(record);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              type="reset"
                              data-modal-close="addDocuments"
                              className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-600 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10"
                              onClick={() => {
                                setRecord(record);
                                toggleDelete();
                              }}
                            >
                              Delete
                            </button>
                          </td>
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
          <Modal.Title className="text-16">Add Role</Modal.Title>
        </Modal.Header>
        <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
          <RoleForm
            onCancel={toggleAdd}
            onSubmit={handleSubmit}
            isLoading={adding}
            data={record}
          />
        </Modal.Body>
      </Modal>

      <DeleteModal
        show={showDelete}
        onHide={toggleDelete}
        onDelete={handleDelete}
      />
    </React.Fragment>
  );
};

export default Roles;
