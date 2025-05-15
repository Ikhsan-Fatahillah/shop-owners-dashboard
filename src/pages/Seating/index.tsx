
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
    <div className="container mx-auto py-6 space-y-6 bg-gradient-to-br from-white to-pink-50/20">
      <div>
        <h1 className="text-3xl font-bold">Seating Management</h1>
        <p className="text-gray-500">Configure your restaurant seating layout</p>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md border border-purple-100/50">
        <h2 className="text-xl font-semibold mb-4 text-purple-700">Table Types</h2>
        <TableTypesList 
          tableTypes={tableTypes} 
          onDelete={handleDeleteTableType} 
        />
        
        <AddTableTypeDialog
          newTableType={newTableType}
          setNewTableType={setNewTableType}
          onAddTableType={handleAddTableType}
        />
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md border border-blue-100/50">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Blocked Time Slots</h2>
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
      </div>

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
