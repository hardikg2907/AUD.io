import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";

const baseStyle = {
  // flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "red",
  borderStyle: "dashed",
  backgroundColor: "#383838",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  cursor: "pointer",
  // width: "12.5%",
  height: "100px",
  borderRadius: "20px",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export function Basic({ onUpload }) {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ accept: { "audio/*": [] }, onDrop: onUpload });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div className="container w-32 animate-slideleft">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} onChange={onUpload} />
        <FiUploadCloud className="scale-[2.5] text-red-500 font-light" />
      </div>
    </div>
  );
}
export function BasicImage({ onUpload }) {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ accept: { "image/*": [] }, onDrop: onUpload });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div className="container w-16 animate-slideleft">
      <div {...getRootProps({ style })} className="!h-16 rounded-sm">
        <input {...getInputProps()} onChange={onUpload} />
        <FiUploadCloud className="scale-[1.5] text-red-500 font-light" />
      </div>
    </div>
  );
}
