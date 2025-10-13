import classNames from "@/utils/classNames";
import { useState } from "react";

export type AvatarProps = {
  name: string;
  avatar: string | null;
  size?: number;
  className?: string;
  textClassName?: string;
  onError?: (x: boolean) => void;
};
const Avatar = ({
  name,
  avatar,
  size = 40,
  className,
  textClassName,
  onError
}: AvatarProps) => {
  const avatarClassName = "shrink-0 flex items-center rounded-full bg-primary-600"
  const style = {
    width: `${size}px`,
    height: `${size}px`,
    lineHeight: `${size}px`,
    fontSize: `${size}px`,
  }
  const [imgError, setImgError] = useState(false)

  const handleOnError = () => {
    setImgError(true)
    onError?.(true)
  }

  if (avatar && !imgError) {
    return (
      <img
        className={classNames(avatarClassName, className)}
        style={style}
        src={avatar}
        alt={name}
        onError={handleOnError}
        onLoad={() => onError?.(false)}
      />
    )
  }
  return (
    <div className={classNames(avatarClassName, className)} style={style}>
      <div className={classNames(textClassName, 'scale-[0.4] text-center text-white')} style={style}>
        {name && name[0].toLocaleUpperCase()}
      </div>
    </div>
  )
};

export default Avatar;