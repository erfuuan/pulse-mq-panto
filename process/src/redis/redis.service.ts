import { Redis } from 'ioredis';
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RuleDtoArray, RuleDto } from '../rule/DTO/rule-dto'
@Injectable()
export class RedisService implements OnModuleInit {
  private redisClient: Redis;
  private readonly logger = new Logger(RedisService.name);
  constructor(private readonly configService: ConfigService) { }

  async onModuleInit() {
    try {
      this.redisClient = new Redis({
        host: this.configService.get<string>('REDIS_HOST', 'localhost'),
        port: this.configService.get<number>('REDIS_PORT', 6379),
      });

      this.redisClient.on('connect', () => {
        this.logger.log('Connected to Redis');
      });

      this.redisClient.on('error', (error) => {
        this.logger.error('Redis error:', error);
      });

      await this.redisClient.ping();
      this.logger.log('Redis connection established successfully');
    } catch (error) {
      this.logger.error('Error connecting to Redis', error);
      throw new Error('Failed to initialize Redis client');
    }
  }

  async set(key: string, value: string, ttl?: number): Promise<string> {
    if (ttl) { await this.redisClient.set(key, value, 'EX', ttl) }
    return await this.redisClient.set(key, value);
  }

  async get(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }

  async searchKeys(pattern: string): Promise<string[]> {
    let cursor = '0';
    let keys: string[] = [];
    do {
      const [newCursor, scannedKeys] = await this.redisClient.scan(cursor, 'MATCH', pattern);
      cursor = newCursor;
      keys = keys.concat(scannedKeys);
    } while (cursor !== '0');
    return keys;
  }

  async getAllKeys(): Promise<string[]> {
    try {
      const keys = await this.redisClient.keys('*');
      return keys;
    } catch (error) {
      console.log('Error fetching keys from Redis:', error);
      throw new Error('Failed to fetch keys from Redis');
    }
  }

  async getMultiple(keys: string[]): Promise<(string | null)[]> {
    return await this.redisClient.mget(keys);
  }

  async del(key: string) {
    await this.redisClient.del(key);
  }

  async setRuleData(rules: RuleDto[]) {
    try {
      if (!this.redisClient) {
        console.error('Redis client is not initialized');
        return;
      }
      const pipeline = this.redisClient.pipeline()
      rules.forEach((rule) => {
        pipeline.set(`${rule.operand1}-${rule._id}`, JSON.stringify(rule));
      });
      await pipeline.exec();
      console.log('Cold start completed and data stored in Redis.');
    } catch (error) {
      console.error('Error during cold start:', error);
    }
  }
}