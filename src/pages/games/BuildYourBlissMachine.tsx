import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { RefreshCw, Volume2, VolumeX, ZoomIn, ZoomOut, Save, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GameLayout from '@/components/games/GameLayout';

interface Component {
  id: string;
  type: 'light' | 'sound' | 'aroma';
  name: string;
  color: string;
  effect: {
    calm: number;
    energy: number;
    joy: number;
    focus: number;
  };
  x: number;
  y: number;
  width: number;
  height: number;
  active: boolean;
}

interface Challenge {
  id: number;
  name: string;
  targetMood: 'calm' | 'energy' | 'joy' | 'focus';
  targetValue: number;
  description: string;
  completed: boolean;
}

const BuildYourBlissMachine: React.FC = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [components, setComponents] = useState<Component[]>([]);
  const [palette, setPalette] = useState<Component[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [draggedComponent, setDraggedComponent] = useState<Component | null>(null);
  const [mood, setMood] = useState({ calm: 0, energy: 0, joy: 0, focus: 0 });
  const [machineOn, setMachineOn] = useState(false);
  const [savedMachines, setSavedMachines] = useState<{name: string, components: Component[], rating: number}[]>([]);
  const [showGallery, setShowGallery] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 1,
      name: "Peaceful Oasis",
      targetMood: "calm",
      targetValue: 70,
      description: "Create a machine that produces at least 70 calm points",
      completed: false
    },
    {
      id: 2,
      name: "Energy Burst",
      targetMood: "energy",
      targetValue: 80,
      description: "Create a machine that produces at least 80 energy points",
      completed: false
    },
    {
      id: 3,
      name: "Joy Generator",
      targetMood: "joy",
      targetValue: 75,
      description: "Create a machine that produces at least 75 joy points",
      completed: false
    },
    {
      id: 4,
      name: "Focus Factory",
      targetMood: "focus",
      targetValue: 65,
      description: "Create a machine that produces at least 65 focus points",
      completed: false
    },
    {
      id: 5,
      name: "Mood Maestro",
      targetMood: "joy",
      targetValue: 90,
      description: "Create a machine that produces at least 90 joy points",
      completed: false
    }
  ]);
  
  // Sound effects
  const sounds = {
    click: new Audio('/sounds/click.mp3'),
    success: new Audio('/sounds/success.mp3'),
    ambient: new Audio('/sounds/ambient.mp3'),
    chime: new Audio('/sounds/chime.mp3')
  };
  
  // Initialize component palette
  useEffect(() => {
    // Define component templates
    const lightComponents: Partial<Component>[] = [
      { type: 'light', name: 'Blue Pulse Light', color: '#4a90e2', effect: { calm: 30, energy: 5, joy: 10, focus: 15 } },
      { type: 'light', name: 'Purple Glow', color: '#9b59b6', effect: { calm: 20, energy: 15, joy: 25, focus: 10 } },
      { type: 'light', name: 'Green Ambient', color: '#2ecc71', effect: { calm: 35, energy: 5, joy: 15, focus: 25 } },
      { type: 'light', name: 'Red Energizer', color: '#e74c3c', effect: { calm: -10, energy: 40, joy: 20, focus: 15 } },
      { type: 'light', name: 'Yellow Joy', color: '#f1c40f', effect: { calm: 5, energy: 30, joy: 35, focus: 5 } }
    ];
    
    const soundComponents: Partial<Component>[] = [
      { type: 'sound', name: 'Ocean Waves', color: '#3498db', effect: { calm: 40, energy: -5, joy: 10, focus: 15 } },
      { type: 'sound', name: 'Forest Birds', color: '#27ae60', effect: { calm: 25, energy: 10, joy: 20, focus: 20 } },
      { type: 'sound', name: 'Gentle Rain', color: '#95a5a6', effect: { calm: 35, energy: 0, joy: 5, focus: 30 } },
      { type: 'sound', name: 'Energy Beats', color: '#e67e22', effect: { calm: -15, energy: 45, joy: 25, focus: 10 } },
      { type: 'sound', name: 'Wind Chimes', color: '#1abc9c', effect: { calm: 30, energy: 5, joy: 25, focus: 10 } }
    ];
    
    const aromaComponents: Partial<Component>[] = [
      { type: 'aroma', name: 'Lavender', color: '#8e44ad', effect: { calm: 45, energy: -5, joy: 15, focus: 10 } },
      { type: 'aroma', name: 'Citrus Zest', color: '#f39c12', effect: { calm: 5, energy: 35, joy: 30, focus: 15 } },
      { type: 'aroma', name: 'Vanilla', color: '#f5deb3', effect: { calm: 25, energy: 0, joy: 35, focus: 5 } },
      { type: 'aroma', name: 'Peppermint', color: '#00a86b', effect: { calm: 10, energy: 30, joy: 10, focus: 35 } },
      { type: 'aroma', name: 'Sandalwood', color: '#cd853f', effect: { calm: 30, energy: 5, joy: 10, focus: 30 } }
    ];
    
    // Create palette from templates
    const newPalette = [...lightComponents, ...soundComponents, ...aromaComponents].map((comp, index) => ({
      id: `palette-${index}`,
      type: comp.type as 'light' | 'sound' | 'aroma',
      name: comp.name as string,
      color: comp.color as string,
      effect: comp.effect as Component['effect'],
      x: 0,
      y: 0,
      width: 80,
      height: 80,
      active: false
    }));
    
    setPalette(newPalette);
    
    // Setup audio
    sounds.ambient.loop = true;
    sounds.ambient.volume = 0.3;
    
    // Load any saved machines from localStorage
    const savedMachinesData = localStorage.getItem('blissMachineSaved');
    if (savedMachinesData) {
      setSavedMachines(JSON.parse(savedMachinesData));
    }
    
    // Load challenge progress
    const challengeData = localStorage.getItem('blissMachineChallenges');
    if (challengeData) {
      setChallenges(challenges.map(challenge => {
        const savedChallenges = JSON.parse(challengeData);
        const saved = savedChallenges.find((c: Challenge) => c.id === challenge.id);
        return saved ? { ...challenge, completed: saved.completed } : challenge;
      }));
    }
    
    // Cleanup function
    return () => {
      sounds.ambient.pause();
    };
  }, []);
  
  // Toggle sound
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    
    if (soundEnabled) {
      sounds.ambient.pause();
    } else if (machineOn) {
      sounds.ambient.play().catch(err => console.log('Audio play error:', err));
    }
    
    toast(soundEnabled ? "Sound turned off" : "Sound turned on");
  };
  
  // Play sound effect
  const playSound = (sound: keyof typeof sounds) => {
    if (!soundEnabled) return;
    
    sounds[sound].currentTime = 0;
    sounds[sound].play().catch(err => console.log('Audio play error:', err));
  };
  
  // Handle component selection from palette
  const handleSelectComponent = (component: Component) => {
    playSound('click');
    
    // Create a copy of the component for the workspace
    const newComponent = {
      ...component,
      id: `workspace-${Date.now()}`,
      x: 300,
      y: 200,
      active: false
    };
    
    setComponents(prev => [...prev, newComponent]);
    setSelectedComponent(newComponent);
  };
  
  // Handle component drag
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent, component: Component) => {
    e.preventDefault();
    setDraggedComponent(component);
    
    let clientX: number;
    let clientY: number;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    // Get workspace element
    const workspace = document.getElementById('workspace');
    if (!workspace) return;
    
    const rect = workspace.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const offsetY = clientY - rect.top;
    
    const handleDragMove = (moveEvent: MouseEvent | TouchEvent) => {
      if (!draggedComponent) return;
      
      let moveClientX: number;
      let moveClientY: number;
      
      if ('touches' in moveEvent) {
        moveClientX = moveEvent.touches[0].clientX;
        moveClientY = moveEvent.touches[0].clientY;
      } else {
        moveClientX = moveEvent.clientX;
        moveClientY = moveEvent.clientY;
      }
      
      // Calculate new position
      let newX = moveClientX - rect.left - offsetX + component.width / 2;
      let newY = moveClientY - rect.top - offsetY + component.height / 2;
      
      // Keep within workspace bounds
      newX = Math.max(0, Math.min(newX, workspace.clientWidth - component.width));
      newY = Math.max(0, Math.min(newY, workspace.clientHeight - component.height));
      
      // Update component position
      setComponents(prev => prev.map(c => 
        c.id === component.id ? { ...c, x: newX, y: newY } : c
      ));
    };
    
    const handleDragEnd = () => {
      setDraggedComponent(null);
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('touchmove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchend', handleDragEnd);
    };
    
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('touchmove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchend', handleDragEnd);
  };
  
  // Toggle component active state
  const toggleComponent = (component: Component) => {
    playSound('click');
    
    setComponents(prev => prev.map(c => 
      c.id === component.id ? { ...c, active: !c.active } : c
    ));
    
    // Recalculate mood when components change
    calculateMoodEffect();
  };
  
  // Remove component from workspace
  const removeComponent = (component: Component) => {
    playSound('click');
    
    setComponents(prev => prev.filter(c => c.id !== component.id));
    
    if (selectedComponent?.id === component.id) {
      setSelectedComponent(null);
    }
    
    // Recalculate mood when components change
    calculateMoodEffect();
  };
  
  // Calculate combined mood effect of all active components
  const calculateMoodEffect = () => {
    const activeComponents = components.filter(c => c.active);
    
    if (activeComponents.length === 0) {
      setMood({ calm: 0, energy: 0, joy: 0, focus: 0 });
      return;
    }
    
    // Base calculation
    const baseMood = {
      calm: 0,
      energy: 0,
      joy: 0,
      focus: 0
    };
    
    // Sum all effects
    activeComponents.forEach(component => {
      baseMood.calm += component.effect.calm;
      baseMood.energy += component.effect.energy;
      baseMood.joy += component.effect.joy;
      baseMood.focus += component.effect.focus;
    });
    
    // Apply combo bonuses for mixing different types
    const types = new Set(activeComponents.map(c => c.type));
    
    // Bonus for having all three types
    if (types.size === 3) {
      const bonus = 1.3;
      baseMood.calm *= bonus;
      baseMood.energy *= bonus;
      baseMood.joy *= bonus;
      baseMood.focus *= bonus;
    }
    // Bonus for having two types
    else if (types.size === 2) {
      const bonus = 1.15;
      baseMood.calm *= bonus;
      baseMood.energy *= bonus;
      baseMood.joy *= bonus;
      baseMood.focus *= bonus;
    }
    
    // Special combos
    const hasBlueLight = activeComponents.some(c => c.type === 'light' && c.color === '#4a90e2');
    const hasLavender = activeComponents.some(c => c.type === 'aroma' && c.name === 'Lavender');
    
    if (hasBlueLight && hasLavender) {
      // Special combo: Blue light + Lavender = extra calm
      baseMood.calm += 15;
    }
    
    // Cap values at 100
    Object.keys(baseMood).forEach(key => {
      baseMood[key as keyof typeof baseMood] = Math.min(Math.max(
        baseMood[key as keyof typeof baseMood], 0), 100
      );
    });
    
    setMood(baseMood);
    
    // Check for challenge completion
    if (currentChallenge && !currentChallenge.completed) {
      const targetValue = currentChallenge.targetValue;
      const actualValue = baseMood[currentChallenge.targetMood];
      
      if (actualValue >= targetValue) {
        // Complete challenge
        const updatedChallenges = challenges.map(c => 
          c.id === currentChallenge.id ? { ...c, completed: true } : c
        );
        
        setChallenges(updatedChallenges);
        setCurrentChallenge({ ...currentChallenge, completed: true });
        
        // Save to localStorage
        localStorage.setItem('blissMachineChallenges', JSON.stringify(updatedChallenges));
        
        playSound('success');
        toast.success(`Challenge completed: ${currentChallenge.name}!`);
      }
    }
  };
  
  // Toggle machine on/off
  const toggleMachine = () => {
    const newState = !machineOn;
    setMachineOn(newState);
    
    if (newState) {
      calculateMoodEffect();
      if (soundEnabled) {
        sounds.ambient.play().catch(err => console.log('Audio play error:', err));
      }
    } else {
      if (soundEnabled) {
        sounds.ambient.pause();
      }
    }
    
    playSound('click');
  };
  
  // Save current machine
  const saveMachine = () => {
    // Generate a name
    const machineName = `Bliss Machine #${savedMachines.length + 1}`;
    
    // Generate a mock rating (1-5 stars)
    const rating = Math.floor(Math.random() * 5) + 1;
    
    const newSavedMachine = {
      name: machineName,
      components: [...components],
      rating
    };
    
    const updatedSavedMachines = [...savedMachines, newSavedMachine];
    setSavedMachines(updatedSavedMachines);
    
    // Save to localStorage
    localStorage.setItem('blissMachineSaved', JSON.stringify(updatedSavedMachines));
    
    playSound('success');
    toast.success("Machine saved to your gallery!");
  };
  
  // Load a saved machine
  const loadMachine = (savedMachine: typeof savedMachines[0]) => {
    setComponents(savedMachine.components);
    setShowGallery(false);
    playSound('click');
    toast.success(`Loaded: ${savedMachine.name}`);
  };
  
  // Clear workspace
  const clearWorkspace = () => {
    setComponents([]);
    setSelectedComponent(null);
    setMood({ calm: 0, energy: 0, joy: 0, focus: 0 });
    setMachineOn(false);
    
    playSound('click');
  };
  
  // Select a challenge
  const selectChallenge = (challenge: Challenge) => {
    setCurrentChallenge(challenge);
    playSound('chime');
    
    if (challenge.completed) {
      toast.info("Challenge already completed! Try again for a better result.");
    } else {
      toast.info(`New challenge: ${challenge.description}`);
    }
  };

  return (
    <GameLayout
      title="Build Your Bliss Machine"
      description="Design mood-enhancing machines using components like lights, sounds, and aromas. Test your creations and see real-time mood effects!"
      soundEnabled={soundEnabled}
      toggleSound={toggleSound}
    >
      <div className="flex flex-col lg:flex-row h-full gap-4">
        {/* Left sidebar - Component palette */}
        <div className="lg:w-1/4 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <h2 className="text-lg font-bold mb-4 text-purple-800">Components</h2>
          
          {/* Filter tabs */}
          <div className="flex mb-4 text-sm font-medium">
            <button 
              className="flex-1 py-2 border-b-2 border-purple-600"
              onClick={() => playSound('click')}
            >
              All
            </button>
            <button 
              className="flex-1 py-2 border-b hover:border-purple-300"
              onClick={() => playSound('click')}
            >
              Lights
            </button>
            <button 
              className="flex-1 py-2 border-b hover:border-purple-300"
              onClick={() => playSound('click')}
            >
              Sounds
            </button>
            <button 
              className="flex-1 py-2 border-b hover:border-purple-300"
              onClick={() => playSound('click')}
            >
              Aromas
            </button>
          </div>
          
          {/* Component list */}
          <div className="grid grid-cols-2 gap-2">
            {palette.map(component => (
              <div 
                key={component.id}
                className="bg-white rounded-md shadow p-2 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleSelectComponent(component)}
              >
                <div 
                  className="w-full h-12 rounded-md mb-2" 
                  style={{ backgroundColor: component.color }}
                ></div>
                <p className="text-xs font-medium truncate">{component.name}</p>
                <p className="text-xs text-gray-500 capitalize">{component.type}</p>
              </div>
            ))}
          </div>
          
          {/* Challenges section */}
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-2 text-purple-800">Challenges</h2>
            <div className="space-y-2">
              {challenges.map(challenge => (
                <button
                  key={challenge.id}
                  className={`w-full text-left p-2 rounded text-sm flex items-center ${
                    currentChallenge?.id === challenge.id
                      ? 'bg-purple-100 border-l-4 border-purple-600'
                      : 'hover:bg-purple-50'
                  } ${
                    challenge.completed ? 'text-green-700' : 'text-gray-700'
                  }`}
                  onClick={() => selectChallenge(challenge)}
                >
                  <div className="flex-1 truncate">
                    {challenge.name}
                    <div className="text-xs text-gray-500">
                      Target: {challenge.targetValue} {challenge.targetMood}
                    </div>
                  </div>
                  {challenge.completed && (
                    <div className="text-green-600">
                      <Star size={16} fill="currentColor" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main workspace */}
        <div className="lg:flex-1">
          {/* Workspace controls */}
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-lg mb-4 flex justify-between items-center">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearWorkspace}
                className="text-sm"
              >
                <RefreshCw size={16} className="mr-1" /> Clear
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowGallery(true)}
                className="text-sm"
              >
                <ZoomIn size={16} className="mr-1" /> Gallery
              </Button>
            </div>
            
            <Button
              variant={machineOn ? "default" : "outline"}
              className={machineOn ? "bg-green-600 hover:bg-green-700" : ""}
              onClick={toggleMachine}
            >
              {machineOn ? "Turn Off" : "Turn On"}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={saveMachine}
              disabled={components.length === 0}
              className="text-sm"
            >
              <Save size={16} className="mr-1" /> Save
            </Button>
          </div>
          
          {/* Workspace */}
          <div 
            id="workspace"
            className={`bg-gradient-to-br ${
              machineOn 
                ? `from-purple-100 via-${
                    mood.calm > mood.energy ? 'blue' : 'amber'
                  }-50 to-${
                    mood.joy > mood.focus ? 'pink' : 'teal'
                  }-100` 
                : 'from-gray-100 to-gray-200'
            } rounded-xl shadow-inner h-[400px] relative overflow-hidden`}
            style={{ touchAction: 'none' }}
          >
            {components.map(component => (
              <div
                key={component.id}
                className={`absolute rounded-md shadow-md cursor-move ${
                  component.active && machineOn ? 'animate-pulse' : ''
                }`}
                style={{
                  left: component.x,
                  top: component.y,
                  width: component.width,
                  height: component.height,
                  backgroundColor: component.color,
                  opacity: component.active && machineOn ? 0.9 : 0.6,
                  boxShadow: component.active && machineOn 
                    ? `0 0 15px ${component.color}` 
                    : 'none',
                  border: selectedComponent?.id === component.id 
                    ? '2px dashed white' 
                    : '1px solid rgba(255,255,255,0.3)'
                }}
                onClick={() => toggleComponent(component)}
                onMouseDown={(e) => handleDragStart(e, component)}
                onTouchStart={(e) => handleDragStart(e, component)}
              >
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-xs font-bold text-center p-1">
                  <span className="drop-shadow-md">{component.name}</span>
                  {machineOn && component.active && (
                    <span className="text-xs mt-1">Active</span>
                  )}
                </div>
                
                <button
                  className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeComponent(component);
                  }}
                >
                  ×
                </button>
              </div>
            ))}
            
            {/* Machine feedback when on */}
            {machineOn && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Calm:</span>
                      <span>{Math.round(mood.calm)}%</span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-2">
                      <div className="bg-blue-500 rounded-full h-2" style={{width: `${mood.calm}%`}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Energy:</span>
                      <span>{Math.round(mood.energy)}%</span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-2">
                      <div className="bg-yellow-500 rounded-full h-2" style={{width: `${mood.energy}%`}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Joy:</span>
                      <span>{Math.round(mood.joy)}%</span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-2">
                      <div className="bg-pink-500 rounded-full h-2" style={{width: `${mood.joy}%`}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Focus:</span>
                      <span>{Math.round(mood.focus)}%</span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-2">
                      <div className="bg-green-500 rounded-full h-2" style={{width: `${mood.focus}%`}}></div>
                    </div>
                  </div>
                </div>
                
                {currentChallenge && (
                  <div className="mt-3 text-xs border-t border-white/20 pt-2">
                    <span className="font-bold">Challenge:</span> {currentChallenge.description}
                    <div className="flex items-center mt-1">
                      <span className="mr-2">Progress:</span>
                      <div className="flex-1 bg-gray-300 rounded-full h-2">
                        <div 
                          className={`rounded-full h-2 ${
                            mood[currentChallenge.targetMood] >= currentChallenge.targetValue
                              ? 'bg-green-500'
                              : 'bg-orange-500'
                          }`} 
                          style={{
                            width: `${Math.min(
                              (mood[currentChallenge.targetMood] / currentChallenge.targetValue) * 100,
                              100
                            )}%`
                          }}
                        ></div>
                      </div>
                      <span className="ml-2">
                        {Math.round(mood[currentChallenge.targetMood])}/{currentChallenge.targetValue}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Tutorial overlay for empty workspace */}
            {components.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-center p-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 max-w-md">
                  <Heart size={32} className="mx-auto text-purple-500 mb-2" />
                  <h3 className="text-lg font-bold mb-2">Build Your Bliss Machine</h3>
                  <p className="text-sm mb-3">
                    Select components from the left panel and drag them into your workspace. 
                    Activate components by clicking on them, then turn on your machine to see 
                    the mood effects!
                  </p>
                  <p className="text-xs text-gray-600">
                    Mix different types of components for bonus effects.
                    Complete challenges to test your design skills!
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {/* Component details or tutorial */}
          <div className="mt-4 bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-lg text-sm">
            {selectedComponent ? (
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold">{selectedComponent.name}</h3>
                  <p className="text-gray-600 capitalize">{selectedComponent.type}</p>
                </div>
                <div className="text-xs grid grid-cols-2 gap-x-4 gap-y-1">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
                    Calm: {selectedComponent.effect.calm > 0 ? '+' : ''}{selectedComponent.effect.calm}
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
                    Energy: {selectedComponent.effect.energy > 0 ? '+' : ''}{selectedComponent.effect.energy}
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-pink-500 mr-1"></div>
                    Joy: {selectedComponent.effect.joy > 0 ? '+' : ''}{selectedComponent.effect.joy}
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                    Focus: {selectedComponent.effect.focus > 0 ? '+' : ''}{selectedComponent.effect.focus}
                  </div>
                </div>
              </div>
            ) : (
              <p>Click on components to see their details and effects.</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Gallery modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Your Saved Machines</h2>
                <button 
                  onClick={() => setShowGallery(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-4">
              {savedMachines.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No saved machines yet. Create and save your designs to see them here!
                </div>
              ) : (
                <div className="divide-y">
                  {savedMachines.map((machine, index) => (
                    <div key={index} className="py-3 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{machine.name}</h3>
                        <div className="flex text-yellow-500 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              fill={i < machine.rating ? "currentColor" : "none"}
                            />
                          ))}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => loadMachine(machine)}
                      >
                        Load
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </GameLayout>
  );
};

export default BuildYourBlissMachine;
