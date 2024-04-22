import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { Fragment, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../../firebase/config';
import { AuthContext } from '../../store/Context';
import Header from '../Header/Header';
import './Create.css';


const Create = () => {
  const {user} = useContext(AuthContext)
  const [name,setName] = useState('')
  const [category,setCategory] = useState('')
  const [price,setPrice] = useState('')
  const [image,setImage] = useState(null)
  const navigate = useNavigate()
  const date = new Date().toLocaleDateString()

  const handleSubmit = async() =>{
    const storageRef = ref(storage,`images/${image.name}`)
    try {
      await uploadBytes(storageRef,image)
      const url = await getDownloadURL(storageRef)
      console.log(url);
      const doc = {
        name : name,
        category : category,
        price : price,
        url : url,
        user : user.uid,
        createdAt : date
      }
      const setDoc = await addDoc(collection(db,'products'),doc)
      console.log(setDoc);
      navigate('/')

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input"
            type="number"
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            id="fname"
            name="Price" />
            <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
            <br />
            <input onChange={(e)=>{
              setImage(e.target.files[0])
            }} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
