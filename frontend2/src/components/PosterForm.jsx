import React from 'react'
import { useState } from 'react'
// import { createPoster } from '../store/script'
import { useDispatch, useSelector } from "react-redux"
import './PosterForm.css'

function PosterForm() {
  const dispatch = useDispatch();
  const [showPic, setShowPic] = useState(false);
  const [userScript, setScript] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [picUrl, setPicUrl] = useState("");
  const [loadingPic, setLoadingPic] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingPic(true);
    let data = {
      script: userScript,
      email: userEmail
    }
    console.log(data)
    // dispatch(createPoster(data))
    try {
      const res = await fetch(`/api/poster?criteria=${data.script}&email=${data.email}`);
      if (res.ok) {
          const movieData = await res.json();
          setShowPic(true)
          setPicUrl(movieData)
          // console.log(picUrl)
          // console.log(picUrl.signedUrl)
          return movieData;
      }
      } catch(err) {
      const resBody = await err.json();
      console.log(resBody)
    }
  }

  // <img src='../assets/loading.gif' alt='AI Generating'/>

  let loading
  if (loadingPic) {
    loading = <div>Generating your poster now...</div>
  } else {
    loading = <div>Your Movie Poster Will Load here</div>
  }


  return (
    <>
      <form className='form' onSubmit={handleSubmit}>
          <label className='field'
            >Enter a Movie Script Below to have AI generate a Movie Poster
              <textarea 
                  className='script'
                  value={userScript}
                  onChange={(e) => setScript(e.target.value)}
              />
          </label>
          <br/>
          <label className='field'>Email Address
              <input
                  className='email'
                  type="text"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
              />
          </label>
          <br/>
          <button 
            type="submit"
          >
            Generate
          </button>
      </form>
      {showPic ? <img src={picUrl.signedUrl} alt="poster"/>: loading}
    </>
  )
}

export default PosterForm;