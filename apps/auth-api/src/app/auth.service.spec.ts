import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AppService', () => {
  let service: AuthService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = app.get<AuthService>(AuthService);
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
