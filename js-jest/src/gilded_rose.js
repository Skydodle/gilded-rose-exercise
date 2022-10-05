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
      // if (item.name == "Sulfuras, Hand of Ragnaros") {
      //   item.sellIn--;
      // }
      // REGULAR ITEMS quality -1 per day
      // if item is not brie and not concert pass (these two increase qlt per day instead)
      if (
        item.name != "Aged Brie" &&
        item.name != "Backstage passes to a TAFKAL80ETC concert"
      ) {
        // quality is greater than 0
        if (item.quality > 0) {
          // not sulfuras
          if (item.name != "Sulfuras, Hand of Ragnaros") {
            // decrement quality by 1 per day
            item.quality = item.quality - 1;
          }
        }
        // NOT REGULAR ITEMS (brie & pass)
      } else {
        // quality is never over 50
        if (item.quality < 50) {
          // increase quality by 1 per day
          item.quality = item.quality + 1;
          // if its a pass
          if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
            // 10 days or less
            if (item.sellIn < 11) {
              // increase another 1 if under 50 (+2)
              if (item.quality < 50) {
                item.quality = item.quality + 1;
              }
            }
            // 5 day or less
            if (item.sellIn < 6) {
              // increase another 1 if under 50 (+3)
              if (item.quality < 50) {
                item.quality = item.quality + 1;
              }
            }
          }
        }
      }
      // decrement sellIn if not Sulfuras
      // if (item.name != "Sulfuras, Hand of Ragnaros") {
      //   item.sellIn = item.sellIn - 1;
      // }
      // if expired
      if (item.sellIn < 0) {
        // not brie
        if (item.name != "Aged Brie") {
          // not pass
          if (item.name != "Backstage passes to a TAFKAL80ETC concert") {
            // quality more than 0 and not sulfuras
            // quality decrease 1 more per day (double)
            if (item.quality > 0) {
              if (item.name != "Sulfuras, Hand of Ragnaros") {
                item.quality = item.quality - 1;
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
