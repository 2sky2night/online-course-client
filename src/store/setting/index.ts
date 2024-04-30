import { create } from "zustand";
import { SettingState } from "./type";

/** 全局设置的仓库 */
export const useSetting = create<SettingState>(set => {
  return {
    isDark: false,
    setTheme: (isDark: boolean) => {
      set(() => {
        return {
          isDark,
        };
      });
    },
  };
});
