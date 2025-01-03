(async (
    autotype = true,
    selfOnly = false,
    lang = "en",
    min = 1,
    max = Infinity,
    instant = true,
    pause = 150,
    initialPause = 0,
    messup = true // New option for messing up the word
) => {
    lang = lang.toLowerCase().trim();

    // constants
    const api = `https://ilovefemboys.gay/a94.json`;
    const supportedLanguages = ["en", "es", "it", "fr", "de"];
    const logFontSize = "font-size:16px;";
    const logStyles = {
        error: "color:crimson;" + logFontSize,
        success: "color:cyan;" + logFontSize,
        word: "color:green;" + logFontSize,
        myWord: "color:lime;" + logFontSize,
    };

    // elements
    const syllable = document.querySelector(".syllable");
    const selfTurn = document.querySelector(".selfTurn");
    const seating = document.querySelector(".bottom .seating");
    const input = document.querySelector(".selfTurn input");

    // variables
    let library;
    let word;
    let myTurn = false;

    // welcome logs
    console.log(
        "%cWelcome to jklm.fun BombParty cheat script",
        logStyles.success
    );
    console.log("%cBy MoBakour: https://bakour.dev", logStyles.success);
    console.log(
        "%cGithub repo: https://github.com/MoBakour/jklm-bombparty-cheat",
        logStyles.success
    );

    // validate options & environment
    let error;

    if (!syllable || !selfTurn)
        error =
            "incorrect javascript context, please switch to 'bombparty/' javascript context. Read the usage guide.";

    if (!supportedLanguages.includes(lang))
        error = `supported languages are: ${supportedLanguages.join(", ")}`;

    if (isNaN(min) || isNaN(max) || min < 1 || max < 1)
        error = "min and max values must be numerical values greater than 0";

    if (max < min) error = "max cannot be less than min";

    if (isNaN(pause)) error = "pause must be a number";

    if (isNaN(initialPause)) error = "initialPause must be a number";

    if (error) {
        console.log(`%cError: ${error}`, logStyles.error);
        return;
    }

    /**
     * fetch library
     * filter for min and max lengths
     * shuffle words
     */
    try {
        library = await (await fetch(api)).json();
        library = library.filter((el) => el.length >= min && el.length <= max);
        library = shuffle(library);

        console.log("%cLibrary loaded 👍", logStyles.success);
    } catch (err) {
        console.log(
            "%cError: couldn't load words library! :(",
            logStyles.error
        );
        return;
    }

    /**
     * observer to detect changes in the .selfTurn and .seating elements attributes
     * we check the .seating element for `hidden` to make sure the game is started
     *
     * when own turn comes, a `hidden` attribute is removed from the .selfTurn element
     * we check that to determine whether its own turn
     */
    const observer = new MutationObserver(() => {
        if (seating.getAttribute("hidden") === null) return;

        myTurn = selfTurn.getAttribute("hidden") === null;
        cheat();
    });

    observer.observe(selfTurn, {
        attributes: true,
    });

    observer.observe(seating, {
        attributes: true,
    });

    /**
     * An asynchronous function to stop the code for a specified amount of time
     * @param {number} time - pause duration in milliseconds
     * @returns {Promise}
     */
    function sleep(time) {
        return new Promise((res) => {
            setTimeout(res, time);
        });
    }

    /**
     * Function to shuffle array using the fisher-yates algorithm
     * @param {Array} array - Array to shuffle
     * @returns {Array}
     */
    function shuffle(array) {
        const arr = JSON.parse(JSON.stringify(array));
        let currentIndex = arr.length,
            randomIndex;

        // while there remain elements to shuffle
        while (currentIndex > 0) {
            // pick a remaining element
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // and swap it with the current element
            [arr[currentIndex], arr[randomIndex]] = [
                arr[randomIndex],
                arr[currentIndex],
            ];
        }

        return arr;
    }

    /**
     * Function to shuffle the word with random characters if "messup" is enabled
     * and ensure the final word is exactly 29 characters long.
     * @param {string} word - The word to mess up
     * @returns {string} - The word with random characters added and length equal to 29
     */
    function messUpWord(word) {
        const randomChars = "асеցһіјꓲոорզѕսνԝху";
        let messedUpWord = word.split(""); // Split word into an array of characters

        // Insert random characters at random positions until the word length is 29
        while (messedUpWord.length < 29) {
            const randomChar = randomChars.charAt(Math.floor(Math.random() * randomChars.length));
            const randomPos = Math.floor(Math.random() * (messedUpWord.length + 1));
            messedUpWord.splice(randomPos, 0, randomChar); // Insert random character at random position
        }

        // If the word is too long, truncate it to 29 characters
        if (messedUpWord.length > 29) {
            messedUpWord = messedUpWord.slice(0, 29);
        }

        return messedUpWord.join(""); // Join the array back into a string
    }

    /**
     * Function to type a word into the input letter by letter with a pause in between to make it more human-like
     * @param {string} word - A string of letters to type
     * @param {boolean} [triggered] - A boolean to distinguish between observer's call and user's control keydown call
     */
    async function typeLetters(word, triggered) {
        // initial pause
        if (!triggered) {
            await sleep(initialPause);
        }

        // If messup is true, mess up the word before typing it
        if (messup) {
            word = messUpWord(word);
            console.log(`%cMessed-up word (29 characters): ${word}`, logStyles.myWord);
        }

        for (const char of word) {
            input.value = input.value + char;
            input.dispatchEvent(new Event("input", { bubbles: true }));

            // add margin in time to make it appear more human
            const margin = Math.random() * pause - pause / 2;
            await sleep(pause + margin);
        }
    }

    /**
     * Cheat function
     */
    async function cheat() {
        if (!library || !myTurn) return;

        const letters = syllable.innerText.toLowerCase();
        word = library.find((el) => el.toLowerCase().includes(letters));

        if (!word) {
            console.log("%cError: failed to find a word ;-;", logStyles.error);
            return;
        }

        console.log(`%c${word}`, logStyles.myWord);

        if (autotype && myTurn) {
            if (instant) {
                // If instant, mess up the word first and insert it directly
                if (messup) {
                    word = messUpWord(word);
                    console.log(`%cMessed-up word (29 characters): ${word}`, logStyles.myWord);
                }
                input.value = word;
            } else {
                await typeLetters(word, false);
            }

            // select input text so user has the immediate option to overwrite
            input.select();
        }

        // shuffle library after every cheat to prevent reuse of words
        library = shuffle(library);
    }

    /**
     * Function to fetch a new word with the same syllable
     */
    async function fetchNewWord() {
        if (!syllable || !library) return;

        const letters = syllable.innerText.toLowerCase();
        word = library.find((el) => el.toLowerCase().includes(letters));

        if (!word) {
            console.log("%cError: failed to find a new word ;-;", logStyles.error);
            return;
        }

        console.log(`%cNew word fetched: ${word}`, logStyles.word);
        input.value = word;
        input.select();
    }

    // trigger fetchNewWord on control keydown
    window.addEventListener("keydown", (e) => {
        if (e.key === "Control") {
            fetchNewWord();
        }
    });
})();
