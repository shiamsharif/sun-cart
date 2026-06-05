"use client";

import { useEffect, useState } from "react";
import { UserRound } from "lucide-react";
import { getDisplayImageUrl } from "@/lib/images";

const sizeClasses = {
  sm: "size-9",
  lg: "size-28",
};

const iconSizes = {
  sm: 18,
  lg: 46,
};

export default function UserAvatar({ image, name, size = "sm", className = "" }) {
  const src = getDisplayImageUrl(image);
  const [imageFailed, setImageFailed] = useState(false);
  const avatarSize = sizeClasses[size] || sizeClasses.sm;
  const iconSize = iconSizes[size] || iconSizes.sm;
  const showImage = src && !imageFailed;

  useEffect(() => {
    setImageFailed(false);
  }, [src]);

  return (
    <span
      className={`grid ${avatarSize} shrink-0 place-items-center overflow-hidden rounded-full bg-secondary text-secondary-content ${className}`}
    >
      {showImage ? (
        <img
          src={src}
          alt={name ? `${name} profile picture` : "Profile picture"}
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <UserRound size={iconSize} />
      )}
    </span>
  );
}
