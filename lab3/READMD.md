// Шаг 1: Создание класса Item
```javascript
class Item {
constructor(name, weight, rarity) {
this.name = name;
this.weight = weight;
this.rarity = rarity;
}
```
// Шаг 2: Создание класса Weapon (наследуется от Item)
```javascript
class Weapon extends Item {
constructor(name, weight, rarity, damage, durability) {
super(name, weight, rarity);
this.damage = damage;
this.durability = Math.max(0, Math.min(100, durability)); // Ограничиваем значение 0-100
}
```

```javascript
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

    getInfo() {
        return `Name: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}`;
    }

    setWeight(newWeight) {
        this.weight = newWeight;
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

console.log("\n=== Граничные случаи ===");
const testWeapon = new Weapon("Test Weapon", 1.0, "common", 5, 8);
console.log("Исходное состояние:", testWeapon.getInfo());
testWeapon.use();
console.log("После использования (durability=8):", testWeapon.getInfo());
testWeapon.use();
console.log("Ещё одно использование:", testWeapon.getInfo());
```



##Ответы на вопросы

this в методах класса
В JavaScript ключевое слово this указывает на контекст выполнения функции
(объект, в рамках которого она вызывается). Значение this зависит от способа вызова функции,
а не от места её объявления.

Приватные поля (#)
Поля и методы с # доступны только внутри класса. Нельзя обратиться извне или унаследовать без явного объявления.

Классы vs функции-конструкторы
Классы — это синтаксический сахар(красивая обёртка) над функциями-конструкторами:

    Чистый синтаксис с constructor, extends.

    Нет hoisting (как у let/const).

    Приватные поля (#) вместо замыканий.

    Методы автоматически попадают в прототип.

Под капотом классы остаются функциями с прототипами.