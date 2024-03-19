import { Option } from "@/components/ui/combobox";

type Entity = {
  id: number;
  name: string;
};

export const toDatalist = (list: Array<Entity>): Array<Option> => {
  return list.map((item) => ({
    label: item.name,
    value: item.id,
  }));
};
