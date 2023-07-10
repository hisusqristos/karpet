import { Side } from "../RULES"

type KeyType = string | number | symbol | Side

function findKey(obj: Record<KeyType, unknown>, value: unknown): KeyType { // sorry for the string
    const keysWithGivenValue = Object.keys(obj).filter(k => JSON.stringify(obj[k]) === JSON.stringify(value))

    const neededKey: KeyType = keysWithGivenValue.length != 0 ? keysWithGivenValue[0] : "nothing"
    return neededKey
}

export { findKey }