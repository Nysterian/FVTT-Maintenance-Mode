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
        IGNORE: `modules/${this.ID}/templates/ignoreList.html`
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
maintMode.log(true, 'Initialised!')

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
    game.settings.register(maintMode.ID, 'state', {
        name: 'Maintenance Mode State',
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

    game.settings.registerMenu(maintMode.ID, "ignoreListMenu", {
        label: "Ignore List",
        icon: "fas fa-bars",
        type: ignoreListAppClass,
        restricted: true
    });
    game.settings.register(maintMode.ID, 'ignoreList', {
        name: 'Ignore List',
        hint: 'List of players that can still connect during maintenance mode',
        scope: 'world',
        config: false,
        type: Object,
        default: {}
    });
})