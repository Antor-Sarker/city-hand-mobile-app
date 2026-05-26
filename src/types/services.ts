export type Service = {
  _id: string;
  title: string;
  category: string;
  categoryLabel: string;
  description?: string;
  status: "active" | "inactive";

  image:
    | string
    | {
        url: string;
        public_id: string;
      };

  price?: {
    basic: number;
    standard: number;
    premium: number;
  };

  serviceInclusions?: string[];
};
