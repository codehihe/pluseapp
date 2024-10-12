'use client'

import { useState, useEffect } from 'react'
import { Home, Server, Users, Settings, Terminal, Sun, Moon, LogOut, LogIn } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function Component() {
  const [activeTab, setActiveTab] = useState('home')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [consoleInput, setConsoleInput] = useState('')
  const [consoleOutput, setConsoleOutput] = useState<string[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isDiscordLinked, setIsDiscordLinked] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('')
  const [activeServerPage, setActiveServerPage] = useState('overview')

  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'servers', icon: Server, label: 'Servers' },
    { id: 'users', icon: Users, label: 'Users' },
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'console', icon: Terminal, label: 'Console' },
  ]

  const plans = [
    { id: 'basic', name: 'Basic', price: 9.99, features: ['1 Game Server', '2GB RAM', '10GB Storage'] },
    { id: 'pro', name: 'Pro', price: 19.99, features: ['3 Game Servers', '8GB RAM', '50GB Storage'] },
    { id: 'enterprise', name: 'Enterprise', price: 49.99, features: ['10 Game Servers', '32GB RAM', '200GB Storage'] },
  ]

  const serverPages = ['overview', 'performance', 'backups', 'mods']

  useEffect(() => {
    setConsoleOutput([
      "PulseNode v1.0.1 - High-Performance Game Server Hosting",
      "[System]: Welcome to PulseNode! Initializing game servers...",
      "[System]: Ready! Type 'help' for available commands.",
    ])
  }, [])

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

  const handleConsoleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setConsoleOutput(prev => [...prev, `> ${consoleInput}`])
    
    const command = consoleInput.toLowerCase().trim()
    let response = "Unknown command. Type 'help' for available commands."

    if (command === 'help') {
      response = `Available commands:
/help - Show this help message
/status - Check server status
/plans - View available hosting plans
/games - List supported games
/performance - View server performance
/mods - Manage game mods
/support - Get support information
/restart - Restart the webapp`
    } else if (command === 'status') {
      response = "All systems operational. Server load: 42%"
    } else if (command === 'plans') {
      response = "Available plans: Basic, Pro, Enterprise. Type '/plans <plan_name>' for details."
    } else if (command === 'games') {
      response = "Supported games: Minecraft, CS:GO, ARK, Valheim, and more. Type '/games list' for full list."
    } else if (command === 'performance') {
      response = "CPU: 32%, RAM: 54%, Network: 78Mbps up / 120Mbps down"
    } else if (command === 'mods') {
      response = "Mod management: Use '/mods list' to view installed mods, '/mods install <mod_name>' to install a new mod."
    } else if (command === 'support') {
      response = "For support, please email support@pulsenode.com or call 1-800-PULSE-NODE"
    } else if (command === 'restart') {
      response = "Webapp restart initiated. This page will refresh in 5 seconds."
      setTimeout(() => {
        window.location.reload()
      }, 5000)
    }

    setConsoleOutput(prev => [...prev, response])
    setConsoleInput('')
  }

  const neonReddishOrange = 'text-red-500 drop-shadow-[0_0_8px_rgba(255,69,0,0.8)]'
  const neonOrange = 'text-orange-500 drop-shadow-[0_0_8px_rgba(255,69,0,0.8)]'

  return (
    <div className={`flex flex-col h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Image
        src="/placeholder.svg?height=200&width=400&text=Background"
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-20"
      />
      <main className="flex-1 overflow-auto p-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h1 className={`text-4xl font-bold mb-4 ${neonOrange}`}>Welcome to PulseNode</h1>
          
          <AnimatePresence mode="wait">
            {activeTab === 'home' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className={`text-2xl font-semibold mb-4 ${neonReddishOrange}`}>Home</h2>
                <p>Welcome to PulseNode, your high-performance game server hosting solution.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
                    <h3 className={`text-xl font-semibold mb-2 ${neonOrange}`}>99.9% Uptime</h3>
                    <p>We guarantee maximum availability for your game servers.</p>
                  </div>
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
                    <h3 className={`text-xl font-semibold mb-2 ${neonOrange}`}>24/7 Support</h3>
                    <p>Our expert team is always ready to assist you.</p>
                  </div>
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
                    <h3 className={`text-xl font-semibold mb-2 ${neonOrange}`}>Easy Mod Management</h3>
                    <p>Install and manage game mods with ease.</p>
                  </div>
                </div>
                <h2 className={`text-2xl font-semibold mt-8 mb-4 ${neonReddishOrange}`}>Our Plans</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {plans.map((plan) => (
                    <motion.div
                      key={plan.id}
                      className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg ${
                        selectedPlan === plan.id ? 'ring-2 ring-orange-500' : ''
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedPlan(plan.id)
                        window.open('https://discord.com/invite/plusenodes', '_blank')
                      }}
                    >
                      <h3 className={`text-xl font-semibold mb-2 ${neonOrange}`}>{plan.name}</h3>
                      <p className={`text-2xl font-bold mb-4 ${neonReddishOrange}`}>${plan.price}/mo</p>
                      <ul className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center mb-2">
                            <Server className="mr-2 text-orange-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <button className={`mt-4 w-full px-4 py-2 rounded ${isDarkMode ? 'bg-orange-600 text-white' : 'bg-orange-500 text-white'}`}>
                        Select Plan
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'servers' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className={`text-2xl font-semibold mb-4 ${neonReddishOrange}`}>Servers</h2>
                <div className="flex mb-4 space-x-4">
                  {serverPages.map((page) => (
                    <button
                      key={page}
                      onClick={() => setActiveServerPage(page)}
                      className={`px-4 py-2 rounded ${
                        activeServerPage === page
                          ? `${neonOrange} ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`
                          : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {page.charAt(0).toUpperCase() + page.slice(1)}
                    </button>
                  ))}
                </div>
                {activeServerPage === 'overview' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['US East', 'US West', 'Europe', 'Asia'].map((region, index) => (
                      <motion.div
                        key={index}
                        className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <h3 className={`text-xl font-semibold mb-2 ${neonOrange}`}>{region}</h3>
                        <p className={neonReddishOrange}>Status: Online</p>
                        <p>Load: {Math.floor(Math.random() * 100)}%</p>
                      </motion.div>
                    ))}
                  </div>
                )}
                {activeServerPage === 'performance' && (
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
                    <h3 className={`text-xl font-semibold mb-2 ${neonOrange}`}>Server Performance</h3>
                    <p className={neonReddishOrange}>CPU Usage: 32%</p>
                    <p className={neonReddishOrange}>RAM Usage: 54%</p>
                    <p className={neonReddishOrange}>Network: 78Mbps up / 120Mbps down</p>
                  </div>
                )}
                {activeServerPage === 'backups' && (
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
                    <h3 className={`text-xl font-semibold mb-2 ${neonReddishOrange}`}>Backups</h3>
                    <p className={neonOrange}>Last Backup: 2 hours ago</p>
                    <p className="mb-4">Total Backups: 7</p>
                    <ul className="mb-4">
                      <li>Daily Backup - 00:00 UTC</li>
                      <li>Weekly Backup - Sunday 02:00 UTC</li>
                      <li>Monthly Backup - 1st day of month 04:00 UTC</li>
                    </ul>
                    <div className="mb-4">
                      <h4 className={`text-lg font-semibold mb-2 ${neonReddishOrange}`}>Recent Backups</h4>
                      <ul className="list-disc pl-5">
                        <li>Backup_20230615_120000 - 15 Jun 2023, 12:00 PM</li>
                        <li>Backup_20230614_235959 - 14 Jun 2023, 11:59 PM</li>
                        <li>Backup_20230613_235959 - 13 Jun 2023, 11:59 PM</li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => {
                        const newBackup = { id: Date.now(), name: `Backup_${new Date().toISOString().split('T')[0].replace(/-/g, '')}_${new Date().toTimeString().split(' ')[0].replace(/:/g, '')}`, date: new Date().toLocaleString() };
                        alert(`New backup created: ${newBackup.name} at ${newBackup.date}`);
                        // Here you would typically update the state with the new backup
                      }}
                      className={`mt-2 px-4 py-2 rounded ${isDarkMode ? 'bg-red-600 text-white' : 'bg-red-500 text-white'} hover:bg-red-700 transition-colors duration-200`}
                    >
                      Create New Backup
                    </button>
                  </div>
                )}
                {activeServerPage === 'mods' && (
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
                    <h3 className={`text-xl font-semibold mb-2 ${neonReddishOrange}`}>Mod Management</h3>
                    <p className={neonOrange}>Installed Mods: 5</p>
                    <ul className="mb-4">
                      <li>Enhanced Graphics v2.1</li>
                      <li>Custom Skins Pack v1.3</li>
                      <li>Advanced AI NPCs v3.0</li>
                      <li>Extended Map Pack v4.2</li>
                      <li>Performance Optimizer v1.5</li>
                    </ul>
                    <div className="mb-4">
                      <h4 className={`text-lg font-semibold mb-2 ${neonReddishOrange}`}>Available Mods</h4>
                      <ul className="list-disc pl-5">
                        <li>Weather Effects Pro v2.0</li>
                        <li>Custom UI Overhaul v1.7</li>
                        <li>Advanced Crafting System v3.2</li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => {
                        const availableMods = ['Weather Effects Pro v2.0', 'Custom UI Overhaul v1.7', 'Advanced Crafting System v3.2'];
                        const randomMod = availableMods[Math.floor(Math.random() * availableMods.length)];
                        alert(`New mod installed: ${randomMod}`);
                        // Here you would typically update the state with the new mod
                      }}
                      className={`mt-2 px-4 py-2 rounded ${isDarkMode ? 'bg-red-600 text-white' : 'bg-red-500 text-white'} hover:bg-red-700 transition-colors duration-200`}
                    >
                      Install New Mod
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'users' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className={`text-2xl font-semibold mb-4 ${neonReddishOrange}`}>User Profile</h2>
                {isLoggedIn ? (
                  <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
                    {isDiscordLinked ? (
                      <div className="flex items-start space-x-6">
                        <Image
                          src="/placeholder.svg?height=100&width=100&text=User"
                          alt="User Avatar"
                          
                          width={100}
                          height={100}
                          className="rounded-full"
                        />
                        <div>
                          <h3 className={`text-xl font-semibold mb-2 ${neonOrange}`}>John Doe</h3>
                          <p>Discord: JohnDoe#1234</p>
                          <p>Email: john.doe@example.com</p>
                          <p>Role: Game Server Administrator</p>
                          <p>Member since: January 1, 2023</p>
                          <p>Active Servers: 3</p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="mb-4">Link your Discord account to access full features.</p>
                        <button
                          onClick={() => {
                            // Simulate Discord OAuth process
                            setTimeout(() => {
                              setIsDiscordLinked(true);
                              alert('Discord account successfully linked!');
                            }, 1500);
                          }}
                          className={`px-4 py-2 rounded flex items-center ${isDarkMode ? 'bg-red-600 text-white' : 'bg-red-500 text-white'} hover:bg-red-700 transition-colors duration-200`}
                        >
                          <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                          </svg>
                          Link Discord Account
                        </button>
                      </div>
                    )}
                    <div className="mt-4">
                      <h4 className={`text-lg font-semibold mb-2 ${neonOrange}`}>Server Activity</h4>
                      <ul className="space-y-2">
                        <li>Last login: 2 hours ago</li>
                        <li>Total playtime: 1,234 hours</li>
                        <li>Favorite game: Minecraft</li>
                      </ul>
                      <h4 className={`text-lg font-semibold mt-4 mb-2 ${neonOrange}`}>Achievements</h4>
                      <ul className="space-y-2">
                        <li>🏆 Server Maestro: Hosted 100 game sessions</li>
                        <li>🚀 Performance Guru: Maintained 99.9% uptime for a month</li>
                        <li>🛠️ Mod Master: Installed and managed 50 different mods</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
                    <p className="mb-4">Please log in to view your profile.</p>
                    <button
                      onClick={() => setIsLoggedIn(true)}
                      className={`px-4 py-2 rounded ${isDarkMode ? 'bg-green-600 text-white' : 'bg-green-500 text-white'}`}
                    >
                      Log In
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className={`text-2xl font-semibold mb-4 ${neonReddishOrange}`}>Settings</h2>
                <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className={neonOrange}>Dark Mode</span>
                    <button
                      onClick={toggleDarkMode}
                      className={`p-2 rounded-full ${isDarkMode ? 'bg-orange-400' : 'bg-gray-300'}`}
                    >
                      {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                    </button>
                  </div>
                  <div className="mb-4">
                    <label className={`block mb-2 ${neonOrange}`}>Notification Preferences</label>
                    <select className={`w-full p-2 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}>
                      <option>All notifications</option>
                      <option>Important only</option>
                      <option>None</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className={`block mb-2 ${neonOrange}`}>Language</label>
                    <select className={`w-full p-2 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}>
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className={`block mb-2 ${neonOrange}`}>Time Zone</label>
                    <select className={`w-full p-2 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}>
                      <option>UTC</option>
                      <option>EST</option>
                      <option>PST</option>
                      <option>CET</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className={`block mb-2 ${neonOrange}`}>Two-Factor Authentication</label>
                    <button className={`px-4 py-2 rounded ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`}>
                      Enable 2FA
                    </button>
                  </div>
                  <div className="mb-4">
                    <label className={`block mb-2 ${neonOrange}`}>Email Notifications</label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        Server status updates
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        Billing reminders
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Promotional offers
                      </label>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className={`block mb-2 ${neonOrange}`}>Data Usage</label>
                    <div className={`p-4 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <p className="mb-2">Current month: 235.5 GB / 500 GB</p>
                      <div className="w-full bg-gray-300 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '47%'}}></div>
                      </div>
                    </div>
                  </div>
                  {isLoggedIn ? (
                    <button
                      onClick={() => setIsLoggedIn(false)}
                      className={`px-4 py-2 rounded flex items-center ${isDarkMode ? 'bg-red-600 text-white' : 'bg-red-500 text-white'}`}
                    >
                      <LogOut className="mr-2" /> Log Out
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsLoggedIn(true)}
                      className={`px-4 py-2 rounded flex items-center ${isDarkMode ? 'bg-green-600 text-white' : 'bg-green-500 text-white'}`}
                    >
                      <LogIn className="mr-2" /> Log In
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'console' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className={`text-2xl font-semibold mb-4 ${neonReddishOrange}`}>Console</h2>
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
                  <div className="bg-black text-green-400 p-4 rounded-lg h-64 overflow-auto mb-4">
                    {consoleOutput.map((line, index) => (
                      <div key={index}>{line}</div>
                    ))}
                  </div>
                  <form onSubmit={handleConsoleSubmit} className="flex">
                    <input
                      type="text"
                      value={consoleInput}
                      onChange={(e) => setConsoleInput(e.target.value)}
                      className="flex-1 p-2 rounded-l bg-gray-700 text-white"
                      placeholder="Enter command..."
                    />
                    <button type="submit" className={`px-4 py-2 rounded-r ${neonOrange}`}>
                      Run
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <nav className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <ul className="flex justify-around">
          {tabs.map((tab) => (
            <li key={tab.id} className="flex-1">
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center w-full p-4 ${
                  activeTab === tab.id
                    ? neonOrange
                    : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                <tab.icon className="w-6 h-6" />
                <span className="text-xs mt-1">{tab.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
