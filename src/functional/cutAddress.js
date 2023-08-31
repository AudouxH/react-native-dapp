const cutAddress = (address) => {
    const stringAddress = address.toString();

    return (
        stringAddress.substring(0, 7) + "..." + stringAddress.substring(stringAddress.length - 5, stringAddress.length)
    );
}

export default cutAddress;