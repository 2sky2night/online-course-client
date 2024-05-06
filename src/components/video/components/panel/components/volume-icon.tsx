import {
  VolumeLowSharp as VolumeLowIcon,
  VolumeMediumSharp as VolumeMaxIcon,
  VolumeMediumSharp as VolumeMediumIcon,
  VolumeMute as VolumeOffIcon,
} from "@ricons/ionicons5";
import { Icon } from "@ricons/utils";
import { useMemo } from "react";

import { VolumeValue } from "../types";

const style = {
  transform: "scale(1.4)",
  cursor: "pointer",
};

interface Props {
  value: number;
}

export default function VolumeIcon({ value }: Props) {
  const component = useMemo(() => {
    if (value === VolumeValue.MAX) {
      return <VolumeMaxIcon style={style} />;
    } else if (value >= VolumeValue.HIGHT) {
      return <VolumeMediumIcon style={style} />;
    } else if (value > VolumeValue.NO) {
      return <VolumeLowIcon style={style} />;
    } else if (value === VolumeValue.NO) {
      return <VolumeOffIcon style={style} />;
    }
  }, [value]);
  return <Icon>{component}</Icon>;
}
