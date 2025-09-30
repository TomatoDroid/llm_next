export async function asyncRunSafe<T>(fn: Promise<T>): Promise<[null, T] | [Error]> {
  try {
    return [null, await fn]
  } catch (error: any) {
    return [error || new Error('unknown error')]
  }
}