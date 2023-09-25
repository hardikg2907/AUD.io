import storage from "../firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const handleFileUpload = async (file, name) => {
  const storageRef = ref(storage, `/audioFiles/${file.name}`);
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
  uploadBytes(storageRef, file).then((snapshot) => {
    getDownloadURL(snapshot.ref).then((downloadUrl) => {
      console.log(downloadUrl);
      return downloadUrl;
    });
  });
};
