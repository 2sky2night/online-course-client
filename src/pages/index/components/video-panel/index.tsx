import { VideoList } from "@/components";
import { videoControllerList } from "@/servers/go_study_server/video";

export function VideoPanel() {
  return (
    <div className="py-3 mt-5">
      <div className="text-2xl mb-5">推荐</div>
      <VideoList
        request={(offset, limit) => {
          return videoControllerList({ offset, limit, desc: false }).then(
            res => {
              return {
                list: res.data?.list || [],
                hasMore: res.data?.has_more || false,
              };
            },
          );
        }}
      />
    </div>
  );
}
