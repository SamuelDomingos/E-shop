import { useAuth } from '../../context/AuthContext';

//firebase
import { db } from '../../firebase/Config';
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from "firebase/auth";

import {BsFillCameraFill} from "react-icons/bs"
import {BiUser} from "react-icons/bi"

import { useState, useEffect } from 'react';

// css
import style from "./User.module.css"
import { urlFor } from '../../lib/Sanity';

const User = () => {

  const { user, setProfileImageUrl, profileImageUrl } = useAuth();
  const [userData, setUserData] = useState(null);
  const [shopping, setShopping] = useState([]);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const storage = getStorage();

  const handleFileChange = (event) => {

    const file = event.target.files[0];
    const storageRef = ref(storage, `perfil/${user.uid}/profile-picture`);

    setIsImageLoading(true);

    uploadBytes(storageRef, file).then(async (snapshot) => {
      const url = await getDownloadURL(storageRef);

        setProfileImageUrl(url);
        updateProfile(user, { photoURL: url })
        .catch((error) => {
            console.log('Error updating profile picture:', error);
        });

        setIsImageLoading(false);
    });

  };

  useEffect(() => {

    const getUserData = async () => {

      const userRef = doc(db, 'usuarios', user.uid);
      const userDoc = await getDoc(userRef);
      setUserData(userDoc.data());

      const userShoppingRef = collection(db, 'usuarios', user.uid, 'compras');
      const userShoppingSnapshot = await getDocs(userShoppingRef);
      const shoppingData = userShoppingSnapshot.docs.map((doc) => doc.data());
      setShopping(shoppingData);

      const storageRef = ref(storage, `perfil/${user.uid}/profile-picture`);
        getDownloadURL(storageRef)
            .then((url) => {
              setProfileImageUrl(url);
              updateProfile(user, { photoURL: url })
            .catch((error) => {
              console.log('Error updating profile picture:', error);
            });
          })
          .catch((error) => {
            console.log('Error getting profile picture:', error);
          });

    };

    getUserData();
  }, [user]);

  console.log(shopping);

  return (
    <div className={style.user}>

      {userData && (
      <div className={style.userData}>

          <div className={style.container_perfil}>
            <label for="file-upload" className={style.icon_perfil}>
              <BsFillCameraFill/>
              <input type="file" name="perfil" id="file-upload" onChange={(event) => handleFileChange(event)} />
            </label>

            {isImageLoading && <div>Carregando imagem...</div>}
            {profileImageUrl ? (
              <div className={style.img_perfil}>
                <img src={profileImageUrl} alt="Imagem de perfil" />
              </div>
            ) : (
              <div className={style.img_perfil}>
                <BiUser/>
              </div>
            )}
          </div>

          <h2>Email:<br/>{userData.email}</h2>
          <h2>Nome:<br/>{userData.nome}</h2>
      </div>
      )}
        {shopping.length === 0 ? null : (
          <div className={style.shopping}>
            <h2>Compras realizadas com sucesso :)</h2>
            {shopping.map((list) => (
              <div className={style.compras_success}>
                {list.items.map((item) => (
                  <div className={style.compras_success_single}>
                    <div className={style.item_img}>
                      <img src={urlFor(item.image[0].asset._ref)} alt="" />
                    </div>
                    <div className={style.container_compras}>
                      <h2>{item.name}</h2>
                      <p>R$ {item.price}</p>
                    </div>
                  </div>
                ))}
                <p className={style.priceTotal}>Valor Total: R$ {list.items.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
              </div>
            ))}
          </div>
        )}

    </div>
  )
}

export default User