
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { TableType } from "../hooks/useTableTypes";
import { EditingSlot } from "../hooks/useBlockedSlots";

type EditBlockedSlotDialogProps = {
  tableTypes: TableType[];
  editingSlot: EditingSlot | null;
  setEditingSlot: React.Dispatch<React.SetStateAction<EditingSlot | null>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSave: () => void;
};

const EditBlockedSlotDialog = ({ 
  tableTypes, 
  editingSlot, 
  setEditingSlot, 
  isOpen, 
  setIsOpen, 
  onSave 
}: EditBlockedSlotDialogProps) => {
  const [selectedTableNumbers, setSelectedTableNumbers] = useState<number[]>([]);
  
  useEffect(() => {
    if (editingSlot && editingSlot.selectedTables) {
      setSelectedTableNumbers(editingSlot.selectedTables);
    } else {
      setSelectedTableNumbers([]);
    }
  }, [editingSlot]);
  
  const handleTableTypeChange = (value: string) => {
    if (editingSlot) {
      setEditingSlot({
        ...editingSlot,
        tableType: value,
        tableCount: 0,
        selectedTables: []
      });
      setSelectedTableNumbers([]);
    }
  };
  
  const handleTableNumberToggle = (tableNumber: number) => {
    if (!editingSlot) return;
    
    const updatedTables = selectedTableNumbers.includes(tableNumber)
      ? selectedTableNumbers.filter(num => num !== tableNumber)
      : [...selectedTableNumbers, tableNumber];
      
    setSelectedTableNumbers(updatedTables);
    
    setEditingSlot({
      ...editingSlot,
      tableCount: updatedTables.length,
      selectedTables: updatedTables
    });
  };
  
  if (!editingSlot) return null;
  
  const selectedTableType = tableTypes.find(t => t.name === editingSlot.tableType);
  const tableQuantity = selectedTableType ? selectedTableType.quantity : 0;
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Blocked Time Slot</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Event Name</Label>
            <Input 
              value={editingSlot.name}
              onChange={(e) => setEditingSlot({...editingSlot, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>Date</Label>
            <div className="border rounded-md">
              <Calendar
                mode="single"
                selected={editingSlot.date}
                onSelect={(date) => date && setEditingSlot({...editingSlot, date})}
                className="w-full p-3 pointer-events-auto"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Time</Label>
              <Input 
                type="time"
                value={editingSlot.startTime}
                onChange={(e) => setEditingSlot({...editingSlot, startTime: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>End Time</Label>
              <Input 
                type="time"
                value={editingSlot.endTime}
                onChange={(e) => setEditingSlot({...editingSlot, endTime: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Table Type</Label>
            <Select 
              value={editingSlot.tableType}
              onValueChange={handleTableTypeChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a table type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All tables">All tables (Full closure)</SelectItem>
                {tableTypes.map(table => (
                  <SelectItem key={table.id} value={table.name}>
                    {table.name} ({table.capacity} people × {table.quantity})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {editingSlot.tableType && editingSlot.tableType !== "All tables" && (
            <div className="space-y-2">
              <Label>Select Specific Tables</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Array.from({ length: tableQuantity }, (_, i) => i + 1).map(num => (
                  <div key={num} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`edit-table-${num}`} 
                      checked={selectedTableNumbers.includes(num)}
                      onCheckedChange={() => handleTableNumberToggle(num)}
                    />
                    <Label htmlFor={`edit-table-${num}`} className="text-sm">
                      {editingSlot.tableType} {num}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={onSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditBlockedSlotDialog;
