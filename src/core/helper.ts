function removeByKeyValue<T extends object, K extends keyof T>(
  array: T[],
  key: K,
  value: T[K]
): boolean
{
  const index = array.findIndex((item) => item[key] === value);
  if (index !== -1) {
    array.splice(index, 1)
    return true
  }
  return false
}
function generateUniqueId<T extends { id: number }>(array: T[]): number
{
  return array.length > 0 ? array[array.length - 1].id + 1 : 0;
}

const DEBUG = true
function logger({ name, data, id, level }: { name: string, data?: any, id: string, level?: number }) {
  if (DEBUG) {
    console.log(`[${level ?? 1}] ${name}(${id.slice(0, 6)}):`, data)
  }
}

function successResponse(data: any, message?: string) {
  return {
    data,
    success: true,
    message
  }
}

function errorResponse(message: string) {
  return {
    success: false,
    message
  }
}

export { removeByKeyValue, generateUniqueId, logger, successResponse, errorResponse }