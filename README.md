# InputGame

Web interface that propose to test you knowledge in servral game.

## How to propose a new game

TL;DR To suggest a new game, simply open an [issue] with the `[game]` prefix.

### Options

Propose a new game by providing a new JSON file. The initial object (`options`) is crucial for configuring the game mode, and should include:

-   **title:** The game title (mandatory).
-   **case-sensitive:** [true|false] indicating if answers are case-sensitive.
-   **answers-sort:** [asc|desc|a-z|z-a] determining the sorting order of answered words.
-   **timer:** [true|false] indicating whether the game displays a timer.
-   **timer-value:** The timer value in seconds.
-   **type:** Arrays of `select` and `all` types, enabling a broader range of acceptable answers.

Please note:

-   Some of these options are optional.
-   If set, these options can be changed in the game settings.

### Data

The actual list of entries of the game. Specify the following for each entry in the game:

-   **element:** The word to be typed.
-   **url:** The link to the image displayed on the card must be `700` and `438` pixels long.
-   **description:** The description shown in the card.
-   **type:** The type (refer to options) to which the entry belongs.

### Examples

Please check [html.json] or [pets.json].

### Add the game to the home page

Finally, make sure to modify the [options.json] file to incorporate the new game. Additionally, you'll need to supply an image that visually represents the game and will be featured on the game's card on the homepage.

## How to contribute

Please read [CONTRIBUTING.md].

[issue]: https://github.com/dwesh163/InputGame/issues/
[CONTRIBUTING.md]: ./CONTRIBUTING.md
[html.json]: ./public/data/html.json
[pets.json]: ./public/data/pets.json
[options.json]: ./public/data/options.json
