import storage from "../firebase.config";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadString,
  deleteObject,
} from "firebase/storage";

export const handleFileUpload = async (file, name, type) => {
  const storageRef = ref(storage, `/audioFiles/${name}`);
  //   const uploadTask = uploadBytesResumable(storageRef, file);
  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       const percent = Math.round(
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //       );

  //       // update progress
  //       console.log(percent);
  //     },
  //     (err) => console.log(err),
  //     () => {
  //       // download url
  //       getDownloadURL(uploadTask.snapshot.ref).then((url) => {
  //         // console.log(url);
  //         return url;
  //       });
  //     }
  //   );
  return new Promise((resolve, reject) => {
    // uploadBytes(storageRef, file).then((snapshot) => {
    //   getDownloadURL(snapshot.ref).then((downloadUrl) => {
    //     resolve(downloadUrl);
    //   });
    // });
    uploadString(storageRef, file, type).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadUrl) => {
        resolve(downloadUrl);
      });
    });
  });
};

export const handleFileDelete = async (url) => {
  const decodedPath = decodeURIComponent(url);

  // Parse the decoded URL to extract the storage path
  const pathStart = decodedPath.indexOf("/o/") + 3;
  const pathEnd = decodedPath.indexOf("?alt=media");
  const storagePath = decodedPath.substring(pathStart, pathEnd);

  // Create a reference to the file
  const fileRef = ref(storage, storagePath);

  return new Promise((resolve, reject) => {
    deleteObject(fileRef)
      .then(() => {
        resolve(url);
      })
      .catch((error) => {
        reject("Error deleting file:", error);
      });
  });
};
