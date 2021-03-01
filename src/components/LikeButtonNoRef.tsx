import React, { useState, useEffect } from 'react'
import { ThemeContext } from '../App'
const LikeButton: React.FC = () => {
  const [like, setLike] = useState(0)

  useEffect(() => {
    console.log('document title effect is running')
    document.title = `点击了${like}次`
  }, [like])
  // useEffect(() => {
  //   if (didMountRef.current) {
  //     console.log('this is updated')
  //   } else {
  //     didMountRef.current = true
  //   }
  // })
  // useEffect(() => {
  //   if (domRef && domRef.current) {
  //     domRef.current.focus()
  //   }
  // })
  function handleAlertClick() {
    setTimeout(() => {
      alert('you clicked on like' + like) // 这里不用useRef like 永远困在开始存like的闭包里面，一直不变
    }, 3000)
  }
  return (
    <>
    <input type="text"  />
    <button onClick={() => {setLike(like + 1)}}>
      {like} 👍
    </button>
      <button onClick={() => {setLike(like + 1);}}>
      </button>
    <button onClick={handleAlertClick}> Alert!
    </button>
    </>
  )
}
export default LikeButton
