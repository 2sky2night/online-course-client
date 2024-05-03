import { createStyles, keyframes } from "antd-style";

const useSkeletonStyles = createStyles(({ isDarkMode }) => {
  const skeletonLoading = keyframes("skeleton-loading", {
    from: {
      "background-position": "100% 50%",
    },
    to: {
      "background-position": "0 50%",
    },
  });
  const bg = isDarkMode
    ? "linear-gradient(90deg, rgba(255, 255, 255, 0.12) 25%, rgba(255, 255, 255, 0.18) 37%,rgba(255, 255, 255, 0.12) 63%)"
    : "linear-gradient(90deg, rgba(0, 0, 0, 0.06) 25%, rgba(0, 0, 0, 0.15) 37%,rgba(0, 0, 0, 0.06) 63%)";
  return {
    container: {
      background: bg,
      backgroundSize: "400% 100%",
      animationName: skeletonLoading,
      animationDuration: "1.4s",
      animationTimingFunction: "ease",
      animationIterationCount: "infinite",
    },
  };
});

const Skeleton = ({
  width = "",
  height = "",
  borderRadius = "",
  minHeight = "",
  minWidth = "",
  className = "",
}: {
  width?: string;
  height?: string;
  borderRadius?: string;
  minWidth?: string;
  minHeight?: string;
  className?: string;
}) => {
  const { styles } = useSkeletonStyles();
  return (
    <div
      className={`${styles.container} ${className}`}
      style={{ width, height, borderRadius, minHeight, minWidth }}></div>
  );
};

function VideoList() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-2">
      {Array.from({ length: 20 }).map(() => (
        <div>
          <Skeleton
            height="10vw"
            minHeight="110px"
            borderRadius="3px"
          />
          <Skeleton
            className="mt-2"
            height="20px"
            width="100%"
          />
          <Skeleton
            className="mt-1"
            height="20px"
            width="80%"
          />
        </div>
      ))}
    </div>
  );
}

export default {
  VideoList,
};
