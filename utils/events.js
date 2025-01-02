export const vizEvents = {

    listeners: {},

    async emit(event, data) 
    {
        if(this.listeners[event]) 
        {
            const promises = this.listeners[event].map(callback => callback(data));
            await Promise.all(promises);
        }
    },

    on(event, callback)
    {
        if(!this.listeners[event])
        {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    },

    off(event, callback) {
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event]
                .filter(cb => cb !== callback);
        }
    }

};