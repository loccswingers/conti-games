
/**
 * @file options.class.js
 * @version 1.1.0
 * @license MIT License
 * Copyright 2020 Donitz
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
 * NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

export default class Options {
    static _init() {
        Options._logSameAsDefault = false;
        Options._logRedundantSet = true;
    }

    /**
     * @param {...object} [objects]
     */
    constructor() {
        for (let i = 0; i < arguments.length; i++) {
            const obj = arguments[i];

            if (obj === undefined) {
                continue;
            }

            if (!(obj instanceof Object)) {
                throw new Error('Arguments must be objects');
            }

            for (let name in obj) {
                if (obj.hasOwnProperty(name) && obj[name] !== undefined) {
                    this.set(name, obj[name]);
                }
            }
        }
    }

    has(name) {
        return this.hasOwnProperty(name);
    }

    get(name, defaultValue = undefined) {
        if (this.hasOwnProperty(name)) {
            if (Options._logSameAsDefault && this[name] === defaultValue) {
                console.debug(`Option "${name}"="${this[name]}" is the same as the default value`);
            }
            return this[name];
        }

        if (defaultValue === undefined) {
            throw new Error(`Option "${name}" does not exist and there is no default value`);
        }

        return defaultValue;
    }

    set(name, value) {
        if (Options._logRedundantSet && this.hasOwnProperty(name) && this[name] === value) {
            console.debug(`Option "${name}"="${this[name]}" is set to the same value multiple times`);
        }

        this[name] = value;
    }

    static castIfRequired(options) {
        return options instanceof Options ? options : new Options(options);
    }
}

Options._init();
