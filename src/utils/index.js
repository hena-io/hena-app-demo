const FRACTIONAL_PART_DISPLAY_LENGTH = 4;

export function fetchPost(apiStem, parameter) {
    return fetch(apiStem, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(parameter)
    })
    .then(response => response.json())
    .then(responseJson => {
        console.log('Fetch', responseJson.result, responseJson.data);
        return ({
            result: responseJson.result,
            success: (responseJson.result === 'Success'),
            data: responseJson.data
        });
    });
}

export function toUsdFormat(price) {
    return price ? `$${price.substring(0, price.indexOf('.'))}` : '';
}

export function toBalanceFormat(balance, decimals = 0) {
    balance = balance.padStart(decimals + 1, '0');
    
    let parts = [
        balance.substring(0, balance.length - decimals),
        balance.substring(balance.length - decimals, balance.length)
    ];

    let end = (parts[0].length - 1 < FRACTIONAL_PART_DISPLAY_LENGTH)
        ? FRACTIONAL_PART_DISPLAY_LENGTH - parts[0].length + 1 : 0;

    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (parts.length == 1 ||
        parts[0].length >= FRACTIONAL_PART_DISPLAY_LENGTH) {
        return parts[0];
    }

    parts[1] = parts[1].substring(0, end).replace(/[0|\.]0+$/, '');

    return (parts[1] !== '' && parts[1] !== '0') ? parts.join('.') : parts[0];
}

export function toDecimal(numberString, decimals) {
    numberString = numberString.padStart(decimals + 1, '0');
    let point = numberString.length - decimals;
    let parts = [
        numberString.slice(0, point),
        numberString.slice(point, numberString.length)
    ];

    return parts.join('.');
}