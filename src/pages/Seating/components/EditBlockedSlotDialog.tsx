
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Blocked Time Slot</DialogTitle>
        </DialogHeader>
        {editingSlot && (
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
              <Calendar
                mode="single"
                selected={editingSlot.date}
                onSelect={(date) => date && setEditingSlot({...editingSlot, date})}
                className="border rounded-md p-3 pointer-events-auto"
              />
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
                onValueChange={(value) => setEditingSlot({...editingSlot, tableType: value})}
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
                <Label>Number of Tables</Label>
                <Input 
                  type="number" 
                  min="1"
                  value={editingSlot.tableCount}
                  onChange={(e) => setEditingSlot({...editingSlot, tableCount: parseInt(e.target.value, 10)})}
                  max={tableTypes.find(t => t.name === editingSlot.tableType)?.quantity || 1}
                />
              </div>
            )}
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={onSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditBlockedSlotDialog;
