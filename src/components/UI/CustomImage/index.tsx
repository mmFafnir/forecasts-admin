import { Image, Spin } from "antd";
import { FC } from "react";

interface ICustomImageProps {
  src: string;
  errorSrc: string;
}

const CustomImage: FC<ICustomImageProps> = ({ src, errorSrc }) => {
  return (
    <Image
      className="border-solid  border-gray-600 border p-2 rounded-2xl bg-slate-200"
      src={src}
      rootClassName="!object-fill"
      width={250}
      height={250}
      placeholder={
        <div className="w-full h-full flex justify-center items-center">
          <Spin />
        </div>
      }
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = errorSrc;
      }}
    />
  );
};

export default CustomImage;
