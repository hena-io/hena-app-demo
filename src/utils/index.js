const FRACTIONAL_PART_DISPLAY_LENGTH = 4;

export function toUsdFormat(price) {
    return price ? `$${price.substring(0, price.indexOf('.'))}` : '';
}

export function toBalanceFormat(balance, decimals = 18) {
    if (balance.length < decimals) {
        
    }

    let parts = balance.split('.');

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