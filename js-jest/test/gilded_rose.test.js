const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", function () {
  describe("Regular Items", function () {
    it("should return correct name, sellIn, quality", function () {
      const gildedRose = new Shop([new Item("Elixir of the Mongoose", 5, 7)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe("Elixir of the Mongoose");
      expect(items[0].sellIn).toBe(4);
      expect(items[0].quality).toBe(6);
    });

    it("Quality should never be negative", function () {
      const gildedRose = new Shop([new Item("+5 Dexterity Vest", 10, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(0);
    });

    it("Quality should degrade twice a fast when SellIn is negative", function () {
      const gildedRose = new Shop([new Item("+5 Dexterity Vest", 0, 2)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(0);
    });
  });

  describe("Aged Brie", function () {
    it("should return correct name, sellIn, quality", function () {
      const gildedRose = new Shop([new Item("Aged Brie", 2, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe("Aged Brie");
      expect(items[0].sellIn).toBe(1);
      expect(items[0].quality).toBe(1);
    });
  });

  describe("Sulfuras, Hand of Ragnaros", function () {
    it("should return correct name, sellIn, quality", function () {
      const gildedRose = new Shop([
        new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe("Sulfuras, Hand of Ragnaros");
      expect(items[0].sellIn).toBe(0);
      expect(items[0].quality).toBe(80);
    });
  });

  describe("Backstage passes to a TAFKAL80ETC concert", function () {
    it("should return correct name, sellIn, quality", function () {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
      expect(items[0].sellIn).toBe(14);
      expect(items[0].quality).toBe(21);
    });
  });
});
