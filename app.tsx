"use client"

import { useState, useRef, useEffect } from 'react'
import { Terminal, User, Lock, Server, Cpu, Database, Wifi, Home, Zap, DollarSign, LifeBuoy, Menu, Globe, Shield, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Simulated user data
const users = [
  { username: 'testuser', password: 'password123' },
]

// Simulated server status
const serverStatus = {
  cpu: '25%',
  memory: '40%',
  storage: '60%',
  network: '10 Mbps',
}

// Pricing plans
const pricingPlans = [
  { name: 'Basic', price: '$9.99', features: ['1 CPU Core', '2GB RAM', '20GB SSD', '1TB Bandwidth', '24/7 Support', 'Daily Backups'] },
  { name: 'Pro', price: '$19.99', features: ['2 CPU Cores', '4GB RAM', '50GB SSD', '2TB Bandwidth', '24/7 Priority Support', 'Hourly Backups', 'DDoS Protection'] },
  { name: 'Enterprise', price: '$49.99', features: ['4 CPU Cores', '8GB RAM', '100GB SSD', '5TB Bandwidth', '24/7 Dedicated Support', 'Real-time Backups', 'Advanced DDoS Protection', 'Load Balancing'] },
]

export default function EnhancedNeonHosting() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [consoleOutput, setConsoleOutput] = useState<string[]>([])
  const [currentCommand, setCurrentCommand] = useState('')
  const [error, setError] = useState('')
  const [userInfo, setUserInfo] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const consoleEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setIsLoggedIn(true)
      setUserInfo(JSON.parse(storedUser))
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggingIn(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    const user = users.find(u => u.username === username && u.password === password)
    if (user) {
      setIsLoggedIn(true)
      setError('')
      setUserInfo({ username: user.username, lastLogin: new Date().toLocaleString() })
      localStorage.setItem('user', JSON.stringify({ username: user.username, lastLogin: new Date().toLocaleString() }))
      setCurrentPage('console')
    } else {
      setError('Invalid username or password')
    }
    setIsLoggingIn(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername('')
    setPassword('')
    setUserInfo(null)
    localStorage.removeItem('user')
    setCurrentPage('home')
  }

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(currentCommand)
      setCurrentCommand('')
    }
  }

  const executeCommand = (cmd: string) => {
    setConsoleOutput(prev => [...prev, `> ${cmd}`])
    const [command, ...args] = cmd.toLowerCase().split(' ')
    switch (command) {
      case 'help':
        setConsoleOutput(prev => [...prev, 'Available commands: help, clear, about, status, user, logout'])
        break
      case 'clear':
        setConsoleOutput([])
        break
      case 'about':
        setConsoleOutput(prev => [...prev, 'Neon Hosting - Your futuristic hosting solution!', 'Version 2.0', 'Powered by cutting-edge technology for optimal performance.'])
        break
      case 'status':
        setConsoleOutput(prev => [
          ...prev,
          'Server Status:',
          `CPU Usage: ${serverStatus.cpu}`,
          `Memory Usage: ${serverStatus.memory}`,
          `Storage Usage: ${serverStatus.storage}`,
          `Network: ${serverStatus.network}`,
          'All systems operational.'
        ])
        break
      case 'user':
        if (userInfo) {
          setConsoleOutput(prev => [
            ...prev,
            `Username: ${userInfo.username}`,
            `Last Login: ${userInfo.lastLogin}`,
            'Account Status: Active',
            'Plan: Pro'
          ])
        } else {
          setConsoleOutput(prev => [...prev, 'User not logged in'])
        }
        break
      case 'logout':
        handleLogout()
        setConsoleOutput(prev => [...prev, 'Logged out successfully'])
        break
      default:
        setConsoleOutput(prev => [...prev, `Command not recognized: ${cmd}`])
    }
  }

  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [consoleOutput])

  const NavLink = ({ to, icon, children }: { to: string; icon: React.ReactNode; children: React.ReactNode }) => (
    <a
      href={`#${to}`}
      onClick={(e) => {
        e.preventDefault();
        setCurrentPage(to);
        setMobileMenuOpen(false);
      }}
      className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${currentPage === to ? 'bg-[#ff4500] text-white' : 'text-gray-300 hover:bg-gray-700'}`}
    >
      {icon}
      <span className="ml-3">{children}</span>
    </a>
  )

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-6 text-[#ff4500]">Welcome to Neon Hosting</h1>
            <p className="text-xl mb-8">Experience the future of web hosting with blazing fast speeds and cutting-edge technology.</p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <Globe className="h-12 w-12 text-[#ff4500] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Global Network</h3>
                <p>Our servers are strategically located worldwide for optimal performance.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <Shield className="h-12 w-12 text-[#ff4500] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Ironclad Security</h3>
                <p>State-of-the-art security measures to keep your data safe and sound.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <Clock className="h-12 w-12 text-[#ff4500] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">99.9% Uptime</h3>
                <p>We guarantee near-perfect uptime for your peace of mind.</p>
              </div>
            </div>
            <button onClick={() => setCurrentPage('features')} className="bg-[#ff4500] text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-[#ff5722] transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Explore Features
            </button>
          </motion.div>
        )
      case 'features':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-[#ff4500]">Our Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <FeatureCard icon={<Zap className="h-8 w-8 text-[#ff4500]" />} title="Lightning Fast">
                Experience unparalleled speed with our optimized servers and global CDN network.
              </FeatureCard>
              <FeatureCard icon={<Lock className="h-8 w-8 text-[#ff4500]" />} title="Secure">
                Your data is protected with state-of-the-art security measures, including SSL certificates and DDoS protection.
              </FeatureCard>
              <FeatureCard icon={<Server className="h-8 w-8 text-[#ff4500]" />} title="Scalable">
                Easily scale your resources as your needs grow, with flexible plans and instant upgrades.
              </FeatureCard>
              <FeatureCard icon={<Terminal className="h-8 w-8 text-[#ff4500]" />} title="Advanced Console">
                Manage your hosting with our powerful command-line interface, offering full control over your environment.
              </FeatureCard>
              <FeatureCard icon={<Database className="h-8 w-8 text-[#ff4500]" />} title="Automated Backups">
                Never lose your data with our automated backup system, offering easy restoration options.
              </FeatureCard>
              <FeatureCard icon={<Cpu className="h-8 w-8 text-[#ff4500]" />} title="Resource Monitoring">
                Keep track of your server's performance with real-time resource monitoring and alerts.
              </FeatureCard>
            </div>
          </motion.div>
        )
      case 'pricing':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-[#ff4500]">Pricing Plans</h2>
            <p className="text-xl mb-8">Choose the perfect plan for your needs. All plans include 24/7 support and a 30-day money-back guarantee.</p>
            <div className="grid md:grid-cols-3 gap-6">
              {pricingPlans.map((plan, index) => (
                <PricingCard key={index} plan={plan} />
              ))}
            </div>
          </motion.div>
        )
      case 'support':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-[#ff4500]">Support</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
                <p className="mb-4">Our support team is available 24/7 to assist you with any questions or issues.</p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <LifeBuoy className="h-6 w-6 text-[#ff4500] mr-2" />
                    <span>support@neonhosting.com</span>
                  </div>
                  <div className="flex items-center">
                    <Terminal className="h-6 w-6 text-[#ff4500] mr-2" />
                    <span>Use the 'help' command in our console for quick assistance</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">FAQs</h3>
                <ul className="space-y-2">
                  <li>
                    <strong>Q: How do I upgrade my plan?</strong>
                    <p>A: You can upgrade your plan anytime from your account dashboard.</p>
                  </li>
                  <li>
                    <strong>Q: Do you offer refunds?</strong>
                    <p>A: Yes, we offer a 30-day money-back guarantee on all plans.</p>
                  </li>
                  <li>
                    <strong>Q: Can I host multiple websites?</strong>
                    <p>A: Yes, all our plans support hosting multiple websites.</p>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        )
      case 'console':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full flex flex-col md:flex-row gap-4"
          >
            <div className="w-full md:w-2/3 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gray-900 p-2 flex items-center">
                <Terminal className="h-5 w-5 text-[#ff4500] mr-2" />
                <span className="font-mono text-sm">Neon Console</span>
              </div>
              <div className="p-4 h-[400px] overflow-y-auto font-mono text-sm">
                {consoleOutput.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1,   y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mb-1"
                  >
                    {line}
                  </motion.div>
                ))}
                <div ref={consoleEndRef} />
              </div>
              <div className="bg-gray-900 p-2">
                <input
                  type="text"
                  className="w-full bg-gray-800 text-white px-2 py-1 focus:outline-none"
                  value={currentCommand}
                  onChange={(e) => setCurrentCommand(e.target.value)}
                  onKeyDown={handleCommand}
                  placeholder="Enter command..."
                />
              </div>
            </div>
            <div className="w-full md:w-1/3 bg-gray-800 rounded-lg shadow-lg p-4">
              <h2 className="text-xl font-semibold mb-4 text-[#ff4500]">Server Status</h2>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Cpu className="h-5 w-5 text-[#ff4500] mr-2" />
                  <span>CPU Usage: {serverStatus.cpu}</span>
                </div>
                <div className="flex items-center">
                  <Server className="h-5 w-5 text-[#ff4500] mr-2" />
                  <span>Memory Usage: {serverStatus.memory}</span>
                </div>
                <div className="flex items-center">
                  <Database className="h-5 w-5 text-[#ff4500] mr-2" />
                  <span>Storage Usage: {serverStatus.storage}</span>
                </div>
                <div className="flex items-center">
                  <Wifi className="h-5 w-5 text-[#ff4500] mr-2" />
                  <span>Network: {serverStatus.network}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage('home');
                }}
                className="flex items-center"
              >
                <Terminal className="h-8 w-8 text-[#ff4500]" />
                <span className="ml-2 text-2xl font-bold text-[#ff4500]">Neon Hosting</span>
              </a>
            </div>
            <nav className="hidden md:flex space-x-4">
              <NavLink to="home" icon={<Home className="h-5 w-5" />}>Home</NavLink>
              <NavLink to="features" icon={<Zap className="h-5 w-5" />}>Features</NavLink>
              <NavLink to="pricing" icon={<DollarSign className="h-5 w-5" />}>Pricing</NavLink>
              <NavLink to="support" icon={<LifeBuoy className="h-5 w-5" />}>Support</NavLink>
              {isLoggedIn && <NavLink to="console" icon={<Terminal className="h-5 w-5" />}>Console</NavLink>}
            </nav>
            <div className="hidden md:flex items-center">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="bg-[#ff4500] text-white py-2 px-4 rounded-md hover:bg-[#ff5722] transition duration-300"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => setCurrentPage('login')}
                  className="bg-[#ff4500] text-white py-2 px-4 rounded-md hover:bg-[#ff5722] transition duration-300"
                >
                  Login
                </button>
              )}
            </div>
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-800"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavLink to="home" icon={<Home className="h-5 w-5" />}>Home</NavLink>
              <NavLink to="features" icon={<Zap className="h-5 w-5" />}>Features</NavLink>
              <NavLink to="pricing" icon={<DollarSign className="h-5 w-5" />}>Pricing</NavLink>
              <NavLink to="support" icon={<LifeBuoy className="h-5 w-5" />}>Support</NavLink>
              {isLoggedIn && <NavLink to="console" icon={<Terminal className="h-5 w-5" />}>Console</NavLink>}
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <Lock className="h-5 w-5 mr-3" />
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => { setCurrentPage('login'); setMobileMenuOpen(false) }}
                  className="w-full text-left flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <User className="h-5 w-5 mr-3" />
                  Login
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {currentPage === 'login' && !isLoggedIn ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-md mx-auto"
            >
              <form onSubmit={handleLogin} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-[#ff4500]">Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                  <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
                  <div className="relative">
                    <input
                      type="text"
                      id="username"
                      className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff4500] pl-10"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff4500] pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <motion.button
                  type="submit"
                  className="w-full bg-[#ff4500] text-white py-2 px-4 rounded-md hover:bg-[#ff5722] transition duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Logging in...
                    </motion.span>
                  ) : (
                    "Login"
                  )}
                </motion.button>
              </form>
            </motion.div>
          ) : (
            renderPage()
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-gray-800 text-center py-4">
        <p className="text-sm text-gray-400">&copy; 2023 Neon Hosting. All rights reserved.</p>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-semibold ml-2">{title}</h3>
      </div>
      <p>{children}</p>
    </div>
  )
}

function PricingCard({ plan }: { plan: { name: string; price: string; features: string[] } }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col">
      <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
      <p className="text-3xl font-bold text-[#ff4500] mb-4">{plan.price}<span className="text-sm text-gray-400">/mo</span></p>
      <ul className="mb-6 flex-grow">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center mb-2">
            <Zap className="h-5 w-5 text-[#ff4500] mr-2" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <motion.a
        href="https://discord.gg/your-discord-server"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#ff4500] text-white py-2 px-4 rounded-md hover:bg-[#ff5722] transition duration-300 mt-auto text-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Choose Plan
      </motion.a>
    </div>
  )
}
