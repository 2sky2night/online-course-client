import { CollectionList } from "@/components";
import { videoCollectionControllerPartitionList as collectionList } from "@/servers/go_study_server/videoCollection";

interface Props {
  /** 分区id */
  pid: number;
}

export function CollectionPanel({ pid }: Props) {
  return (
    <CollectionList
      request={(offset, limit) => {
        return collectionList({ pid, offset, limit, desc: false }).then(
          res => ({
            list: res.data.list || [],
            hasMore: res.data.has_more || false,
          }),
        );
      }}
    />
  );
}
