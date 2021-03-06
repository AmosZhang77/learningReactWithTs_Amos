import React, { useState, useEffect, useRef, useContext } from 'react'

/**
 * useContext 使用时导入*/
import { ThemeContext } from '../App'

const LikeButton: React.FC = () => {
  const [like, setLike] = useState(0)
  /**
   * useRef 变化时不会引起组件重新渲染，需要手动去渲染。不像useState变化了组件就会自动重新渲染*/

  const likeRef = useRef(0)
  const didMountRef = useRef(false) // 用useRef 和 useEffect 实现didMount的生命周期效果
  const [didMountState, setDidMountState]= useState(false) // 用useRef 和 useEffect 实现didMount的生命周期效果

  /**
   * useContext 这样使用，参数是创建的creatContext*/
  const theme = useContext(ThemeContext)
  // console.log(theme)
  const style = {
    background: theme.background,
    color: theme.color,
  }

  useEffect(() => {
    console.log('document title effect is running')
    document.title = `点击了${like}次`
  }, [like])

  // 用useRef 和 useEffect 实现didMount的生命周期效果
  useEffect(() => {
    if (didMountRef.current) {
      // setLike(like += 1) // 这里会报错，useState操作不能放在判断里面，否则会全部错乱
      // likeRef.current = likeRef.current += 1 // 这个可以放在判断里面
      console.log('this is updated')
    } else {
      didMountRef.current = true
    }
  })

  // 用useRef 和 useEffect 实现didMount的生命周期效果
  useEffect(() => {
    if (didMountState) {
      likeRef.current = likeRef.current += 1 // 这个可以放在判断里面

      console.log('this is updated_state')

    } else {
      setDidMountState(true)
    }
  })

  /**
   useRef另一个常用，获取真实dom节点。
   这里拿来使input被focus.
   用useRef的结果传给标签的ref属性。通过domRef.current拿dom*/
  const domRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (domRef && domRef.current) {
      domRef.current.focus()
    }
  })

  /**
   * 操作：先点alert,在短时间内狂点大拇指点赞，
   * 现象，alter出来的数值，like是狂点之前的，likeRef是狂点之后的值。
   * like 永远困在开始存like的闭包里面，每次都是每次的一套值，不同次渲染的state不连通
   * likeRef.current一直可以拿到新值，而不是当时的一套state*/
  function handleAlertClick() {
    setTimeout(() => {
      alert('you clicked on like' + like) // 这里不用useRef like 永远困在开始存like的闭包里面，一直不变
      alert('you clicked on likeRef.current' + likeRef.current)
    }, 3000)
  }
  return (
    <>

      useRef结果传给标签ref属性，保存真实dom，便于使用
    <input type="text" ref={domRef} />

<div>{like}</div>
      <button style={style} onClick={() => {setLike(like + 1); likeRef.current++}}>
        {likeRef.current} 👍
      </button>
    <button onClick={handleAlertClick}> Alert!
    </button>
    </>
  )
}
export default LikeButton
