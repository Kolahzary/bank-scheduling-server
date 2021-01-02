import { Injectable } from '@nestjs/common';
import { Customer } from '~/interfaces';

@Injectable()
export class CustomerQueueService {
  customers: Customer[] = [];
  private currentIndex = 0;

  add(customer: Customer): void {
    this.customers.push(customer);
  }

  hasNext(): boolean {
    return this.currentIndex <= this.customers.length - 1;
  }

  getNext(): Customer {
    return this.customers[this.currentIndex++];
  }

  count(): number {
    return this.customers.length;
  }

  countNotProcessed(): number {
    return this.customers.length - this.currentIndex;
  }

  idOfLast(): number {
    return this.currentIndex;
  }
}
