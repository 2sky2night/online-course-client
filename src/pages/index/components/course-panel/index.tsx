// 课程展示 （分区展示）
import { RightOutlined as RightIcon } from "@ant-design/icons";
import { Spin } from "antd";
import { useAntdToken } from "antd-style";
import { useEffect, useState } from "react";

import { Button } from "@/components";
import { videoPartitionControllerList as partitonList } from "@/servers/go_study_server/videoPartition";
import type { Partition } from "@/types";

export function CoursePanel() {
  const [list, setList] = useState<Partition[]>([]);
  const [loading, setLoading] = useState(true);
  const { colorTextDescription } = useAntdToken();
  /** 点击某个分区的回调 */
  const handleGoInfo = () => {
    console.log("点击了某个分区");
  };
  /** 点击了查看更多 */
  const handleGoList = () => {
    console.log("查看更多");
  };
  // TODO 是否折叠？
  useEffect(() => {
    partitonList({ limit: 14, offset: 0, desc: false }).then(res => {
      setList(res?.data?.list || []);
      setLoading(false);
    });
  }, []);
  return (
    <div className="py-3">
      <div className="text-2xl mb-5">🔥热门课程</div>
      {loading ? (
        <div className="flex justify-center">
          <span className="mr-2">正在加载...</span>
          <Spin />
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2 md:grid-cols-7 mb-5">
          {list.map(item => (
            <Button
              key={item.partition_id}
              onClick={handleGoInfo}>
              {item.partition_name}
            </Button>
          ))}
        </div>
      )}
      <div
        className="flex justify-end items-center"
        style={{ color: colorTextDescription }}>
        <div onClick={handleGoList}>
          <span className="text-sm cursor-pointer">查看更多课程</span>
          <RightIcon />
        </div>
      </div>
    </div>
  );
}
