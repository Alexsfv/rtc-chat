type Subscriber = (eventName: string, callback: Function) => boolean
interface Listeners {
    [key: string]: Function[]
}

interface IObserver {
    listeners: Listeners
    $subscribe: Subscriber
    $unsubscribe: Subscriber
    $emit: (eventName: string, payload?: any) => boolean
}

export class Observer implements IObserver {
    listeners = {} as Listeners

    $subscribe(eventName: string, callback: Function) {
        const listeners = this.listeners[eventName]
        if (!listeners) {
            this.listeners[eventName] = []
        }
        this.listeners[eventName].push(callback)
        return true
    }

    $unsubscribe(eventName: string, callback: Function) {
        const listeners = this.listeners[eventName]
        if (!listeners) return false;
        const newListeners = listeners.filter(cb => cb !== callback)
        this.listeners[eventName] = newListeners
        return true
    }

    $emit(eventName: string, payload?: any) {
        const listeners = this.listeners[eventName]
        if (!listeners || !listeners.length) return false;
        this.listeners[eventName].forEach(cb => cb(payload))
        return true
    }
}