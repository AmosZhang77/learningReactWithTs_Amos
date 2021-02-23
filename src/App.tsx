import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import LikeButton from './components/LikeButton'
import MouseTracker from './components/MouseTracker'
import Hello from './components/Hello'
import useMousePosition from './hooks/useMousePosition'


/**与下面高阶组件相同功能的自定义hook*/
import useURLLoader from './hooks/useURLLoader'

/**hoc*/
import withLoader  from './components/withLoader' // 高阶组件hoc
interface IShowResult {
  message: string;
  status: string
}
const DogShow: React.FC<{data:IShowResult}> = ({data})=>{
  return (
    <>
      <h2>Dog show: {data.status}</h2>
      <img src={data.message} alt=""/>
    </>
  )
}
/**hoc*/

// 入需要ts支持，在npx create-react-app 创建项目时需要加此参数 --typescript
// npx 用于这种一般项目只在开始用一次，没必要npm全局安装，他会需要的时候下载，放在一个空间，用完自己删掉
// 内部安装的模块，想要命令行使用，之前时一种写在package.json的script命令中，一种是直接node_modules/.bin/mocha去那node_modules里面的执行文件
// npm script(在package.json的script命令中)能做到的原理是：他会启动一个shell来运行命令，运行之前将需要的js，node_modules/.bin目录加入运行的path，所以就有了，用完之后再去掉。

// 用npx就可以不全局安装 mocha，而 npx mocha -version // 可以直接命令了 就想上面npm script一样
interface IShowResult {
  message: string;
  status: string;
}

interface IThemeProps {
  [key: string]: { color: string; background: string; }
}

const themes: IThemeProps = {
  'light': {
    color: '#000',
    background: '#eee',
  },
  'dark': {
    color: '#fff',
    background: '#222',
  }
}
export const ThemeContext = React.createContext(themes.light)
const App: React.FC = () => {
  /**hoc 使用类似loading功能的高阶组件，缺点，多加dom节点，被包裹的子组件要了解高价组件传给他的data,才能用，逻辑复杂*/
const WrappedDogShow = withLoader(DogShow, 'https://dog.ceo/api/breeds/image/random')
  /**hoc*/


  const [show, setShow] = useState(true)
  const [data, loading] = useURLLoader('https://dog.ceo/api/breeds/image/random',[show])
const dogResult = data as IShowResult

  const positions = useMousePosition() // 使用自定义hook
  return (
    <div className="App">
      <ThemeContext.Provider value={themes.dark}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>

          {/*与下面hoc相同功能的自定义hook*/}
          {/*用于提取重复的经常用的逻辑*/}
          {loading?<p>读取中</p>:<img src={dogResult && dogResult.message }/>  }

         {/* hoc*/}
         {/* <WrappedDogShow/>*/}
          {/*hoc*/}




          <LikeButton/>
          {/*<MouseTracker/>*/}
          <Hello/>
          <p>
            <button onClick={() => {setShow(!show)}}>Refresh dog photo</button>
          </p>
          <p>X: {positions.x}, Y : {positions.y}</p>

          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </ThemeContext.Provider>
    </div>
  )
}

export default App
