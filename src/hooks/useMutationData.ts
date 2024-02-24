import { useMutation } from "react-query";

import { API } from "../services/api";
import { DataType } from "../interfaces";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export function useGetAllData(
  setData: (param: []) => void,
  setNoChangeData?: (param: []) => void
) {
  const { isLoading, isError, error, mutate } = useMutation(
    async ({ url, userId }: { url: string; userId: number }) =>
      await API.getAllData({ url, userId }),
    {
      onSuccess: (res) => {
        const response = res.data.reverse().map((item: DataType) => ({
          ...item,
          key: item.id,
        }));

        setData(response);
        setNoChangeData && setNoChangeData(response);
      },
    }
  );

  return { isLoading, isError, error, mutate };
}

export function useAddData(
  setIsShowModal: (param: boolean) => void,
  getAllData: () => void
) {
  const {
    isLoading: isLoadingAdd,
    isError: isErrorAdd,
    error: errorAdd,
    mutate: mutateAdd,
  } = useMutation(
    async ({ url, data }: { url: string; data: DataType }) =>
      await API.addNewData({ url, data }),
    {
      onSuccess: (res) => {
        if (res) {
          setIsShowModal(false);
          getAllData();
          toast.success("Added successfully");
        }
      },
    }
  );

  return { isLoadingAdd, isErrorAdd, errorAdd, mutateAdd };
}

export function useUpdateData(
  setIsShowModal: (param: boolean) => void,
  getAllData: () => void
) {
  const {
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    mutate: mutateUpdate,
  } = useMutation(
    async ({ url, data, id }: { url: string; data: DataType; id: string }) =>
      await API.updateData({ url, data, id }),
    {
      onSuccess: (res) => {
        if (res) {
          setIsShowModal(false);
          getAllData();
          toast.success("Added successfully");
        }
      },
    }
  );

  return { isLoadingUpdate, isErrorUpdate, errorUpdate, mutateUpdate };
}

export function useDeleteData(getAllData: () => void) {
  const {
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    error: errorDelete,
    mutate: mutateDelete,
  } = useMutation(
    async ({ url, id }: { url: string; id: string }) =>
      await API.deleteData({ url, id }),
    {
      onSuccess: (res) => {
        if (res) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });

          getAllData();
        }
      },
    }
  );

  return { isLoadingDelete, isErrorDelete, errorDelete, mutateDelete };
}
