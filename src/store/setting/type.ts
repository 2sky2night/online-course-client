export interface SettingState {
  /** 是否为深色主题 */
  isDark: boolean;
  /** 设置主题 */
  setTheme: (isDark: boolean) => void;
  /** 切换主题 */
  toggleTheme: () => void;
}
