import React, { useContext, useEffect, useState } from 'react';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { postContext } from '../../store/postContext';
import './View.css';
function View() {
   const [userDetails,setUserDetails] = useState('')
   const {postDetails} = useContext(postContext)

   useEffect(()=>{
    const { userId } = postDetails || {}
    if(userId){
      const userDocRef = doc(db,'users',userId)

      const getUserDetails = async()=>{
        const docSnap = await getDoc(userDocRef)
        if(docSnap.exists()){
          setUserDetails(docSnap.data())
          console.log(userDetails);
        }else{
          console.log('No such documents!');
        }
      }
      getUserDetails()
    }
   },[postDetails])

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails ? postDetails.url :  'https://i.pinimg.com/originals/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg'  }
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails ? postDetails.price : ""} </p>
          <span>{postDetails ? postDetails.name :'Sorry' }</span>
          <p>{postDetails? postDetails.category : ''}</p>
          <span>Tue May 04 2021</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>Name: {userDetails ? userDetails.name : 'Pranamika'}</p>
          <p>Phone: {userDetails ? userDetails.phone : '9876534201'}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
