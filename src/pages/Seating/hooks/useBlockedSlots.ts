
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { TableType } from "./useTableTypes";

export type BlockedSlot = {
  id: number;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  tables: string;
  selectedTables?: number[];
};

export type EditingSlot = {
  id: number;
  name: string;
  date: Date;
  startTime: string;
  endTime: string;
  tableType: string;
  tableCount: number;
  selectedTables?: number[];
};

export type NewBlockedSlot = {
  name: string;
  date: Date;
  startTime: string;
  endTime: string;
  tableType: string;
  tableCount: number;
  selectedTables?: number[];
};

export const useBlockedSlots = (tableTypes: TableType[]) => {
  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>([
    { 
      id: 1, 
      name: "Staff Meeting", 
      date: "2025-05-18", 
      startTime: "15:00", 
      endTime: "17:00", 
      tables: "All tables" 
    },
    { 
      id: 2, 
      name: "Private Birthday Party", 
      date: "2025-05-20", 
      startTime: "19:00", 
      endTime: "22:00", 
      tables: "Private Room (2)",
      selectedTables: [1, 2]
    },
  ]);

  const [newBlockedSlot, setNewBlockedSlot] = useState<NewBlockedSlot>({
    name: "",
    date: new Date(),
    startTime: "18:00",
    endTime: "21:00",
    tableType: "",
    tableCount: 1
  });

  const [editingSlot, setEditingSlot] = useState<EditingSlot | null>(null);
  const [isEditSlotDialogOpen, setIsEditSlotDialogOpen] = useState(false);

  const handleAddBlockedSlot = () => {
    if (newBlockedSlot.name && newBlockedSlot.date && newBlockedSlot.tableType) {
      const tablesString = newBlockedSlot.tableType === "All tables" 
        ? "All tables"
        : `${newBlockedSlot.tableType} (${newBlockedSlot.tableCount})`;
        
      setBlockedSlots([
        ...blockedSlots,
        {
          id: blockedSlots.length + 1,
          name: newBlockedSlot.name,
          date: newBlockedSlot.date.toISOString().split('T')[0],
          startTime: newBlockedSlot.startTime,
          endTime: newBlockedSlot.endTime,
          tables: tablesString,
          selectedTables: newBlockedSlot.selectedTables
        }
      ]);
      
      setNewBlockedSlot({
        name: "",
        date: new Date(),
        startTime: "18:00",
        endTime: "21:00",
        tableType: "",
        tableCount: 1
      });
      
      toast({
        title: "Time Slot Blocked",
        description: `Added blocked time slot for ${newBlockedSlot.name}.`
      });
    }
  };

  const handleDeleteBlockedSlot = (id: number) => {
    setBlockedSlots(blockedSlots.filter(slot => slot.id !== id));
    toast({
      title: "Blocked Slot Removed",
      description: "The blocked time slot has been removed."
    });
  };

  const handleEditBlockedSlot = (slot: BlockedSlot) => {
    // Convert the slot data to the format expected by the edit form
    let tableType = "";
    let tableCount = 0;
    let selectedTables: number[] = [];
    
    if (slot.tables === "All tables") {
      tableType = "All tables";
      tableCount = 0;
    } else {
      const tableInfo = slot.tables.split(" (");
      tableType = tableInfo[0];
      tableCount = tableInfo.length > 1 ? parseInt(tableInfo[1].replace(")", ""), 10) : 1;
      selectedTables = slot.selectedTables || [];
    }
    
    setEditingSlot({
      id: slot.id,
      name: slot.name,
      date: new Date(slot.date),
      startTime: slot.startTime,
      endTime: slot.endTime,
      tableType: tableType,
      tableCount: tableCount,
      selectedTables: selectedTables
    });
    
    setIsEditSlotDialogOpen(true);
  };

  const handleSaveEditedSlot = () => {
    if (editingSlot && editingSlot.name && editingSlot.date && editingSlot.tableType) {
      const tablesString = editingSlot.tableType === "All tables" 
        ? "All tables"
        : `${editingSlot.tableType} (${editingSlot.tableCount})`;
      
      const updatedSlots = blockedSlots.map(slot => {
        if (slot.id === editingSlot.id) {
          return {
            ...slot,
            name: editingSlot.name,
            date: editingSlot.date.toISOString().split('T')[0],
            startTime: editingSlot.startTime,
            endTime: editingSlot.endTime,
            tables: tablesString,
            selectedTables: editingSlot.selectedTables
          };
        }
        return slot;
      });
      
      setBlockedSlots(updatedSlots);
      setIsEditSlotDialogOpen(false);
      toast({
        title: "Time Slot Updated",
        description: `Updated blocked time slot for ${editingSlot.name}.`
      });
    }
  };

  return {
    blockedSlots,
    setBlockedSlots,
    newBlockedSlot,
    setNewBlockedSlot,
    editingSlot,
    setEditingSlot,
    isEditSlotDialogOpen,
    setIsEditSlotDialogOpen,
    handleAddBlockedSlot,
    handleDeleteBlockedSlot,
    handleEditBlockedSlot,
    handleSaveEditedSlot
  };
};
