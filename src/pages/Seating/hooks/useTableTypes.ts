
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export type TableType = {
  id: number;
  name: string;
  capacity: number;
  quantity: number;
};

export const useTableTypes = () => {
  const [tableTypes, setTableTypes] = useState<TableType[]>([
    { id: 1, name: "Counter", capacity: 2, quantity: 8 },
    { id: 2, name: "Window Seat", capacity: 4, quantity: 6 },
    { id: 3, name: "Regular", capacity: 4, quantity: 10 },
    { id: 4, name: "Private Room", capacity: 8, quantity: 2 },
    { id: 5, name: "Tatami", capacity: 6, quantity: 3 },
  ]);

  const [newTableType, setNewTableType] = useState({
    name: "",
    capacity: 2,
    quantity: 1
  });

  const handleAddTableType = () => {
    if (newTableType.name) {
      setTableTypes([
        ...tableTypes,
        {
          id: tableTypes.length + 1,
          name: newTableType.name,
          capacity: newTableType.capacity,
          quantity: newTableType.quantity
        }
      ]);
      setNewTableType({ name: "", capacity: 2, quantity: 1 });
      toast({
        title: "Table Type Added",
        description: `Added ${newTableType.name} table type successfully.`
      });
    }
  };

  const handleDeleteTableType = (id: number) => {
    setTableTypes(tableTypes.filter(table => table.id !== id));
    toast({
      title: "Table Type Deleted",
      description: "Table type has been removed."
    });
  };

  return {
    tableTypes,
    setTableTypes,
    newTableType,
    setNewTableType,
    handleAddTableType,
    handleDeleteTableType
  };
};
