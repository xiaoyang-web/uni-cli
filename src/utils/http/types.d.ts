export interface ApiResponse<T = any> {
  /**
   * 成功标识
   */
  succeeded: boolean;
  /**
   * 响应数据
   */
  data?: T;
  /**
   * 自定义响应码
   */
  code?: number;
  /**
   * 响应数据提示
   */
  message?: string;
}
