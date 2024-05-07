import { Divider, Empty } from "antd";
import { Button } from "antd/lib";
import { useNavigate } from "react-router-dom";

import { UserInfo } from "@/components";
import { Page } from "@/enums";
import { useUserStore } from "@/store";

export default function My() {
  const userInfo = useUserStore(s => s.userInfo);
  const navigate = useNavigate();

  return (
    <div>
      {userInfo && (
        <UserInfo
          user={userInfo}
          footer={
            <div className="flex justify-end px-3">
              <Button
                type="primary"
                onClick={() => navigate(Page.EDIT_USER)}>
                编辑信息
              </Button>
            </div>
          }
        />
      )}
      <Divider />
      <Empty description="暂无数据" />
    </div>
  );
}
