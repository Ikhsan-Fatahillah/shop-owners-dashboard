
import React from "react";
import TableTypesList from "./components/TableTypesList";
import AddTableTypeDialog from "./components/AddTableTypeDialog";
import BlockedTimeSlotsList from "./components/BlockedTimeSlotsList";
import AddBlockedSlotDialog from "./components/AddBlockedSlotDialog";
import EditBlockedSlotDialog from "./components/EditBlockedSlotDialog";
import { useTableTypes } from "./hooks/useTableTypes";
import { useBlockedSlots } from "./hooks/useBlockedSlots";

const Seating = () => {
  const {
    tableTypes,
    newTableType, 
    setNewTableType,
    handleAddTableType,
    handleDeleteTableType
  } = useTableTypes();

  const {
    blockedSlots,
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
  } = useBlockedSlots(tableTypes);

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Seating Management</h1>
        <p className="text-gray-500">Configure your restaurant seating layout</p>
      </div>

      <TableTypesList 
        tableTypes={tableTypes} 
        onDelete={handleDeleteTableType} 
      />
      
      <AddTableTypeDialog
        newTableType={newTableType}
        setNewTableType={setNewTableType}
        onAddTableType={handleAddTableType}
      />

      <BlockedTimeSlotsList 
        blockedSlots={blockedSlots} 
        onEdit={handleEditBlockedSlot}
        onDelete={handleDeleteBlockedSlot}
      />

      <AddBlockedSlotDialog 
        tableTypes={tableTypes}
        newBlockedSlot={newBlockedSlot}
        setNewBlockedSlot={setNewBlockedSlot}
        onAddBlockedSlot={handleAddBlockedSlot}
      />

      <EditBlockedSlotDialog 
        tableTypes={tableTypes}
        editingSlot={editingSlot}
        setEditingSlot={setEditingSlot}
        isOpen={isEditSlotDialogOpen}
        setIsOpen={setIsEditSlotDialogOpen}
        onSave={handleSaveEditedSlot}
      />
    </div>
  );
};

export default Seating;
