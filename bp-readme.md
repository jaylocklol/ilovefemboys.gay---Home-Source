# AutoType Bot Configuration Guide 🎯🎉🛠️

This document provides an overview of the configuration options for the AutoType bot. Each setting is explained below: 📖🧩✅

## Configuration Options 🎛️📦⚙️

### autotype
**Type:** Boolean (true/false)  
**Description:** Determines if words will be automatically typed. ✍️💡📡
- If `true`: Words will be automatically typed (or instantly pasted if `instant = true`).
- If `false`: Words will need to be typed manually by reading from the console.

**Note:** Words will be automatically typed, but you still need to press enter. 📝🔑✅

---

### selfOnly
**Type:** Boolean (true/false)  
**Description:** Controls console logging behavior. 🖥️👤📊
- If `true`: Prints word suggestions for everyone.
- If `false`: Only prints the words you need to type.

**Note:** Useful for assisting other people with typing tasks. 🧑‍🤝‍🧑🛠️💬

---

### lang
**Type:** String ("en")  
**Description:** Deprecated feature for selecting wordlists. Recommended to leave it as `en` to avoid issues. 🗃️❗📚

---

### min / max
**Type:** Number  
**Description:** Specifies word length constraints. 📏🔢📐
- `min`: Minimum word length.
- `max`: Maximum word length (set to `Infinity` for no limit).

---

### instant
**Type:** Boolean (true/false)  
**Description:** Determines if words should be typed instantly or progressively. ⚡🖋️⏳
- If `true`: Words are instantly pasted.
- If `false`: Words are typed letter by letter.

---

### pause / difference / initialPause
**Type:** Number (milliseconds)  
**Description:** Timing controls for progressive typing. ⏰🕰️📈
- `pause`: Delay between each letter (in ms).
- `difference`: Adds randomness to the delay (`pause ± difference`).
- `initialPause`: Delay before typing the word starts.

**Note:** These settings are ignored if `instant = true`. 🛠️⏳✅

---

### messup / messupCharacters
**Type:** Boolean / String  
**Description:** Adds random characters for a more human-like error effect. 🎭🎲🔀
- `messup`: Enables or disables random character insertion.
- `messupCharacters`: Specifies characters for the mess-up effect.

**Restricted Characters:**
- `qwertyuioplkjhgfdsazxcvbnm'-`

**Allowed Characters:**
- Any other Unicode characters, numbers, or symbols can be used. 🔡🧩✅

---

### priority
**Type:** String ("normal:control")  
**Description:** Controls word priority for typing tasks. 📊🎚️🔀
- `0`: Any word length.
- `1`: Long words.
- `2`: Short words.

**Format:** `normal:control`  
- `normal`: Priority when the bot starts typing.
- `control`: Priority when the control key is pressed.

**Example:** `0:2` means it starts with any word length but switches to shorter words when control is pressed. 🎛️🔡✅

---

## License 📜🔓✅
This project is licensed under the MIT License. 🎉📄🛡️

