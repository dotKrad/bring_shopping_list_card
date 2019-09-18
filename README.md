# Bring-Shopping-List-Card

**Requires a custom-component:**<br/>
This card will only work if you've installed one of the custom-component's below to feed it.<br/><br/>
Current custom-components for this card:

* [Bring_Shopping_list](https://github.com/dotKrad/hass_bring_shopping_list_component)

## Installation:

* Install the custom component by following it's instructions.
* Install this card by copying `bring-shopping-list-card.js` to your `www/custom-lovelace/` folder. If you're copy/pasting the code always copy from raw files on github (button on top right when viewing code).
* Include it in its own folder like so: `www/custom-lovelace/bring-shopping-list-card.js`

This goes into ui-lovelace.yaml under "resources:"

```
resources:
- url: /local/custom-lovelace/bring-shopping-list-card.js?v=0.0.1
  type: js
```

This goes into one of your views under "cards:" in the same file

```
  - type: custom:bring-shopping-list-card
    entity: sensor.bring_shopping_list_home
```

You may need to have `javascript_version: latest` in your `configuration.yaml` under `frontend:`.

## Options:

This card has many customization options, but none are required to use the card. The card is fully functional with minimal configuration, like the installation example above.

# Main Config:

|NAME|TYPE|DEFAULT|DESCRIPTION|
|-|-|-|-|
|type|string|**REQUIRED**|<code>**custom:bring-shopping-list-card**</code>|
|entity|string|**REQUIRED**|The entity id of the custom component. Example <code>**sensor.bring_shopping_list_home**</code> |
|title|string|optional|Title displayed at top of card.|
|item_height|number|63|Height of items to show.|
|item_width|number|90|Width of items to show.|
|purchase_color|string|#ee524f|Background color of items in the purchase list.
|recently_color|string|#4faba2|Background color of items in the recently list.
|show_recents|boolean|false|Show the recently used list.


Thanks!
