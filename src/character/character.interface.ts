export interface Character {
    name: string;
    level: number;
    hitPoints: number;
    classes: Class[];
    stats: {
        strength: number;
        dexterity: number;
        constitution: number;
        intelligence: number;
        wisdom: number;
        charisma: number;
    };
    items: Item[] | [];
    defenses: Defense[] | [];
}

interface Class {
    name: string;
    hitDiceValue: number;
    classLevel: number;
}

export interface Item {
    name: string;
    modifier: {
        affectedObject: string;
        affectedValue: string;
        value: number;
    }
}

export interface Defense {
    type: DefenseType;
    defense: DefenseStrength;
}

export enum DefenseType {
    bludgeoning = 'bludgeoning',
    piercing = 'piercing',
    slashing = 'slashing',
    fire = 'fire',
    cold = 'cold',
    acid = 'acid',
    thunder = 'thunder',
    lightning = 'lightning',
    poison = 'poison',
    radiant = 'radiant',
    necrotic = 'necrotic',
    psychic = 'psychic',
    force = 'force'
}

export enum DefenseStrength {
    immunity = 'immunity',
    resistance = 'resistance'
}

export interface CharacterWithTemporaryHitPointsAndMaxHitPoints extends Character {
    temporaryHitPoints: number;
    maxAmountOfHitPoints: number
}