import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X, Plus, Trash, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface EntryManagerProps {
  entries: string[];
  setEntries: React.Dispatch<React.SetStateAction<string[]>>;
}

const EntryManager: React.FC<EntryManagerProps> = ({ entries, setEntries }) => {
  const [newEntry, setNewEntry] = useState('');
  const [bulkMode, setBulkMode] = useState(false);
  const [bulkEntries, setBulkEntries] = useState('');
  
  const MAX_ENTRIES = 40;

  const addEntry = () => {
    if (!newEntry.trim()) {
      toast.error("Entry cannot be empty");
      return;
    }
    
    if (entries.includes(newEntry.trim())) {
      toast.error("Entry already exists");
      return;
    }
    
    if (entries.length >= MAX_ENTRIES) {
      toast.error(`Maximum ${MAX_ENTRIES} entries allowed`);
      return;
    }
    
    setEntries([...entries, newEntry.trim()]);
    setNewEntry('');
    toast.success("Entry added!");
  };

  const processBulkEntries = () => {
    if (!bulkEntries.trim()) {
      toast.error("Please enter some entries");
      return;
    }
    
    const newEntries = bulkEntries
      .split(/[,\n]+/)
      .map(entry => entry.trim())
      .filter(entry => entry.length > 0);
    
    if (newEntries.length === 0) {
      toast.error("No valid entries found");
      return;
    }
    
    if (entries.length + newEntries.length > MAX_ENTRIES) {
      toast.error(`Cannot add ${newEntries.length} entries. Maximum ${MAX_ENTRIES} entries allowed (${MAX_ENTRIES - entries.length} remaining)`);
      return;
    }
    
    const duplicates = newEntries.filter(entry => entries.includes(entry));
    
    const uniqueEntries = newEntries.filter(entry => !entries.includes(entry));
    setEntries([...entries, ...uniqueEntries]);
    
    if (uniqueEntries.length > 0) {
      toast.success(`Added ${uniqueEntries.length} new entries`);
    }
    
    if (duplicates.length > 0) {
      toast.warning(`${duplicates.length} duplicate entries were skipped`);
    }
    
    setBulkEntries('');
    setBulkMode(false);
  };

  const removeEntry = (indexToRemove: number) => {
    setEntries(entries.filter((_, index) => index !== indexToRemove));
    toast.success("Entry removed");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addEntry();
    }
  };

  const clearAllEntries = () => {
    if (entries.length === 0) return;
    
    setEntries([]);
    toast.success("All entries cleared");
  };

  const addBulkEntries = () => {
    const exampleEntries = [
      "Pizza", "Burger", "Sushi", "Pasta", 
      "Salad", "Tacos", "Ice Cream", "Sandwich"
    ];
    setEntries(exampleEntries);
    toast.success("Example entries added");
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-4">
      {!bulkMode ? (
        <div className="flex space-x-2">
          <Input
            type="text"
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add new entry..."
            className="bg-secondary/50 border-white/10 text-white placeholder:text-white/50"
            autoFocus
          />
          <Button 
            onClick={addEntry}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus size={18} />
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <Textarea
            value={bulkEntries}
            onChange={(e) => setBulkEntries(e.target.value)}
            placeholder="Add multiple entries separated by commas or line breaks:&#10;Example:&#10;Item 1, Item 2, Item 3&#10;Or&#10;Item 1&#10;Item 2&#10;Item 3"
            className="min-h-[100px] bg-secondary/50 border-white/10 text-white placeholder:text-white/50"
            autoFocus
          />
          <div className="flex space-x-2">
            <Button 
              onClick={processBulkEntries}
              className="bg-primary hover:bg-primary/90 flex-1"
            >
              Add Entries
            </Button>
            <Button 
              onClick={() => setBulkMode(false)}
              variant="outline"
              className="border-white/10 hover:bg-white/10"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="flex justify-between">
        {!bulkMode && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setBulkMode(true)}
            className="text-xs border-white/10 hover:bg-white/5 text-white/70"
          >
            <FileText size={14} className="mr-1" />
            Bulk Add
          </Button>
        )}
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={addBulkEntries}
          className="text-xs border-white/10 hover:bg-white/5 text-white/70"
        >
          Add Examples
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={clearAllEntries}
          className="text-xs border-destructive/50 hover:bg-destructive/10 text-destructive"
        >
          <Trash size={14} className="mr-1" />
          Clear All
        </Button>
      </div>

      <div className="mt-4 space-y-1">
        <h3 className="text-sm font-medium text-white/70 mb-2">
          Current Entries ({entries.length}/{MAX_ENTRIES})
        </h3>
        
        {entries.length === 0 && (
          <p className="text-sm text-white/50 text-center py-4">
            No entries yet. Add some to spin the wheel!
          </p>
        )}
        
        <div className="flex flex-wrap gap-2 max-h-[300px] overflow-y-auto">
          {entries.map((entry, index) => (
            <div 
              key={index}
              className="bg-pink-500/30 text-white px-3 py-1.5 rounded-full flex items-center text-sm"
            >
              <span className="mr-2">{entry}</span>
              <button 
                onClick={() => removeEntry(index)}
                className="text-white/70 hover:text-white"
                aria-label={`Remove ${entry}`}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EntryManager;
