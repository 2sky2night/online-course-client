import { MittEvent } from "@/enums";

/** 事件类型与事件回调数据映射 */
export type EventsMap = {
  [MittEvent.OPEN_LOGIN_MODAL]: void;
  [MittEvent.MAIN_IS_BOTTOM_DOWN]: void;
};
