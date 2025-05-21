
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

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
        <Button variant="default" className="w-full mt-4">
          <Plus className="h-4 w-4 mr-1" />
          Add Table Type
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white border-gray-100 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-dashboard-text-primary">Add New Table Type</DialogTitle>
          <DialogDescription className="text-dashboard-text-secondary">
            Define a new type of table for your restaurant.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-dashboard-text-primary font-medium">Table Type Name</Label>
            <Input 
              id="name" 
              placeholder="e.g., Booth, Counter, etc."
              value={newTableType.name}
              onChange={(e) => setNewTableType({...newTableType, name: e.target.value})}
              className="border-gray-200"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="capacity" className="text-dashboard-text-primary font-medium">Capacity (people)</Label>
              <Input 
                id="capacity" 
                type="number" 
                min="1"
                value={newTableType.capacity}
                onChange={(e) => setNewTableType({...newTableType, capacity: parseInt(e.target.value, 10)})}
                className="border-gray-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-dashboard-text-primary font-medium">Quantity</Label>
              <Input 
                id="quantity" 
                type="number" 
                min="1"
                value={newTableType.quantity}
                onChange={(e) => setNewTableType({...newTableType, quantity: parseInt(e.target.value, 10)})}
                className="border-gray-200"
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
