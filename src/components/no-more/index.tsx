import { Divider } from "antd";
import { useAntdToken } from "antd-style";

/** 没有更多了的提示 */
export function NoMore() {
  const { colorTextDescription, fontSizeSM } = useAntdToken();
  return (
    <Divider style={{ color: colorTextDescription, fontSize: fontSizeSM }}>
      <span>没有更多了</span>
    </Divider>
  );
}
