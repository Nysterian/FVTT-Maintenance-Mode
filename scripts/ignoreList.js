/**
 * Class for the Form which stores the Ignore List
 */
class ignoreListAppClass extends FormApplication {
    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            title: "Ignore List",
            height: 500,
            width: 450,
            template: maintMode.TEMPLATES.IGNORE,
            closeOnSubmit: false,
            submitOnClose: true,
            submitOnChange: true,
            resizable: true
        });
    }

    constructor() {
        super();
        maintMode.log(false, "Ignore List rendered.");
    }

    //Data for template Handlebars
    getData() {
        return { users: game.settings.get(maintMode.ID, 'ignoreList') };
    }

    //Update the saved settings with the submitted data
    _updateObject(event, formData) {

        let data = game.settings.get(maintMode.ID, 'ignoreList');
        for (const [userID, state] of Object.entries(formData)) {
            data[userID].ignore = state;
        }
        
        game.settings.set(maintMode.ID, 'ignoreList', data);
        maintMode.log(false, "Updated ignore list.", game.settings.get(maintMode.ID, 'ignoreList'))
    }
}

/**
 * Initiate the ignore list if it hasn't been yet
 */
Hooks.on('ready', () => {
    if (Object.keys(game.settings.get(maintMode.ID, 'ignoreList')).length == 0) {
        maintMode.log(false, "Generating ignore list.");
        let userList = {};

        game.users.forEach(user => {

            if (!user.isGM) {
                userList[user.id] = {
                    name: user.name,
                    ignore: false
                };
            };

        });

        game.settings.set(maintMode.ID, 'ignoreList', userList);
    }
    else maintMode.log(false, "Ignore list loaded.", game.settings.get(maintMode.ID, 'ignoreList'));
});