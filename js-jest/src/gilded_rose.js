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
    for (let i = 0; i < this.items.length; i++) {
      // REGULAR ITEMS quality -1 per day
      // if item is not brie and not concert pass (these two increase qlt per day instead)
      if (
        this.items[i].name != "Aged Brie" &&
        this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
      ) {
        // quality is greater than 0
        if (this.items[i].quality > 0) {
          // not sulfuras
          if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
            // decrement quality by 1 per day
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
        // NOT REGULAR ITEMS (brie & pass)
      } else {
        // quality is never over 50
        if (this.items[i].quality < 50) {
          // increase quality by 1 per day
          this.items[i].quality = this.items[i].quality + 1;
          // if its a pass
          if (
            this.items[i].name == "Backstage passes to a TAFKAL80ETC concert"
          ) {
            // 10 days or less
            if (this.items[i].sellIn < 11) {
              // increase another 1 if under 50 (+2)
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            // 5 day or less
            if (this.items[i].sellIn < 6) {
              // increase another 1 if under 50 (+3)
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      // decrement sellIn if not Sulfuras
      if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      // if expired
      if (this.items[i].sellIn < 0) {
        // not brie
        if (this.items[i].name != "Aged Brie") {
          // not pass
          if (
            this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
          ) {
            // quality more than 0 and not sulfuras
            // quality decrease 1 more per day (double)
            if (this.items[i].quality > 0) {
              if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
            // yes pass
          } else {
            // set quality to zero
            this.items[i].quality =
              this.items[i].quality - this.items[i].quality;
          }
          // yes brie
          // } else {
          //   if (this.items[i].quality < 50) {
          //     // increase quality by 1 more ???
          //     this.items[i].quality = this.items[i].quality + 1;
          //   }
        }
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
