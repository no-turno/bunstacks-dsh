await Bun.write('__test__/env.json', JSON.stringify({
    "NODE_ENV": "test",
    "PORT": 3111
}, null, 2))