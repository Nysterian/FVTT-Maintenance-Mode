class maintMode {
    static ID = 'MaintenanceMode';
    static NAME = 'Maintenance Mode';

    static FLAGS = {
        MAINT: 'maint'
    };

    static TEMPLATES = {
        MAINT: `modules/${this.ID}/templates/todo-list.hbs`
    };

    static log(force, ...args) {
        const shouldLog = force || game.modules.get('_dev-mode')?.api?.getPackageDebugValue(this.ID);

        if (shouldLog) {
            console.log('%c'+this.NAME, '|', ...args);
        }
    }
}

Hooks.once('devModeReady', ({ registerPackageDebugFlag }) => {
    registerPackageDebugFlag(maintMode.ID);
});

console.log(`${maintMode.NAME} | Initialised`);

//maintMode.log(false, maintMode.TEMPLATES.MAINT)