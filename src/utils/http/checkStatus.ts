const statusMap = new Map([
  [401, '没有权限'],
  [403, '禁止访问'],
  [404, '资源未找到'],
  [405, '未允许的请求方法'],
  [500, '服务器错误'],
  [504, '网关错误']
]);

export function checkStatus(status: number) {
  const title = statusMap.get(status) || '未知错误';
  uni.showToast({ title, duration: 3000, icon: 'none', mask: true });
}
