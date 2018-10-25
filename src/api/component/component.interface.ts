export interface IComponent {
  id: string;
  short_id: string;
  name: string;
  code: string;
  description?: string;
  updated_at: Date;
  created_at: Date;
}
