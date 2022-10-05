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
      item.sellIn--;

      const isBrie = item.name == "Aged Brie";
      const isPasses = item.name == "Backstage passes to a TAFKAL80ETC concert";
      const isSulfuras = item.name == "Sulfuras, Hand of Ragnaros";
      const isRegularItem = !isBrie && !isPasses && !isSulfuras;

      // REGULAR ITEMS
      if (isRegularItem) {
        // quality is greater than 0
        if (item.quality > 0) {
          // decrement quality by 1 per day
          item.quality--;
        }
        // CONCERT PASS
      } else if (isPasses && item.quality < 50) {
        // increase quality by 1 per day cap at 49
        item.quality++;
        // 10 days or less
        if (item.sellIn < 11) {
          // increase another 1 if under 50 (+2)
          item.quality++;
        }
        // 5 day or less
        if (item.sellIn < 6) {
          // increase another 1 if under 50 (+3)
          item.quality++;
        }
        // AGED BRIE
      } else if (isBrie && item.quality < 50) {
        // increase by 1 as older
        item.quality++;
      }
      // decrement sellIn if not Sulfuras
      // if (item.name != "Sulfuras, Hand of Ragnaros") {
      //   item.sellIn = item.sellIn - 1;
      // }
      // if expired
      if (item.sellIn < 0) {
        // not brie
        if (!isBrie) {
          // not pass
          if (!isPasses) {
            // quality more than 0 and not sulfuras
            // quality decrease 1 more per day (double)
            if (item.quality > 0) {
              if (!isSulfuras) {
                item.quality--;
              }
            }
            // yes pass
          } else {
            // set quality to zero
            item.quality = item.quality - item.quality;
          }
          // yes brie
          // } else {
          //   if (item.quality < 50) {
          //     // increase quality by 1 more ???
          //     item.quality = item.quality + 1;
          //   }
        }
      }
    });

    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
