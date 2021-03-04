'use strict';

function arrayDiff(arrayFirst, arraySecond) {
    let resultDiff = [];

    for(let item = 0; item < arrayFirst.length; item++) {
        if (!arraySecond.includes(arrayFirst[item])) {
            resultDiff.push(arrayFirst[item]);
        }
    }

    // Исключение дубликатов
    resultDiff = [...new Set(resultDiff)];

    return resultDiff;
}

function alphabetPosition(text) {
    const ENGLISH_UTF_MIN = 97;
    const ENGLISH_UTF_MAX = 122;
    const ENGLISH_UTF_RANGE = 96;

    if (typeof(text) === "string") {

        let result = [];

        text = text.replace(/\s+/g, '').toLowerCase().split('');
        
        for (let index = 0; index < text.length; index++) {
            if (text[index].charCodeAt() >= ENGLISH_UTF_MIN && text[index].charCodeAt() <= ENGLISH_UTF_MAX) {
                result.push(text[index].charCodeAt() - ENGLISH_UTF_RANGE);
            } else {
                continue;
            }
        }

        result = result.join(" ");

        return result;

    } else {
        return false;
    }
}

function squareEveryDigit(digit) {
    if (typeof(digit) !== "number") {
        return "Вы ввели не число!";
    } else if (digit < 0) {
        digit = -digit;
    }
    
    let digitArray = String(digit).split("");

    for (let index = 0; index < digitArray.length; index++) {
        digitArray[index] = Number(digitArray[index]) ** 2;
    }

    let digitResult = digitArray.join("");

    return digitResult;
}