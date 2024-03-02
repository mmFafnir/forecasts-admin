// import { Button, Form, Input } from "antd";
// import { FC, useEffect, useState } from "react";
// import { required } from "../../../../core/form-rools";
// import TextArea from "antd/es/input/TextArea";
// import CustomImage from "../../../../components/UI/CustomImage";
// import UploadInput from "../../../../components/UI/Form/UploadInput";
// import SelectSports from "../../../Selects/SelectSports";
// import SelectCountries from "../../../Selects/SelectCountries";
// import SelectLeagues from "../../../Selects/SelectLeagues";
// import { useTypeDispatch } from "../../../../hooks/useTypeDispatch";
// import { createSeo } from "../../../../store/Slices/seoSlice/asyncActions";

// interface IInputs {
//   ceo_title: string;
//   ceo_description: string;
//   ceo_keywords: string;
//   ceo_h: string;
//   ceo_short_description_for_h: string;
//   ceo_text: string;
//   sports_id: string;
//   countrys_id: string;
//   leagues_id: string;
// }

// const titleClasses = `text-left font-semibold mb-2`;
// const CreateSeo: FC = () => {
//   const dispatch = useTypeDispatch();
//   const [form] = Form.useForm<IInputs>();
//   const [loading, setLoading] = useState<boolean>(false);

//   const [imgFile, setImgFile] = useState<File | null>(null);
//   const [previewImage, serPreviewImage] = useState<string | null>(null);

//   const [sports, setSports] = useState<string[]>([]);
//   const [countries, setCountries] = useState<string[]>([]);
//   const [leagues, setLeagues] = useState<string[]>([]);

//   const onFinish = (values: IInputs) => {
//     setLoading(true);
//     console.log(values);
//     const formData = new FormData();

//     for (const [key, value] of Object.entries(values)) {
//       formData.append(key, value);
//     }
//     if (imgFile) {
//       formData.append("ceo_photo", imgFile);
//     }

//     sports.forEach((sport) => {
//       formData.append("sports_id[]", sport);
//     });

//     countries.forEach((country) => {
//       console.log(country);
//       formData.append("countrys_id[]", country);
//     });

//     leagues.forEach((league) => {
//       formData.append("leagues_id[]", league);
//     });
//     dispatch(createSeo(formData))
//       .then(() => {
//         form.resetFields();
//         setSports([]);
//         setCountries([]);
//         setLeagues([]);
//         serPreviewImage(null);
//         setImgFile(null);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     form.setFieldValue("ceo_photo", imgFile);
//   }, [imgFile]);

//   return (
//     <Form
//       form={form}
//       layout="vertical"
//       labelCol={{ span: 8 }}
//       wrapperCol={{ span: 16 }}
//       initialValues={{ remember: true }}
//       autoComplete="off"
//       onFinish={onFinish}
//     >
//       {/* sport country league */}
//       <div>
//         <p className={`${titleClasses} !mb-0`}>Спорт:</p>
//         <SelectSports
//           data={[]}
//           values={sports}
//           className="mb-2"
//           setData={setSports}
//           disabled={leagues.length > 0 || countries.length > 0}
//         />
//         <p className={`${titleClasses} !mb-0`}>Страна:</p>
//         <SelectCountries
//           data={[]}
//           values={countries}
//           className="mb-2"
//           setData={setCountries}
//           disabled={leagues.length > 0 || sports.length > 0}
//         />
//         <p className={`${titleClasses} !mb-0`}>Лига</p>
//         <SelectLeagues
//           values={leagues}
//           data={[]}
//           className="mb-2"
//           setData={setLeagues}
//           disabled={sports.length > 0 || countries.length > 0}
//         />
//       </div>

//       {/* ceo_title */}
//       <div>
//         <p className={titleClasses}>Заголовок</p>
//         <Form.Item className="mr-3" name="ceo_title" rules={[required]}>
//           <Input />
//         </Form.Item>
//       </div>

//       {/* ceo_description */}
//       <div>
//         <p className={titleClasses}>Описание</p>
//         <Form.Item className="mr-3" name="ceo_description" rules={[required]}>
//           <Input />
//         </Form.Item>
//       </div>

//       {/* ceo_keywords */}
//       <div>
//         <p className={titleClasses}>Ключевые слова</p>
//         <Form.Item className="mr-3" name="ceo_keywords" rules={[required]}>
//           <Input />
//         </Form.Item>
//       </div>

//       {/* ceo_h */}
//       <div>
//         <p className={titleClasses}>H1 заголовок</p>
//         <Form.Item className="mr-3" name="ceo_h" rules={[required]}>
//           <Input />
//         </Form.Item>
//       </div>

//       {/* ceo_short_description_for_h */}
//       <div>
//         <p className={titleClasses}>H1 подзаголовок</p>
//         <Form.Item
//           className="mr-3"
//           name="ceo_short_description_for_h"
//           rules={[required]}
//         >
//           <Input />
//         </Form.Item>
//       </div>

//       {/* ceo_text */}
//       <div>
//         <p className={titleClasses}>Текст</p>
//         <Form.Item name="ceo_text" rules={[required]}>
//           <TextArea style={{ minHeight: 150 }} />
//         </Form.Item>
//       </div>

//       <div className="mb-7 flex flex-col items-start text-left">
//         <p className={titleClasses}>Seo Картика</p>

//         {previewImage && (
//           <div className="h-40 mb-3" style={{ minWidth: "300px" }}>
//             <CustomImage
//               rootClasses="!overflow-hidden rounded-2xl"
//               src={previewImage}
//               errorSrc="https://metallprofil.pkmk.ru/local/templates/aspro-stroy/images/noimage_detail.png"
//               width={"100%"}
//               height={"100%"}
//             />
//           </div>
//         )}
//         <Form.Item name={"ceo_photo"} initialValue={imgFile} rules={[required]}>
//           <UploadInput
//             file={imgFile}
//             setFile={setImgFile}
//             setPreviewImage={serPreviewImage}
//           />
//         </Form.Item>
//       </div>

//       <Button
//         type="primary"
//         htmlType="submit"
//         size="large"
//         className="ml-auto flex font-semibold"
//         loading={loading}
//       >
//         Сохранить
//       </Button>
//     </Form>
//   );
// };

// export default CreateSeo;

import React from "react";

const CreateSeo = () => {
  return <div></div>;
};

export default CreateSeo;
