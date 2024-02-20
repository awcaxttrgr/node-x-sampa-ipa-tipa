# x-sampa-ipa-tipa

X-SAMPA, IPA and tipa converter.
This is a fork of the ```x-sampa-ipa``` package by André Santos <andrefs@andrefs.com>

## Install

```shell
npm i -S x-sampa-ipa-tipa
```

```js
const {xsampa2ipa, ipa2xsampa} = require('x-sampa-ipa-tipa');
```

## API

### xsampa2ipa

Converts a string from X-SAMPA to IPA.

```js
xsampa2ipa('m6d6j46'); // 'mɐdɐjɾɐ'
```

### ipa2xsampa

Converts a string from IPA to X-SAMPA.

```js
ipa2xsampa('mɐkˈabɾu'); // 'm6k"ab4u'
```

### ipa2tipa

Converts a string from IPA to tipa.

```js
ipa2tipa('mɐkˈabɾu'); // 'm5k"abRu'
```

### xsampa2tipa

Converts a string from X-SAMPA to tipa.

```js
xsampa2tipa('m6d6j46'); // 'm5d5jR5'
```

### tipa2xsampa

Converts a string from tipa to X-SAMPA.
(To be implemented)

```js
tipa2xsampa('m5k"abRu'); // Doesn't work
```

### tipa2ipa

Converts a string from tipa to IPA.
(To be implemented)

```js
tipa2ipa('m5d5jR5'); //  Doesn't work
```

## Bugs and stuff

Axtträger: This is a quick modification of the original code for my own purposes. If anything, I will not fix any bugs or take pull requests for this fork, unless I too need the same thing fixed.

AS: Open a GitHub issue or, preferably, send me a pull request.

### Known issues

* Tie bars (double affrication/affricate) in IPA (unicode) cannot be converted to tipa properly.

## License

Derivative work by 2024 A Axtträger

The MIT License (MIT)

Copyright (c) 2020 André Santos <andrefs@andrefs.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
