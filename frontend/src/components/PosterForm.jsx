import { useState } from 'react'
import { createPoster } from '../store/script'
import { useDispatch, useSelector } from "react-redux"

function PosterForm() {
  const dispatch = useDispatch();
  const [userScript, setScript] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          console.log(movieData)
          return movieData;
      }
  } catch(err) {
      const resBody = await err.json();
      console.log(resBody)
  }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
          <label>Enter a Movie Script Below to have AI generate Movie Poster
              <input 
                  className='logo'
                  type="textarea"
                  value={userScript}
                  onChange={(e) => setScript(e.target.value)}
              />
          </label>
          <br/>
          <label className='card'>Email Address
              <input
                  className='logo'
                  type="text"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
              />
          </label>
          <button 
            type="submit"
          >
            Generate
          </button>
      </form>
    </>
  )
}

export default PosterForm;