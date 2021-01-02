import { Customer } from "./customer.interface";
import { Employee } from "./employee.interface";

export interface UpdateMessage {
  minutesPerCustomer: number;
  approximateWaitingMinutes: number;

  customers: Customer[];
  employees: Employee[];
}
