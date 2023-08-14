type ToastOptions = Omit<UniNamespace.ShowToastOptions, 'title'> & {
  /**
   * 回调函数
   */
  callback?: (...args: any) => any;
  /**
   * 延迟调用时间(单位ms)，默认 0 不延迟
   */
  delay?: number;
};

export class Toast {
  constructor() {
    throw new SyntaxError('禁止实例化');
  }

  /**
   * 显示消息提示框
   */
  static show(title: string, options: ToastOptions = {}) {
    const {
      icon = 'none',
      image,
      duration = 2000,
      position,
      mask = false,
      success,
      fail,
      complete,
      callback,
      delay = 0
    } = options;

    const fn = () => {
      uni.showToast({
        title,
        icon,
        image,
        duration,
        position,
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
   * 隐藏消息提示框
   */
  static hide(callback: (...args: any) => any) {
    uni.hideToast();
    if (typeof callback === 'function') callback();
  }
}
