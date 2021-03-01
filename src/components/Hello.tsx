import React, {PropsWithChildren, ReactElement, useContext, ValidationMap, WeakValidationMap} from 'react'
import { ThemeContext } from '../App'
interface IHelloProps {
  message?: string;
}

  const Hello: React.FC<IHelloProps> = (props) => {
  const theme = useContext(ThemeContext)
  // console.log(theme)
  const style = {
    background: theme.background,
    color: theme.color,
  }
  return <h2 style={style}>{props.message}</h2>
}
Hello.defaultProps = { // 函数组件接口默认属性之一，没传参数时候的默认值，可以点到React.FC里面看到源码
  message: "Hello World"
}
/**
FunctionComponent接口源码
interface FunctionComponent<P = {}> {
  (props: PropsWithChildren<P>, context?: any): ReactElement | null; // props的PropsWithChildren属性点进去能看到，他也是reactNode 或者是null
  propTypes?: WeakValidationMap<P>;
  contextTypes?: ValidationMap<any>;
  defaultProps?: Partial<P>; // 默认属性之一
  displayName?: string;
}*/

export default Hello
