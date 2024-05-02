import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { ZustandKey } from "@/enums";

import { SettingState } from "./type";

/** 全局设置的仓库 */
export const useSetting = create(
  persist<SettingState, [], [], { isDark: boolean }>(
    set => {
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
    },
    {
      name: ZustandKey.SETTING,
      storage: createJSONStorage(() => globalThis.localStorage),
      partialize: state => ({ isDark: state.isDark }),
    },
  ),
);
