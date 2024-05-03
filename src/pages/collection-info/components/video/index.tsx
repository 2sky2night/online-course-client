import { VideoList } from "@/components";
import { videoCollectionControllerVideoList as getVideoList } from "@/servers/go_study_server/videoCollection";

interface Props {
  cid: number;
}

export function Video({ cid }: Props) {
  return (
    <VideoList
      request={(offset, limit) => {
        return getVideoList({ cid, offset, limit, desc: false }).then(res => ({
          list: res.data.list || [],
          hasMore: res.data.has_more || false,
        }));
      }}
    />
  );
}
