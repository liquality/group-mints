export interface Group {
  id: string;
  name: string;
  description?: string;
  publicAddress: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface GroupAllInfo {
  poolsCount: number
  membersCount: number
  id: string;
  name: string;
  description?: string;
  publicAddress: string;
  createdAt?: Date;
  updatedAt?: Date;

}

export interface CreateGroupRequest {
  name: string;
  description?: string;
  publicAddress: string;
}