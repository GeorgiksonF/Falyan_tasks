'use strict';

function arrayDiff(arrayFirst, arraySecond) {
    let resultDiff = [];

    for (let i = 0; i < arrayFirst.length; i++) {
        if (!arraySecond.includes(arrayFirst[i])) {
            resultDiff.push(arrayFirst[i]);
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

    let result = [];

    text = text.replace(/\s+/g, '').toLowerCase().split('');
    
    for (let i = 0; i < text.length; i++) {
        if (text[i].charCodeAt() >= ENGLISH_UTF_MIN && text[i].charCodeAt() <= ENGLISH_UTF_MAX) {
            result.push(text[i].charCodeAt() - ENGLISH_UTF_RANGE);
        }
    }

    result = result.join(" ");

    return result;
}

function squareEveryDigit(digit) {
    let digitArray = String(digit).split("");

    for (let i = 0; i < digitArray.length; i++) {
        digitArray[i] = (digitArray[i] * 1) ** 2;
    }

    if (isNaN(digitArray[0])) {
        digitArray[0] = "-";
    }

    let digitResult = digitArray.join("");

    return digitResult;
}

console.log(squareEveryDigit(-272))