const BASE_TYPES = ['int', 'float', 'char', 'void'];
const BINARY_OPS = ['+', '-', '*', '/', '=', '<', '>', '<=', '>=', '==', '!=',
                    '&', '&&', '|', '||', '^'];
const PREFIX_UNARY_OPS = [`++`, `--`, `!`, `*`, `&`, `~`];
const POSTFIX_UNARY_OPS = [`++`, `--`];
const ALL_OPS = [...BINARY_OPS, ...PREFIX_UNARY_OPS, ...BINARY_OPS];

class Type {
    constructor(public name: string) {}

    static buildType(name: string, numPointers: number): Type {
        let ret = new Type(name);
        for (var i = 0; i < numPointers; i++) {
            ret = new Pointer(ret);
        }

        return ret;
    }

    equals(other: Type): boolean {
        return this.name === other.name;
    }
}

class Pointer extends Type {
    name: string

    constructor (public wrappedType: Type) {
        super('this gets overwritten');
        this.name = `*${wrappedType.name}`;
    }
}

class ArrayType extends Type {
    name: string
    constructor (public wrappedType: Type, public size: number) {
        super('this gets overwritten');
        this.name = `${wrappedType.name}[${size}]`;
    }
}

const Types = {
    Float: new Type('float'),
    Int: new Type('int'),
    Void: new Type('void'),
    Char: new Type('char'),
    Pointer: Pointer,
    Array: ArrayType
};

export { BASE_TYPES, BINARY_OPS, PREFIX_UNARY_OPS, POSTFIX_UNARY_OPS, ALL_OPS, Type, Types };