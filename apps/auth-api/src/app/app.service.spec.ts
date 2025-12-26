import { Test } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('say', () => {
    it('should return "Hello API"', () => {
      const greeting = service.say({
        sentence: 'Hello API',
        $typeName: 'connectrpc.eliza.v1.SayRequest',
      });

      expect(greeting).toEqual({
        sentence: 'Hello API',
      });
    });
  });
});
