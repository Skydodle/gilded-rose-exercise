class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    this.items.forEach((item) => {
      // All items sellIn decrement per day
      item.sellIn--;

      const isBrie = item.name == "Aged Brie";
      const isPasses = item.name == "Backstage passes to a TAFKAL80ETC concert";
      const isSulfuras = item.name == "Sulfuras, Hand of Ragnaros";
      const isRegularItem = !isBrie && !isPasses && !isSulfuras;

      const isQualityUnder50 = item.quality < 50;
      const isQualityOver0 = item.quality > 0;
      const isExpired = item.sellIn < 0;

      // Seprate logic by item type
      // REGULAR ITEMS
      if (isRegularItem) {
        // quality is greater than 0
        // decrement quality by 1 per day & double if expired
        if (isQualityOver0) {
          item.quality--;
          if (isExpired) {
            item.quality--;
          }
        }
        // CONCERT PASS
      } else if (isPasses && isQualityUnder50) {
        // increase quality by 1 per day cap at 49
        item.quality++;
        // 10 days or less: increase another 1 if under 50 (+2)
        if (item.sellIn < 11) {
          item.quality++;
        }
        // 5 day or less: increase another 1 if under 50 (+3)
        if (item.sellIn < 6) {
          item.quality++;
        }
        // When expired set to 0
        if (isExpired) {
          item.quality = 0;
        }
        // AGED BRIE
      } else if (isBrie && isQualityUnder50) {
        // increase by 1 as older; cap at 49
        item.quality++;
      }
    });

    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
