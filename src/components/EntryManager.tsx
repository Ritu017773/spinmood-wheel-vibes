
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Plus, Trash } from 'lucide-react';
import { toast } from 'sonner';

interface EntryManagerProps {
  entries: string[];
  setEntries: React.Dispatch<React.SetStateAction<string[]>>;
}

const EntryManager: React.FC<EntryManagerProps> = ({ entries, setEntries }) => {
  const [newEntry, setNewEntry] = useState('');

  const addEntry = () => {
    if (!newEntry.trim()) {
      toast.error("Entry cannot be empty");
      return;
    }
    
    if (entries.includes(newEntry.trim())) {
      toast.error("Entry already exists");
      return;
    }
    
    setEntries([...entries, newEntry.trim()]);
    setNewEntry('');
    toast.success("Entry added!");
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
      <div className="flex space-x-2">
        <Input
          type="text"
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add new entry..."
          className="bg-secondary/50 border-white/10 text-white placeholder:text-white/50"
        />
        <Button 
          onClick={addEntry}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus size={18} />
        </Button>
      </div>

      <div className="flex justify-between">
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
        <h3 className="text-sm font-medium text-white/70 mb-2">Current Entries ({entries.length})</h3>
        
        {entries.length === 0 && (
          <p className="text-sm text-white/50 text-center py-4">
            No entries yet. Add some to spin the wheel!
          </p>
        )}
        
        <div className="flex flex-wrap gap-2">
          {entries.map((entry, index) => (
            <div 
              key={index}
              className="bg-secondary/30 text-white px-3 py-1.5 rounded-full flex items-center text-sm"
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
