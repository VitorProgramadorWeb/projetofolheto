// CPF verification
/**
 * Verifies the validity of a CPF.
 * @param {string} cpf CPF to verify.
 * @returns {boolean} True if valid, false if invalid.
 */
function verifyCpf(cpf) {
    // Remove non-numeric charecters
    cpf = cpf.replace(/\D/g, "");

    // Invalid if not 11 digits long
    if (cpf.length !== 11) return false;

    // validation formula
    let sum = 0, remainder = 0;

    //xxx.xxx.xxx-#x
    for (let i = 0; i <= 8; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
    remainder = (sum * 10) % 11;
    if (remainder == 10 || remainder == 11) remainder = 0;
    if (remainder != parseInt(cpf.charAt(9))) return false;
    
    //xxx.xxx.xxx-x#
    sum = 0;
    for (let i = 0; i <= 9; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
    remainder = (sum * 10) % 11;
    if (remainder == 10 || remainder == 11) remainder = 0;
    if (remainder != parseInt(cpf.charAt(10))) return false;

    return true;
}

// window inside page verification
