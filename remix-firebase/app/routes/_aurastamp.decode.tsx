import { getDownloadURL, getStorage, listAll, ref, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { firebaseApp } from '../lib';

export default function FireBaseExample() {
  const [imageUpload, setImageUpload] = useState<any | undefined>();
  const [imageList, setImageList] = useState<any[]>([]);

  useEffect(() => {
    const storage = getStorage(firebaseApp);
    const imageListRef = ref(storage);
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  const onClickUpload = () => {
    if (!imageUpload) {
      return;
    }
    const storage = getStorage(firebaseApp);

    const imageRef = ref(storage, `images/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url]);
      });
    });
  };

  return (
    <div>
      <input
        type="file"
        onChange={(event: any) => {
          const file = event.target.files[0];
          console.debug(file);
          setImageUpload(file);
        }}
      />
      <button onClick={onClickUpload}>업로드</button>
      {imageList.map((item) => {
        return <img alt={item} key={item} src={item} />;
      })}
    </div>
  );
}
