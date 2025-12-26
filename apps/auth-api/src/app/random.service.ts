import { Injectable } from '@nestjs/common';

@Injectable()
export class RandomService {
  public getRandomNumber(): number {
    return Math.floor(Math.random() * 100);
  }
}
