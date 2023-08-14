type LoadingOptions = Omit<UniNamespace.ShowLoadingOptions, 'title'> & {
  /**
   * 回调函数
   */
  callback?: (...args: any) => any;
  /**
   * 延迟调用时间(单位ms)，默认 0 不延迟
   */
  delay?: number;
};

export class Loading {
  constructor() {
    throw new SyntaxError('禁止实例化');
  }

  /**
   * 显示 loading 提示框
   */
  static show(title: string, options: LoadingOptions = {}) {
    const { mask = true, success, fail, complete, callback, delay = 0 } = options;
    const fn = () => {
      uni.showLoading({
        title,
        mask,
        success: (res) => {
          if (typeof success === 'function') success(res);
          if (typeof callback === 'function') callback();
        },
        fail,
        complete
      });
    };
    delay === 0 ? fn() : setTimeout(fn, delay);
  }

  /**
   * 隐藏 loading 提示框
   */
  static hide(callback?: (...args: any) => any) {
    uni.hideLoading();
    if (typeof callback === 'function') callback();
  }
}
