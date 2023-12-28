import { Image, Spin } from "antd";
import { FC } from "react";

interface ICustomImageProps {
  src: string;
  errorSrc: string;
  classes?: string;
  rootClasses?: string;
  width?: number | string;
  height?: number | string;
}

const CustomImage: FC<ICustomImageProps> = ({
  src,
  errorSrc,
  width = 250,
  height = 250,
  rootClasses = "",
  classes = "border-solid  border-gray-600 border p-2 rounded-2xl bg-slate-200 overflow-hidden",
}) => {
  return (
    <Image
      className={classes}
      src={src}
      rootClassName={rootClasses}
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
