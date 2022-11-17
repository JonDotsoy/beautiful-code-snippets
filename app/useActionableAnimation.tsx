import { useState, useCallback, useEffect } from "react";


export const useActionableAnimation = (timeout: number = 500): { actived: boolean; action: () => void; } => {
    const [timers, setTimers] = useState<NodeJS.Timer[]>([])

    const unsubscribe = useCallback(() => {
        timers.map(timer => clearTimeout(timer))
    }, [timers])

    useEffect(() => () => unsubscribe(), [])

    const action = useCallback(() => {
        const cb = () => setTimers(timers => timers.filter(timerStored => timerStored !== timer))
        const timer = setTimeout(cb, timeout)
        setTimers(timers => [...timers, timer])
    }, [timeout])

    return { actived: !!timers.length, action }
};
