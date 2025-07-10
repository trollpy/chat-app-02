export const WelcomeSvg= () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="800"
    height="600"
    viewBox="0 0 800 600"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    className="text-gray-800 dark:text-gray-200"
  >
    <defs>
      <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.05"/>
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.1"/>
      </linearGradient>
      <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" className="[stop-color:theme(colors.white)] dark:[stop-color:theme(colors.gray.800)]"/>
        <stop offset="100%" className="[stop-color:theme(colors.gray.50)] dark:[stop-color:theme(colors.gray.900)]"/>
      </linearGradient>
      <linearGradient id="bubbleGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1"/>
        <stop offset="100%" stopColor="#8b5cf6"/>
      </linearGradient>
      <linearGradient id="bubbleGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4"/>
        <stop offset="100%" stopColor="#3b82f6"/>
      </linearGradient>
      <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="10" stdDeviation="20" floodColor="rgba(0,0,0,0.1)" className="dark:[flood-color:rgba(0,0,0,0.5)]"/>
      </filter>
    </defs>
    
    {/* Background - adapts to theme */}
    <rect width="800" height="600" fill="url(#bgGradient)"/>
    
    {/* Floating shapes - theme aware */}
    <circle cx="120" cy="100" r="40" fill="currentColor" opacity="0.1">
      <animate attributeName="cy" values="100;80;100" dur="4s" repeatCount="indefinite"/>
    </circle>
    <circle cx="680" cy="150" r="25" fill="currentColor" opacity="0.08">
      <animate attributeName="cy" values="150;130;150" dur="3s" repeatCount="indefinite"/>
    </circle>
    <circle cx="150" cy="450" r="30" fill="currentColor" opacity="0.12">
      <animate attributeName="cy" values="450;430;450" dur="5s" repeatCount="indefinite"/>
    </circle>
    
    {/* Main chat interface - theme responsive */}
    <rect x="200" y="150" width="400" height="300" rx="20" fill="url(#cardGradient)" filter="url(#shadow)" className="fill-white dark:fill-gray-800"/>
    
    {/* Chat header - theme aware */}
    <rect x="200" y="150" width="400" height="60" rx="20" fill="currentColor" opacity="0.05"/>
    <circle cx="240" cy="180" r="15" fill="url(#bubbleGradient1)"/>
    <circle cx="245" cy="175" r="3" fill="white"/>
    <circle cx="240" cy="175" r="3" fill="white"/>
    <circle cx="235" cy="175" r="3" fill="white"/>
    <text x="270" y="185" fill="currentColor" fontSize="16" fontWeight="600">Active Chat</text>
    
    {/* Chat messages */}
    <rect x="220" y="230" width="200" height="35" rx="18" fill="url(#bubbleGradient1)" opacity="0.9"/>
    <text x="235" y="250" fill="white" fontSize="12">Hey there! How are you?</text>
    
    <rect x="380" y="280" width="180" height="35" rx="18" fill="currentColor" opacity="0.1"/>
    <text x="395" y="300" fill="currentColor" fontSize="12" opacity="0.8">I'm doing great, thanks!</text>
    
    <rect x="220" y="330" width="160" height="35" rx="18" fill="url(#bubbleGradient1)" opacity="0.9"/>
    <text x="235" y="350" fill="white" fontSize="12">Want to chat more?</text>
    
    {/* Typing indicator - theme responsive */}
    <rect x="380" y="380" width="80" height="25" rx="12" fill="currentColor" opacity="0.08"/>
    <circle cx="395" cy="392" r="2" fill="currentColor" opacity="0.5">
      <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1s" repeatCount="indefinite"/>
    </circle>
    <circle cx="405" cy="392" r="2" fill="currentColor" opacity="0.5">
      <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1s" begin="0.2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="415" cy="392" r="2" fill="currentColor" opacity="0.5">
      <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1s" begin="0.4s" repeatCount="indefinite"/>
    </circle>
    
    {/* Floating bubbles - theme aware */}
    <circle cx="150" cy="250" r="20" fill="url(#bubbleGradient2)" opacity="0.7">
      <animate attributeName="r" values="20;25;20" dur="2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="650" cy="300" r="15" fill="url(#bubbleGradient1)" opacity="0.6">
      <animate attributeName="r" values="15;20;15" dur="3s" repeatCount="indefinite"/>
    </circle>
    <circle cx="100" cy="350" r="12" fill="currentColor" opacity="0.3">
      <animate attributeName="r" values="12;18;12" dur="2.5s" repeatCount="indefinite"/>
    </circle>
    
    {/* Connection lines - theme responsive */}
    <path d="M150 250 Q200 200 240 180" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.2"/>
    <path d="M650 300 Q600 250 560 180" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.2"/>
    
    {/* Welcome text - theme aware */}
    <text x="400" y="520" textAnchor="middle" fill="currentColor" fontSize="24" fontWeight="700" opacity="0.9">
      Welcome to Your Chat Hub
    </text>
    <text x="400" y="545" textAnchor="middle" fill="currentColor" fontSize="14" opacity="0.7">
      Select a conversation to start messaging
    </text>
    
    {/* Decorative elements - theme responsive */}
    <circle cx="400" cy="80" r="60" fill="currentColor" opacity="0.06">
      <animate attributeName="r" values="60;70;60" dur="4s" repeatCount="indefinite"/>
    </circle>
    <circle cx="400" cy="80" r="30" fill="currentColor" opacity="0.1">
      <animate attributeName="r" values="30;35;30" dur="3s" repeatCount="indefinite"/>
    </circle>
  </svg>
);