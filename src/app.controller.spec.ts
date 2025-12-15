import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should return graphql info', () => {
    const result = appController.home();
    expect(result).toHaveProperty('graphql');
    expect(result).toHaveProperty('examples');
  });
});
