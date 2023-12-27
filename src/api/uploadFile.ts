// import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const uploadFile = async (options: any) => {
  const { onSuccess, onError, file } = options;

  const formData = new FormData();
  formData.append("file", file);

  try {
    onSuccess();
    return formData;
  } catch (error) {
    console.log(error);
    onError(error);
  }
};
