import { Navigate, useParams } from "react-router-dom";

import { Page } from "@/enums";
import { validateNumStr } from "@/utils/tools";

import { CollectionData, Video } from "./components";

// TODO 参数错误可以不跳转吗？
export default function CollectionInfo() {
  const { cid: cidStr = "" } = useParams<{ cid: string }>();
  const cid = validateNumStr(cidStr);
  return cid === null ? (
    <Navigate
      to={Page.INDEX}
      replace
    />
  ) : (
    <div>
      <div className="text-3xl my-5">📗章节详情</div>
      <CollectionData cid={cid} />
      <Video cid={cid} />
    </div>
  );
}
