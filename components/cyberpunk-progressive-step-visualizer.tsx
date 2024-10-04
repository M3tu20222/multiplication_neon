"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ChevronUp, ChevronDown } from 'lucide-react'

export function CyberpunkProgressiveStepVisualizer() {
  const [stepSize, setStepSize] = useState(2)
  const [currentStep, setCurrentStep] = useState(0)
  const [values, setValues] = useState<number[]>([])
  const [key, setKey] = useState(0)

  const MAX_STEPS = 10
  const MAX_STEP_SIZE = 10

  useEffect(() => {
    const newValues = Array.from({ length: currentStep }, (_, i) => (i + 1) * stepSize)
    setValues(newValues)
  }, [stepSize, currentStep])

  const incrementStep = () => {
    if (currentStep < MAX_STEPS) {
      setCurrentStep(prev => prev + 1)
    } else {
      setCurrentStep(0)
      setValues([])
      setKey(prevKey => prevKey + 1)
    }
  }

  const incrementStepSize = () => {
    setStepSize(prev => Math.min(prev + 1, MAX_STEP_SIZE))
  }

  const decrementStepSize = () => {
    setStepSize(prev => Math.max(prev - 1, 1))
  }

  return (
    <div className="min-h-screen bg-gray-900 text-cyan-300 font-mono p-8 flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full max-w-4xl bg-gray-800 p-8 rounded-lg shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-800 to-blue-900 opacity-50 animate-pulse" />
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-8 text-center text-cyan-400 drop-shadow-glow">Cyberpunk Progressive Step Visualizer</h1>
          <div className="grid grid-cols-[auto,1fr] gap-8 mb-10">
            <div className="flex flex-col items-center">
              <label htmlFor="stepSize" className="block text-sm font-medium mb-2">
                Step Size
              </label>
              <div className="flex items-center">
                <Button
                  onClick={decrementStepSize}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white p-2 rounded-l focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <ChevronDown className="w-6 h-6" />
                </Button>
                <div className="w-16 h-16 bg-gray-700 flex items-center justify-center text-3xl font-bold border-t-2 border-b-2 border-cyan-400">
                  {stepSize}
                </div>
                <Button
                  onClick={incrementStepSize}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white p-2 rounded-r focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <ChevronUp className="w-6 h-6" />
                </Button>
              </div>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={incrementStep}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
              >
                {currentStep < MAX_STEPS ? `Next Step (${currentStep}/${MAX_STEPS})` : 'Reset'}
              </Button>
            </div>
          </div>
          <div className="relative h-16 mb-2">
            <AnimatePresence key={key}>
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="absolute text-center"
                  style={{
                    left: `calc(${((index + 0.5) / MAX_STEPS) * 100}% - 1.5ch)`,
                    transform: 'translateX(-50%)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-lg font-bold text-cyan-400 drop-shadow-glow">
                    {stepSize} × {index + 1}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="relative h-2 bg-gray-700 rounded-full mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
            <AnimatePresence key={key}>
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="absolute top-1/2 w-4 h-4 bg-cyan-300 rounded-full shadow-glow"
                  style={{
                    left: `${((index + 0.5) / MAX_STEPS) * 100}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                />
              ))}
            </AnimatePresence>
          </div>
          <div className="relative h-20">
            <AnimatePresence key={key}>
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="absolute text-center"
                  style={{
                    left: `${((index + 0.5) / MAX_STEPS) * 100}%`,
                    transform: 'translateX(-50%)',
                  }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-lg font-bold text-cyan-400 drop-shadow-glow">{value}</div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}