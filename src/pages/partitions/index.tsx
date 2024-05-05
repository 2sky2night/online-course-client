// 分区列表
import { PartitionList } from "@/components";
import { videoPartitionControllerList as partitionList } from "@/servers/go_study_server/videoPartition";

export default function Partitions() {
  return (
    <div>
      <div className="text-3xl my-5">📙全部课程</div>
      <PartitionList
        request={(offset, limit) => {
          return partitionList({ offset, limit, desc: false }).then(res => ({
            list: res.data.list || [],
            hasMore: res.data.has_more || false,
          }));
        }}
      />
    </div>
  );
}
