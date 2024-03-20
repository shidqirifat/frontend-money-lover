import { Option } from "@/components/ui/combobox";

type Entity = {
  id: number;
  name: string;
};

export const toOption = (item: Entity): Option => {
  return {
    label: item.name,
    value: item.id,
  };
};

export const toDatalist = (list: Array<Entity>): Array<Option> => {
  return list.map(toOption);
};
