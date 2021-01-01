import { Test, TestingModule } from '@nestjs/testing';
import { CustomerQueueService } from './customer-queue.service';

describe('CustomerQueueService', () => {
  let service: CustomerQueueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerQueueService],
    }).compile();

    service = module.get<CustomerQueueService>(CustomerQueueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
