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

function VideoList({ limit = 20 }: { limit?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-2">
      {Array.from({ length: limit }).map(() => (
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

function Collection({ limit = 20 }: { limit?: number }) {
  return (
    <div>
      {Array.from({ length: limit }).map(() => {
        return (
          <div className="py-3 px-2">
            <div className="flex items-center">
              <Skeleton
                width="30px"
                height="30px"
                borderRadius="3px"
              />
              <Skeleton
                className="ml-2"
                width="30%"
                height="20px"
              />
            </div>
            <div className="h-32 mt-3">
              <Skeleton
                className="mt-2"
                width="80%"
                height="20px"
              />
              <Skeleton
                className="mt-2"
                width="60%"
                height="20px"
              />
              <Skeleton
                className="mt-2"
                width="30%"
                height="20px"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Partition({ limit = 20 }: { limit?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2 py-2">
      {Array.from({ length: limit }).map(() => {
        return (
          <div className="flex md:flex-col">
            <Skeleton className="h-28 w-28 md:h-44 md:w-full mb-3" />
            <div className="flex-1 ml-2 md:ml-0">
              <Skeleton
                className="mb-1 h-6"
                width="100%"
              />
              <Skeleton
                className="h-6"
                width="80%"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Comment({ limit = 20 }: { limit?: number }) {
  return (
    <div>
      {Array.from({ length: limit }).map(() => (
        <div className="flex py-3 px-2">
          <Skeleton
            width="40px"
            height="40px"
            borderRadius="50%"
          />
          <div className="flex-1 py-3 ml-2">
            <Skeleton
              width="20%"
              height="20px"
            />
            <Skeleton
              className="mt-5"
              width="100%"
              height="20px"
            />
            <Skeleton
              className="mt-2"
              width="50%"
              height="20px"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default {
  VideoList,
  Collection,
  Skeleton,
  Partition,
  Comment,
};
