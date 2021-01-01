import { UserRoleType } from "./user-role-type";

export interface StartMessage {
  name: string;
  role: UserRoleType;
}
