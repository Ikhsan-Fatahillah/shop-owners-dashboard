
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type NewTableType = {
  name: string;
  capacity: number;
  quantity: number;
};

type AddTableTypeDialogProps = {
  newTableType: NewTableType;
  setNewTableType: React.Dispatch<React.SetStateAction<NewTableType>>;
  onAddTableType: () => void;
};

const AddTableTypeDialog = ({ 
  newTableType, 
  setNewTableType, 
  onAddTableType 
}: AddTableTypeDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full mt-4">Add Table Type</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Table Type</DialogTitle>
          <DialogDescription>
            Define a new type of table for your restaurant.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Table Type Name</Label>
            <Input 
              id="name" 
              placeholder="e.g., Booth, Counter, etc."
              value={newTableType.name}
              onChange={(e) => setNewTableType({...newTableType, name: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity (people)</Label>
              <Input 
                id="capacity" 
                type="number" 
                min="1"
                value={newTableType.capacity}
                onChange={(e) => setNewTableType({...newTableType, capacity: parseInt(e.target.value, 10)})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input 
                id="quantity" 
                type="number" 
                min="1"
                value={newTableType.quantity}
                onChange={(e) => setNewTableType({...newTableType, quantity: parseInt(e.target.value, 10)})}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onAddTableType}>Add Table Type</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTableTypeDialog;
