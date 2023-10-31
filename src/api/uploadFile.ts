// // import axios from "axios";

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const uploadFile = async (options: any) => {
//   const { onSuccess, onError, file, onProgress } = options;

//   const formData = new FormData();
//   formData.append("file", file);

//   const config = {
//     headers: { "Content-Type": "multipart/form-data" },
//     onProgress: (event: ProgressEvent) => {
//       onProgress({ percent: (event.loaded / event.total) * 100 });
//     },
//   };

//   try {
//     // const { data } = await axios.post("/files", formData, config);
//     onSuccess();

//     // return data;
//   } catch (error) {
//     console.log(error);
//     onError(error);
//   }
// };
