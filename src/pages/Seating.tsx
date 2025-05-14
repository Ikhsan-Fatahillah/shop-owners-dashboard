
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const Seating = () => {
  const [tableTypes, setTableTypes] = useState([
    { id: 1, name: "Counter", capacity: 2, quantity: 8 },
    { id: 2, name: "Window Seat", capacity: 4, quantity: 6 },
    { id: 3, name: "Regular", capacity: 4, quantity: 10 },
    { id: 4, name: "Private Room", capacity: 8, quantity: 2 },
    { id: 5, name: "Tatami", capacity: 6, quantity: 3 },
  ]);

  const [blockedSlots, setBlockedSlots] = useState([
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
      tables: "Private Room (2)" 
    },
  ]);

  const [newTableType, setNewTableType] = useState({
    name: "",
    capacity: 2,
    quantity: 1
  });

  const [newBlockedSlot, setNewBlockedSlot] = useState({
    name: "",
    date: new Date(),
    startTime: "18:00",
    endTime: "21:00",
    tableType: "",
    tableCount: 1
  });

  const [editingSlot, setEditingSlot] = useState<any>(null);
  const [isEditSlotDialogOpen, setIsEditSlotDialogOpen] = useState(false);

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

  const handleAddBlockedSlot = () => {
    if (newBlockedSlot.name && newBlockedSlot.date && newBlockedSlot.tableType) {
      setBlockedSlots([
        ...blockedSlots,
        {
          id: blockedSlots.length + 1,
          name: newBlockedSlot.name,
          date: newBlockedSlot.date.toISOString().split('T')[0],
          startTime: newBlockedSlot.startTime,
          endTime: newBlockedSlot.endTime,
          tables: `${newBlockedSlot.tableType} (${newBlockedSlot.tableCount})`
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

  const handleDeleteTableType = (id: number) => {
    setTableTypes(tableTypes.filter(table => table.id !== id));
    toast({
      title: "Table Type Deleted",
      description: "Table type has been removed."
    });
  };

  const handleDeleteBlockedSlot = (id: number) => {
    setBlockedSlots(blockedSlots.filter(slot => slot.id !== id));
    toast({
      title: "Blocked Slot Removed",
      description: "The blocked time slot has been removed."
    });
  };

  const handleEditBlockedSlot = (slot: any) => {
    // Convert the slot data to the format expected by the edit form
    const tableInfo = slot.tables.split(" (");
    const tableType = tableInfo[0];
    const tableCount = tableInfo.length > 1 ? parseInt(tableInfo[1].replace(")", ""), 10) : 1;
    
    setEditingSlot({
      id: slot.id,
      name: slot.name,
      date: new Date(slot.date),
      startTime: slot.startTime,
      endTime: slot.endTime,
      tableType: tableType,
      tableCount: tableCount
    });
    setIsEditSlotDialogOpen(true);
  };

  const handleSaveEditedSlot = () => {
    if (editingSlot && editingSlot.name && editingSlot.date && editingSlot.tableType) {
      const updatedSlots = blockedSlots.map(slot => {
        if (slot.id === editingSlot.id) {
          return {
            ...slot,
            name: editingSlot.name,
            date: editingSlot.date.toISOString().split('T')[0],
            startTime: editingSlot.startTime,
            endTime: editingSlot.endTime,
            tables: `${editingSlot.tableType} (${editingSlot.tableCount})`
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

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Seating Management</h1>
        <p className="text-gray-500">Configure your restaurant seating layout</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Table Types</CardTitle>
          <CardDescription>Configure the types of tables in your restaurant</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tableTypes.map(table => (
              <div key={table.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h3 className="font-medium">{table.name}</h3>
                  <p className="text-sm text-gray-500">
                    {table.capacity} {table.capacity === 1 ? 'person' : 'people'} × {table.quantity} {table.quantity === 1 ? 'table' : 'tables'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDeleteTableType(table.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>

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
                <Button onClick={handleAddTableType}>Add Table Type</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Block Time Slots</CardTitle>
          <CardDescription>Reserve tables for special events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {blockedSlots.map(slot => (
              <div key={slot.id} className="p-3 border rounded-lg">
                <div className="flex justify-between">
                  <h3 className="font-medium">{slot.name}</h3>
                  <Badge variant="outline">{new Date(slot.date).toLocaleDateString()}</Badge>
                </div>
                <p className="text-sm text-gray-500">
                  {slot.startTime} - {slot.endTime}
                </p>
                <p className="text-sm text-gray-500">
                  Tables: {slot.tables}
                </p>
                <div className="mt-2 flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditBlockedSlot(slot)}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDeleteBlockedSlot(slot.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full mt-4">Block New Time Slot</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Block Time Slot</DialogTitle>
                <DialogDescription>
                  Reserve tables for a special event or closure.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="event-name">Event Name</Label>
                  <Input 
                    id="event-name" 
                    placeholder="e.g., Private Party, Staff Meeting"
                    value={newBlockedSlot.name}
                    onChange={(e) => setNewBlockedSlot({...newBlockedSlot, name: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Date</Label>
                  <Calendar
                    mode="single"
                    selected={newBlockedSlot.date}
                    onSelect={(date) => date && setNewBlockedSlot({...newBlockedSlot, date})}
                    className="border rounded-md p-3 pointer-events-auto"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-time">Start Time</Label>
                    <Input 
                      id="start-time" 
                      type="time"
                      value={newBlockedSlot.startTime}
                      onChange={(e) => setNewBlockedSlot({...newBlockedSlot, startTime: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-time">End Time</Label>
                    <Input 
                      id="end-time" 
                      type="time"
                      value={newBlockedSlot.endTime}
                      onChange={(e) => setNewBlockedSlot({...newBlockedSlot, endTime: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="table-type">Table Type</Label>
                  <Select 
                    value={newBlockedSlot.tableType}
                    onValueChange={(value) => setNewBlockedSlot({...newBlockedSlot, tableType: value})}
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

                {newBlockedSlot.tableType && newBlockedSlot.tableType !== "All tables" && (
                  <div className="space-y-2">
                    <Label htmlFor="table-count">Number of Tables</Label>
                    <Input 
                      id="table-count" 
                      type="number" 
                      min="1"
                      value={newBlockedSlot.tableCount}
                      onChange={(e) => setNewBlockedSlot({...newBlockedSlot, tableCount: parseInt(e.target.value, 10)})}
                      max={tableTypes.find(t => t.name === newBlockedSlot.tableType)?.quantity || 1}
                    />
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button onClick={handleAddBlockedSlot}>Block Time Slot</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Edit Block Time Slot Dialog */}
      <Dialog open={isEditSlotDialogOpen} onOpenChange={setIsEditSlotDialogOpen}>
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
            <Button variant="outline" onClick={() => setIsEditSlotDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEditedSlot}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Seating;
