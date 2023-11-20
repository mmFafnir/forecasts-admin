import { Image, Spin } from "antd";
import { FC } from "react";

interface ICustomImageProps {
  src: string;
  errorSrc: string;
  classes?: string;
  width?: number;
  height?: number;
}

const CustomImage: FC<ICustomImageProps> = ({
  src,
  errorSrc,
  width = 250,
  height = 250,
  classes = "border-solid  border-gray-600 border p-2 rounded-2xl bg-slate-200",
}) => {
  return (
    <Image
      className={classes}
      src={src}
      rootClassName=""
      width={width}
      height={height}
      placeholder={
        <div className="w-full h-full flex justify-center items-center ">
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
