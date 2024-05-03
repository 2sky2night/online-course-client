// 课程详情（查看分区）

import { Navigate, useParams } from "react-router-dom";

import { Page } from "@/enums";
import { validateNumStr } from "@/utils/tools";

import { CollectionPanel } from "./components";

// TODO 错误了来个结果组件展示吧，别重定向
export function PartitionInfo() {
  const { pid: pidStr = "" } = useParams<{ pid: string }>();
  const pid = validateNumStr(pidStr);

  return (
    <div>
      <div className="text-3xl my-5">📖课程详情</div>
      {pid === null ? (
        <Navigate
          to={Page.INDEX}
          replace
        />
      ) : (
        <CollectionPanel pid={pid} />
      )}
    </div>
  );
}
