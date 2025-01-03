const profiles = {
    sweatyPlayer: {
        autotype: true,
        selfOnly: false,
        lang: "en",
        min: 1,
        max: Infinity,
        instant: false,
        pause: 75,
        initialPause: 250,
        messup: false
    },
    decentPlayer: {
        autotype: true,
        selfOnly: false,
        lang: "en",
        min: 1,
        max: Infinity,
        instant: false,
        pause: 150,
        initialPause: 500,
        messup: false
    },
    femboyHacker: {
        autotype: true,
        selfOnly: false,
        lang: "en",
        min: 1,
        max: Infinity,
        instant: true,
        pause: 75,
        initialPause: 250,
        messup: true
    },
    autoDubs: {
        autotype: true,
        selfOnly: false,
        lang: "en",
        min: 1,
        max: Infinity,
        instant: true,
        pause: 75,
        initialPause: 250,
        messup: false
    }
};

function modifyCode(profileName, code) {
    const profile = profiles[profileName];
    return code
        .replace("autotype = true,", `autotype = ${profile.autotype},`)
        .replace("selfOnly = false,", `selfOnly = ${profile.selfOnly},`)
        .replace('lang = "en",', `lang = "${profile.lang}",`)
        .replace("min = 1,", `min = ${profile.min},`)
        .replace("max = Infinity,", `max = ${profile.max},`)
        .replace("instant = false,", `instant = ${profile.instant},`)
        .replace("pause = 75,", `pause = ${profile.pause},`)
        .replace("initialPause = 250,", `initialPause = ${profile.initialPause},`)
        .replace("messup = false", `messup = ${profile.messup}`);
}

async function fetchSetupCode() {
    const response = await fetch('setup.js');
    const setupCode = await response.text();
    return setupCode;
}

document.getElementById("copyButton").addEventListener("click", async () => {
    const selectedProfile = document.getElementById("playerSelect").value;
    const originalCode = await fetchSetupCode();
    const modifiedCode = modifyCode(selectedProfile, originalCode);
    
    // Show the modified code in the <pre> element
    document.getElementById("generatedCode").textContent = modifiedCode;

    // Copy to clipboard logic
    const textArea = document.createElement("textarea");
    textArea.value = modifiedCode;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    alert("Code copied to clipboard!");
});
