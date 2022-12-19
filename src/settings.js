module.exports = {
    siteTitle: '42.kiyo.ooo',
    titleSep: ' - ',
    docs: {
        '/max': {
            title: "C types bounds",
            web: true,
            helpEndpoint: "max",
            helpDesc: "The sizes, min and max of the different types in C."
        },
        '/test': {
            title: "Test file",
            web: true,
            helpEndpoint: "test",
            helpDesc: "Test file"
        },
        '/troll': {
            title: "A troll page",
            web: false,
            helpEndpoint: "troll",
            helpDesc: "A way to kindly troll your seatmate"
        },
        '/help': {
            title: "Help page",
            web: true,
            helpEndpoint: "help",
            helpDesc: "Get this current help"
        }
    },
    utils: {
        'user': {
            title: "User informations",
            web: true,
            helpEndpoint: "user/<login>",
            helpDesc: "Get all useful informations, including logtime and BH"
        },
        'checklists': {
            title: "Evaluation subjects",
            web: true,
            helpEndpoint: "checklists/<search>",
            helpDesc: "List of all evaluation subjects"
        },

        'bus86': {
            title: "Schedules for bus 86",
            web: true,
            helpEndpoint: "bus/86",
            helpDesc: "Schedules for the 86 bus [42 Lyon Specific]"
        },
    }
}
