
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

const ShopInfo = () => {
  const [shopData, setShopData] = useState({
    name: "Sakura Japanese Restaurant",
    phone: "+81-3-1234-5678",
    address: "1-2-3 Shibuya, Tokyo, Japan",
    operatingHours: {
      monday: { isOpen: true, open: "11:00", close: "22:00" },
      tuesday: { isOpen: true, open: "11:00", close: "22:00" },
      wednesday: { isOpen: true, open: "11:00", close: "22:00" },
      thursday: { isOpen: true, open: "11:00", close: "22:00" },
      friday: { isOpen: true, open: "11:00", close: "23:00" },
      saturday: { isOpen: true, open: "11:00", close: "23:00" },
      sunday: { isOpen: true, open: "12:00", close: "21:00" },
    },
    is24Hours: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShopData({
      ...shopData,
      [e.target.name]: e.target.value,
    });
  };

  const handleToggleDay = (day: string) => {
    setShopData({
      ...shopData,
      operatingHours: {
        ...shopData.operatingHours,
        [day]: {
          ...shopData.operatingHours[day as keyof typeof shopData.operatingHours],
          isOpen: !shopData.operatingHours[day as keyof typeof shopData.operatingHours].isOpen,
        },
      },
    });
  };

  const handleHoursChange = (day: string, type: 'open' | 'close', value: string) => {
    setShopData({
      ...shopData,
      operatingHours: {
        ...shopData.operatingHours,
        [day]: {
          ...shopData.operatingHours[day as keyof typeof shopData.operatingHours],
          [type]: value,
        },
      },
    });
  };

  const handleToggle24Hours = () => {
    setShopData({
      ...shopData,
      is24Hours: !shopData.is24Hours,
    });
  };

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Shop Information</h1>
        <p className="text-gray-500">Update your restaurant details</p>
      </div>

      <Card className="rounded-lg shadow-sm border-0">
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Restaurant Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={shopData.name} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                name="phone" 
                value={shopData.phone} 
                onChange={handleInputChange} 
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input 
              id="address" 
              name="address" 
              value={shopData.address} 
              onChange={handleInputChange} 
            />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-lg shadow-sm border-0">
        <CardHeader>
          <CardTitle>Operating Hours</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch 
              id="24hours" 
              checked={shopData.is24Hours}
              onCheckedChange={handleToggle24Hours}
            />
            <Label htmlFor="24hours">Open 24/7</Label>
          </div>
          
          {!shopData.is24Hours && (
            <div className="grid grid-cols-1 gap-4">
              {days.map(day => (
                <div key={day} className="border rounded-md p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium capitalize">{day}</span>
                    <Switch
                      id={`${day}-toggle-compact`}
                      checked={shopData.operatingHours[day as keyof typeof shopData.operatingHours].isOpen}
                      onCheckedChange={() => handleToggleDay(day)}
                    />
                  </div>
                  {shopData.operatingHours[day as keyof typeof shopData.operatingHours].isOpen ? (
                    <div className="flex items-center gap-2">
                      <Input
                        type="time"
                        value={shopData.operatingHours[day as keyof typeof shopData.operatingHours].open}
                        onChange={(e) => handleHoursChange(day, 'open', e.target.value)}
                        className="w-32"
                      />
                      <span>to</span>
                      <Input
                        type="time"
                        value={shopData.operatingHours[day as keyof typeof shopData.operatingHours].close}
                        onChange={(e) => handleHoursChange(day, 'close', e.target.value)}
                        className="w-32"
                      />
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">Closed</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="rounded-lg shadow-sm border-0">
        <CardHeader>
          <CardTitle>Document Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="document-upload">Upload Documents (PDF)</Label>
            <Input id="document-upload" type="file" accept=".pdf" className="mt-2" />
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-medium mb-2">Current Documents</h3>
            <div className="w-full h-48 bg-gray-100 rounded flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500">restaurant-documents-2025.pdf</p>
                <Button variant="outline" size="sm" className="mt-2">Preview</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};

export default ShopInfo;
