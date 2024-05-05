import { useMemo } from "react";
import { Link } from "react-router-dom";

import { Avatar, Ellipsis } from "@/components";
import { Page } from "@/enums";
import type { Partition } from "@/types";
import { formatDate } from "@/utils/tools";

import { usePartitionItemStyles } from "./styles";

interface Props {
  partition: Partition;
}

// TODO 课程封面，需要后端支持
export function PartitionItem({ partition }: Props) {
  const { styles } = usePartitionItemStyles();
  /** 创建时间 */
  const createdTime = useMemo(() => {
    if (partition.created_time) {
      return formatDate(partition.created_time);
    } else {
      return "";
    }
  }, [partition.created_time]);

  return (
    <Link to={`${Page.PARTITION_INFO}/${partition.partition_id}`}>
      <div className={styles.container}>
        <div className={styles.imgCover}>{partition.partition_name}</div>
        <div className={styles.dataContainer}>
          <Ellipsis
            lineClamp={2}
            style={{ height: "42px", fontSize: "15px" }}>
            {partition.partition_name}
          </Ellipsis>
          <div className="mt-1">
            <Avatar src={partition.account.avatar} />
            <span className={styles.textSub}>
              {partition.account.account_name}
            </span>
          </div>
          <div className="mt-3 flex justify-between">
            <span className={styles.textSub}>{createdTime}</span>
            <span className={styles.textSub}>
              共 {partition.collection_count} 章节
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
