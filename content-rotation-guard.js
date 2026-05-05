const fs = require('fs');
const path = require('path');

const STATE_FILE = path.resolve(__dirname, 'content-state.json');

// load or initialize state
let state = { used: {} };

if (fs.existsSync(STATE_FILE)) {
    state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
}

// helper: key generator
function key(city, topic) {
    return `${city.toLowerCase()}::${topic.toLowerCase()}`;
}

// check if combo was used recently
function isUsed(city, topic) {
    const k = key(city, topic);
    return state.used[k];
}

// mark combo as used
function markUsed(city, topic) {
    const k = key(city, topic);
    state.used[k] = Date.now();
}

// cleanup old entries (30-day rolling window)
function cleanup() {
    const now = Date.now();
    const THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30;

    for (let k in state.used) {
        if (now - state.used[k] > THIRTY_DAYS) {
            delete state.used[k];
        }
    }
}

// save state
function save() {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

module.exports = {
    isUsed,
    markUsed,
    cleanup,
    save
};
