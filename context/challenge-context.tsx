"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface ChallengeContextType {
  balance: number
  isChallengeModeActive: boolean
  updateBalance: (amount: number) => void
  setChallengeModeActive: (active: boolean) => void
}

const ChallengeContext = createContext<ChallengeContextType | undefined>(undefined)

export function ChallengeProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useState(10)
  const [isChallengeModeActive, setChallengeModeActive] = useState(false)

  const updateBalance = (amount: number) => {
    setBalance((prev) => prev + amount)
  }

  return (
    <ChallengeContext.Provider
      value={{
        balance,
        isChallengeModeActive,
        updateBalance,
        setChallengeModeActive,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  )
}

export function useChallenge() {
  const context = useContext(ChallengeContext)
  if (context === undefined) {
    throw new Error("useChallenge must be used within a ChallengeProvider")
  }
  return context
}
