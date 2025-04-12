class Item {
    constructor(name, weight, rarity) {
        this.name = name;
        this.weight = weight;
        this.rarity = rarity;
    }

    getInfo() {
        return `Name: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}`;
    }

    setWeight(newWeight) {
        this.weight = newWeight;
    }
}

// Шаг 2: Создание класса Weapon (наследуется от Item)
class Weapon extends Item {
    constructor(name, weight, rarity, damage, durability) {
        super(name, weight, rarity);
        this.damage = damage;
        this.durability = Math.max(0, Math.min(100, durability)); // Ограничиваем значение 0-100
    }

    use() {
        if (this.durability > 0) {
            this.durability -= 10;
            if (this.durability < 0) this.durability = 0;
        }
        return this.durability;
    }

    repair() {
        this.durability = 100;
        return this.durability;
    }

    getInfo() {
        return `${super.getInfo()}, Damage: ${this.damage}, Durability: ${this.durability}`;
    }
}

// Шаг 3: Тестирование классов
console.log("=== Создание предметов ===");
const healthPotion = new Item("Health Potion", 0.5, "common");
const steelShield = new Item("Steel Shield", 5.2, "uncommon");

console.log(healthPotion.getInfo());
console.log(steelShield.getInfo());

console.log("\n=== Изменение веса предмета ===");
steelShield.setWeight(6.0);
console.log("После изменения веса:", steelShield.getInfo());

console.log("\n=== Создание оружия ===");
const longSword = new Weapon("Long Sword", 3.8, "rare", 18, 85);
const magicStaff = new Weapon("Magic Staff", 2.5, "legendary", 25, 45);

console.log(longSword.getInfo());
console.log(magicStaff.getInfo());

console.log("\n=== Использование оружия ===");
longSword.use();
magicStaff.use();
console.log("После использования:");
console.log(longSword.getInfo());
console.log(magicStaff.getInfo());

console.log("\n=== Починка оружия ===");
longSword.repair();
magicStaff.repair();
console.log("После починки:");
console.log(longSword.getInfo());
console.log(magicStaff.getInfo());

console.log("\n=== Граничные случаи ===");
const testWeapon = new Weapon("Test Weapon", 1.0, "common", 5, 8);
console.log("Исходное состояние:", testWeapon.getInfo());
testWeapon.use();
console.log("После использования (durability=8):", testWeapon.getInfo());
testWeapon.use();
console.log("Ещё одно использование:", testWeapon.getInfo());