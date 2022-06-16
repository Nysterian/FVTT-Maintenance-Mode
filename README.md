# MaintenanceMode
Adds a button to the player list that stops players from connecting while the GM is planning their game.

![](https://i.imgur.com/LIUa6A2.png) | ![](https://i.imgur.com/ZzJ7taW.png)
:----:|:----:
Maintenance Off / Players can connect | Maintenance On / Players cannot connect

### Extra Options
* List players that should never get locked out during maintenance mode. `TODO`

## Installation
* In your Foundry Configuration and Setup screen, select `Add-on Modules`
* On the lower left corner, click `Install Module`
* On the lower side of the new window, look for the text box labeled `Manifest URL`
* Paste `https://github.com/Nysterian/FVTT-Maintenance-Mode/releases/latest/download/module.json` into the text box, then press `Install`
* Open your game, go to your `Game Settings` tab, select `Manage Modules` and enable the `Maintenance Mode` module
* The game will refresh, and the new button will appear next to your player list. Simply press it to toggle it on or off

## How does it work?
Since modules cannot interact with the program outside of the game, this module achieves this by banning all the players created within that game.
It first saves each player's role, then bans all of them except GMs, then when maintenance mode is over, it restores everyone's role, allowing them to connect again.

With that said, it is possible to re-allow a single player in your game while maintenance mode is on by right clicking their name on the player list and un-banning them. I thought about stopping that feature during maintenance mode, but I thought the flexibility of temporarily allowing someone to connect might be handy in certain occasions, so I left it in.
