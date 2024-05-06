import { ConfigProvider } from "antd";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren;
export default function SliderConfig({ children }: Props) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Slider: {
            railBg: "rgb(255,255,255,0.2)",
            railHoverBg: "rgb(255,255,255,0.3)",
            trackBg: "#00aeec",
            dotBorderColor: "#00aeec",
            trackHoverBg: "#00aeec",
            dotActiveBorderColor: "#00aeec",
          },
        },
      }}>
      {children}
    </ConfigProvider>
  );
}
