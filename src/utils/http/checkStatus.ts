const statusMap = new Map([
  [401, '没有操作权限'],
  [403, '资源禁止访问'],
  [404, '资源暂未找到'],
  [405, '请求方法错误'],
  [500, '服务出现错误'],
  [504, '网关出现错误']
]);

export function checkStatus(status: number) {
  const errorMsg = statusMap.get(status) || '未知错误';
  throw new Error(errorMsg);
}
