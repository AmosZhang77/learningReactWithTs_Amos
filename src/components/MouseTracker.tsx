import React, { useState, useEffect } from 'react'

const MouseTracker: React.FC = () => {
  const [ positions, setPositions ] = useState({x: 0, y: 0})
  useEffect(() => {
    console.log('add effect', positions.x)
    const updateMouse= (e: MouseEvent) => { // MouseEvent ts内置对象
      console.log('inner')
      setPositions({ x: e.clientX, y: e.clientY })
    }
    document.addEventListener('click', updateMouse)
    return () => {
      console.log('remove effect', positions.x)
      document.removeEventListener('click', updateMouse)
    }
  } )
  console.log('before render', positions.x)
  return (
    <p>X: {positions.x}, Y : {positions.y}</p>
  )
}

/**
 * 不给effect参数2时，加载副作用，取消副作用运行顺序！！！
 * 初始加载，打印
   1. before render 0  // 首次调render函数
   2. add effect 0  // 首次走effect，添加副作用
   // 第一次并没有走effect清除函数（返回值-清除副作用函数）

 * 点击界面，打印
   inner  // 事件驱动改变state，新值302
   before render 302  // state变化后，准备用新值302重新调render函数面前
   remove effect 0  // render调用之后，先走上次effect清除函数（返回值-清除副作用函数） state状态因为闭包，取到的也是上次的state的值，0
   // 这里如果effect参2是[]，在卸载组件时才会执行一次，那是的值是开始添加副作用存的state值，最初的旧值0，而不是中间的某个状态
   add effect 302  //  再次走effect，添加副作用，此时取到的state的值，新值302

 * 再点击界面，打印
 inner  // 事件驱动改变state，新值260
 before render 260  // state变化后，准备用新值302重新调render函数面前
 remove effect 302  // render调用之后，先走上次effect清除函数（返回值-清除副作用函数） state状态因为闭包，取到的也是上次的state的值，0
 add effect 260  //  再次走effect，添加副作用，此时取到的state的值，新值302

 */
export default MouseTracker
