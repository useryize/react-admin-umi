import { type ActionType } from "@ant-design/pro-components";
import { useSetState } from "ahooks"
import { useRef } from "react";

export default () => {
  const actionRef = useRef<ActionType>();
  const [state, setState] = useSetState<any>({
    open: false,
    popLoading: false,
  })
  return {
    state,
    setState,
    actionRef
  }
}