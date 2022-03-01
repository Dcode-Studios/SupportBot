import { ApplicationCommandData, ApplicationCommandOptionData } from "discord.js";

const botCommands:ApplicationCommandOptionData[] = [
    {
        "type": 1,
        "name": "pull",
        "description": "Run Git Pull (1)"
    },
    {
        "type": 1,
        "name": "build",
        "description": "Build Bot (2)"
    },
    {
        "type": 1,
        "name": "kill",
        "description": "Kill Bot (3)"
    }
];

const ticketCommands:ApplicationCommandOptionData[] = [
    {
        "type": 1,
        "name": "create",
        "description": "Open a thread to get you support",
        "options": [
            {
                "type": 3,
                "name": "topic",
                "description": "Short description (1-90) characters",
                "required": true
            },
            {
                "type": 5,
                "name": "private",
                "description": "Ticket where only staff may reply"
            }
        ]
    },
    {
        "type": 1,
        "name": "setup",
        "description": "Setup message to open a ticket"
    },
    {
        "type": 1,
        "name": "prompt",
        "description": "Give prompt to close a ticket",
        "options": [
            {
                "type": 6,
                "name": "user",
                "description": "User to prompt",
                "required": true
            }
        ]
    },
    {
        "type": 1,
        "name": "close",
        "description": "Close a ticket",
        "options": [
            {
                "type": 6,
                "name": "user",
                "description": "(Staff only) User to close ticket for",
                "required": false
            }
        ]
    }
];

const modCommands:ApplicationCommandOptionData[] = [
    {
        "type": 1,
        "name": "warn",
        "description": "Issue a warning to a user",
        "options": [
            {
                "type": 6,
                "name": "user",
                "description": "User to issue warning to",
                "required": true
            },
            {
                "type": 3,
                "name": "reason",
                "description": "Reason for issuing warning (Sent to user)",
                "required": true
            }
        ]
    },
    {
        "type":1,
        "name":"deletewarn",
        "description": "Delete warn from a user's log",
        "options": [
            {
                "type": 6,
                "name": "user",
                "description": "User",
                "required": true
            },
            {
                "type": "NUMBER",
                "name": "warn_number",
                "description": "Warn number",
                "required": true
            }
        ]
    },
    {
        "type": 1,
        "name": "log",
        "description": "Infractions/Notes the user has (if any)",
        "options": [
            {
                "type": 6,
                "name": "user",
                "description": "User to view",
                "required": true
            }
        ]
    },
    {
        "type": 1,
        "name": "note",
        "description": "Issue a note to a user",
        "options": [
            {
                "type": 6,
                "name": "user",
                "description": "User to issue a note to",
                "required": true
            },
            {
                "type": 3,
                "name": "text",
                "description": "The note",
                "required": true
            }
        ]
    },
    {
        "type": 1,
        "name": "info",
        "description": "View info about a user",
        "options": [
            {
                "type": 6,
                "name": "user",
                "description": "User to view info about",
                "required": true
            }
        ]
    },
    {
        "type": 1,
        "name": "kick",
        "description": "Kick a user from the server",
        "options": [
            {
                "type": 6,
                "name": "user",
                "description": "User",
                "required": true
            },
            {
                "type": 3,
                "name": "reason",
                "description": "Reason (Sent to user)",
                "required": true
            }
        ]
    },
    {
        "type": 1,
        "name": "ban",
        "description": "Ban a user from the server",
        "options": [
            {
                "type": 6,
                "name": "user",
                "description": "User",
                "required": true
            },
            {
                "type": 3,
                "name": "reason",
                "description": "Reason (Sent to user)",
                "required": true
            }
        ]
    },
    {
        "type": "SUB_COMMAND",
        "name": "purge",
        "description": "Purge messages",
        "options": [
            {
                "type": "NUMBER",
                "name": "amount",
                "description": "Amount to delete (1-99)",
                "required": true
            }
        ]
    }
];

const utilityCommands:ApplicationCommandOptionData[] = [
    {
        "type": 1,
        "name": "speak",
        "description": "Send a message as the bot",
        "options": [
            {
                "type": 3,
                "name": "text",
                "description": "Message text",
                "required": true
            }
        ]
    }
];

const commands:ApplicationCommandData[] = [
    // CTX
    {
        "type": 3,
        "name": "Quote Message",
        "defaultPermission": true
    },

    // Slash Commands
    {
        "type": 1,
        "name": "bot",
        "description": "Commands related to running the bot",
        "options": [
            ...botCommands
        ],
        "defaultPermission": true
    },
    {
        "type": 1,
        "name": "utility",
        "description": "Commands related utility",
        "options": [
            ...utilityCommands
        ],
        "defaultPermission": true
    },
    {
        "type": 1,
        "name": "tickets",
        "description": "Commands related to tickets",
        "options": [
            ...ticketCommands
        ],
        "defaultPermission": true
    },
    {
        "type": 1,
        "name": "mod",
        "description": "Commands related to actions for server staff",
        "options": [
            ...modCommands
        ],
        "defaultPermission": true
    }
]

export default commands;