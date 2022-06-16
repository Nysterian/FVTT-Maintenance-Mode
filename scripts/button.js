/**
 * Adds a button to the player list
 */
Hooks.on('renderPlayerList', (playerList, [html]) => {
    // Create localized tooltip
    const tooltip = game.i18n.localize('MAINTENANCE-MODE.button-title');

    // Insert a button at the end of the header
    const newBtn = document.createElement('button');

    newBtn.className = 'maint-mode-icon-button';
    newBtn.title = tooltip;

    const btnIcon = document.createElement('i');
    btnIcon.className = 'fas fa-dice';
    if (game.settings.get(maintMode.ID, 'maintMode')) {
        btnIcon.className = 'fas fa-hammer';
    }
    newBtn.appendChild(btnIcon);

    newBtn.addEventListener("click", event => {
        // Toggle current mode
        let prevSetting = game.settings.get(maintMode.ID, 'maintMode');
        game.settings.set(maintMode.ID, 'maintMode', !prevSetting);

        // Returns game to original state
        if (prevSetting) {
            maintMode.log(false, "Maintenance Mode OFF!")

            let prevUsers = JSON.parse(game.settings.get(maintMode.ID, 'prevRoles'));
            game.users.forEach(user => {

                if (!user.isGM) {
                    user.update({ role: prevUsers.find(a => a._id == user.id).role })
                }

            });

        }
        // Saves current state and bans all users
        else {
            maintMode.log(false, "Maintenance Mode ON!")

            game.settings.set(maintMode.ID, 'prevRoles', JSON.stringify(game.users));
            game.users.forEach(user => {

                if (!user.isGM) {
                    user.update({ role: 0 })
                }

            });

        }
    });

    if (game.user.isGM) html.prepend(newBtn);
});

