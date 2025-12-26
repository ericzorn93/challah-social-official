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
      const greeting = service.login({
        username: 'testuser',
        password: 'password123',
        confirmPassword: 'password123',
        $typeName: 'auth.v1.LoginRequest',
      });

      expect(greeting).toEqual({
        token: expect.any(String),
      });
    });
  });
});
