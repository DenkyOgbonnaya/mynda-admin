import React, { FormEvent, useState } from "react";
import BreadCrumb from "Common/BreadCrumb";

// Icons
import { Plus, Search } from "lucide-react";
import Modal from "Common/Components/Modal";
import DeleteModal from "Common/DeleteModal";

// react-redux
import { useDispatch } from "react-redux";

// Formik

import { ToastContainer, toast } from "react-toastify";
import useSkills from "hooks/useSkills";
import useInputChange from "hooks/useInputChange";
import { useMutation, useQueryClient } from "react-query";
import { addSkill, deleteSkill, editSkill } from "services/general.service";
import { Skill, SkillCreate } from "types/general.interface";
import SkillForm from "./SkillForm";

const Skills = () => {
  const { data, isLoading } = useSkills("");
  const [showAdd, setShowAdd] = useState(false);
  const { state, onChange } = useInputChange<{
    name: string;
    category: string;
  }>({
    name: "",
    category: "",
  });
  const [record, setRecord] = useState<any>(null);
  const [showDelete, setShowDelete] = useState(false);

  const queryClient = useQueryClient();

  const { isLoading: adding, mutate } = useMutation(
    async (input: SkillCreate) => await addSkill(input),
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

  const { isLoading: deleting, mutate: deleteMutate } = useMutation(
    async () => await deleteSkill(record?._id),
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
    async (input: SkillCreate) => await editSkill(record?._id!, input),
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

  const handleSubmit = (data: SkillCreate) => {
    if (record) {
      const payload: SkillCreate = {
        ...data,
      };
      editMutate(payload);
    } else {
      const payload: SkillCreate = {
        ...data,
      };
      mutate(payload);
    }
  };

  const handleDelete = () => {
    deleteMutate();
  };

  const onEdit = (record: Skill) => {
    setRecord(record);
    toggleAdd();
  };

  const handleAdd = () => {
    setRecord(null);
    toggleAdd();
  };

  return (
    <div className=" overflow-auto">
      <BreadCrumb title="Skills" pageTitle="Users" />

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
              <span className="align-middle">Add Skill</span>
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
                      Action
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
                          <td className="px-3.5 py-2.5 border  border-gray-200 dark:border-custom-800">
                            {record.name}
                          </td>
                          <td className="px-3.5 py-2.5 border  border-gray-200 dark:border-custom-800">
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
          <Modal.Title className="text-16">Add Skill</Modal.Title>
        </Modal.Header>
        <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
          <SkillForm
            onCancel={toggleAdd}
            onSubmit={handleSubmit}
            isLoading={adding || editing}
            data={record}
          />
        </Modal.Body>
      </Modal>

      <DeleteModal
        show={showDelete}
        onHide={toggleDelete}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Skills;
