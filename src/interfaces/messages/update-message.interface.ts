import { Customer } from "./customer.interface";
import { Employee } from "./employee.interface";

export interface UpdateMessage {
  approximateNewCustomerWaitingTime: number;
  
  customers: Customer[];
  employees: Employee[];
}
