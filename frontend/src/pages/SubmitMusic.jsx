import React from "react";
import { Basic } from "../components/FileUpload";

const SubmitMusic = () => {
  const onUpload = (files) => {
    console.log(files);
  };
  return <Basic onUpload={onUpload} />;
};

export default SubmitMusic;
