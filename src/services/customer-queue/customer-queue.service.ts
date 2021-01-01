import { Injectable } from '@nestjs/common';
import { Customer } from '~/interfaces';

@Injectable()
export class CustomerQueueService {
    customers: Customer[] = []
    private lastProcessedCustomerIndex: number = -1;

    add(customer: Customer): void {
        this.customers.push(customer);
    }

    hasNext(): boolean {
       return this.lastProcessedCustomerIndex < this.customers.length - 1
    }

    getNext(): Customer {
        return this.customers[++this.lastProcessedCustomerIndex]
    }

    count(): number {
        return this.customers.length
    }

    countNotProcessed(): number {
        return this.customers.length - this.lastProcessedCustomerIndex
    }

    idOfLast(): number {
        return this.lastProcessedCustomerIndex;
    }
}
