import { createStyles } from "antd-style";
import { useMemo } from "react";

import { formatQuality } from "@/components/video/utils";

import type { VideoQuality, VideoSrouce as VideoSource } from "../../../types";

interface Props {
  activeType: VideoQuality | null;
  item: VideoSource;
  rawI18n: string;
  onChange: (value: VideoQuality | null) => void;
}

const useStyle = createStyles(({ token }) => {
  return {
    item: {
      transition: token.motionDurationFast,
      cursor: "pointer",
      ":hover": {
        color: token.colorPrimary,
      },
    },
    active: {
      color: token.colorPrimary,
    },
  };
});

export default function QualityItem({
  activeType,
  item,
  rawI18n,
  onChange,
}: Props) {
  const { styles } = useStyle();
  const text = useMemo(() => {
    return formatQuality(item.type, rawI18n);
  }, [activeType]);
  const active = useMemo(() => {
    return item.type === activeType;
  }, [activeType]);

  return (
    <div
      className={active ? [styles.item, styles.active].join(" ") : styles.item}
      onClick={() => onChange(item.type)}>
      {text}
    </div>
  );
}
