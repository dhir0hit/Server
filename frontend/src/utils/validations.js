const upper_case_alphabet = [
    "A", "B", "C", "D", "E", "F",
"G", "H", "I", "J", "K", "L",
"M", "N", "O", "P", "Q", "R",
"S", "T", "U", "V", "W", "X",
"Y", "Z"
];
const lower_case_alphabet = [
    'a', 'b', 'c', 'd', 'e', 'f',
'g', 'h', 'i', 'j', 'k', 'l',
'm', 'n', 'o', 'p', 'q', 'r',
's', 't', 'u', 'v', 'w', 'x',
'y', 'z'
];
const numbers = [
    "0", "1", "2", "3", "4", "5",
"6", "7", "8", "9"
]

const special_characters = [
    "!", "@", "#", "$", "%", "^",
"&", "*", "(", ")", "+", "-",
".", "`", "~", "|", "<", ">",
"=", "-", "_"
]


function passwordStrength(value) {
    let lower_case_count = 0;
    let upper_case_count = 0;
    let numbers_count = 0;
    let special_count = 0;

    let strength = 0


    for (const char of value) {
        strength++;
        if (lower_case_alphabet.includes(char)) {
            strength += 1
            lower_case_count++;
        }
        if (upper_case_alphabet.includes(char)) {
            strength += 1.5
            upper_case_count++;
        }
        if (numbers.includes(char)) {
            strength += 2
            numbers_count++;
        }

        if (special_characters.includes(char)) {
            strength += 3
            special_count++;
        }
    }

    return (strength / 40)* 100;
}

export const UsernameValidation = (value) => {
    if (value) {
        return 1;
    }
    return 0;
}

export const PasswordValidation = (value) => {
    if (value) {
        return passwordStrength(value);
    }
    return 0;
}

export const PlatformValidation = (value) => {
    if (value) {
        return 1;
    }
    return 0;
}

