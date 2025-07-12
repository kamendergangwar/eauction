export const numberWithCommas = (amount_val) => {
    return isNaN(amount_val)
        ? "0"
        : amount_val.toString().split(".")[0].length > 3
            ? amount_val
                .toString()
                .substring(0, amount_val.toString().split(".")[0].length - 3)
                .replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
            "," +
            amount_val
                .toString()
                .substring(amount_val.toString().split(".")[0].length - 3)
            : amount_val.toString();
};