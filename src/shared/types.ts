export interface PollOption {
  count: number;
  isDefault: boolean;
  label: string;
}
export interface PollDoc {
  label: string;
  pollName: string;
  options: PollOption[];
}
