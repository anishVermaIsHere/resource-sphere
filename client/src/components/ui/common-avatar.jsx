import React from "react";
import { Avatar, AvatarImage } from "./avatar";
import { cn } from "../../lib/utils";

const CommonAvatar = ({ className }) => {
  return (
    <Avatar className={cn(`size-20`, className)}>
      <AvatarImage src="/resource-sphere2.jpg" />
      {/* <AvatarFallback>CN</AvatarFallback> */}
    </Avatar>
  );
};

export default CommonAvatar;
