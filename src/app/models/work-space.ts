export enum workSpaceTypeEnum {
  WORKOFFERS = 'workOffers',
  MISCELLANEOUS = 'miscellaneous',
}
export interface WorkSpace {
  id: string; // UUID
  type: workSpaceTypeEnum.WORKOFFERS | workSpaceTypeEnum.MISCELLANEOUS;
  name: string;
  description?: string;
  createdAt: string; // UTC ISO string
  updatedAt: string; // UTC ISO string
}

export const FAKE_WORKSPACES: WorkSpace[] = [
  {
    id: '1',
    type: workSpaceTypeEnum.WORKOFFERS,
    name: 'Workspace 1',
    description: 'Description of Workspace 1',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T08:10:00Z',
  },
  {
    id: '2',
    type: workSpaceTypeEnum.MISCELLANEOUS,
    name: 'Workspace 2',
    description: 'Description of Workspace 2',
    createdAt: '2025-02-11T13:15:00Z',
    updatedAt: '2025-02-11T13:18:00Z',
  },
];
