export const validateAmount = (value: string) => {
    if (!value) return 'حجم الزامیه';
    else if (isNaN(value)) return 'فقط عدد وارد کنید';
    else if (Number(value) < 1 || Number(value) > 10)
        return 'حجم باید بین 1 تا 10 باشه';
    return '';
};

export const validateFee = (
    value: string,
    maxFee: string,
    realMoney: boolean,
    price: string,
) => {
    let computedMaxFee = Number(maxFee);
    let computedMinFee = -computedMaxFee;
    if (realMoney) {
        computedMaxFee = computedMaxFee + Number(price);
        computedMinFee = Number(price) - computedMaxFee;
    }
    if (!value) return 'قیمت الزامیه';
    else if (isNaN(value)) return 'فقط عدد وارد کنید';
    else if (Number(value) > computedMaxFee)
        return `نباید بیشتر از ${computedMaxFee} باشد`;
    else if (Number(value) < computedMinFee)
        return `نباید کم تر از ${computedMinFee} باشد`;
    return '';
};

export const validateTp = (value: string) => {
    if (isNaN(value)) return 'فقط عدد وارد کنید';
    return '';
};

export const validateSl = (value: string) => {
    if (isNaN(value)) return 'فقط عدد وارد کنید';
    return '';
};
