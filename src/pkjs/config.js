module.exports = [{
        "type": "heading",
        "defaultValue": "Cupertino Configuration"
    },
    {
        "type": "text",
        "defaultValue": "Created by John Spahr (johnspahr.org)"
    },
    {
        "type": "section",
        "items": [{
                "type": "heading",
                "defaultValue": "Colors"
            },
            {
                "type": "color",
                "messageKey": "backgroundColor",
                "defaultValue": "0x000000",
                "label": "Background"
            },
            {
                "type": "color",
                "messageKey": "foregroundColor",
                "defaultValue": "0xFFFFFF",
                "label": "Foreground"
            },
            {
                "type": "color",
                "messageKey": "orbColor",
                "defaultValue": "0xFFFFFF",
                "label": "Orb"
            },
            {
                "type": "color",
                "messageKey": "minuteColor",
                "defaultValue": "0xFFFFFF",
                "label": "Minute Hand"
            },
            {
                "type": "color",
                "messageKey": "hourColor",
                "defaultValue": "0xAAAAAA",
                "label": "Hour Hand"
            }
        ]
    },
    {
        "type": "section",
        "items": [{
                "type": "heading",
                "defaultValue": "Date"
            },
            {
                "type": "toggle",
                "messageKey": "showDate",
                "label": "Show Date",
                "defaultValue": true
            },
            {
                "type": "toggle",
                "messageKey": "usDate",
                "label": "US Date Format",
                "defaultValue": true
            }
        ]
    },
    {
        "type": "section",
        "items": [{
                "type": "heading",
                "defaultValue": "Other"
            },
            {
                "type": "toggle",
                "messageKey": "showLogo",
                "label": "Show Logo",
                "defaultValue": true
            }
        ]
    },
    {
        "type": "text",
        "defaultValue": "Changes will apply on next screen redraw."
    },
    {
        "type": "submit",
        "defaultValue": "Save Settings"
    }
];