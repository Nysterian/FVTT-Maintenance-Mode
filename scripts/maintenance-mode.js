/**
 * A class which holds some constants for Maintenance Mode
 */
class maintMode {
    static ID = 'MaintenanceMode';
    static NAME = 'Maintenance Mode';

    static FLAGS = {
        MAINT: 'maint'
    };

    static TEMPLATES = {
        MAINT: `modules/${this.ID}/templates/todo-list.hbs`
    };

    /**
     * A small helper function which leverages developer mode flags to gate debug logs.
     * 
     * @param {boolean} force - forces the log even if the debug flag is not on
     * @param  {...any} args - what to log
     */
    static log(force, ...args) {
        const shouldLog = force || game.modules.get('_dev-mode')?.api?.getPackageDebugValue(this.ID);

        if (shouldLog) {
            console.log(`%c${this.NAME}` + '%c |', 'color: #dd0000;', 'color: #ff6600;', ...args);
        }
    }
}

/**
 * Logs the module initialising
 */
console.log(`%c${maintMode.NAME}` + '%c |', 'color: #dd0000;', 'color: #ff6600;', 'Initialised');

/**
 * Register our module's debug flag with developer mode's custom hook
 */
Hooks.once('devModeReady', ({ registerPackageDebugFlag }) => {
    registerPackageDebugFlag(maintMode.ID);
    
    maintMode.log(false, maintMode.NAME + ' Debugging On')
});

/**
 * Create settings to save current mode and previous banned players
 */
Hooks.on('init', () => {
    game.settings.register(maintMode.ID, 'maintMode', {
        name: 'Maintenance Mode',
        hint: 'Toggles whether maintenance mode is currently on or off.',
        scope: 'world',
        config: false,
        type: Boolean,
        default: false
    });
    game.settings.register(maintMode.ID, 'prevRoles', {
        name: 'Previous Players roles',
        hint: 'Saves what all player roles were before maintenance mode was turned on.',
        scope: 'world',
        config: false,
        type: String,
        default: '[]'
    });
})