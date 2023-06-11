/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

export abstract class CacheClientPort {
  abstract get<T>(key: string): Promise<T>;
  abstract set(key: string, value: unknown): Promise<void>;
}
