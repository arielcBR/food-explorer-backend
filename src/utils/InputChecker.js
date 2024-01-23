class InputChecker{
    text(text){
        if(!text || text.length < 2)
            return false;
        return true;
    }
    
    email(email) {
        const re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        return re.test(email);
    }

    password(password) {
        const re = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{6,32}$/;
        return re.test(password);
    }

    price(price){
        if(isNaN(price)){
            return false;
        }

        if(price < 0){
            return false;
        }

        return true;
    }
}

module.exports = new InputChecker();