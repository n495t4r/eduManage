"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"

type ToastVariant = "default" | "destructive" | "success" | "warning" | "info"

export interface Toast {
  id: string
  title?: string
  description?: string
  variant?: ToastVariant
  duration?: number
  action?: React.ReactNode
  onDismiss?: () => void
}

interface ToastOptions {
  title?: string
  description?: string
  variant?: ToastVariant
  duration?: number
  action?: React.ReactNode
  onDismiss?: () => void
}

interface ToastContextType {
  toasts: Toast[]
  toast: (options: ToastOptions) => void
  dismiss: (id: string) => void
  dismissAll: () => void
}

// Default duration for toasts in milliseconds
const DEFAULT_DURATION = 5000

// Create a unique ID for each toast
const createId = (): string => {
  return Math.random().toString(36).substring(2, 9)
}

// Global state for toasts to ensure they persist across components
let toasts: Toast[] = []
let listeners: ((toasts: Toast[]) => void)[] = []

const emitChange = () => {
  listeners.forEach((listener) => {
    listener(toasts)
  })
}

export function useToast(): ToastContextType {
  const [currentToasts, setCurrentToasts] = useState<Toast[]>(toasts)

  useEffect(() => {
    // Subscribe to toast changes
    listeners.push(setCurrentToasts)
    return () => {
      listeners = listeners.filter((listener) => listener !== setCurrentToasts)
    }
  }, [])

  const toast = useCallback((options: ToastOptions) => {
    const id = createId()
    const newToast: Toast = {
      id,
      title: options.title,
      description: options.description,
      variant: options.variant || "default",
      duration: options.duration || DEFAULT_DURATION,
      action: options.action,
      onDismiss: options.onDismiss,
    }

    toasts = [...toasts, newToast]
    emitChange()

    // Auto-dismiss after duration
    if (newToast.duration !== Number.POSITIVE_INFINITY) {
      setTimeout(() => {
        dismiss(id)
      }, newToast.duration)
    }

    return id
  }, [])

  const dismiss = useCallback((id: string) => {
    const toast = toasts.find((t) => t.id === id)
    if (toast?.onDismiss) {
      toast.onDismiss()
    }

    toasts = toasts.filter((t) => t.id !== id)
    emitChange()
  }, [])

  const dismissAll = useCallback(() => {
    toasts.forEach((toast) => {
      if (toast.onDismiss) {
        toast.onDismiss()
      }
    })

    toasts = []
    emitChange()
  }, [])

  return {
    toasts: currentToasts,
    toast,
    dismiss,
    dismissAll,
  }
}

