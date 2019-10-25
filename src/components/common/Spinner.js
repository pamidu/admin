import React from "react";
import { spinner } from "Utils/ImageList";
import { imgcity, imgcity2x, imgcity3x } from "Utils/ImageList";

export default () => {
  return (
    <div className="container mx-auto p-6 sm:pt-0 sm:pb-6 lg:px-32">
			<div className="sm:block sm:mt-32 pb-5">
        <img
          src={spinner}
          style={{ width: '200px', margin: 'auto', display: 'block' }}
          alt="Loading..."
        />
      </div>
      <div className="flex items-center">
        <img src={imgcity} srcSet={imgcity2x + " 2x," + imgcity3x + " 3x"} className="" alt="" />
      </div>
    </div>
  );
};
